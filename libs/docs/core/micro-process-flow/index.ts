import { Routes } from '@angular/router';
import { API_FILES } from '@fundamental-ngx/docs/core/shared';
import { ApiComponent, ApiDocsService, currentComponentProvider } from '@fundamental-ngx/docs/shared';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./micro-process-flow-header/micro-process-flow-header.component').then(
                (c) => c.MicroProcessFlowHeaderComponent
            ),
        providers: [currentComponentProvider('micro-process-flow'), ApiDocsService],
        children: [
            {
                path: '',
                loadComponent: () =>
                    import('./micro-process-flow-docs.component').then((c) => c.MicroProcessFlowDocsComponent)
            },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.microProcessFlow } }
        ]
    }
];
