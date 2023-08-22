import { Routes } from '@angular/router';
import { API_FILES } from '@fundamental-ngx/docs/platform/shared';
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
            import('./platform-list-header/platform-list-header.component').then((c) => c.PlatformListHeaderComponent),
        providers: [currentComponentProvider('list'), ApiDocsService],
        children: [
            {
                path: '',
                loadComponent: () => import('./platform-list-docs.component').then((c) => c.PlatformListDocsComponent)
            },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.list } },
            { path: 'i18n', component: I18nDocsComponent, data: getI18nKey('platformList') }
        ]
    }
];
