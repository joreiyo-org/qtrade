const getTokenParameter = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const oauthCode = urlParams.get('code');
  const oauthEndPoint = 'https://login.questrade.com/oauth2/token?client_id=q2bPAJ7jLyRaj71swF4Ep8cHc4wAlQ&code=' + oauthCode + '&grant_type=authorization_code&redirect_uri=https://joreiyo-org.github.io/qtrade/callback.html';

  
 fetch(oauthEndPoint, {method: 'POST'} )
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
			
		window.sessionStorage.setItem('accessToken', data.access_token);
		window.sessionStorage.setItem('tokenType', data.token_type);
		window.sessionStorage.setItem('expiresIn', data.expires_in);
		window.sessionStorage.setItem('refreshToken', data.refresh_token);
		window.sessionStorage.setItem('apiServer', data.api_server);

      });
    }
  )
  .catch(function(err) {
    console.log('Fetch Error :-S', err);
  });
}
 

 
  //fetch('https://login.questrade.com/oauth2/token?client_id=q2bPAJ7jLyRaj71swF4Ep8cHc4wAlQ&code=7AvCOewbnRs7VaiyCL-YAOm_gkEHuhq20&grant_type=authorization_code&redirect_uri=https://joreiyo-org.github.io/qtrade/callback.html',   
  //  { method: 'post'}
 // )
  //  .then((response) => response.json())
  //  .then((data) => window.sessionStorage.setItem('AccesToken', token));
//};
