import { readFileSync } from 'fs';

import { basename } from 'path';

const COMPONENT_CLASS_RE = /@Component\s*\([\s\S]*?\)\s*(?:\/\/[^\n]*\n\s*)?export\s+class\s+(\w+)/g;

/**
 * Derives the expected PascalCase class name from a kebab-case file name,
 * e.g. `settings-generator-custom-layout-example.component.ts` -> `SettingsGeneratorCustomLayoutExampleComponent`.
 */

function expectedClassNameFromFileName(filePath: string): string {
    const fileName = basename(filePath).replace(/\.component\.ts$/, '');

    return (
        fileName
            .split('-')
            .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
            .join('') + 'Component'
    );
}

/**

* Extracts the class name of the routable example component from a file.
*
* Some example files declare additional helper/inline `@Component` classes (e.g. custom
* dynamic form controls) ahead of the main example component. To avoid picking up the
* wrong class as the route's `loadComponent` target, we prefer the class whose name
* matches the file name convention, falling back to the first `@Component` class found.
*/

export function extractClassName(filePath: string): string | null {
    const content = readFileSync(filePath, 'utf-8');

    const matches = [...content.matchAll(COMPONENT_CLASS_RE)].map((m) => m[1]);

    if (matches.length === 0) {
        return null;
    }

    const expected = expectedClassNameFromFileName(filePath);

    return matches.includes(expected) ? expected : matches[0];
}
