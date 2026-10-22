import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

function readRequiredFile(directory, fileName) {
    const filePath = path.join(directory, fileName);
    let content;

    try {
        content = readFileSync(filePath, 'utf8');
    } catch {
        throw new Error(`${fileName}: missing or unreadable at ${filePath}`);
    }

    if (content.trim().length === 0) {
        throw new Error(`${fileName}: file is empty at ${filePath}`);
    }

    return content;
}

export function validateDocsPagesArtifact(directory) {
    readRequiredFile(directory, 'index.html');
    readRequiredFile(directory, 'llms.txt');

    const componentsContent = readRequiredFile(directory, 'components.json');
    let catalog;

    try {
        catalog = JSON.parse(componentsContent);
    } catch {
        throw new Error(`components.json: file contains malformed JSON at ${path.join(directory, 'components.json')}`);
    }

    if (typeof catalog !== 'object' || catalog === null || Array.isArray(catalog)) {
        throw new Error(`components.json: JSON root must be an object at ${path.join(directory, 'components.json')}`);
    }

    if (!Array.isArray(catalog.components) || catalog.components.length === 0) {
        throw new Error(
            `components.json: components must be a non-empty array at ${path.join(directory, 'components.json')}`
        );
    }
}

const isCli = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);

if (isCli) {
    const directory = process.argv[2];

    if (!directory) {
        console.error('Usage: node scripts/validate-docs-pages-artifact.mjs <artifact-directory>');
        process.exitCode = 1;
    } else {
        try {
            validateDocsPagesArtifact(directory);
            console.log(`Validated GitHub Pages artifact: ${directory}`);
        } catch (error) {
            console.error(error instanceof Error ? error.message : String(error));
            process.exitCode = 1;
        }
    }
}
