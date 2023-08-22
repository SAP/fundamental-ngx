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
            import('./platform-combobox-header/platform-combobox-header.component').then(
                (c) => c.PlatformComboboxHeaderComponent
            ),
        providers: [currentComponentProvider('combobox'), ApiDocsService],
        children: [
            {
                path: '',
                loadComponent: () =>
                    import('./platform-combobox-docs.component').then((c) => c.PlatformComboboxDocsComponent)
            },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.combobox } },
            { path: 'i18n', component: I18nDocsComponent, data: getI18nKey('platformCombobox') }
        ]
    }
];
