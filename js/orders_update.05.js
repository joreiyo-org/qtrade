const ordersRequest = new Request('orders.json');
const ordersEndPoint = 'https://joreiyo.free.beeceptor.com/order5';


// ### Orders also return executions, Combine them all in a single call?
// ### FIll Price ????

// load localstorage into an json object
var myportfolio = JSON.parse(localStorage.getItem('portfolio'));

//Fetch orders
fetch(ordersEndPoint)
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
		for (const order of data.orders) 
		{
			for (var i = 0; i < myportfolio.assets.length; i++)	
			{
				if (order.symbol.toLowerCase() == myportfolio.assets[i].symbol.toLowerCase())
				{
					if (order.side.toLowerCase() == "buy")
					{
						// Update localstorage values
						myportfolio.assets[i].order_stage = 'buying';
						myportfolio.assets[i].quantity = order.totalQuantity;
						myportfolio.assets[i].buy_order_id = order.id;
						myportfolio.assets[i].buy_order_date = order.creationTime;
						myportfolio.assets[i].buy_bid = order.limitPrice;
					}
					else if (order.side.toLowerCase() == "sell")
					{
						// Update localstorage values
						myportfolio.assets[i].order_stage = 'selling';
						myportfolio.assets[i].quantity = order.totalQuantity;
						myportfolio.assets[i].sell_order_id = order.id;
						myportfolio.assets[i].sell_order_date = order.creationTime;
						myportfolio.assets[i].sell_bid = order.limitPrice;
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



