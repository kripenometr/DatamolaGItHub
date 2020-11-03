function max_sum() {
    let input_arr = [];

    let n = Number(prompt("Enter the size of the array: ", ""));
    
    for(let i = 0; i < n; ++i)
        input_arr[i] = Number(prompt("Enter " + (i + 1) + " array element: " , ""));

    let sum  = 0;
    let res = 0;

    for (let i = 0; i < n; ++i)
		for (let j = i; j < n; ++j)
		{
            for (let k = i; k <= j; ++k)
                sum += Number(input_arr[k]);

            if (sum > res)
				res = sum;

            sum = 0;
            
        }

    console.log(res);

}

max_sum();