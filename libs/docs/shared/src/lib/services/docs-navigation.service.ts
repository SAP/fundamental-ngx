import { Injectable, computed, signal } from '@angular/core';
import {
    SectionInterface,
    SectionInterfaceContent,
    SectionInterfaceContentLinear,
    SectionInterfaceContentNested
} from '../core-helpers/sections-toolbar/section.interface';

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
     * Register multiple documentation packages at once.
     * @param configs Array of package configurations
     */
    registerPackages(configs: DocsPackageConfig[]): void {
        configs.forEach((config) => this.registerPackage(config));
    }

    /**
     * Check if all expected packages are registered.
     * @param expectedPackageIds Array of expected package IDs
     * @returns true if all packages are registered
     */
    areAllPackagesRegistered(expectedPackageIds: string[]): boolean {
        const registeredIds = new Set(this._packages().map((p) => p.id));
        return expectedPackageIds.every((id) => registeredIds.has(id));
    }

    /**
     * Get the home page entries from all packages for the unified Home section.
     * @returns Array of home page content items
     */
    private _getHomePages(): SectionInterfaceContentLinear[] {
        const homePages: SectionInterfaceContentLinear[] = [];

        for (const pkg of this._packages()) {
            // Find the "Guides" section and extract the "Home" entry
            const guidesSection = pkg.sections.find((s) => s.header === 'Guides');
            if (guidesSection) {
                const homeEntry = guidesSection.content.find(
                    (c): c is SectionInterfaceContentLinear => 'url' in c && c.url.endsWith('/home')
                );
                if (homeEntry) {
                    homePages.push({
                        name: pkg.name,
                        url: homeEntry.url
                    });
                }
            }
        }

        return homePages;
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
     * - Home (containing all packages' home pages)
     * - Core (expandable, containing Core's sections as nested items)
     * - Platform (expandable, containing Platform's sections as nested items)
     * - ... (other packages)
     */
    private _buildUnifiedSections(): SectionInterface[] {
        const packages = this._packages();
        if (packages.length === 0) {
            return [];
        }

        const sections: SectionInterface[] = [];

        // Add unified Home section with all packages' home pages
        const homePages = this._getHomePages();
        if (homePages.length > 0) {
            sections.push({
                header: 'Home',
                content: homePages
            });
        }

        // Add each package as a top-level section
        // The package's internal sections become nested content with subItems
        for (const pkg of packages) {
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
                        packageContent.push({
                            name: section.header,
                            subItems: linearItems
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
