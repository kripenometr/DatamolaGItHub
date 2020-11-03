function max_profit() {

    let input_arr = [];
    let dp = new Array(10001);    

    for (let i = 0; i < dp.length; i++) 
        dp[i] = 0;

    let n = Number(prompt("Enter the size of the array: ", ""));

    for(let i = 1; i <= n; i++)
        input_arr[i] = Number(prompt("Enter " + (i) + " array element: " , ""));


    for (let i = 1; i <= n; i++) {
        dp[i] =  Math.max(dp[i], dp[i - 1]);
        for (let j = i + 1; j <= n; j++)
            if (input_arr[i] < input_arr[j])
                dp[j] =  Math.max(dp[j], dp[i] + input_arr[j] - input_arr[i]);
    }

    console.log(dp[n]);

}

max_profit();