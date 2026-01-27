import { Injectable, computed, signal } from '@angular/core';
import {
    SectionInterface,
    SectionInterfaceContent,
    SectionInterfaceContentLinear,
    SectionInterfaceContentNested
} from '../core-helpers/sections-toolbar/section.interface';
import { getPackageOrderIndex } from './docs-packages.config';

/**
 * Configuration for a documentation package
 */
export interface DocsPackageConfig {
    /** Unique identifier for the package (e.g., 'core', 'platform') */
    id: string;
    /** Display name for the package (e.g., 'Core', 'Platform') */
    name: string;
    /** Sections within the package (Guides, Components, etc.) */
    sections: SectionInterface[];
}

/**
 * Service that provides unified navigation sections for all documentation packages.
 * Each package is represented as a top-level expandable section in the side navigation.
 */
@Injectable({ providedIn: 'root' })
export class DocsNavigationService {
    /** Computed unified sections for the side navigation */
    readonly unifiedSections = computed(() => this._buildUnifiedSections());

    private readonly _packages = signal<DocsPackageConfig[]>([]);

    /** All registered documentation packages */
    get packages(): ReturnType<typeof this._packages.asReadonly> {
        return this._packages.asReadonly();
    }

    /**
     * Register a documentation package with its sections.
     * This method should be called during route resolution for each package.
     * @param config The package configuration
     */
    registerPackage(config: DocsPackageConfig): void {
        this._packages.update((packages) => {
            // Avoid duplicates
            const existingIndex = packages.findIndex((p) => p.id === config.id);
            if (existingIndex >= 0) {
                const updated = [...packages];
                updated[existingIndex] = config;
                return updated;
            }
            return [...packages, config];
        });
    }

    /**
     * Get the unified home page entry.
     * @returns Single home page content item pointing to the unified docs home
     */
    private _getHomePage(): SectionInterfaceContentLinear {
        return {
            name: 'Getting Started',
            url: '/home'
        };
    }

    /**
     * Check if a content item is a linear (non-nested) item.
     */
    private _isLinearItem(item: SectionInterfaceContent): item is SectionInterfaceContentLinear {
        return 'url' in item && !('subItems' in item);
    }

    /**
     * Check if a content item is a nested item.
     */
    private _isNestedItem(item: SectionInterfaceContent): item is SectionInterfaceContentNested {
        return 'subItems' in item;
    }

    /**
     * Convert a content item to a linear item, handling nested content by flattening.
     */
    private _toLinearItems(items: SectionInterfaceContent[]): SectionInterfaceContentLinear[] {
        const result: SectionInterfaceContentLinear[] = [];

        for (const item of items) {
            if (this._isLinearItem(item)) {
                result.push(item);
            } else if (this._isNestedItem(item)) {
                // For nested items, include them all as linear items
                result.push(...item.subItems);
            }
        }

        return result;
    }

    /**
     * Build unified sections from all registered packages.
     * Structure:
     * - Home (Getting Started)
     * - Web Components, Web Components Fiori, Web Components AI
     * - Core, Platform, BTP, CDK, i18n, CX
     */
    private _buildUnifiedSections(): SectionInterface[] {
        const packages = this._packages();
        if (packages.length === 0) {
            return [];
        }

        // Sort packages according to predefined order (cache indices to avoid repeated lookups)
        const sortedPackages = [...packages]
            .map((pkg) => ({ pkg, order: getPackageOrderIndex(pkg.id) }))
            .sort((a, b) => a.order - b.order)
            .map((item) => item.pkg);

        const sections: SectionInterface[] = [];

        // Add unified Home section with single entry
        sections.push({
            header: 'Home',
            content: [this._getHomePage()]
        });

        // Add each package as a top-level section
        // The package's internal sections become nested content with subItems
        for (const pkg of sortedPackages) {
            const packageContent: SectionInterfaceContentNested[] = [];

            for (const section of pkg.sections) {
                // Filter out home pages from content
                const filteredContent = section.content.filter((c) => {
                    if (this._isLinearItem(c)) {
                        return !c.url.endsWith('/home');
                    }
                    return true;
                });

                if (filteredContent.length > 0) {
                    // Convert all content to linear items for the nested structure
                    const linearItems = this._toLinearItems(filteredContent);

                    if (linearItems.length > 0) {
                        // Sort items alphabetically by name
                        const sortedItems = linearItems.sort((a, b) =>
                            a.name.localeCompare(b.name, undefined, { sensitivity: 'base' })
                        );
                        packageContent.push({
                            name: section.header,
                            subItems: sortedItems
                        });
                    }
                }
            }

            if (packageContent.length > 0) {
                sections.push({
                    header: pkg.name,
                    content: packageContent
                });
            }
        }

        return sections;
    }
}
