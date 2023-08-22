import { Routes } from '@angular/router';
import { moduleDeprecationsProvider } from '@fundamental-ngx/cdk/utils';
import { API_FILES } from '@fundamental-ngx/docs/platform/shared';
import { ApiComponent, ApiDocsService, currentComponentProvider } from '@fundamental-ngx/docs/shared';
import { DeprecatedButtonAriaPressed, DeprecatedButtonAriaSelected } from '@fundamental-ngx/platform/button';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./platform-button-header/platform-button-header.component').then(
                (c) => c.PlatformButtonHeaderComponent
            ),
        providers: [
            moduleDeprecationsProvider(DeprecatedButtonAriaPressed),
            moduleDeprecationsProvider(DeprecatedButtonAriaSelected),
            currentComponentProvider('button'),
            ApiDocsService
        ],
        children: [
            {
                path: '',
                loadComponent: () =>
                    import('./platform-button-docs.component').then((c) => c.PlatformButtonDocsComponent)
            },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.button } }
        ]
    }
];
