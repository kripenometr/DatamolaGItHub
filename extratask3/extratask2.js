let input_arr = [1, 2, 3, 4, 5];

function max_profit(arr) {
    let dp = new Array(10001);    

    for (let i = 0; i < dp.length; i++){ 
        dp[i] = 0;
    }

    let n = arr.length;
    let arr1 = [];

    for(let i = 1; i <= n; i++){
        arr1[i] = arr[i - 1];
    }

    for (let i = 1; i <= n; i++) {
        dp[i] =  Math.max(dp[i], dp[i - 1]);
        for (let j = i + 1; j <= n; j++){
            if (Number(arr1[i]) < Number(arr1[j])){
                dp[j] =  Math.max(dp[j], dp[i] + arr1[j] - arr1[i]);
            }
        }
    }

    return dp[n];

}

console.log(max_profit(input_arr));