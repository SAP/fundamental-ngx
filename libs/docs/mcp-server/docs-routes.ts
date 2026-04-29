import { Routes } from '@angular/router';
import { CURRENT_LIB, StackblitzService } from '@fundamental-ngx/docs/shared';
import { guides } from './docs-data.json';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('@fundamental-ngx/docs/shared-pages').then((m) => m.LibraryDocShellPageComponent),
        data: {
            sections: [
                {
                    header: 'Guides',
                    content: guides
                }
            ]
        },
        providers: [StackblitzService, { provide: CURRENT_LIB, useValue: 'mcp' }],
        children: [
            { path: '', redirectTo: 'overview', pathMatch: 'full' },
            {
                path: 'overview',
                loadComponent: () => import('@fundamental-ngx/docs/shared-pages').then((m) => m.McpServerPageComponent)
            }
        ]
    }
];
