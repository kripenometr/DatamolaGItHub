function max_sum() {

    let arr_start = [7,1,5,3,6,4];
    let dp = new Array(1111111);    

    for (let i = 0; i < dp.length; i++) 
        dp[i] = 0;

        for (let i = 1; i <= arr_start.length; i++) {
            dp[i] =  Math.max(dp[i], dp[i - 1]);
            for (let j = i + 1; j <= arr_start.length; j++) {
                if (arr_start[i] < arr_start[j])
                {
                    dp[j] =  Math.max(dp[j], dp[i] + arr_start[j] - arr_start[i]);
                }
            }
        }
        console.log(dp[arr_start.length]);
}
max_sum();