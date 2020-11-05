function max_sum(input_arr) {

    let n = input_arr.length;
    
    let sum  = 0;
    let res = 0;

    for (let i = 0; i < n; ++i)
        for (let j = i; j < n; ++j) {
            for (let k = i; k <= j; ++k){
                sum += Number(input_arr[k]);
            }

            if (sum > res){
                res = sum;
            }

            sum = 0;
            
        }

    return res;

}