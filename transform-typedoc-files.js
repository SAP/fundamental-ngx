const { resolve } = require('path');
const exists = require('fs').existsSync;
const fs = require('fs').promises;

const typedocDir = './apps/docs/src/assets/typedoc';

if (!exists(typedocDir)) {
    console.log("Typedocs folder doesn't exist.\r\n");
    return;
}

async function* getFiles(dir) {
    const items = await fs.readdir(dir, { withFileTypes: true });
    for (const item of items) {
        const res = resolve(dir, item.name);
        if (item.isDirectory()) {
            yield* getFiles(res);
        } else {
            yield res;
        }
    }
}

(async () => {
    for await (const f of getFiles(typedocDir)) {
        await fs.rename(f, f.toLocaleLowerCase());
    }
})();

require('fs').rmdirSync(typedocDir, { recursive: true });
