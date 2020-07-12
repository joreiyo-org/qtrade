var myportfolio = JSON.parse(localStorage.getItem('portfolio'));
displayPortfolio(myportfolio);

function displayPortfolio(portfolio)
{
		var icount = 1;
		// Get card style by name
		var color = document.getElementsByClassName('card');
		// Set dates variables to calculate age
		var date1 = new Date();
		var today = new Date();

	  // response loop	
		for (const asset of portfolio.assets) {

		var symbol_status = asset.order_stage.toLowerCase();
		
		if (symbol_status.toLowerCase() == "buy") {
			 date1 = new  Date(today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate());
		}
		else if (symbol_status.toLowerCase() == "buying") {
			date1 = new  Date(asset.buy_order_date); 
		}		
		else if (symbol_status.toLowerCase() == "sell") {
			date1 = new  Date(asset.buy_fill_date); 
		}
		else if (symbol_status.toLowerCase() == "selling") {
			date1 = new  Date(asset.buy_fill_date); 
		}
		
		var date2 = new Date(today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate());
		// Calculate the time difference of two dates 
		var Difference_In_Time = Math.abs(date2.getTime() - date1.getTime()); 
		// Calculate the no. of days between two dates 
		var age = Math.ceil(Difference_In_Time / (1000 * 3600 * 24)); 

		// Change divs style based on order stage
		if (symbol_status.toLowerCase() == "buy" ) {
			var loc = "location.href='buy.html?sym=" + asset.symbol +"'" ;
			color[icount-1].style.backgroundColor = '#33cc33';
			color[icount-1].style.border = '3px solid #29a329';
			color[icount-1].style.color = '#ffffff';
			color[icount-1].innerHTML = asset.symbol + '&nbsp;&nbsp;&nbsp;(' + age +')';
			color[icount-1].setAttribute('onclick',loc);			 
		}
		else if (symbol_status.toLowerCase() == "buying"){
			color[icount-1].style.backgroundColor = '#ffffff';
			color[icount-1].style.border = '3px solid #29a329';
			color[icount-1].style.color = '#29a329';
			color[icount-1].innerHTML = asset.symbol + '&nbsp;&nbsp;&nbsp;(' + age +')';
		}		
		else if (symbol_status.toLowerCase() == "sell" ) {
			var loc = "location.href='sell.html?sym=" + asset.symbol +"'" ;
			color[icount-1].style.backgroundColor = '#ff6600';
			color[icount-1].style.border = '3px solid #e65c00';
			color[icount-1].style.color = '#ffffff';
			color[icount-1].innerHTML = asset.symbol + '&nbsp;&nbsp;&nbsp;(' + age +')';
			color[icount-1].setAttribute('onclick',loc);
		}
		else if (symbol_status.toLowerCase() == "selling") {
			color[icount-1].style.backgroundColor = '#ffffff';
			color[icount-1].style.border = '3px solid #ff6600';
			color[icount-1].style.color = '#e65c00';
			color[icount-1].innerHTML = asset.symbol + '&nbsp;&nbsp;&nbsp;(' + age +')';

		}
		else {
			color[icount-1].style.backgroundColor = '#c6c6c6';
			color[icount-1].style.border = '3px solid #f5c02f';
			color[icount-1].style.color = '##ededed';
			color[icount-1].innerHTML = asset.symbol;		}		  

		//Increase counter
		icount ++;
		}
}

