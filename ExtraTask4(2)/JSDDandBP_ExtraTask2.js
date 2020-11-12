function add(a, b = undefined){
    if(b === undefined)
        return function(c){ return c + a;};

    return a + b;
}

function sub(a, b = undefined){
    if(b === undefined)
        return function(c){ return c - a;};

    return a - b;
}

function mul(a, b = undefined){
    if(b === undefined)
        return function(c){ return c * a;};
    
    return a * b;
}

function div(a, b = undefined){
    if(b === undefined)
        return function(c){ return c / a;};

    return a / b;
}

function pipe(){
    let prioritet = [];
    for(let i = 0; i < arguments.length; ++i)
        prioritet.push(arguments[i]);

    return function(c){
               for(let i = 0; i < prioritet.length; ++i)
               c = prioritet[i](c);

               return c;
           }
}
