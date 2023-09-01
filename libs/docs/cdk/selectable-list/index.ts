import { Routes } from '@angular/router';
import { ApiComponent, ApiDocsService, currentComponentProvider } from '@fundamental-ngx/docs/shared';
import { API_FILES } from '../shared/src';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./selectable-list-header/selectable-list-header.component').then(
                (c) => c.SelectableListHeaderComponent
            ),
        providers: [currentComponentProvider('selectable-list'), ApiDocsService],
        children: [
            {
                path: '',
                loadComponent: () =>
                    import('./selectable-list-docs.component').then((c) => c.SelectableListDocsComponent)
            },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.selectableList } }
        ]
    }
];
