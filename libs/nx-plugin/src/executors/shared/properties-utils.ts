interface RecursiveRecord<V = string> {
    [key: string]: V | RecursiveRecord<V>;
}

function set<V = string>(obj: RecursiveRecord<V>, path: string, value: V): void {
    const pathParts = path.split('.');
    let pathValue = obj;
    for (let i = 0; i < pathParts.length - 1; i++) {
        const part = pathParts[i];
        pathValue[part] = pathValue[part] || {};
        pathValue = pathValue[part] as RecursiveRecord<V>;
    }
    pathValue[pathParts[pathParts.length - 1]] = value;
}

/**
 * Converts a flat object to a hierarchy object
 * in source object { 'key1.key2': value } will be converted to { key1: { key2: value } }
 *
 * @param source
 */
function loadJson(source: Partial<Record<string, string>>): Record<string, any> {
    const result = {};
    Object.entries(source).forEach(([key, value]) => {
        set(result, key, value);
    });
    return result;
}

export function parseProperties(propertiesFileContent: string): Record<string, string> {
    const newFileContent = {};
    const items = propertiesFileContent.match(/(.*)=(.*)/g);
    (items || []).forEach((item: string) => {
        const firstEqualSignIndex = item.indexOf('=');
        const [key, value] = [item.slice(0, firstEqualSignIndex), item.slice(firstEqualSignIndex + 1)];
        newFileContent[key.trim()] = value.trim().replace(/\\#/g, '#');
    });
    return newFileContent;
}

export function loadProperties(propertiesFileContent: string): Record<string, any> {
    return loadJson(parseProperties(propertiesFileContent));
}

/**
 * Parse a JavaScript object literal from generated TypeScript files.
 * Generated files use JSON.stringify + Prettier, which produces JavaScript object literals
 * with single quotes and unquoted keys. We first try JSON.parse, then convert to valid JSON.
 */
function parseObjectLiteral(objStr: string): any {
    // First try JSON.parse (in case format changes to pure JSON)
    try {
        return JSON.parse(objStr);
    } catch {
        // Convert JavaScript object literal to JSON:
        // 1. Replace single quotes with double quotes (but not in already-quoted strings)
        // 2. Quote unquoted keys
        const jsonStr = objStr
            // Replace single quotes with double quotes
            .replace(/'([^']*)'/g, '"$1"')
            // Quote unquoted object keys: word followed by colon
            .replace(/(\s*)(\w+)(\s*):/g, '$1"$2"$3:');

        return JSON.parse(jsonStr);
    }
}

/**
 * Merge base properties with language-specific properties.
 * Returns a translation object where language-specific translations override base translations,
 * but only for keys that exist in the base.
 *
 * @param basePropertiesContent - Content of the base translations.properties file
 * @param basePropertiesMap - Parsed key-value map of base properties
 * @param langPropertiesContent - Optional content of language-specific .properties file
 * @returns Merged translation object ready for JSON.stringify
 */
export function mergeTranslations(
    basePropertiesContent: string,
    basePropertiesMap: Record<string, string>,
    langPropertiesContent?: string
): Record<string, any> {
    // Start with base properties (includes all keys with English values)
    let translationObj = loadProperties(basePropertiesContent);

    // If language-specific content exists, overlay its translations
    if (langPropertiesContent) {
        const langPropertiesMap = parseProperties(langPropertiesContent);

        // Merge: use language-specific translations where they exist, but ONLY for keys in base
        const mergedMap: Record<string, string> = {};
        for (const [key, value] of Object.entries(basePropertiesMap)) {
            mergedMap[key] = langPropertiesMap[key] ?? value;
        }
        translationObj = loadProperties(
            Object.entries(mergedMap)
                .map(([k, v]) => `${k}=${v}`)
                .join('\n')
        );
    }

    return translationObj;
}
