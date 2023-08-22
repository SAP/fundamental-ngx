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
            import('./platform-link-header/platform-link-header.component').then((c) => c.PlatformLinkHeaderComponent),
        providers: [currentComponentProvider('link'), ApiDocsService],
        children: [
            {
                path: '',
                loadComponent: () => import('./platform-link-docs.component').then((c) => c.PlatformLinkDocsComponent)
            },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.link } },
            { path: 'i18n', component: I18nDocsComponent, data: getI18nKey('platformLink') }
        ]
    }
];
