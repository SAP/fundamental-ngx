import { APP_INITIALIZER, EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { DocsNavigationService } from './docs-navigation.service';
import { buildSectionsFromData, DOCS_PACKAGES_META, DocsPackageMeta } from './docs-packages.config';

/**
 * Type for docs data import function
 */
type DocsDataImporter = () => Promise<Record<string, any>>;

/**
 * Configuration for providing unified documentation navigation.
 * Maps package IDs to their docs-data.json import functions.
 */
export interface UnifiedDocsConfig {
    packages: {
        [packageId: string]: DocsDataImporter;
    };
}

/**
 * Factory function that creates the initializer for the unified docs navigation.
 * This loads all docs-data.json files and registers them with the DocsNavigationService.
 */
function initializeUnifiedDocs(
    navigationService: DocsNavigationService,
    config: UnifiedDocsConfig
): () => Promise<void> {
    return async () => {
        const loadPromises: Promise<void>[] = [];

        for (const meta of DOCS_PACKAGES_META) {
            const importer = config.packages[meta.id];
            if (importer) {
                loadPromises.push(loadAndRegisterPackage(navigationService, meta, importer));
            }
        }

        await Promise.all(loadPromises);
    };
}

/**
 * Load docs data for a package and register it with the navigation service.
 */
async function loadAndRegisterPackage(
    navigationService: DocsNavigationService,
    meta: DocsPackageMeta,
    importer: DocsDataImporter
): Promise<void> {
    try {
        const data = await importer();
        navigationService.registerPackage({
            id: meta.id,
            name: meta.name,
            sections: buildSectionsFromData(data)
        });
    } catch (error) {
        console.warn(`Failed to load docs data for package: ${meta.id}`, error);
    }
}

/**
 * Provide unified documentation navigation.
 * This should be called in the application's providers array.
 *
 * Example usage:
 * ```typescript
 * export const appConfig: ApplicationConfig = {
 *     providers: [
 *         provideUnifiedDocsNavigation({
 *             packages: {
 *                 core: () => import('@fundamental-ngx/docs/core/docs-data.json'),
 *                 platform: () => import('@fundamental-ngx/docs/platform/docs-data.json'),
 *                 // ... other packages
 *             }
 *         })
 *     ]
 * };
 * ```
 */
export function provideUnifiedDocsNavigation(config: UnifiedDocsConfig): EnvironmentProviders {
    return makeEnvironmentProviders([
        {
            provide: APP_INITIALIZER,
            useFactory: (navigationService: DocsNavigationService) => initializeUnifiedDocs(navigationService, config),
            deps: [DocsNavigationService],
            multi: true
        }
    ]);
}
