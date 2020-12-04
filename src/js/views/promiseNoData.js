function promiseNoData(promise, data, error, h){
     return  !promise && "no data"     // case "0"
           || error && <h1>Error</h1>   // case 3
           || !data && <img src="loading.gif"/>     // case 1
}
