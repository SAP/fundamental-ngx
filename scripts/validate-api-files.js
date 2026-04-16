/**
 * Validate api-files.ts entries against actual TypeDoc JSON output.
 * Reports class names that don't exist in the TypeDoc reflection.
 */
const { readFileSync, existsSync } = require('fs');
const { join } = require('path');

const LIBS = [
    { name: 'core', apiFile: 'libs/docs/core/api-files.ts', typedocJson: 'libs/docs/typedoc/core/typedoc.json' },
    {
        name: 'platform',
        apiFile: 'libs/docs/platform/api-files.ts',
        typedocJson: 'libs/docs/typedoc/platform/typedoc.json'
    },
    { name: 'cdk', apiFile: 'libs/docs/cdk/api-files.ts', typedocJson: 'libs/docs/typedoc/cdk/typedoc.json' },
    { name: 'btp', apiFile: 'libs/docs/btp/api-files.ts', typedocJson: 'libs/docs/typedoc/btp/typedoc.json' },
    { name: 'cx', apiFile: 'libs/docs/cx/api-files.ts', typedocJson: 'libs/docs/typedoc/cx/typedoc.json' }
];

let totalMissing = 0;
let totalChecked = 0;

for (const lib of LIBS) {
    const apiFilePath = join(__dirname, '..', lib.apiFile);
    const typedocPath = join(__dirname, '..', lib.typedocJson);

    if (!existsSync(apiFilePath)) {
        console.log('\n[SKIP] ' + lib.name + ': api-files.ts not found');
        continue;
    }
    if (!existsSync(typedocPath)) {
        console.log('\n[SKIP] ' + lib.name + ': typedoc.json not found');
        continue;
    }

    // Parse api-files.ts to extract class names
    const apiSrc = readFileSync(apiFilePath, 'utf-8');
    const classNames = new Map(); // className -> componentKey

    // Match pattern: key: ['ClassName', 'ClassName2', ...]
    const entryRe = /(\w+)\s*:\s*\[([\s\S]*?)\]/g;
    let match;
    while ((match = entryRe.exec(apiSrc)) !== null) {
        const key = match[1];
        const namesStr = match[2];
        const nameRe = /'([^']+)'/g;
        let nameMatch;
        while ((nameMatch = nameRe.exec(namesStr)) !== null) {
            classNames.set(nameMatch[1], key);
        }
    }

    // Load TypeDoc JSON and collect all exported names
    const project = JSON.parse(readFileSync(typedocPath, 'utf-8'));
    const typedocNames = new Set();
    for (const child of project.children || []) {
        typedocNames.add(child.name);
    }

    // Cross-reference
    const missing = [];
    for (const [className, componentKey] of classNames) {
        totalChecked++;
        if (!typedocNames.has(className)) {
            missing.push({ className, componentKey });
        }
    }

    if (missing.length > 0) {
        totalMissing += missing.length;
        console.log('\n[FAIL] ' + lib.name + ': ' + missing.length + ' class names not found in TypeDoc output:');
        // Group by component key
        const grouped = {};
        for (const { className, componentKey } of missing) {
            if (!grouped[componentKey]) {grouped[componentKey] = [];}
            grouped[componentKey].push(className);
        }
        for (const [key, names] of Object.entries(grouped)) {
            console.log('   ' + key + ':');
            for (const name of names) {
                console.log('     - ' + name);
            }
        }
    } else {
        console.log('\n[OK] ' + lib.name + ': all ' + classNames.size + ' class names found');
    }
}

console.log('\n' + '='.repeat(60));
console.log('Total checked: ' + totalChecked + ', Missing: ' + totalMissing);
if (totalMissing > 0) {
    console.log('\nThese entries should be removed from their api-files.ts.');
}
