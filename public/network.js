'use strict';
(() => {
  const esc=v=>String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const catalog=window.HEX_NETWORK;
  function topology(){return `<ol class="net-topology" aria-label="Client to router to server, across two private networks"><li><strong>Client</strong><code>10.10.0.10/24</code><small>client-lan</small></li><li class="net-hop" aria-hidden="true">→</li><li><strong>Router</strong><code>10.10.0.1/24<br>10.20.0.1/24</code><small>Both networks</small></li><li class="net-hop" aria-hidden="true">→</li><li><strong>Server</strong><code>10.20.0.10/24</code><small>server-lan</small></li></ol>`;}
  const count=()=>catalog.preparationKeys.filter(k=>window.HEX_NETWORK_PROGRESS?.passed(k)).length;
  function phaseTag(phase){return `<span class="net-phase" data-network-phase="${phase}">${phase.toUpperCase()}</span>`;}
  function rhythm(){return `<ol class="net-rhythm" aria-label="Network learning phases">${catalog.phases.map(phase=>`<li>${phaseTag(phase)}</li>`).join('')}</ol>`;}
  function nextRoute(){
    if(count()===catalog.preparationKeys.length)return '#network/0/workshop';
    const id=catalog.lessonOrder.find(id=>!window.HEX_NETWORK_PROGRESS?.passed('net:0:read:'+id));
    return id===undefined?'#network/0/review':'#network/0/lesson/'+id;
  }
  function catalogPage(root){
    root.innerHTML=`<div class="net-page"><header class="course-heading"><span class="eyebrow">NETWORK SECURITY</span><h1>Build it. Trace it. Defend it.</h1><p>IP-based protocols and the services you build on them. Use Python, Scapy, and disposable networks to explain what happens on the wire.</p></header><div class="net-scope"><p><strong>This path:</strong> Ethernet, IP, UDP, TCP, DNS, HTTP, TLS, firewalls, tunnels, and Internet routing.</p><p><strong>Wireless Security is a separate planned path:</strong> Wi-Fi/WPA, Bluetooth/BLE, and cellular. Web application vulnerabilities belong in Web Security.</p></div><ol class="net-module-list" start="0">${catalog.modules.map(m=>`<li><a href="#network/${m.id}" class="net-module-link"><span class="net-number">${String(m.id).padStart(2,'0')}</span><div><h2>${esc(m.title)}</h2><p>${esc(m.summary)}</p><small>Badge goal: ${esc(m.badge)}</small></div><span class="net-state">${m.available?'Preparation available':'Planned'}</span></a></li>`).join('')}</ol></div>`;
  }
  function overview(root,m){
    const signed=!!window.CIPHER_ACCOUNT;
    const start=signed?nextRoute():window.CAMP_AUTH.signInPath(location.pathname+location.search+'#network/0/lesson/foundations');
    root.innerHTML=`<div class="net-page"><a class="back-link" href="#network">Network Security modules</a><header class="course-heading"><span class="eyebrow">NETWORK SECURITY · MODULE ${m.id}</span><h1>${esc(m.title)}</h1><p>${esc(m.summary)}</p></header>${m.available?`<div class="net-status"><strong>Preparation available · Hosted VM labs not yet available</strong><p>Read the foundations, complete the knowledge checks, and download the lab kit for a disposable VM. This site does not execute shell commands or provision a network lab yet.</p></div>${topology()}<div class="net-overview-grid"><section><h2>What you’ll learn</h2>${rhythm()}<ul><li>Explain hosts, links, packets, protocols, and LANs.</li><li>Distinguish a VM boundary from a container namespace.</li><li>Build an image and connect containers with Docker Compose.</li><li>Read interfaces and routes; forward traffic between two LANs.</li><li>Capture ICMP and inspect it with Scapy.</li><li>Diagnose a missing return route and check isolation limits.</li></ul><p>Prerequisites: basic Python and a Linux shell. Allow roughly 2–3 hours for preparation and VM practice.</p><div class="button-row"><a class="btn primary" data-network-start href="${esc(start)}" ${signed?'':'target="_top"'}>${signed?(count()===catalog.preparationKeys.length?'Open VM workshop':count()?'Continue preparation':'Start preparation'):'Sign in to start'}</a>${signed?(count()===catalog.preparationKeys.length?'<a class="btn" href="#network/0/lesson/foundations">Review the lessons</a>':'<a class="btn" href="#network/0/workshop">Open VM workshop</a>'):''}</div>${signed?`<p class="net-progress-text">${count()} / ${catalog.preparationKeys.length} preparation steps saved to your account.</p>`:''}</section><aside class="net-badge"><span class="eyebrow">MASTERY BADGE</span><h2>Lab Architect</h2><p>${esc(m.requirement)}</p><strong>Not yet earnable</strong><p>Reading checks show preparation, not lab mastery. The badge stays locked until a trusted lab verifier is available.</p></aside></div>`:`<div class="net-status"><strong>Planned module</strong><p>This module’s lessons and labs are being developed. Start with Module 0’s preparation while the path grows.</p><a class="btn" href="#network/0">Open Network Lab Foundations</a></div><section class="net-badge"><span class="eyebrow">PLANNED MASTERY BADGE</span><h2>${esc(m.badge)}</h2><p>${esc(m.requirement)}</p><strong>Not yet earnable</strong></section>`}</div>`;
  }
  function render(root,parts){
    const m=catalog.modules.find(m=>String(m.id)===parts[1]);
    if(parts[1]&&!m){root.innerHTML='<div class="net-page"><h1>Module not found.</h1><a class="btn" href="#network">Back to Network Security</a></div>';return;}
    if(!m)return catalogPage(root);
    if(m.id===0&&parts[2]&&window.CIPHER_ACCOUNT&&window.HEX_NETWORK_LESSONS)return window.HEX_NETWORK_LESSONS.render(root,parts);
    overview(root,m);
  }
  window.HEX_NETWORK_UI={render,topology,nextRoute,phaseTag,rhythm};
})();
