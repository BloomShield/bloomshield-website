import { notFound } from "next/navigation";
import Dashboard from "./workspace";
import { previewAllowed } from "../lib/model";
export const dynamic = "force-dynamic";
export default function Page() { if (!previewAllowed(process.env)) notFound(); return <Dashboard/>; }
