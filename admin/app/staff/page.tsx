"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
type User={user_id:string;email:string;role:string;active:boolean};
export default function Staff(){
 const [users,setUsers]=useState<User[]>([]);const [events,setEvents]=useState<Record<string,unknown>[]>([]);const [message,setMessage]=useState("");
 async function load(){const response=await fetch("/api/users");if(!response.ok){setMessage("Administrator access with MFA required.");return;}const data=await response.json();setUsers(data.users);setEvents(data.events);}
 useEffect(()=>{void load();},[]);
 async function post(body:unknown){const response=await fetch("/api/users",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(body)});setMessage(response.ok?"Access updated / invitation requested.":"Action refused. Check permissions, approved test mailbox and mail delivery.");if(response.ok)await load();}
 return <main id="main" className="auth-page"><Link href="/">← Dashboard</Link><h1>Staff access & audit</h1><p>Administrator only. Individual test accounts; invitation mailboxes must be approved in staging configuration.</p><p role="status">{message}</p>
 <form className="panel" onSubmit={e=>{e.preventDefault();const data=new FormData(e.currentTarget);void post({email:data.get("email"),role:data.get("role")});}}><h2>Invite staff</h2><label>Email<input type="email" name="email" required/></label><label>Role<select name="role"><option>Programme Reviewer</option><option>Administrator</option></select></label><button>Send invitation</button></form>
 {users.map(user=><form className="panel" key={user.user_id} onSubmit={e=>{e.preventDefault();const data=new FormData(e.currentTarget);void post({userId:user.user_id,role:data.get("role"),active:data.get("active")==="on"});}}><h2>{user.email}</h2><p>{user.user_id}</p><label>Role<select name="role" defaultValue={user.role}><option>Programme Reviewer</option><option>Administrator</option></select></label><label>Active<input name="active" type="checkbox" defaultChecked={user.active}/></label><button>Save access and revoke sessions</button></form>)}
 <section className="panel"><h2>Latest 100 audit events</h2><ol>{events.map(event=><li key={String(event.id)}><p>{String(event.at)} · {String(event.actor ?? "Authentication attempt")} · {String(event.action)}</p><p>{String(event.application_id ?? "")} {JSON.stringify(event.fields)}</p></li>)}</ol></section></main>;
}
