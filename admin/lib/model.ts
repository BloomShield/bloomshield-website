import { ANSWER_SCHEMA_VERSION, questionsForRoute, type StructuredKey } from "../../lib/vcse-eoi-questions";
export const statuses = ["New","Under review","Information requested","Shortlisted","Discovery invited","Discovery scheduled","Discovery completed","Selected","Not selected","Withdrawn"] as const;
export const classifications = ["Not yet classified","Direct-pay prospect","Grant-funded prospect","Commissioner-funded opportunity","Future prospect","Not commercially suitable"] as const;
export type Role = "Administrator" | "Programme Reviewer";
export type Source = { id:string; country:string|null; route:"uk_early_adopter"|"international_interest"; createdAt:string; submittedAt:string|null; schema:string|null; payload:Record<string,unknown>; declarations:Record<string,unknown>; delivery:string[]; readiness:string|null; funding:string|null; timing:string|null; approver:string|null };
export type Management = { status:typeof statuses[number]; classification:typeof classifications[number]; reviewer:string; nextAction:string; due:string; notes:string; research:Record<string,string>; wtp:Record<string,string>; history:{at:string;actor:string;changes:string[]}[] };
export type Entry = {source:Source; management:Management};
export const researchFields = ["Workflow problems","Desired modules","Existing tools","APP-001A capability fit","Configuration needs","Potential extensions","Discovery findings","Pilot selection rationale","Product-learning observations"];
export const wtpFields = ["£2,500 standard price response","£1,250 early-adopter price response","Provisional £20/month response","Preferred payment arrangement","Budget or funding dependency","Purchasing authority","Stated willingness to pay","Validated purchasing intent","Comments","Follow-up action"];
export function previewAllowed(env:Record<string,string|undefined>) { return env.ADMIN_SYNTHETIC_PREVIEW === "true" && env.NODE_ENV !== "production" && !env.VERCEL && !env.VERCEL_ENV; }
export function canAccess(role:Role, entry:Entry, actor:string) { return role === "Administrator" || entry.management.reviewer === actor; }
export function answer(source:Source,key:StructuredKey) {
 const code = key === "participation" ? source.readiness : key === "approver" ? source.approver : key === "timing" ? source.timing : source.funding;
 if(source.schema !== ANSWER_SCHEMA_VERSION) return `Unclassified legacy answer: ${String(source.payload[key] ?? "Not recorded")}`;
 return questionsForRoute(source.route)[key].options.find(o=>o.value===code)?.label ?? "Unknown / not recorded";
}
export function update(entry:Entry, next:Management, role:Role, actor:string, at:string):Entry {
 if(!canAccess(role,entry,actor)) throw new Error("Permission denied");
 if(!statuses.includes(next.status)||!classifications.includes(next.classification))throw new Error("Invalid classification");
 if(role!=="Administrator" && (next.reviewer!==entry.management.reviewer || (next.status!==entry.management.status && (next.status==="Selected"||entry.management.status==="Selected"))))throw new Error("Administrator approval required");
 const values=[next.reviewer,next.nextAction,next.notes,...Object.values(next.wtp),...Object.values(next.research)];
 if(values.some(v=>typeof v!=="string"||v.length>4000))throw new Error("Use no more than 4,000 characters per field");
 if(next.due && (!/^\d{4}-\d{2}-\d{2}$/.test(next.due)||new Date(next.due).toISOString().slice(0,10)!==next.due))throw new Error("Invalid due date");
 const changes=(["status","classification","reviewer","nextAction","due","notes","research","wtp"] as const).filter(k=>JSON.stringify(next[k])!==JSON.stringify(entry.management[k]));
 if(!changes.length)return entry;
 return {source:entry.source,management:{...next,history:[...entry.management.history,{at,actor,changes}]}};
}
export type Filters = {search:string;country:string;route:string;readiness:string;funding:string;status:string;from:string;to:string;sort:string};
export const emptyFilters:Filters={search:"",country:"",route:"",readiness:"",funding:"",status:"",from:"",to:"",sort:"newest"};
export function filter(entries:Entry[],f:Filters){return entries.filter(({source:s,management:m})=>(!f.search||[s.payload.organisation,s.payload.contactName,s.id].join(" ").toLowerCase().includes(f.search.toLowerCase()))&&(!f.country||s.country===f.country)&&(!f.route||s.route===f.route)&&(!f.readiness||(s.schema===ANSWER_SCHEMA_VERSION&&s.readiness===f.readiness))&&(!f.funding||(s.schema===ANSWER_SCHEMA_VERSION&&s.funding===f.funding))&&(!f.status||m.status===f.status)&&(!f.from||(s.submittedAt??s.createdAt).slice(0,10)>=f.from)&&(!f.to||(s.submittedAt??s.createdAt).slice(0,10)<=f.to)).sort((a,b)=>f.sort==="organisation"?String(a.source.payload.organisation).localeCompare(String(b.source.payload.organisation)):((a.source.submittedAt??a.source.createdAt).localeCompare(b.source.submittedAt??b.source.createdAt))*(f.sort==="oldest"?1:-1));}
export function distribution(values:string[]){return values.reduce<Record<string,number>>((out,v)=>{out[v]=(out[v]??0)+1;return out;},{});}
export function report(entries:Entry[],today:string){const count=(fn:(e:Entry)=>boolean)=>entries.filter(fn).length;return {"Total EOIs":entries.length,"UK enquiries":count(e=>e.source.route==="uk_early_adopter"),"International enquiries":count(e=>e.source.route==="international_interest"),"Awaiting review":count(e=>["New","Under review","Information requested"].includes(e.management.status)),"Shortlisted":count(e=>e.management.status==="Shortlisted"),"Discovery invited":count(e=>e.management.status==="Discovery invited"),"Discovery completed":count(e=>e.management.status==="Discovery completed"),"Selected early adopters":count(e=>e.management.status==="Selected"),"Direct-pay prospects":count(e=>e.management.classification==="Direct-pay prospect"),"Funding-dependent prospects":count(e=>["Grant-funded prospect","Commissioner-funded opportunity"].includes(e.management.classification)),"Outstanding actions":count(e=>!!e.management.nextAction),"Overdue actions":count(e=>!!e.management.nextAction&&!!e.management.due&&e.management.due<today),"Email exceptions":count(e=>e.source.delivery.some(s=>!["delivered"].includes(s)))};}
