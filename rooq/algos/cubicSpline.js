function gaussEliminationLS(m, n, a, x){
	for(let i=0; i<m-1; i++){
		for(let k=i+1; k<m; k++){
			let term = a[k][i]/a[i][i];
			for(let j=0; j<n; j++){
				a[k][j]=a[k][j]-term*a[i][j];
			}
		}
	}
	
	for(let i=m-1; i>=0; i--){
		x[i]=a[i][n-1];
		for(let j=i+1; j<n-1; j++){
			x[i]=x[i]-a[i][j]*x[j];
		}
		x[i]=x[i]/a[i][i];
	}
	return([a, x]);
}

function cSCoeffCalc(n, h, sig, y, a, b, c, d){
	for(let i=0; i<n; i++){
		d[i]=y[i];
		b[i]=sig[i]/2.0;
		a[i]=(sig[i+1]-sig[i])/(h*6.0);
		c[i]=(y[i+1]-y[i])/h-h*(2*sig[i]+sig[i+1])/6.0;
	}
	return([a, b, c, d]);
}

function tridiagonalCubicSplineGen(n, h, a, y){
	for(let i=0; i<n-1; i++){
		a[i][i]=4;
	}
	
	for(let i=0; i<n-2; i++){
		a[i][i+1]=1;
		a[i+1][i]=1;
	}
	
	for(let i=0; i<n-1; i++){
		a[i][n-1]=(y[i+2]-2*y[i+1]+y[i])*6/h/h;
	}

	return(a);
}

function copyMatrix(m, n, matrix1, matrix2){
	for(let i=0; i<m; i++){
		for(let j=0; j<n; j++){
			matrix2[i][j]=matrix1[i][j];
		}
	} 
	return(matrix2);
}

function interpolate(x_loc, x, n, a, b, c, d){
	for(let i=0; i<n; i++){
		if(x_loc<=x[i+1] && x_loc>=x[i]){
			return(a[i]*(x_loc-x[i])**3+b[i]*(x_loc-x[i])**2+c[i]*(x_loc-x[i])+d[i]);
		}
	}
}

function spline(x, y, xx){
	var n=x.length;
	n = n-1;

	var h = x[1]-x[0]; 

	var a = [];
	a.length = n;
	a.fill(0)
	
	var b = [];
	b.length = n;
	b.fill(0)
	
	var c = [];
	c.length = n;
	c.fill(0)
	
	var d = [];
	d.length = n;
	d.fill(0)

	var sig = [];
	sig.length = n+1;
	sig.fill(0)
	sig[0]=0;
	sig[n]=0;

	var sigTemp = [];
	sigTemp.length = n-2;
	sigTemp.fill(0)

	

	var tri = [];
	tri.length = n-1;
	for(let i=0; i<n-1; i++){
		tri[i] = [];
		tri[i].length=n
		tri[i].fill(0);
	}

	tri = tridiagonalCubicSplineGen(n,h,tri,y);
	
	var tmp =  gaussEliminationLS(n-1, n, tri, sigTemp); tri = tmp[0]; sigTemp = tmp[1]  

	for(let i=1;i<n;i++){
			sig[i]=sigTemp[i-1];
	}
    
	var temp = cSCoeffCalc(n, h, sig, y, a, b, c, d); a = temp[0]; b = temp[1]; c = temp[2]; d = temp[3];

	const yy = [];
	for(let _x in xx){
		yy.push(interpolate(xx[_x], x, n, a, b, c, d));
	}
	return(yy);
}
