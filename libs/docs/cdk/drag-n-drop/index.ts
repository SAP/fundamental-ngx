import { Routes } from '@angular/router';
import { ApiComponent, ApiDocsService, currentComponentProvider } from '@fundamental-ngx/docs/shared';
import { API_FILES } from '../shared/src';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('./dnd-header/dnd-header.component').then((c) => c.DndHeaderComponent),
        providers: [currentComponentProvider('dnd-header'), ApiDocsService],
        children: [
            {
                path: '',
                loadComponent: () => import('./dnd-docs.component').then((c) => c.DndDocsComponent)
            },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.dnd } }
        ]
    }
];
