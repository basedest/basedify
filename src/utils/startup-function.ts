import { initializeDb } from "@/src/db/db-module";

export async function startupFunction() {
  await initializeDb();
  console.debug('after initializeDb');
}