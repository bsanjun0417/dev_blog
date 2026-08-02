import { spawn } from "node:child_process";
import { resolve } from "node:path";

process.env.ASTRO_TELEMETRY_DISABLED ??= "1";

const astroCli = resolve("node_modules/astro/astro.js");
const args = process.argv.slice(2);

// npm script 인자를 그대로 Astro CLI에 넘겨 dev/preview 옵션을 유지합니다.
const child = spawn(process.execPath, [astroCli, ...args], {
  env: process.env,
  stdio: "inherit"
});

child.on("exit", (code) => {
  process.exit(code ?? 1);
});
