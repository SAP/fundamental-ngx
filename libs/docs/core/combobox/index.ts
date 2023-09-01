import { Routes } from '@angular/router';
import { API_FILES } from '@fundamental-ngx/docs/core/shared';
import { ApiComponent, ApiDocsService, currentComponentProvider } from '@fundamental-ngx/docs/shared';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./combobox-header/combobox-header.component').then((c) => c.ComboboxHeaderComponent),
        providers: [currentComponentProvider('combobox'), ApiDocsService],
        children: [
            {
                path: '',
                loadComponent: () => import('./combobox-docs.component').then((c) => c.ComboboxDocsComponent)
            },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.combobox } }
        ]
    }
];
