import { Routes } from '@angular/router';
import { API_FILES } from '@fundamental-ngx/docs/core/shared';
import { ApiComponent, ApiDocsService, currentComponentProvider } from '@fundamental-ngx/docs/shared';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./message-strip-header/message-strip-header.component').then((c) => c.MessageStripHeaderComponent),
        providers: [currentComponentProvider('message-strip'), ApiDocsService],
        children: [
            {
                path: '',
                loadComponent: () => import('./message-strip-docs.component').then((c) => c.MessageStripDocsComponent)
            },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.messageStrip } }
        ]
    }
];
