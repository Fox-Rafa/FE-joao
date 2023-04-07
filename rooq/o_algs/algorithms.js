import React, { useEffect, useState } from 'react';
import {hp15_coefs, lp55_coefs, lp48_coefs} from "./vars";

export function meann(dat){
    var vl=0;
    for(i in dat){
        vl = vl+dat[i];
    }
    vl = vl/dat.length;
    return(vl);
}

export function fir(signal, taps){
    const filtered = [];
    var nt = taps.length;
    var summed;
    var p=0;
    
    for(var i=0; i<signal.length; i++){
        summed = 0;
        p=0;
        for(var j=i-nt; j<i; j++){
            summed = summed+(signal[j]*taps[p]);
            p = p+1;
        }
        filtered.push(summed);
    }
    
    return(filtered);
}

export function clean(dataa){
    var data = [];
    var mn = meann(dataa);
    var p;

    for(var i=0; i<dataa.length; i++){
        p = (dataa[i]-mn)*(3.3/4095.0)*1000;
        
        data.push(p);
    }
    
    let taps = lp48_coefs;
    data = fir(data, [0.25, 0.25, 0.25, 0.25]);

    return(data);
}

export function sbtrct(a1, a2){
    const arrf = [];

    for(let i=0; i<a1.length-1; i++){
        arrf.push(a1[i]-a2[i]);
    }
    return(arrf);
}

export function addit(a1, a2){
    const arrf = [];

    for(let i=0; i<a1.length-1; i++){
        arrf.push(a1[i]+a2[i]);
    }
    return(arrf);
}

export function divd(a1, num){
    const arrf = [];

    for(let i=0; i<a1.length-1; i++){
        arrf.push(a1[i]/num);
    }
    return(arrf);
}
