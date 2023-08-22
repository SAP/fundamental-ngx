import { Routes } from '@angular/router';
import { API_FILES } from '@fundamental-ngx/docs/platform/shared';
import { ApiComponent, ApiDocsService, currentComponentProvider } from '@fundamental-ngx/docs/shared';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./message-popover-header/message-popover-header.component').then(
                (c) => c.MessagePopoverHeaderComponent
            ),
        providers: [currentComponentProvider('message-popover'), ApiDocsService],
        children: [
            {
                path: '',
                loadComponent: () =>
                    import('./message-popover-docs.component').then((c) => c.MessagePopoverDocsComponent)
            },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.messagePopover } }
        ]
    }
];
