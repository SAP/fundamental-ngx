import { readFileSync } from 'fs';

const COMPONENT_CLASS_RE = /@Component\s*\([\s\S]*?\)\s*(?:\/\/[^\n]*\n\s*)?export\s+class\s+(\w+)/;

export function extractClassName(filePath: string): string | null {
    const content = readFileSync(filePath, 'utf-8');
    const match = content.match(COMPONENT_CLASS_RE);
    return match ? match[1] : null;
}
