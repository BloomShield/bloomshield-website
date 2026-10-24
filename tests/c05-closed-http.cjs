// Run against `next start admin` on port 3111, even with preview opt-in true.
const assert = require('node:assert/strict');
(async () => {
  for (const path of ['/', '/api/applicants', '/00000000-0000-4000-8000-000000000001']) {
    for (const method of ['GET', 'POST']) {
      const response = await fetch(`http://127.0.0.1:3111${path}`, { method });
      assert.equal(response.status, 404, `${method} ${path}`);
      assert.equal(response.headers.get('cache-control'), 'no-store');
      assert.equal(response.headers.get('x-robots-tag'), 'noindex, nofollow');
      assert.equal(await response.text(), 'Workspace unavailable');
    }
  }
  console.log('Six production-mode requests denied before rendering. No dashboard or record data returned.');
})().catch(error => { console.error(error.message); process.exitCode = 1; });
