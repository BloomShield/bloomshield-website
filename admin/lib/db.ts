import { Pool } from "pg";
import { stagingAllowed } from "./staging";
let pool: Pool | undefined;
export function database() {
  if (!stagingAllowed()) throw new Error("Staging unavailable");
  return pool ??= new Pool({ connectionString: process.env.ADMIN_DATABASE_URL, max: 3 });
}
