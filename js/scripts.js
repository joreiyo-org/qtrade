const getTokenParameter = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const token = urlParams.get('code');
  console.log(token);
  window.sessionStorage.setItem('Token', token);

  fetch(
    'https://login.questrade.com/oauth2/token?client_id=q2bPAJ7jLyRaj71swF4Ep8cHc4wAlQ&code=7AvCOewbnRs7VaiyCL-YAOm_gkEHuhq20&grant_type=authorization_code&redirect_uri=https://joreiyo-org.github.io/qtrade/callback.html',
    { method: 'post', mode: 'no-cors' }
  )
    .then((response) => response.json())
    .then((data) => window.sessionStorage.setItem('AccesToken', token));
};
