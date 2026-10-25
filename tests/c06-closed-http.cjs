const assert=require('node:assert/strict');
(async()=>{
 let count=0;
 for(const path of ['/','/login','/staff','/api/records','/api/users','/api/auth/sign-in/email','/api/auth/sign-up/email','/api/auth/request-password-reset'])for(const method of ['GET','POST']){
  const response=await fetch('http://127.0.0.1:3111'+path,{method});assert.equal(response.status,404);assert.equal(response.headers.get('cache-control'),'no-store');assert.equal(await response.text(),'Workspace unavailable');count++;
 }
 console.log(count+' production admin/account/API requests denied before rendering.');
})().catch(()=>{console.error('Production closed-state check failed');process.exitCode=1;});
