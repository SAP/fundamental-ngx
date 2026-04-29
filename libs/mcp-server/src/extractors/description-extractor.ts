import { glob } from 'fast-glob';
import { readFile } from 'fs/promises';
import { resolve } from 'path';

/**
 * Extract human-written component descriptions from the docs app header templates.
 *
 * Each component's docs page has a `*-header.component.html` file containing:
 * ```html
 * <description>Human-readable description text...</description>
 * ```
 *
 * @returns Map from `"<package>/<component>"` (e.g. `"core/wizard"`) to the description string.
 */
export async function extractDescriptions(basePath: string): Promise<Map<string, string>> {
    const docsRoot = resolve(basePath, 'libs/docs');
    const pattern = '*/**/*-header.component.html';
    const files = await glob(pattern, { cwd: docsRoot, absolute: false });

    const descriptions = new Map<string, string>();

    await Promise.all(
        files.map(async (relPath) => {
            // relPath: "core/wizard/wizard-header/wizard-header.component.html"
            const parts = relPath.split('/');
            if (parts.length < 3) {
                return;
            }

            const pkg = parts[0]; // "core", "platform", "btp", etc.
            const component = parts[1]; // "wizard", "info-label", etc.
            const key = `${pkg}/${component}`;

            try {
                const html = await readFile(resolve(docsRoot, relPath), 'utf-8');
                const description = parseDescription(html);
                if (description) {
                    descriptions.set(key, description);
                }
            } catch {
                // skip unreadable files
            }
        })
    );

    return descriptions;
}

/**
 * Parse the `<description>...</description>` content from a header template,
 * stripping HTML tags and normalising whitespace into a plain-text string.
 */
function parseDescription(html: string): string | null {
    const match = html.match(/<description>([\s\S]*?)<\/description>/);
    if (!match) {
        return null;
    }

    const raw = match[1]
        // Strip HTML tags
        .replace(/<[^>]+>/g, ' ')
        // Collapse whitespace
        .replace(/\s+/g, ' ')
        .trim();

    return raw || null;
}
