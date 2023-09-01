import { Routes } from '@angular/router';
import { API_FILES } from '@fundamental-ngx/docs/core/shared';
import { ApiComponent, ApiDocsService, currentComponentProvider } from '@fundamental-ngx/docs/shared';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./multi-combobox-header/multi-combobox-header.component').then(
                (c) => c.MultiComboboxHeaderComponent
            ),
        providers: [currentComponentProvider('multi-combobox'), ApiDocsService],
        children: [
            {
                path: '',
                loadComponent: () => import('./multi-combobox-docs.component').then((c) => c.MultiComboboxDocsComponent)
            },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.multiCombobox } }
        ]
    }
];
