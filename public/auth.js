'use strict';
(() => {
  function signInPath(returnTo=location.pathname+location.search+location.hash){
    if(!returnTo.startsWith('/')||returnTo.startsWith('//'))returnTo='/';
    return '/signin-with-chatgpt?return_to='+encodeURIComponent(returnTo);
  }
  function startSignIn(returnTo){
    const link=document.getElementById('account-signin');
    link.href=signInPath(returnTo);link.target='_top';link.click();
  }
  window.CAMP_AUTH={signInPath,startSignIn};
})();
