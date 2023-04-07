export function sbtrct(aa1, aa2){ // REMOVE DEFAULTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT
    const a1 = Array.from(aa1)
    const a2 = Array.from(aa2)
    
    const arrf = [];

    for(let i=0; i<a1.length-1; i++){
        arrf.push(a1[i]-a2[i]);
    }
    return(arrf);
}

export function makeMed(a1, a2, a3){
    const arrf = [];

    for(let i=0; i<a1.length-1; i++){
        arrf.push((a1[i]+a2[i]+a3[i])/3);
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

export function makeAvr(I, II){
    const arrf = [];

    for(let i=0; i<I.length-1; i++){
        arrf.push((I[i]/II[i])*-0.5);
    }
    return(arrf);
}

export function makeAvl(I, II){
    const arrf = [];

    for(let i=0; i<I.length-1; i++){
        arrf.push(I[i]-(II[i]*-0.5));
    }
    return(arrf);
}

export function makeAvf(I, II){
    const arrf = [];

    for(let i=0; i<I.length-1; i++){
        arrf.push(II[i]-(I[i]*-0.5));
    }
    return(arrf);
}
