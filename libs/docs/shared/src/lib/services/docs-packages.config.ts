import { SectionInterface } from '../core-helpers/sections-toolbar/section.interface';

/**
 * Helper function to build sections array from docs-data.json structure.
 * Each package may have different section types (guides, components, layouts, utilities, adapters, directives).
 */
export function buildSectionsFromData(data: Record<string, any>): SectionInterface[] {
    const sections: SectionInterface[] = [];

    // Map of data keys to display headers
    const sectionMapping: Record<string, string> = {
        guides: 'Guides',
        components: 'Components',
        layouts: 'Layouts',
        utilities: 'Utilities',
        adapters: 'Adapters',
        directives: 'Directives'
    };

    for (const [key, header] of Object.entries(sectionMapping)) {
        if (data[key] && Array.isArray(data[key]) && data[key].length > 0) {
            sections.push({
                header,
                content: data[key]
            });
        }
    }

    return sections;
}

/**
 * Package metadata without sections data.
 * Sections data will be loaded from each package's docs-data.json at runtime.
 */
export interface DocsPackageMeta {
    id: string;
    name: string;
}

/**
 * Metadata for all documentation packages.
 * This array defines the order and display names for all packages in the side navigation.
 */
export const DOCS_PACKAGES_META: DocsPackageMeta[] = [
    { id: 'ui5-webcomponents', name: 'Web Components' },
    { id: 'ui5-webcomponents-fiori', name: 'Web Components Fiori' },
    { id: 'ui5-webcomponents-ai', name: 'Web Components AI' },
    { id: 'core', name: 'Core' },
    { id: 'platform', name: 'Platform' },
    { id: 'btp', name: 'BTP' },
    { id: 'cdk', name: 'CDK' },
    { id: 'i18n', name: 'i18n' },
    { id: 'cx', name: 'CX' }
];

/**
 * Pre-computed map for O(1) package order lookups.
 */
const PACKAGE_ORDER_MAP = new Map<string, number>(DOCS_PACKAGES_META.map((pkg, index) => [pkg.id, index]));

/**
 * Get the display order index for a package.
 * @param packageId The package identifier
 * @returns The order index, or a high number if not found
 */
export function getPackageOrderIndex(packageId: string): number {
    return PACKAGE_ORDER_MAP.get(packageId) ?? 999;
}
