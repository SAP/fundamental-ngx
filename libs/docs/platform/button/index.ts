import { Routes } from '@angular/router';
import { moduleDeprecationsProvider } from '@fundamental-ngx/cdk/utils';
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
            moduleDeprecationsProvider(DeprecatedButtonAriaSelected)
        ],
        children: [
            {
                path: '',
                loadComponent: () =>
                    import('./platform-button-docs.component').then((c) => c.PlatformButtonDocsComponent)
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'button';
export const API_FILE_KEY = 'button';
