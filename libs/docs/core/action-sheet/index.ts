import { Routes } from '@angular/router';
import { API_FILES } from '@fundamental-ngx/docs/core/shared';
import { ApiComponent, ApiDocsService, currentComponentProvider } from '@fundamental-ngx/docs/shared';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./action-sheet-header/action-sheet-header.component').then((c) => c.ActionSheetHeaderComponent),
        providers: [currentComponentProvider('action-sheet'), ApiDocsService],
        children: [
            {
                path: '',
                loadComponent: () => import('./action-sheet-docs.component').then((c) => c.ActionSheetDocsComponent)
            },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.actionSheet } }
        ]
    }
];
