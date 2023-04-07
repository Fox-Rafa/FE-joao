import spline from "./cubicSpline.js";

function arrDiff(ar1, ar2){
	for(let a in ar1)
		ar1[a] = ar1[a]-ar2[a];

	return(ar1);
}

function fPeaks(sig){
	const x = [];
	const y = [];

	for(let i=1; i<sig.length-1; i++){
		if(sig[i]>sig[i-1] && sig[i]>sig[i+1]){
			x.push(i);
			y.push(sig[i]);
		}
	}
	
	return([x, y]);
}

function fTroughs(sig){
	const x = [];
	const y = [];

	for(let i=1; i<sig.length-1; i++){
		if(sig[i]<sig[i-1] && sig[i]<sig[i+1]){
			x.push(i);
			y.push(sig[i]);
		}
	}
	
	return([x, y]);
}

function meanV(ar1, ar2){
	for(let i=0; i<ar1.length; i++){
		ar1[i] = (ar1[i]+ar2[i])/2;
	}

	return(ar1);
}

function minV(ar){
	var ans=ar[0];
	
	for(let q in ar){
		if(ar[q]<ans) 
			ans=ar[q];
	}

	return(ans);
}

function maxV(ar){
	var ans=ar[0];
	
	for(let q in ar){
		if(ar[q]>ans) 
			ans=ar[q];
	}

	return(ans);
}

function minL(ar){
	var ans=ar[0];
	var ret=0;
	for(let q in ar){
		if(ar[q]<ans){
			ans=ar[q];
			ret = q;
		}
	}

	return(ret);
}

function maxL(ar){
	var ans=ar[0];
	var ret=0;
	for(let q in ar){
		if(ar[q]>ans){
			ans=ar[q];
			ret = q;
		}
	}

	return(ret);
}

function sumSqrd(ar, st, ed){
	var ans=0;

	for(let i=st; i<ed; i++){
		ans+=ar[i]*ar[i];
	}

	return(ans);
}

function sum(ar, st, ed){
	var sm=0;

	for(let i=st; i<ed; i++){
		sm+=ar[i];
	}

	return(sm);
}

function removeDc(data, sr){
	var med = parseInt(sr/2);
	sr=med*2;
	
	var sm = sum(data, 0, sr)/sr;
	
	const dc = [];

	for(let i=0; i<med; i++)
		dc.push(sm);

	for(let i=med; i<data.length-med; i++)
		dc.push((dc[dc.length-1]+(-data[i-med]/sr+data[i+med]/sr)));

	sm = dc[dc.length-1];

	for(let i=0; i<med; i++)
		dc.push(sm);

	for(let i=0; i<data.length; i++)
		data[i] = data[i]-dc[i];

	return(data);
}

function mvFormat(ecg, sampling_rate, dc_offset, max_v, resolution, gain){
    let v_multiplier = ((max_v/(2**resolution-1))*1000)/gain;
    let t_multiplier = (1/sampling_rate)*1000;
    const y = [];

    for(let i in ecg){
        ecg[i] = ecg[i]*v_multiplier;
        y.push(i*t_multiplier);
    }

    return([ecg, y]);
}

const range = (min, max) => [... Array(max - min + 1). keys()]. map(i => i + min);

function emdfFilter(sig, sr){
	const Osig = Array.from(sig);
	const stoplim = 0.01;
	// creates range(len(sig))
	const t = range(0, sig.length-1);
	// creates "r_t" based on input signal
	var r_t = Array.from(sig); // index of peaks
	// initializes is_imf
	var is_imf = false;
	var bk=0;
	while(!is_imf){
		// cleans array and finds peaks
		var tmp = fPeaks(r_t); var pks_loc=tmp[0]; var pks_vls=tmp[1];

		// finds troughs
		var tmp = fTroughs(r_t); var trs_loc=tmp[0]; var trs_vls=tmp[1];

		var pks_t = [];
		pks_t = spline(pks_loc, pks_vls, t); // smooths peaks
		
		var trs_t = [];
		trs_t = spline(trs_loc, trs_vls, t); // smooths troughts
		
		// calculates mean
		var mean_t = []; // middle of imf
		mean_t = meanV(pks_t, trs_t);

		let samp_start = maxV([minV(pks_loc), minV(trs_loc)]);

		let samp_end = minV([maxV(pks_loc), maxV(trs_loc)])-1;

		let sdk = sumSqrd(mean_t, samp_start, samp_end)/sumSqrd(r_t, samp_start, samp_end);
		
		for(let i=0; i<samp_start; i++){
			mean_t[i] = mean_t[samp_start];
		}

		for(let i=samp_end; i<mean_t.length; i++){
			mean_t[i] = mean_t[samp_end];
		}

		// if not imf, update r_t and is_imf
		if(sdk < stoplim){
			is_imf=true;
		}

		else{
			r_t = arrDiff(r_t, mean_t);
		}

		if (bk>=30){
			is_imf=true;
		}
		bk+=1;
	}

	sig = arrDiff(Osig, r_t)
	return(sig);
}

export default function processECG(eecg, sampling_rate = 250, dc_offset = 0, max_v = 3.3, resolution  = 12, gain = 1000, RD = true, emdf = false ){
	var ecg = Array.from(eecg);
	
	if(RD){
    	ecg = removeDc(Array.from(ecg), sampling_rate);
	}
    
	if(emdf){
		ecg = emdfFilter(Array.from(ecg), sampling_rate);
	}
    
	var tmp = mvFormat(Array.from(ecg), sampling_rate, dc_offset, max_v, resolution, gain); ecg = tmp[0]; const y = tmp[1];

	return(ecg)

}
