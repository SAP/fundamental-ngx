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
            import('./platform-smart-filter-bar-header/platform-smart-filter-bar-header.component').then(
                (c) => c.PlatformSmartFilterBarHeaderComponent
            ),
        providers: [currentComponentProvider('smart-filter-bar'), ApiDocsService],
        children: [
            {
                path: '',
                loadComponent: () =>
                    import('./platform-smart-filter-bar-docs.component').then(
                        (c) => c.PlatformSmartFilterBarDocsComponent
                    )
            },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.smartFilterBar } },
            { path: 'i18n', component: I18nDocsComponent, data: getI18nKey('platformSmartFilterBar') }
        ]
    }
];
