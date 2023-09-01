import { Routes } from '@angular/router';
import { ApiComponent, ApiDocsService, currentComponentProvider } from '@fundamental-ngx/docs/shared';
import { API_FILES } from '../shared/src';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./inline-help-header/inline-help-header.component').then((c) => c.InlineHelpHeaderComponent),
        providers: [currentComponentProvider('inline-help'), ApiDocsService],
        children: [
            {
                path: '',
                loadComponent: () => import('./inline-help-docs.component').then((c) => c.InlineHelpDocsComponent)
            },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.inlineHelp } }
        ]
    }
];
