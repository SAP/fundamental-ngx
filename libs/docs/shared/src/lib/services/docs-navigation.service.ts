import { Injectable, computed, signal } from '@angular/core';
import {
    SectionInterface,
    SectionInterfaceContent,
    SectionInterfaceContentLinear
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
        // Merge all section content directly, preserving nested structure from docs-data.json
        for (const pkg of sortedPackages) {
            const allContent: SectionInterfaceContent[] = [];

            for (const section of pkg.sections) {
                // Filter out home pages from content
                const filteredContent = section.content.filter((c) => {
                    if (this._isLinearItem(c)) {
                        return !c.url.endsWith('/home');
                    }
                    return true;
                });

                allContent.push(...filteredContent);
            }

            if (allContent.length > 0) {
                // Sort items alphabetically by name, preserving nested structure
                const sortedContent = allContent.sort((a, b) =>
                    a.name.localeCompare(b.name, undefined, { sensitivity: 'base' })
                );

                sections.push({
                    header: pkg.name,
                    content: sortedContent
                });
            }
        }

        return sections;
    }
}
