'use strict';
(() => {
  const $=id=>document.getElementById(id),main=$('main');
  const catalog=window.CAMP_MODULE_CATALOG;
  const esc=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const returnTo=hash=>location.pathname+location.search+hash;
  const studyLink=m=>window.CAMP_AUTH.signInPath(returnTo('#learn/'+m.n+'/meeting/1/1'));
  function card(m){
    return `<li class="module-row module-row-public" data-module-card="${m.n}"><a class="module-summary-link" aria-label="View summary of module ${m.n}: ${esc(m.title)}" aria-describedby="module-summary-${m.n}" href="#learn/${m.n}"><span class="module-row-number" aria-hidden="true"><span>MODULE </span><strong>${String(m.n).padStart(2,'0')}</strong></span><div class="module-row-main"><h4>${esc(m.title)}</h4><p id="module-summary-${m.n}">${esc(window.CAMP_UI.moduleSummary(m))}</p></div><span class="module-row-action" aria-hidden="true">View summary</span></a></li>`;
  }
  function modules(){
    main.innerHTML=`<div class="course-home"><header class="course-heading"><span class="eyebrow">CRYPTOGRAPHY</span><h1>Explore the modules.</h1><p>Build your understanding one idea at a time. Sign in when you’re ready to study.</p></header><div class="course-list-heading"><h2>12 core modules</h2><span>Read, experiment, code, and review.</span></div><div class="module-core-path">${window.CAMP_UI.moduleGroups(catalog.modules,card)}</div><details class="course-optional"><summary>Four optional advanced modules</summary><ol class="module-path-list" start="13" aria-label="Optional modules">${catalog.modules.filter(m=>m.optional).map(card).join('')}</ol></details></div>`;
  }
  function summary(m){
    main.innerHTML=`<div class="week-overview" data-module-summary="${m.n}"><a class="back-link" href="#learn">All modules</a><header class="course-heading"><span class="eyebrow">MODULE ${m.n}${m.optional?' · OPTIONAL':''}</span><h1>${esc(m.title)}</h1><p>${esc(window.CAMP_UI.moduleSummary(m))}</p></header><section class="week-book-card"><h2>What you’ll explore</h2><ol class="module-summary-topics">${m.topics.map(topic=>`<li>${esc(topic)}</li>`).join('')}</ol><p class="course-book-reading"><span>Book companion</span>${esc(m.read)}</p></section><div class="week-overview-foot"><a class="btn primary" data-start-module="${m.n}" aria-label="Sign in to start module ${m.n}: ${esc(m.title)}" href="${esc(studyLink(m))}" target="_top">Sign in to start</a><span class="muted">Sign in to study and save your progress.</span></div></div>`;
  }
  function publicRoute(hash){return hash==='#community'||hash==='#support'||hash==='#home'||hash===''||hash==='#paths'||hash==='#learn'||hash==='#network'||/^#network\/(?:[0-9]|1[0-5])$/.test(hash)||/^#learn\/(?:[1-9]|1[0-6])$/.test(hash);}
  function protectLinks(){
    main.querySelectorAll('a[href^="#"]').forEach(link=>{const hash=link.getAttribute('href');if(!publicRoute(hash)){link.href=window.CAMP_AUTH.signInPath(returnTo(hash));link.target='_top';}});
  }
  function route(event){
    window.CAMP_UI.closeNavigation();
    const hash=location.hash||'#home',parts=hash.slice(1).split('/');
    if(parts[0]==='journey'){parts[0]='learn';history.replaceState(null,'','#'+parts.join('/'));return route(event);}
    $('account-signin').href=window.CAMP_AUTH.signInPath();
    if(!publicRoute(hash)){
      const href=window.CAMP_AUTH.signInPath();
      main.innerHTML=`<div class="page-heading"><h1>Sign in to start learning.</h1><a class="btn primary" href="${esc(href)}" target="_top">Sign in with ChatGPT</a></div>`;
      window.CAMP_AUTH.startSignIn();return;
    }
    const community=['community','support'].includes(parts[0]),home=parts[0]==='home',network=parts[0]==='network',paths=parts[0]==='paths';window.CAMP_UI.pathNavigation(community?parts[0]:network?'network':paths?'paths':home?'home':'learn');document.body.classList.toggle('network-route',network);document.body.classList.toggle('platform-home',home);
    window.CAMP_UI.breadcrumb(community?[{label:parts[0]==='support'?'Support HexDojo':'Community'}]:paths?[{label:'Paths'}]:network?[{label:'Network Security',...(parts[1]?{href:'#network'}:{})},...(parts[1]?[{label:'Module '+parts[1]}]:[])]:home?[{label:'Home'}]:parts[1]?[{label:'Modules',href:'#learn'},{label:'Module '+parts[1]}]:[{label:'Modules'}]);
    document.querySelectorAll('[data-nav]').forEach(link=>{const active=link.dataset.nav===(community?parts[0]:paths?'paths':network?'network':home?'home':'learn');link.classList.toggle('active',active);if(active)link.setAttribute('aria-current','page');else link.removeAttribute('aria-current');});
    if(community)window.HEX_COMMUNITY.render(main,parts[0]);else if(paths)window.HEX_PATHS.render(main);else if(network)window.HEX_NETWORK_UI.render(main,parts);else if(home)window.CAMP_HOME.render(main);else if(parts[1])summary(catalog.modules.find(m=>m.n===Number(parts[1])));else modules();
    protectLinks();window.scrollTo(0,0);
    if(event?.type==='hashchange')window.CAMP_UI.focusPage();
  }
  document.body.classList.add('visitor');
  document.querySelectorAll('.course-navigation > a').forEach(link=>link.hidden=link.dataset.nav!=='learn');
  for(const selector of ['#nav-tools','#side-game','.side-progress','#top-xp','#sync-status'])document.querySelector(selector).hidden=true;
  $('account-label').textContent='Sign in';$('storage-status').textContent='Sign in to start learning.';
  $('account-toggle').onclick=()=>window.CAMP_AUTH.startSignIn();
  window.CAMP_THEME.init();window.addEventListener('hashchange',route);route();
  window.CAMP_APP_READY=Promise.resolve();
})();
