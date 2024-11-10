import { initializeDb } from "@/db-module";

export async function startupFunction() {
  await initializeDb();
  console.debug('after initializeDb');
}