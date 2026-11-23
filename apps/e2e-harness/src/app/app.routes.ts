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
        path: '__e2e/shellbar/search-accessibility',
        loadComponent: () =>
            import('./fixtures/shellbar-search-accessibility.component').then(
                (module) => module.ShellbarSearchAccessibilityComponent
            )
    },
    ...generatedRoutes
];
