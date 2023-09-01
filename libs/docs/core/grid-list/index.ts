import { Routes } from '@angular/router';
import { API_FILES } from '@fundamental-ngx/docs/core/shared';
import {
    ApiComponent,
    ApiDocsService,
    I18nDocsComponent,
    currentComponentProvider,
    getI18nKey
} from '@fundamental-ngx/docs/shared';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./grid-list-header/grid-list-header.component').then((c) => c.GridListHeaderComponent),
        providers: [currentComponentProvider('grid-list'), ApiDocsService],
        children: [
            {
                path: '',
                loadComponent: () => import('./grid-list-docs.component').then((c) => c.GridListDocsComponent)
            },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.gridList } },
            { path: 'i18n', component: I18nDocsComponent, data: getI18nKey('coreGridList') }
        ]
    }
];
