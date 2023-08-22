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
            import('./platform-upload-collection-header/platform-upload-collection-header.component').then(
                (c) => c.PlatformUploadCollectionHeaderComponent
            ),
        providers: [currentComponentProvider('upload-collection'), ApiDocsService],
        children: [
            {
                path: '',
                loadComponent: () =>
                    import('./platform-upload-collection-docs.component').then(
                        (c) => c.PlatformUploadColletionDocsComponent
                    )
            },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.uploadCollection } },
            { path: 'i18n', component: I18nDocsComponent, data: getI18nKey('platformUploadCollection') }
        ]
    }
];
