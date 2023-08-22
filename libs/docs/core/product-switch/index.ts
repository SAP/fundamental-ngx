import { Routes } from '@angular/router';
import { ApiComponent, ApiDocsService, currentComponentProvider } from '@fundamental-ngx/docs/shared';
import { API_FILES } from '../shared/src';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./product-switch-docs-header/product-switch-docs-header.component').then(
                (c) => c.ProductSwitchDocsHeaderComponent
            ),
        providers: [currentComponentProvider('product-switch'), ApiDocsService],
        children: [
            {
                path: '',
                loadComponent: () => import('./product-switch-docs.component').then((c) => c.ProductSwitchDocsComponent)
            },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.productSwitch } }
        ]
    }
];
