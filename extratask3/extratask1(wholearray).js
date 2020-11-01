function max_sum() {
    let arr = [-2,1,-3,4,-1,2,1,-5,4];

    let sum  = 0;
    let res = 0;

    for (let i = 0; i < arr.length; ++i)
    {
		for (let j = i; j < arr.length; ++j)
		{
            for (let k = i; k <= j; ++k)
            {
                sum += Number(arr[k]);
            }

            if (sum > res)
            {
				res = sum;
            }

            sum = 0;
            
        }
    }

    console.log(res);

}
max_sum();