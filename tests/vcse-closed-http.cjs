const assert=require('node:assert/strict');
(async()=>{
const base='http://127.0.0.1:3104';
const page=await fetch(base+'/research/vcse-digital-workspace');assert.equal(page.status,200);const html=await page.text();
assert.match(html,/Preparation preview: expressions of interest are not open yet/);assert.match(html,/<fieldset disabled=""/);assert.match(html,/name="robots" content="noindex, nofollow"/);
const privacy=await fetch(base+'/research/vcse-digital-workspace/privacy');assert.equal(privacy.status,200);assert.match(await privacy.text(),/name="robots" content="noindex, nofollow"/);
const eoi=await fetch(base+'/api/vcse-eoi',{method:'POST',headers:{origin:base,'content-type':'application/json'},body:'{}'});assert.equal(eoi.status,503);
assert.equal((await fetch(base+'/api/vcse-eoi/retry',{method:'POST'})).status,401);
assert.equal((await fetch(base+'/api/vcse-eoi')).status,405);
const research=await (await fetch(base+'/research-innovation')).text();assert.ok(!research.includes('href="/research/vcse-digital-workspace"'));
const sitemap=await (await fetch(base+'/sitemap.xml')).text();assert.ok(!sitemap.includes('/research/vcse-digital-workspace'));
console.log('Closed-state HTTP checks passed: pages 200/noindex, disabled form, submissions 503, retry 401, record lookup 405, Research listing and sitemap hidden.');
})().catch(error=>{console.error(error);process.exitCode=1;});
