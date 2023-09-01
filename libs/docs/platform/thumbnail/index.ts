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
            import('./platform-thumbnail-header/platform-thumbnail-header.component').then(
                (c) => c.PlatformThumbnailHeaderComponent
            ),
        providers: [currentComponentProvider('thumbnail'), ApiDocsService],
        children: [
            {
                path: '',
                loadComponent: () =>
                    import('./platform-thumbnail.docs.component').then((c) => c.PlatformThumbnailDocsComponent)
            },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.thumbnail } },
            { path: 'i18n', component: I18nDocsComponent, data: getI18nKey('platformThumbnail') }
        ]
    }
];
