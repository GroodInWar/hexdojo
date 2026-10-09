import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const html=fs.readFileSync('public/index.html','utf8');
for(const [,asset] of html.matchAll(/(?:src|href)="([^"#]+\.(?:js|css|svg))"/g))assert.ok(fs.existsSync('public/'+asset),asset);
for(const file of fs.readdirSync('public').filter(f=>f.endsWith('.js')))new vm.Script(fs.readFileSync('public/'+file,'utf8'));
const context=vm.createContext({window:{},URL});
vm.runInContext(fs.readFileSync('public/community.js','utf8'),context);
const app=context.window.HEX_COMMUNITY,root={innerHTML:''};
for(const page of ['community','support']){app.render(root,page);assert.match(root.innerHTML,/<h1>/);assert.doesNotMatch(root.innerHTML,/href="(?:null|undefined|https:\/\/github.com\/sponsors)"/);}
assert.equal(app.githubURL('https://github.com.evil.test/sponsors/GroodInWar','sponsors'),null);
assert.equal(app.githubURL('javascript:alert(1)','repo'),null);
assert.equal(app.githubURL('https://github.com/sponsors/GroodInWar','sponsors'),'https://github.com/sponsors/GroodInWar');
console.log('PASS visitor asset references, JavaScript syntax, community/support states, destination validation');
