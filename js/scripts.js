const getTokenParameter = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const token = urlParams.get('code');
  console.log(token);
  window.sessionStorage.setItem('Token', token);
};
