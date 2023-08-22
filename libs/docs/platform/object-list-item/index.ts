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
            import('./platform-object-list-item-header/platform-object-list-item-header.component').then(
                (c) => c.PlatformObjectListItemHeaderComponent
            ),
        providers: [currentComponentProvider('object-list-item'), ApiDocsService],
        children: [
            {
                path: '',
                loadComponent: () =>
                    import('./platform-object-list-item-docs.component').then(
                        (c) => c.PlatformObjectListItemDocsComponent
                    )
            },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.objectlistitem } },
            { path: 'i18n', component: I18nDocsComponent, data: getI18nKey('platformObjectListItem') }
        ]
    }
];
