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
            import('./platform-standard-list-item-header/platform-standard-list-item-header.component').then(
                (c) => c.PlatformStandardListItemHeaderComponent
            ),
        providers: [currentComponentProvider('standard-list-item'), ApiDocsService],
        children: [
            {
                path: '',
                loadComponent: () =>
                    import('./platform-standard-list-item-docs.component').then(
                        (c) => c.PlatformStandardListItemDocsComponent
                    )
            },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.standardlistitem } },
            { path: 'i18n', component: I18nDocsComponent, data: getI18nKey('platformStandardListItem') }
        ]
    }
];
