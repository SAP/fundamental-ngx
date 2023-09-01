import { Routes } from '@angular/router';
import { ApiComponent, ApiDocsService, currentComponentProvider } from '@fundamental-ngx/docs/shared';
import { API_FILES } from '../shared/src';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./dynamic-side-content-header/dynamic-side-content-header.component').then(
                (c) => c.DynamicSideContentHeaderComponent
            ),
        providers: [currentComponentProvider('dynamic-side-content'), ApiDocsService],
        children: [
            {
                path: '',
                loadComponent: () =>
                    import('./dynamic-side-content-docs.component').then((c) => c.DynamicSideContentDocsComponent)
            },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.dynamicSideContent } }
        ]
    }
];
