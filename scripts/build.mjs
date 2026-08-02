import { spawn } from "node:child_process";
import { rm } from "node:fs/promises";
import { resolve } from "node:path";

process.env.ASTRO_TELEMETRY_DISABLED ??= "1";

function run(scriptPath, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(process.execPath, [scriptPath, ...args], {
      env: process.env,
      stdio: "inherit"
    });

    // 한 단계라도 실패하면 검색 인덱스가 잘못 생성되지 않도록 즉시 중단합니다.
    child.on("exit", (code) => {
      if (code === 0) {
        resolve();
        return;
      }

      reject(new Error(`${scriptPath} ${args.join(" ")} failed with ${code}`));
    });
  });
}

await Promise.all([
  rm(resolve("node_modules/.astro"), { force: true, recursive: true }),
  rm(resolve("dist"), { force: true, recursive: true })
]);

await run(resolve("node_modules/astro/astro.js"), ["build"]);
await run(resolve("node_modules/pagefind/lib/runner/bin.cjs"), ["--site", "dist"]);
