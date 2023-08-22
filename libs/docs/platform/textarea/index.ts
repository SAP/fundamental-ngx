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
            import('./platform-textarea-header/platform-textarea-header.component').then(
                (c) => c.PlatformTextareaHeaderComponent
            ),
        providers: [currentComponentProvider('textarea'), ApiDocsService],
        children: [
            {
                path: '',
                loadComponent: () =>
                    import('./platform-textarea-docs.component').then((c) => c.PlatformTextareaDocsComponent)
            },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.textarea } },
            { path: 'i18n', component: I18nDocsComponent, data: getI18nKey('platformTextarea') }
        ]
    }
];
