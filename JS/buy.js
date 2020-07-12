const urlParams = new URLSearchParams(window.location.search);
const mySymbol = urlParams.get('sym');
const symbolId = urlParams.get('id');
const mybidpercentage = 0.98; // 2% less than current bid

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
				myBid = bidPrice * mybidpercentage;
				askPrice = quote.askPrice;
			}
		}	
		document.getElementById('myBid').innerHTML = "My Bid: $ " + myBid.toFixed(2); 
		document.getElementById('symbol').innerHTML = mySymbol; 
		document.getElementById('bidPrice').innerHTML = "Bid: $ " + bidPrice; 
		document.getElementById('askPrice').innerHTML = "Ask: $ " + askPrice; 
		//get quantity from localStorage
		document.getElementById('myQty').innerHTML = "Qty: " + getQuantity(mySymbol);

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
			return myPortfolio.assets[i].quantity; 
		}
	}	  
}



  
  
  