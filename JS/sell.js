const urlParams = new URLSearchParams(window.location.search);
const mySymbol = urlParams.get('sym');
const symbolId = urlParams.get('id');

// get and display quotes from Questrade
const quotesRequest = new Request('quotes.json');
const quotesEndPoint = 'https://joreiyo.free.beeceptor.com/quotes';

fetch(quotesEndPoint)
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

		var bidPrice = "";
		var myBid = "";
		var askPrice = "";
				
		for (const quote of data.quotes) {

			if (quote.symbol == mySymbol) {
				
				bidPrice = quote.bidPrice;
				askPrice = quote.askPrice;
			}
		}	

		document.getElementById('symbol').innerHTML = mySymbol; 
		document.getElementById('bidPrice').innerHTML = "Bid: $ " + bidPrice; 
		document.getElementById('askPrice').innerHTML = "Ask: $ " + askPrice; 
		//Localstorage
		document.getElementById('myQty').innerHTML = "Qty: " + getQuantity(mySymbol);
		document.getElementById('myBid').innerHTML = "My Bid: $ " + getmyBid(mySymbol);
      });
    }
  )
  .catch(function(err) {
    console.log('Fetch Error :-S', err);
  });


// get and display qty from localstorage
const assetsLocalstorage = 'portfolio';
function getQuantity(symbol)
{
	  var myPortfolio = JSON.parse(localStorage.getItem(assetsLocalstorage));

	for(var i = 0; i < myPortfolio.assets.length; i++)
	{
		if (myPortfolio.assets[i].symbol == symbol)
		{ 
			//return myPortfolio.assets[i].quantity; 
			return myPortfolio.assets[i].quantity;

		}
	}	  
}

function getmyBid(symbol)
{
	var myPortfolio = JSON.parse(localStorage.getItem(assetsLocalstorage));

	for(var i = 0; i < myPortfolio.assets.length; i++)
	{
		if (myPortfolio.assets[i].symbol == symbol)
		{ 
				var buyfill = myPortfolio.assets[i].buy_fill;
				var buyfilldate = myPortfolio.assets[i].buy_fill_date;
				var today = new Date();
				var date1 = new Date(buyfilldate); 
				var date2 = new Date(today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate());
				
				// Calculate the time difference of two dates 
				var Difference_In_Time = Math.abs(date2.getTime() - date1.getTime()); 
				// Calculate the no. of days between two dates 
				var age = Math.ceil(Difference_In_Time / (1000 * 3600 * 24)); 
				
				if (age <= 7) {
				myBid = buyfill * 1.03;
				}
				else if (age <= 15){
				myBid = buyfill * 1.02;					
				}
				else if (age <= 23){
				myBid = buyfill * 1.01;					
				}
				else if (age <= 30){
				myBid = buyfill;
				}
				else {
				myBid = 0;
				}

			return myBid.toFixed(2);
		}
	}	  
}


		

			