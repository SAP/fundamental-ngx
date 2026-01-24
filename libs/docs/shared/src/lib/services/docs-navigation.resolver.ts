import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { DocsNavigationService } from './docs-navigation.service';
import { buildSectionsFromData, getDocsPackageMetaById } from './docs-packages.config';

/**
 * Route resolver that registers a single package's sections into the DocsNavigationService.
 * This resolver should be used on each package's root route.
 *
 * Route data requirements:
 * - `packageId`: The package identifier (e.g., 'core', 'platform')
 * - `docsData`: The docs-data.json content for the package
 *
 * Example usage in a package's routes:
 * ```typescript
 * {
 *     path: '',
 *     resolve: { navigation: registerPackageResolver },
 *     data: {
 *         packageId: 'core',
 *         docsData: docsData // imported from docs-data.json
 *     },
 *     ...
 * }
 * ```
 */
export const registerPackageResolver: ResolveFn<boolean> = (route: ActivatedRouteSnapshot) => {
    const navigationService = inject(DocsNavigationService);
    const packageId = route.data['packageId'] as string;
    const docsData = route.data['docsData'] as Record<string, any>;

    if (!packageId || !docsData) {
        console.warn('registerPackageResolver: Missing packageId or docsData in route data');
        return true;
    }

    const meta = getDocsPackageMetaById(packageId);
    if (!meta) {
        console.warn(`registerPackageResolver: Unknown package ID: ${packageId}`);
        return true;
    }

    // Register the package
    navigationService.registerPackage({
        id: meta.id,
        name: meta.name,
        sections: buildSectionsFromData(docsData)
    });

    return true;
};

/**
 * Factory function to create a resolver for a specific package.
 * This is useful when you want to inline the docsData import.
 *
 * Example usage:
 * ```typescript
 * import * as docsData from './docs-data.json';
 *
 * export const ROUTES: Routes = [
 *     {
 *         path: '',
 *         resolve: { navigation: createPackageResolver('core', docsData) },
 *         ...
 *     }
 * ];
 * ```
 */
export function createPackageResolver(packageId: string, docsData: Record<string, any>): ResolveFn<boolean> {
    return () => {
        const navigationService = inject(DocsNavigationService);
        const meta = getDocsPackageMetaById(packageId);

        if (!meta) {
            console.warn(`createPackageResolver: Unknown package ID: ${packageId}`);
            return true;
        }

        navigationService.registerPackage({
            id: meta.id,
            name: meta.name,
            sections: buildSectionsFromData(docsData)
        });

        return true;
    };
}
