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
            import('./platform-search-field-header/platform-search-field-header.component').then(
                (c) => c.PlatformSearchFieldHeaderComponent
            ),
        providers: [currentComponentProvider('search-field'), ApiDocsService],
        children: [
            {
                path: '',
                loadComponent: () =>
                    import('./platform-search-field-docs.component').then((c) => c.PlatformSearchFieldDocsComponent)
            },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.searchField } },
            { path: 'i18n', component: I18nDocsComponent, data: getI18nKey('platformSearchField') }
        ]
    }
];
