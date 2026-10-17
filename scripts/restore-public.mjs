import { cp, mkdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
const kit = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const files = JSON.parse(await readFile(path.join(kit, "source-assets.json"), "utf8"));
for (const name of files) {
  const destination = path.join(kit, "source/public", name);
  await mkdir(path.dirname(destination), { recursive: true });
  await cp(path.join(kit, "deploy", name), destination);
}
console.log("Restored shared assets to source/public.");
