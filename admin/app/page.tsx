import { notFound } from "next/navigation";
import Dashboard from "./workspace";
import { previewAllowed } from "../lib/model";
import { stagingAllowed } from "../lib/staging";
import { headers } from "next/headers";
import { records } from "../lib/records";
import { redirect } from "next/navigation";
export const dynamic = "force-dynamic";
export default async function Page() {
  if(previewAllowed(process.env)) return <Dashboard/>;
  if(!stagingAllowed()) notFound();
  try { const {actor,entries,reviewers}=await records(await headers());return <Dashboard persistent={{actor,entries,reviewers}}/>; }
  catch { redirect("/login"); }
}
