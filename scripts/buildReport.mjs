import { readdir, stat } from "node:fs/promises";
import { extname, join, relative } from "node:path";

const DIST_DIRECTORY = "dist";

const includedExtensions = new Set([".js", ".css"]);

async function getBuildFiles(directory) {
  const entries = await readdir(directory, {
    withFileTypes: true,
  });

  const files = [];

  for (const entry of entries) {
    const filePath = join(directory, entry.name);

    if (entry.isDirectory()) {
      files.push(...(await getBuildFiles(filePath)));

      continue;
    }

    if (includedExtensions.has(extname(entry.name))) {
      files.push(filePath);
    }
  }

  return files;
}

function formatKilobytes(bytes) {
  return `${(bytes / 1024).toFixed(2)} kB`;
}

async function createBuildReport() {
  try {
    const files = await getBuildFiles(DIST_DIRECTORY);

    const report = await Promise.all(
      files.map(async (filePath) => {
        const fileStats = await stat(filePath);

        return {
          file: relative(DIST_DIRECTORY, filePath),
          bytes: fileStats.size,
        };
      }),
    );

    report.sort((first, second) => second.bytes - first.bytes);

    console.log("\nTaskFlow build\n");

    for (const { file, bytes } of report) {
      console.log(`${formatKilobytes(bytes).padStart(10)}  ${file}`);
    }
  } catch (error) {
    if (error instanceof Error && "code" in error && error.code === "ENOENT") {
      console.error("No existe dist/. Ejecuta primero npm run build.");

      process.exitCode = 1;

      return;
    }

    throw error;
  }
}

await createBuildReport();
