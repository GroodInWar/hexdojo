'use strict';
(() => {
  const esc=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  function refresh(root=document){
    if(!root.querySelector('[data-platform-home]'))return;
    const first=window.CAMP_MODULE_CATALOG?.modules[0];
    const next=window.CAMP_READER?.resume()||{week:first.n,title:first.title,topic:first.summary,href:'#learn/'+first.n+'/meeting/1/1',started:false,complete:false,progress:{done:0,total:1,percent:0}};
    const returning=!!window.CIPHER_ACCOUNT&&next.started;
    root.querySelector('[data-home-intro]').hidden=returning;
    root.querySelector('[data-home-resume]').hidden=!returning;
    root.querySelector('[data-platform-home]').classList.toggle('home-returning',returning);
    root.querySelector('#home-resume-title').textContent=next.complete?'Your cryptography path is complete.':'Continue learning.';
    root.querySelectorAll('[data-home-continue]').forEach(a=>{
      a.href=next.href;
      if(!window.CIPHER_ACCOUNT){a.href=window.CAMP_AUTH.signInPath(location.pathname+location.search+next.href);a.target='_top';}
      a.textContent=window.CIPHER_ACCOUNT?(next.complete?'Revisit cryptography':next.started?'Continue learning':'Start learning'):'Sign in to start';
    });
    root.querySelectorAll('[data-home-next-title]').forEach(el=>el.textContent=next.complete?'You completed the learning path.':'Module '+next.week+' · '+next.title);
    root.querySelectorAll('[data-home-next-topic]').forEach(el=>el.textContent=next.complete?'Revisit a lesson or try an experiment again.':next.topic);
    root.querySelectorAll('[data-home-progress]').forEach(el=>{el.hidden=!next.started;el.querySelector('progress').value=next.progress.done;el.querySelector('progress').max=next.progress.total;});
    root.querySelectorAll('[data-home-progress-label]').forEach(el=>el.textContent=next.progress.percent+'% of the course complete');
    root.querySelectorAll('[data-home-next-label]').forEach(el=>el.textContent=next.complete?'READY TO REVISIT':next.started?'PICK UP WHERE YOU LEFT OFF':'YOUR FIRST STEP');
  }
  function bindDemo(root){
    const message=root.querySelector('#home-message'),shift=root.querySelector('#home-shift');
    function update(){
      const amount=Number(shift.value);
      const cipher=message.value.replace(/[a-z]/gi,char=>{
        const base=char<='Z'?65:97;
        return String.fromCharCode(base+(char.charCodeAt(0)-base+amount)%26);
      });
      root.querySelector('#home-shift-value').textContent=String(amount);
      root.querySelector('#home-ciphertext').textContent=cipher||'Enter a message above';
      root.querySelectorAll('[data-home-letter]').forEach(el=>el.textContent=String.fromCharCode(65+(Number(el.dataset.homeLetter)+amount)%26));
    }
    message.addEventListener('input',update);
    shift.addEventListener('input',update);
    update();
  }
  function render(root){
    const readings=Object.values(window.CAMP_READINGS||window.CAMP_MODULE_CATALOG.modules),core=readings.filter(m=>!m.optional).length,optional=readings.length-core;
    const python=Object.values(window.PYTHON_LESSONS||{}),pythonCount=python.length||window.CAMP_MODULE_CATALOG.pythonModules,stages=python.reduce((n,m)=>n+m.stages.length,0)||window.CAMP_MODULE_CATALOG.codingExercises;
    root.innerHTML=`<div class="platform-page" data-platform-home>
      <section class="home-resume" aria-labelledby="home-resume-title" data-home-resume hidden>
        <span class="eyebrow" data-home-next-label>PICK UP WHERE YOU LEFT OFF</span><h1 id="home-resume-title" tabindex="-1">Continue learning.</h1>
        <article class="home-resume-card"><div><span class="eyebrow">CRYPTOGRAPHY</span><h2 data-home-next-title></h2><p data-home-next-topic></p><div class="button-row"><a class="btn primary" data-home-continue href="#learn/1/meeting/1/1">Continue learning</a><a class="btn" href="#learn">All modules</a></div></div><aside class="home-resume-progress" aria-label="Course progress"><div class="home-course-progress" data-home-progress><label for="home-resume-progress" data-home-progress-label>Course progress</label><progress id="home-resume-progress" value="0" max="1"></progress></div><p>12 core modules<br>4 optional advanced modules</p></aside></article>
      </section>
      <section class="home-hero" aria-labelledby="home-title" data-home-intro>
        <div class="home-hero-copy">
          <span class="home-eyebrow"><span aria-hidden="true"></span> YOUR CYBERSECURITY LEARNING STARTS HERE</span>
          <h1 id="home-title" tabindex="-1">Understand the system.<br><span>Learn to protect it.</span></h1>
          <p>Build your cybersecurity skills one idea at a time. Read the concepts, explore them in a lab, and bring them to life with code.</p>
          <div class="home-hero-actions"><a class="btn primary" data-home-continue href="#learn/1/meeting/1/1">Start learning</a><a class="btn home-explore" href="#paths" data-home-explore>Explore the paths</a></div>
          <p class="home-first-path">First path: <a href="#learn">Cryptography</a><span aria-hidden="true"> · </span> Learn at your own pace</p>
        </div>
        <div class="home-cipher" aria-labelledby="home-demo-title">
          <div class="home-cipher-top"><span class="home-demo-dots" aria-hidden="true"><i></i><i></i><i></i></span><span>EXPERIMENT 01</span><span class="home-demo-live">LIVE</span></div>
          <div class="home-cipher-body">
            <h2 id="home-demo-title">A message. A shift. A new idea.</h2>
            <p>Try a Caesar cipher. Change the shift and watch each letter move.</p>
            <label for="home-message">YOUR MESSAGE</label><input id="home-message" type="text" value="HELLO, WORLD!" maxlength="48" autocomplete="off" spellcheck="false">
            <div class="home-shift-heading"><label for="home-shift">SHIFT</label><output id="home-shift-value" for="home-shift">3</output></div>
            <input id="home-shift" type="range" min="0" max="25" value="3">
            <div class="home-letter-map" aria-label="First seven letters before and after the shift">${Array.from({length:7},(_,i)=>`<div><span>${String.fromCharCode(65+i)}</span><span aria-hidden="true">↓</span><strong data-home-letter="${i}">${String.fromCharCode(68+i)}</strong></div>`).join('')}</div>
            <span class="home-output-label" id="home-output-label">CIPHERTEXT</span><output id="home-ciphertext" for="home-message home-shift" aria-labelledby="home-output-label" aria-live="polite">KHOOR, ZRUOG!</output>
          </div>
          <div class="home-cipher-foot"><span>A classical cipher for learning</span><a href="#lab/caesar">Open the full lab</a></div>
        </div>
      </section>

      <section class="home-paths" aria-labelledby="home-paths-title">
        <div class="home-section-heading"><div><span class="eyebrow">THE FIRST LEARNING PATH</span><h2 id="home-paths-title" tabindex="-1">Start with cryptography.</h2></div><span class="home-available"><span aria-hidden="true"></span> Available now</span></div>
        <article class="home-course">
          <div class="home-course-description"><span class="home-course-number">PATH 01 <span aria-hidden="true">/</span> CRYPTOGRAPHY</span><h3>Understand what keeps<br>information secure.</h3><p>From classical ciphers to modern encryption, authentication, and public-key cryptography. Learn how the pieces work, test their limits, and explain why they matter.</p>
            <ul class="home-course-facts" aria-label="Course contents"><li><strong>${core} + ${optional}</strong><span>core + optional modules</span></li><li><strong>14</strong><span>interactive labs</span></li><li><strong>${pythonCount}</strong><span>Python modules</span></li></ul>
            <p class="home-course-book">Book companion to Katz &amp; Lindell’s <cite>Introduction to Modern Cryptography</cite>, 3rd edition. Guided readings prepare you for the labs and ${stages} coding exercises.</p>
            <a class="btn" href="#learn">View the course</a>
          </div>
          <aside class="home-course-next" aria-labelledby="home-next-title"><span class="eyebrow" data-home-next-label>YOUR FIRST STEP</span><h3 id="home-next-title" data-home-next-title></h3><p data-home-next-topic></p><div class="home-course-progress" data-home-progress hidden><label for="home-course-progress" data-home-progress-label>Course progress</label><progress id="home-course-progress" value="0" max="1"></progress></div><a class="btn primary" data-home-continue href="#learn/1/meeting/1/1">Start learning</a><p class="home-save-note">${window.CIPHER_ACCOUNT?'Your reading progress, code, and notes save to your account.':'Sign in to start learning and save your progress.'}</p></aside>
        </article>
        <ol class="home-learning-rhythm" aria-label="How you will learn"><li><span>01</span><div><strong>Read to understand</strong><p>One concept, with worked examples.</p></div></li><li><span>02</span><div><strong>Experiment to discover</strong><p>Explore the idea in an interactive lab.</p></div></li><li><span>03</span><div><strong>Code to make it yours</strong><p>Build, check, and explain your solution.</p></div></li></ol>
      </section>

      <section class="home-course net-home-course" aria-labelledby="home-network-title"><div class="home-course-description"><span class="home-course-number">PATH 02 / NETWORK SECURITY</span><h2 id="home-network-title">Build the network.<br>Understand the traffic.</h2><p>Learn protocols with Scapy, create container networks, and build your own services. Module 0’s preparation and disposable-VM workshop are available now.</p><a class="btn" href="#network">Explore Network Security</a></div><aside class="home-course-next"><span class="eyebrow">MODULE 0</span><h3>Network Lab Foundations</h3><p>Interfaces, routes, containers, and packet capture. Hosted VM execution is under development.</p><a class="btn primary" href="#network/0">View the module</a></aside></section>
      <section class="home-community" aria-labelledby="home-community-title"><span class="eyebrow">HELP BUILD HEXDOJO</span><h2 id="home-community-title">Better lessons. Stronger code.</h2><p>Help improve the project through code review, learning feedback, and voluntary support.</p><div class="button-row"><a class="btn" href="#community">Join the community</a><a class="btn subtle" href="#support">Support HexDojo</a></div></section>
      <section class="home-future" aria-labelledby="home-future-title"><div class="home-future-intro"><span class="eyebrow">ROOM TO GROW</span><h2 id="home-future-title">More of cybersecurity.<br>One path at a time.</h2><p>Cryptography is our starting point. These learning paths are planned as HexDojo grows.</p></div><ul class="home-future-list">${[
        ['Wireless security','Wi-Fi/WPA, Bluetooth/BLE, and cellular protocol security.'],
        ['Web security','Explore how web applications handle trust and user input.'],
        ['Systems security','Learn permissions, access control, and system hardening.']
      ].map(([title,description])=>`<li><div><h3>${esc(title)}</h3><p>${esc(description)}</p></div><span class="home-planned">Planned</span></li>`).join('')}</ul></section>
    </div>`;
    if(window.CIPHER_ACCOUNT)bindDemo(root);
    else {
      root.querySelector('.home-demo-live').textContent='PREVIEW';
      root.querySelector('label[for="home-message"]').outerHTML='<span class="home-output-label">SAMPLE MESSAGE</span>';
      root.querySelector('#home-message').outerHTML='<p class="home-preview-message">HELLO, WORLD!</p>';
      root.querySelector('label[for="home-shift"]').outerHTML='<span class="home-output-label">SHIFT</span>';
      root.querySelector('#home-shift').remove();
      root.querySelector('#home-shift-value').removeAttribute('for');root.querySelector('#home-ciphertext').removeAttribute('for');
      root.querySelector('#home-demo-title').nextElementSibling.textContent='A Caesar cipher shifts each letter three places.';
      root.querySelector('.home-cipher-foot a').textContent='Sign in to open the lab';
    }
    refresh(root);
  }
  window.CAMP_HOME={render,refresh};
})();
