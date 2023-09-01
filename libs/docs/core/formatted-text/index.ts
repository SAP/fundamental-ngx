import { Routes } from '@angular/router';
import { API_FILES } from '@fundamental-ngx/docs/core/shared';
import { ApiComponent, ApiDocsService, currentComponentProvider } from '@fundamental-ngx/docs/shared';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./formatted-text-header/formatted-text-header.component').then(
                (c) => c.FormattedTextHeaderComponent
            ),
        providers: [currentComponentProvider('formatted-text'), ApiDocsService],
        children: [
            {
                path: '',
                loadComponent: () => import('./formatted-text-docs.component').then((c) => c.FormattedTextDocsComponent)
            },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.formattedText } }
        ]
    }
];
