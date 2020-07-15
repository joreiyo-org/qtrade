//function addToken() {
//var qttoken = {'token':'PHvnuqXBLieilau2J217DNt8TAFPiHAs0'};
//
//localStorage.setItem('qttoken', JSON.stringify(qttoken));
//}
//var myqttoken = JSON.parse(localStorage.getItem('qttoken'));
//myqttoken.token[0]


function initOperations() {
	
	var operationsLog = 
{ 
logs: 
[
	{"symbol":"",
	"qty": "", 
	"buy_fill": "",
	"buyfilldate": "",
	"sellfill": "",
	"sellfilldate": "",
	"diffdate": "",
	"profit": ""
    }
]
};
	localStorage.setItem('operationsLog', JSON.stringify(operationsLog));
}


function addPortfolio() {
	
	var portfolio = 
{ 
assets: 
[
	{"id": "1",
    "name": "Apple Inc",
    "symbol": "AAPL",
    "market": "NYX",
    "classtype": "us_equity",
    "order_type": "limit",
	"order_stage":"",
    "quantity": "",
    "order_duration": "7",
    "buy_order_id": "",
	"buy_order_date": "",
	"buy_bid": "",
	"buy_fill_date": "",
	"buy_fill": "",
	"buy_comission": "",
	"sell_order_id": "",
	"sell_order_date": "",
	"sell_bid": "",
	"sell_fill_date": "",
	"sell_fill": "",
	"sell_comission": ""
    },
	{"id": "2",
    "name": "Lac Inc",
    "symbol": "LAC",
    "market": "NYX",
    "classtype": "us_equity",
    "order_type": "limit",
	"order_stage":"",
    "quantity": "",
    "order_duration": "7",
    "buy_order_id": "",
	"buy_order_date": "",
	"buy_bid": "",
	"buy_fill_date": "",
	"buy_fill": "",
	"buy_comission": "",
	"sell_order_id": "",
	"sell_order_date": "",
	"sell_bid": "",
	"sell_fill_date": "",
	"sell_fill": "",
	"sell_comission": ""
    },
	{"id": "3",
    "name": "Spotify Inc",
    "symbol": "SPOT",
    "market": "NYX",
    "classtype": "us_equity",
    "order_type": "limit",
	"order_stage":"",
    "quantity": "",
    "order_duration": "7",
    "buy_order_id": "",
	"buy_order_date": "",
	"buy_bid": "",
	"buy_fill_date": "",
	"buy_fill": "",
	"buy_comission": "",
	"sell_order_id": "",
	"sell_order_date": "",
	"sell_bid": "",
	"sell_fill_date": "",
	"sell_fill": "",
	"sell_comission": ""
    },
	{"id": "4",
    "name": "Zoom Inc",
    "symbol": "ZM",
    "market": "NYX",
    "classtype": "us_equity",
    "order_type": "limit",
	"order_stage":"",
    "quantity": "",
    "order_duration": "7",
    "buy_order_id": "",
	"buy_order_date": "",
	"buy_bid": "",
	"buy_fill_date": "",
	"buy_fill": "",
	"buy_comission": "",
	"sell_order_id": "",
	"sell_order_date": "",
	"sell_bid": "",
	"sell_fill_date": "",
	"sell_fill": "",
	"sell_comission": ""
    }	
]
};
	localStorage.setItem('portfolio', JSON.stringify(portfolio));

}


function listPortfolio() {
  var restoredportfolio = JSON.parse(localStorage.getItem('portfolio'));
  var outputs = "";
  for(var i = 0; i < restoredportfolio.assets.length; i++)
  {
  outputs += '<div id="'+ restoredportfolio.assets[i].id + '">' + restoredportfolio.assets[i].id +':'+restoredportfolio.assets[i].name +':' + restoredportfolio.assets[i].quantity + ':' + restoredportfolio.assets[i].buy_bid + '</div>';
  }
  document.getElementById("demo").innerHTML= outputs;
}




function addStockPortfolio() {


	
var newline =  {id:"99" , name:"Google", symbol:"GOOGL", market:"NYX", classtype:"us_equity", order_type:"limit", order_stage:"", quantity:"10", order_duration:"7", buy_order_id:"", buy_order_date:"", buy_bid:"", buy_fill_date:"", buy_fill:"", buy_comission:"", sell_order_id:"", sell_order_date:"", sell_bid:"", sell_fill_date: "", sell_fill:"", sell_comission: ""};
	
var myportfolio = JSON.parse(localStorage.getItem('portfolio'));
  
   myportfolio['assets'].push(newline);
 
   localStorage.setItem('portfolio', JSON.stringify(myportfolio));
  }

