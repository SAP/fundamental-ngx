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
            import('./platform-vhd-header/platform-vhd-header.component').then((c) => c.PlatformVhdHeaderComponent),
        providers: [currentComponentProvider('vhd'), ApiDocsService],
        children: [
            {
                path: '',
                loadComponent: () => import('./platform-vhd.docs.component').then((c) => c.PlatformVhdDocsComponent)
            },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.valueHelpDialog } },
            { path: 'i18n', component: I18nDocsComponent, data: getI18nKey('platformVHD') }
        ]
    }
];
