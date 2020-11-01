function max_sum() {
    let arr = [];

    let n = prompt('Введите кол-во элементов в массиве: ', "");
    
    for(i = 0; i < n; ++i)
    {
        arr[i] = prompt("Введите " + (i + 1) + " элемет массива: " , "");
    }

    let sum  = 0;
    let res = 0;

    for (let i = 0; i < n; ++i)
    {
		for (let j = i; j < n; ++j)
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