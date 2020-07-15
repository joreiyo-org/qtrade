const executionsRequest = new Request('executions.json');
const executionsEndPoint = 'https://joreiyo.free.beeceptor.com/execution4';

// load localstorage into an json object
var myportfolio = JSON.parse(localStorage.getItem('portfolio'));

//Fetch orders
fetch(executionsEndPoint)
  .then(
    function(response) {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' +
          response.status);
        return;
      }

      // Examine the text in the response
		response.json().then(function(data) {
	  // Do something with the response	
		for (const execution of data.executions) 
		{
			for (var i = 0; i < myportfolio.assets.length; i++)	
			{
				if (execution.symbol.toLowerCase() == myportfolio.assets[i].symbol.toLowerCase())
				{
					if (execution.side.toLowerCase() == "buy") // && match orderid???
					{
						// Update localstorage values
						myportfolio.assets[i].order_stage = 'sell';
						myportfolio.assets[i].quantity = execution.quantity;
						myportfolio.assets[i].buy_fill_date = execution.timestam;
						myportfolio.assets[i].buy_fill = execution.price;
						myportfolio.assets[i].buy_comission = (execution.comission + execution.executionFee + execution.secFee + execution.canadianExecutionFee);
						
					}
					else if (execution.side.toLowerCase() == "sell")
					{
						// Update localstorage values
						myportfolio.assets[i].order_stage = 'buy';
						myportfolio.assets[i].quantity = execution.quantity;
						myportfolio.assets[i].sell_fill_date = execution.timestam;
						myportfolio.assets[i].sell_fill = execution.price;
						myportfolio.assets[i].sell_comission = (execution.comission + execution.executionFee + execution.secFee + execution.canadianExecutionFee);

						// Calculate the time difference of two dates 
						var date1 = new Date(myportfolio.assets[i].buy_fill_date);
						var date2 = new Date(myportfolio.assets[i].sell_fill_date);
						
						var Difference_In_Time = Math.abs(date2.getTime() - date1.getTime()); 						// Calculate the no. of days between two dates 
						var age = Math.ceil(Difference_In_Time / (1000 * 3600 * 24)); 
						var profit = myportfolio.assets[i].sell_fill - myportfolio.assets[i].buy_fill - myportfolio.assets[i].buy_comission - myportfolio.assets[i].sell_comission;
						
						
						logOperation(myportfolio.assets[i].symbol.toLowerCase(), myportfolio.assets[i].quantity, myportfolio.assets[i].buy_fill, myportfolio.assets[i].buy_fill_date, myportfolio.assets[i].sell_fill, myportfolio.assets[i].sell_fill_date, age, profit)

						// clear local data to start cycle again
						myportfolio.assets[i].sell_fill_date = '';
						myportfolio.assets[i].sell_fill = '';
						myportfolio.assets[i].sell_comission = '';
						myportfolio.assets[i].buy_fill_date = '';
						myportfolio.assets[i].buy_fill = '';
						myportfolio.assets[i].buy_comission = '';		
						myportfolio.assets[i].buy_order_id = '';
						myportfolio.assets[i].buy_order_date = '';
						myportfolio.assets[i].buy_bid = '';
						myportfolio.assets[i].sell_order_id = '';
						myportfolio.assets[i].sell_order_date = '';
						myportfolio.assets[i].sell_bid = '';


						}
				}
			}
		}	
		localStorage.setItem('portfolio', JSON.stringify(myportfolio));
      });
    }
  )
  .catch(function(err) {
    console.log('Fetch Error :-S', err);
  });

function logOperation(_symbol, _qty, _buyfill, _buyfilldate, _sellfill, _sellfilldate, _diffdate, _profit) {
	
   var newline = {symbol: _symbol , qty: _qty , buy_fill: _buyfill , buy_fill_date: _buyfilldate , sell_fill: _sellfill , sell_fill_date: _sellfilldate , diff_date:  _diffdate , profit: _profit}  

   var operations = JSON.parse(localStorage.getItem('operationsLog'));
  
   operations['logs'].push(newline);
 
   localStorage.setItem('operationsLog', JSON.stringify(operations));
  }