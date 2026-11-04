const {test} = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const source = fs.readFileSync(path.join(__dirname, 'app.js'), 'utf8').split('let state,storageOK=true')[0];
const sandbox = {structuredClone, crypto:require('node:crypto').webcrypto};
vm.createContext(sandbox);
vm.runInContext(source+';this.api={seed,validate,mergeWorkspace,demoGithub};',sandbox);
const {seed,validate,mergeWorkspace,demoGithub}=sandbox.api;

test('new demo and old version 1 backups remain importable',()=>{
 const current=seed();assert.equal(validate(current),current);
 delete current.github;delete current.watchlist;assert.equal(validate(current),current);
});
test('refresh updates source data and preserves browser work without mutating inputs',()=>{
 const current=seed(),incoming=seed();current.mode='private';incoming.mode='private';
 current.tasks[0].title='Keep my task';current.products[0].focus=true;
 current.reviews=[{week:'2026-11-02',wins:'A result',lessons:'A lesson',next:'Next step'}];
 current.watchlist=['example/northstar'];current.decisions[0].status='decided';
 incoming.products[0].description='New source description';incoming.products.forEach(p=>p.focus=false);
 incoming.github.fetched_at='2026-11-04T12:00:00Z';
 const before=JSON.stringify(current),incomingBefore=JSON.stringify(incoming);
 const result=mergeWorkspace(current,incoming);
 assert.equal(result.tasks[0].title,'Keep my task');assert.equal(result.products[0].focus,true);
 assert.equal(result.products[0].description,'New source description');
 assert.equal(result.reviews[0].wins,'A result');assert.equal(result.decisions[0].status,'decided');
 assert.equal(result.watchlist[0],'example/northstar');assert.equal(result.github.fetched_at,'2026-11-04T12:00:00Z');
 assert.equal(JSON.stringify(current),before);assert.equal(JSON.stringify(incoming),incomingBefore);
});
test('refresh retains products referenced by existing tasks and previous GitHub snapshot',()=>{
 const current=seed(),incoming=seed();incoming.products=[];incoming.tasks=[];delete incoming.github;
 const result=mergeWorkspace(current,incoming);assert.equal(result.products.length,3);
 assert.equal(result.github.owner,'example');assert.equal(result.tasks.length,current.tasks.length);
});
test('dangerous repository links and cross-owner IDs are rejected',()=>{
 const data=seed();data.github.repositories[0].url='javascript:alert(1)';assert.throws(()=>validate(data),/GitHub/);
 const second=seed();second.github.repositories[0].id='another/repo';assert.throws(()=>validate(second),/GitHub/);
});
test('invalid task dates and more than three focus products are rejected',()=>{
 const data=seed();data.tasks[0].due='2026-02-30';assert.throws(()=>validate(data),/taken/);
 const focus=seed();focus.products.forEach(p=>p.focus=true);focus.products.push({...focus.products[0],id:'fourth'});
 assert.throws(()=>validate(focus),/focusproducten/);
});
test('GitHub validation rejects duplicates, unbounded counts and unknown categories',()=>{
 const duplicate=seed();duplicate.github.repositories.push({...duplicate.github.repositories[0]});assert.throws(()=>validate(duplicate),/repositories/);
 const counts=seed();counts.github.summary.total=5001;assert.throws(()=>validate(counts),/tellingen/);
 const category=seed();category.github.repositories[0].category='untrusted';assert.throws(()=>validate(category),/repositories/);
});
