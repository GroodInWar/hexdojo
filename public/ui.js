'use strict';
(() => {
  const $=id=>document.getElementById(id),main=$('main'),menu=$('nav-toggle');
  function closeNavigation(){menu.setAttribute('aria-expanded','false');menu.textContent='Menu';}
  function focusPage(){const title=Array.from(main.querySelectorAll('h1')).find(title=>!title.closest('[hidden]'))||main;title.tabIndex=-1;title.focus({preventScroll:true});}
  function breadcrumb(items){
    const trail=$('breadcrumb');trail.replaceChildren();
    items.forEach((item,i)=>{
      if(i){const divider=document.createElement('span');divider.className='breadcrumb-divider';divider.setAttribute('aria-hidden','true');divider.textContent='/';trail.append(divider);}
      const node=document.createElement(item.href?'a':'span');node.textContent=item.label;
      if(item.href)node.href=item.href;else node.setAttribute('aria-current','page');
      trail.append(node);
    });
  }
  function moduleGroups(items,renderItem){
    const groups=[['foundations','Foundations',1,3],['symmetric','Encryption and integrity',4,8],['public-keys','Public keys and secure messages',9,12]];
    return groups.map(([id,title,from,to])=>`<section class="module-path-group" aria-labelledby="module-group-${id}"><div class="module-group-heading"><h3 id="module-group-${id}">${title}</h3><span>Modules ${from}–${to}</span></div><ol class="module-path-list" start="${from}">${items.filter(m=>m.n>=from&&m.n<=to).map(renderItem).join('')}</ol></section>`).join('');
  }
  function moduleSummary(m){
    const advanced={
      13:'Explore how one-way functions, hard-core bits, and permutations lead to pseudorandom generators.',
      14:'Work with elliptic-curve groups and compare discrete-logarithm and factoring algorithms.',
      15:'Understand quantum attacks, post-quantum key encapsulation and signatures, and hybrid designs.',
      16:'Explore Paillier encryption, threshold secret sharing, and authenticated computation.'
    };
    return advanced[m.n]||m.summary||window.CAMP?.weeks.find(w=>w.n===m.n)?.story||m.sequence;
  }
  menu.onclick=()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));menu.textContent=open?'Close menu':'Menu';};
  $('navigation').addEventListener('click',event=>{
    const link=event.target.closest('a');if(!link)return;
    closeNavigation();if(link.hash===location.hash)focusPage();
  });
  document.addEventListener('keydown',event=>{
    if(event.key!=='Escape'||menu.getAttribute('aria-expanded')!=='true'||document.querySelector('dialog[open]'))return;
    event.preventDefault();closeNavigation();menu.focus();
  });
  document.querySelector('.skip-link').onclick=event=>{event.preventDefault();main.focus({preventScroll:true});main.scrollIntoView({block:'start'});};
  function confirmRestore(filename){
    const dialog=$('restore-confirm');
    if(typeof dialog.showModal!=='function')return Promise.resolve(window.confirm('Restore this backup? This replaces your account’s progress, notes, and code.'));
    $('restore-filename').textContent=filename;
    return new Promise(resolve=>{
      function finish(accepted){dialog.removeEventListener('cancel',cancel);$('restore-cancel').onclick=null;$('restore-accept').onclick=null;dialog.close();$('restore-progress').focus();resolve(accepted);}
      function cancel(event){event.preventDefault();finish(false);}
      dialog.addEventListener('cancel',cancel);
      $('restore-cancel').onclick=()=>finish(false);$('restore-accept').onclick=()=>finish(true);
      dialog.showModal();$('restore-cancel').focus();
    });
  }
  function pathNavigation(section){
    const crypto=!['home','paths','profile','network','community','support'].includes(section);
    document.querySelector('.course-navigation').hidden=!crypto;
    document.querySelector('.network-navigation').hidden=section!=='network';
    document.body.classList.toggle('network-route',section==='network');
    document.body.classList.toggle('paths-route',section==='paths');
    document.querySelector('.book-mini').hidden=!crypto;
    document.querySelector('.side-progress').hidden=!crypto||document.body.classList.contains('visitor');
    document.getElementById('side-game').hidden=!crypto||document.body.classList.contains('visitor');
    document.querySelector('.pace-chip').hidden=!crypto;
  }
  window.CAMP_UI={pathNavigation,closeNavigation,focusPage,confirmRestore,breadcrumb,moduleGroups,moduleSummary};
})();
