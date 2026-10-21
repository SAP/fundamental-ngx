import { spawnSync } from 'node:child_process';
import { readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const testDirectory = dirname(fileURLToPath(import.meta.url));
const testFiles = readdirSync(testDirectory)
    .filter((fileName) => fileName.endsWith('.test.js') && fileName !== 'TEMPLATE.test.js')
    .sort();

for (const testFile of testFiles) {
    console.log(`Running ${testFile}`);

    const result = spawnSync(process.execPath, [join(testDirectory, testFile)], { stdio: 'inherit' });

    if (result.error) {
        throw result.error;
    }

    if (result.status !== 0) {
        process.exit(result.status ?? 1);
    }
}
