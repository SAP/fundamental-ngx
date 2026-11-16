import { Routes } from '@angular/router';
import { generatedRoutes } from './app.routes.generated';

export const routes: Routes = [
    {
        path: 'style-csp',
        loadComponent: () => import('./style-csp/style-csp.component').then((m) => m.StyleCspComponent)
    },
    ...generatedRoutes
];
