import { Routes } from '@angular/router';
import { currentComponentProvider } from '@fundamental-ngx/docs/shared';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./platform-i18n-header/platform-i18n-header.component').then((m) => m.PlatformI18nHeaderComponent),
        providers: [currentComponentProvider('i18n')],
        children: [
            {
                path: '',
                loadComponent: () => import('./platform-i18n-docs.component').then((m) => m.PlatformI18nDocsComponent)
            }
        ]
    }
];
