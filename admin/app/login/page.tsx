"use client";
import { useState } from "react";
import Link from "next/link";
import { createAuthClient } from "better-auth/react";
import { twoFactorClient } from "better-auth/client/plugins";
const client=createAuthClient({plugins:[twoFactorClient()]});
export default function Login() {
  const [message,setMessage]=useState(""); const [uri,setUri]=useState(""); const [codes,setCodes]=useState<string[]>([]);
  return <main id="main" className="auth-page panel"><h1>BloomShield CIC dashboard</h1><p>Invitation-only staging access. Use your individual email and password.</p>
    <form onSubmit={async e=>{e.preventDefault();const data=new FormData(e.currentTarget);setMessage("Working…");const result=await client.signIn.email({email:String(data.get("email")),password:String(data.get("password"))});setMessage(result.error?"Sign-in unsuccessful. Check your credentials or try later.":"Continue with your authenticator code if requested, or open the dashboard.");if(result.data && !("twoFactorRedirect" in result.data))location.href="/";}}>
      <label>Email<input name="email" type="email" autoComplete="username" required/></label><label>Password<input name="password" type="password" autoComplete="current-password" required/></label><button>Sign in</button>
    </form>
    <form onSubmit={async e=>{e.preventDefault();const data=new FormData(e.currentTarget);await client.requestPasswordReset({email:String(data.get("email")),redirectTo:`${location.origin}/login`});setMessage("If an invited account exists, a password link will be sent. Check your email.");}}><label>Reset / invitation email<input name="email" type="email" required/></label><button>Send password link</button></form>
    <form onSubmit={async e=>{e.preventDefault();const data=new FormData(e.currentTarget);const result=await client.resetPassword({newPassword:String(data.get("password")),token:new URLSearchParams(location.search).get("token") ?? ""});setMessage(result.error?"Link expired, already used, or password refused.":"Password saved. Sign in above.");}}><label>New password (15–128 characters)<input name="password" type="password" autoComplete="new-password" minLength={15} maxLength={128} required/></label><button>Set password from email link</button></form>
    <h2>Administrator MFA</h2><p>Before accessing records, administrators must enrol an authenticator and confirm a code. Save backup codes privately.</p>
    <form onSubmit={async e=>{e.preventDefault();const data=new FormData(e.currentTarget);const result=await client.twoFactor.enable({password:String(data.get("password"))});if(result.data && result.data.method === "totp"){setUri(result.data.totpURI);setCodes(result.data.backupCodes);}setMessage(result.error?"MFA setup unavailable. Sign in first.":"Add the setup URI to your authenticator, then verify a code below.");}}><label>Current password<input name="password" type="password" autoComplete="current-password" required/></label><button>Set up authenticator</button></form>
    {uri&&<><p>Authenticator setup URI (secret): <code style={{overflowWrap:"anywhere"}}>{uri}</code></p><p>Backup codes: {codes.join(" · ")}</p></>}
    <form onSubmit={async e=>{e.preventDefault();const data=new FormData(e.currentTarget);const result=await client.twoFactor.verifyTotp({code:String(data.get("code")),trustDevice:false});if(!result.error)location.href="/";else setMessage("Code refused or expired.");}}><label>Authenticator code<input name="code" inputMode="numeric" autoComplete="one-time-code" required/></label><button>Verify code</button></form>
    <form onSubmit={async e=>{e.preventDefault();const data=new FormData(e.currentTarget);const result=await client.twoFactor.verifyBackupCode({code:String(data.get("code")),trustDevice:false});if(!result.error)location.href="/";else setMessage("Backup code refused.");}}><label>Recovery backup code<input name="code" autoComplete="off" required/></label><button>Use backup code</button></form>
    <p role="status">{message}</p><Link href="/">Open dashboard</Link>
  </main>;
}
