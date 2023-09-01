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
            import('./platform-multi-combobox-header/platform-multi-combobox-header.component').then(
                (c) => c.PlatformMultiComboboxHeaderComponent
            ),
        providers: [currentComponentProvider('multi-combobox'), ApiDocsService],
        children: [
            {
                path: '',
                loadComponent: () =>
                    import('./platform-multi-combobox-docs.component').then((c) => c.PlatformMultiComboboxDocsComponent)
            },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.multiCombobox } },
            { path: 'i18n', component: I18nDocsComponent, data: getI18nKey('platformMultiCombobox') }
        ]
    }
];
