const getTokenParameter = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const oauthCode = urlParams.get('code');
  const oauthEndPoint = 'https://login.questrade.com/oauth2/token?client_id=q2bPAJ7jLyRaj71swF4Ep8cHc4wAlQ&code=' + oauthCode + '&grant_type=authorization_code&redirect_uri=https://joreiyo-org.github.io/qtrade/callback.html';
  
  fetch(oauthEndPoint,
	{method: 'POST',
		headers: {'Access-Control-Allow-Origin' : 'https://joreiyo-org.github.io'} 
	}
)
  .then((response) => response.json())
  .then((data) => window.sessionStorage.setItem('accessToken', data.access_token));	
};
