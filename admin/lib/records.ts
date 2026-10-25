import { database } from "./db";
import { Denied, principal } from "./access";
import { update, researchFields, wtpFields, type Entry, type Management } from "./model";
export async function records(headers: Headers) {
  const actor = await principal(headers);
  // Scope is applied in SQL, before any search, pagination or reporting.
  const { rows } = await database().query(`SELECT e.*, m.data AS management, m.version,
    m.reviewer_id,
    (SELECT coalesce(jsonb_agg(jsonb_build_object('at',a.at,'actor',a.actor,'changes',a.fields) ORDER BY a.id),'[]') FROM admin_audit a WHERE a.application_id=e.id) AS history,
    (SELECT coalesce(jsonb_agg(d.status),'[]') FROM vcse_eoi_delivery d WHERE d.application_id=e.id) AS delivery
    FROM vcse_eoi e JOIN admin_management m ON m.application_id=e.id
    WHERE $1='Administrator' OR m.reviewer_id=$2 ORDER BY e.created_at DESC`, [actor.role, actor.id]);
  const entries: (Entry & {version:number})[] = rows.map(r => ({ version:r.version, source: {
    id:r.id, country:r.country, route:r.enquiry_route, createdAt:new Date(r.created_at).toISOString(),
    submittedAt:r.submitted_at ? new Date(r.submitted_at).toISOString():null, schema:r.answer_schema_version,
    payload:r.payload, readiness:r.discovery_readiness_code, approver:r.expenditure_approver_code,
    timing:r.implementation_timing_code, funding:r.enquiry_route==='international_interest'?r.international_paid_discussion_code:r.uk_funding_code,
    declarations:{selectionAcknowledged:r.selection_acknowledged,purchaseBoundaryAcknowledged:r.purchase_boundary_acknowledged,privacyAcknowledged:r.privacy_acknowledged,offerVersion:r.offer_version,privacyNoticeVersion:r.privacy_notice_version,declarationSetVersion:r.declaration_set_version,snapshot:r.declaration_snapshot}, delivery:r.delivery,
  }, management:{...r.management,reviewer:r.reviewer_id ?? "",history:r.history} }));
  const reviewers=actor.role==='Administrator'?(await database().query("SELECT user_id FROM admin_access WHERE active=true ORDER BY user_id")).rows.map(r=>r.user_id):[actor.id];
  return {actor,entries,reviewers};
}
export async function saveRecord(headers: Headers, id: string, next: Management, version: number) {
  if (!/^[0-9a-f-]{36}$/i.test(id) || !Number.isInteger(version)) throw new Denied(404);
  const actor = await principal(headers);
  const client = await database().connect();
  try {
    await client.query("BEGIN");
    const {rows} = await client.query("SELECT * FROM admin_management WHERE application_id=$1 AND ($2='Administrator' OR reviewer_id=$3) FOR UPDATE",[id,actor.role,actor.id]);
    const row=rows[0]; if(!row) throw new Denied(404);
    if(row.version!==version) throw new Denied(409);
    if (!next || !Array.isArray(next.history) || typeof next.reviewer!=="string" || typeof next.nextAction!=="string" || typeof next.notes!=="string" || typeof next.due!=="string" || !next.research || !next.wtp) throw new Denied(400);
    if(Array.isArray(next.research)||Array.isArray(next.wtp)||typeof next.research!=="object"||typeof next.wtp!=="object"||Object.keys(next.research).some(k=>!researchFields.includes(k))||Object.keys(next.wtp).some(k=>!wtpFields.includes(k))) throw new Denied(400);
    const entry={source:{id},management:{...row.data,reviewer:row.reviewer_id ?? "",history:[]}} as Entry;
    const sanitized=Object.fromEntries(["status","classification","reviewer","nextAction","due","notes","research","wtp"].map(key=>[key,next[key as keyof Management]])) as Management;
    const changed=update(entry,{...sanitized,history:[]},actor.role,actor.id,new Date().toISOString());
    const fields=changed.management.history.at(-1)?.changes ?? [];
    if(next.reviewer) {
      const reviewer=await client.query("SELECT 1 FROM admin_access WHERE user_id=$1 AND active=true",[next.reviewer]);
      if(!reviewer.rowCount) throw new Denied(400);
    }
    await client.query("UPDATE admin_management SET data=$1, reviewer_id=$2,version=version+1 WHERE application_id=$3",[JSON.stringify({...changed.management,history:[]}),next.reviewer||null,id]);
    await client.query("INSERT INTO admin_audit(actor,action,application_id,fields) VALUES($1,'management.update',$2,$3)",[actor.id,id,JSON.stringify(fields)]);
    await client.query("COMMIT");
  } catch(error) { await client.query("ROLLBACK"); throw error; } finally {client.release();}
}
