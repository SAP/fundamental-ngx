import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'core',
        data: {
            library: 'Core'
        },
        loadChildren: () => import('./core/core-documentation.routes').then((m) => m.ROUTES)
    },
    {
        path: 'platform',
        data: {
            library: 'Platform'
        },
        loadChildren: () => import('./platform/platform-documentation.routes').then((m) => m.ROUTES)
    },
    {
        path: 'cx',
        data: {
            library: 'CX'
        },
        loadChildren: () => import('./cx/cx-documentation.routes').then((m) => m.ROUTES)
    },
    {
        path: 'cdk',
        data: {
            library: 'CDK'
        },
        loadChildren: () => import('./cdk/cdk-documentation.routes').then((m) => m.ROUTES)
    },
    { path: '', redirectTo: 'core', pathMatch: 'full' }
];
