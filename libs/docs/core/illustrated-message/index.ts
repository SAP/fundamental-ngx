import { Routes } from '@angular/router';
import { ApiComponent, ApiDocsService, currentComponentProvider } from '@fundamental-ngx/docs/shared';
import { API_FILES } from '../shared/src';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./illustrated-message-header/illustrated-message-header.component').then(
                (c) => c.IllustratedMessageHeaderComponent
            ),
        providers: [currentComponentProvider('illustrated-message'), ApiDocsService],
        children: [
            {
                path: '',
                loadComponent: () =>
                    import('./illustrated-message-docs.component').then((c) => c.IllustratedMessageDocsComponent)
            },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.illustratedMessage } }
        ]
    }
];
