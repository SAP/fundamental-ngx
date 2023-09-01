import { Routes } from '@angular/router';
import { API_FILES } from '@fundamental-ngx/docs/core/shared';
import { ApiComponent, ApiDocsService, currentComponentProvider } from '@fundamental-ngx/docs/shared';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./scroll-spy-header/scroll-spy-header.component').then((c) => c.ScrollSpyHeaderComponent),
        providers: [currentComponentProvider('scroll-spy'), ApiDocsService],
        children: [
            {
                path: '',
                loadComponent: () => import('./scroll-spy-docs.component').then((c) => c.ScrollSpyDocsComponent)
            },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.scrollSpy } }
        ]
    }
];
