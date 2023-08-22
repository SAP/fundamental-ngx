import { Routes } from '@angular/router';
import { ApiComponent, ApiDocsService, currentComponentProvider } from '@fundamental-ngx/docs/shared';
import { API_FILES } from '../shared/src';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./resizable-card-layout-docs-header/resizable-card-layout-docs-header.component').then(
                (c) => c.ResizableCardLayoutDocsHeaderComponent
            ),
        providers: [currentComponentProvider('resizable-card-layout'), ApiDocsService],
        children: [
            {
                path: '',
                loadComponent: () =>
                    import('./resizable-card-layout-docs.component').then((c) => c.ResizableCardLayoutDocsComponent)
            },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.resizableCardLayout } }
        ]
    }
];
