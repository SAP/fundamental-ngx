/**
 * Interface updater: safely updates fd-language.ts with new translation keys
 */

export interface ComponentSection {
    startLine: number;
    endLine: number;
    content: string;
}

/**
 * Format a single interface key with JSDoc comment
 * @param isGeneric - Only emits FdLanguageKey<{count:number}>; complex generics require manual interface edits.
 */
export function formatInterfaceKey(
    keyName: string,
    commentType: string,
    description: string,
    isGeneric: boolean = false,
    indent: string = '        ' // 8 spaces by default
): string {
    const jsdoc = `${indent}/** ${description} */`;
    const genericType = isGeneric ? '<{ count: number }>' : '';
    const keyLine = `${indent}${keyName}: FdLanguageKey${genericType};`;
    return `${jsdoc}\n${keyLine}`;
}

/**
 * Find a component section in the FdLanguage interface
 */
export function findComponentSection(content: string, componentName: string): ComponentSection | null {
    const lines = content.split('\n');
    let startLine = -1;
    let braceDepth = 0;
    let inInterface = false;

    // Find the component section start
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];

        // Check if we're entering FdLanguage interface
        if (line.includes('interface FdLanguage')) {
            inInterface = true;
        }

        // Look for component section: "componentName: {"
        if (inInterface && line.match(new RegExp(`\\s+${componentName}:\\s*\\{`))) {
            startLine = i;
            braceDepth = 1;
            break;
        }
    }

    if (startLine === -1) {
        return null;
    }

    // Find the closing brace for this component
    let endLine = -1;
    for (let i = startLine + 1; i < lines.length; i++) {
        const line = lines[i];

        // Count braces
        for (const char of line) {
            if (char === '{') {
                braceDepth++;
            }
            if (char === '}') {
                braceDepth--;
                if (braceDepth === 0) {
                    endLine = i;
                    break;
                }
            }
        }

        if (endLine !== -1) {
            break;
        }
    }

    if (endLine === -1) {
        return null;
    }

    const sectionContent = lines.slice(startLine, endLine + 1).join('\n');
    return { startLine, endLine, content: sectionContent };
}

/**
 * Check if a key already exists in a component section
 */
function keyExistsInSection(sectionContent: string, keyName: string): boolean {
    return new RegExp(`\\s+${keyName}\\b\\s*:`).test(sectionContent);
}

/**
 * Update the FdLanguage interface with a new key
 */
export function updateFdLanguageInterface(
    content: string,
    componentName: string,
    keyName: string,
    commentType: string,
    description: string,
    isGeneric: boolean = false
): string {
    const lines = content.split('\n');
    const section = findComponentSection(content, componentName);

    // Check if key already exists
    if (section && keyExistsInSection(section.content, keyName)) {
        return content;
    }

    if (section) {
        // Add to existing component section
        const newKeyLine = formatInterfaceKey(keyName, commentType, description, isGeneric, '        ');

        // Insert before the closing brace (endLine - 1 for the line with })
        const insertLine = section.endLine;
        lines.splice(insertLine, 0, newKeyLine);

        return lines.join('\n');
    } else {
        // Create new component section
        const keyFormatted = formatInterfaceKey(keyName, commentType, description, isGeneric, '        ');
        const newSection = `    ${componentName}: {
${keyFormatted}
    };`;

        // Find the end of FdLanguage interface and insert before closing brace
        let interfaceEndLine = -1;
        let braceDepth = 0;
        let inInterface = false;

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];

            if (line.includes('interface FdLanguage')) {
                inInterface = true;
            }

            if (inInterface) {
                for (const char of line) {
                    if (char === '{') {
                        braceDepth++;
                    }
                    if (char === '}') {
                        braceDepth--;
                        if (braceDepth === 0) {
                            interfaceEndLine = i;
                            break;
                        }
                    }
                }
            }

            if (interfaceEndLine !== -1) {
                break;
            }
        }

        if (interfaceEndLine === -1) {
            throw new Error('Could not find FdLanguage interface closing brace');
        }

        // Insert before the closing brace
        lines.splice(interfaceEndLine, 0, newSection);

        return lines.join('\n');
    }
}
