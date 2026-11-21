import { Routes } from '@angular/router';
import { generatedRoutes } from './app.routes.generated';

export const routes: Routes = [
    {
        path: 'style-csp',
        loadComponent: () => import('./style-csp/style-csp.component').then((m) => m.StyleCspComponent)
    },
    {
        path: '__e2e/shellbar/functional',
        loadComponent: () =>
            import('./fixtures/shellbar-functional.component').then((module) => module.ShellbarFunctionalComponent)
    },
    {
        path: '__e2e/user-menu/default',
        loadComponent: () =>
            // Existing harness examples use source imports; these components have no barrel exports.
            // eslint-disable-next-line @nx/enforce-module-boundaries
            import('../../../../libs/docs/core/user-menu/examples/user-menu-default-example.component').then(
                (m) => m.UserMenuDefaultExampleComponent
            )
    },
    {
        path: '__e2e/user-menu/mobile',
        loadComponent: () =>
            // Existing harness examples use source imports; these components have no barrel exports.
            // eslint-disable-next-line @nx/enforce-module-boundaries
            import('../../../../libs/docs/core/user-menu/examples/user-menu-mobile-example.component').then(
                (m) => m.UserMenuMobileExampleComponent
            )
    },
    {
        path: '__e2e/shellbar/basic',
        loadComponent: () =>
            // Existing harness examples use source imports; these components have no barrel exports.
            // eslint-disable-next-line @nx/enforce-module-boundaries
            import('../../../../libs/docs/core/shellbar/examples/shellbar-basic-example.component').then(
                (m) => m.ShellbarBasicExampleComponent
            )
    },
    {
        path: '__e2e/shellbar/search-accessibility',
        loadComponent: () =>
            import('./fixtures/shellbar-search-accessibility.component').then(
                (module) => module.ShellbarSearchAccessibilityComponent
            )
    },
    {
        path: '__e2e/shellbar/landmarks',
        loadComponent: () =>
            import('./fixtures/shellbar-landmarks.component').then((module) => module.ShellbarLandmarksComponent),
        data: { bareLayout: true }
    },
    ...generatedRoutes
];
