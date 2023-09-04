import { Routes } from '@angular/router';
import { moduleDeprecationsProvider } from '@fundamental-ngx/cdk/utils';
import { DeprecatedToolbarSizeDirective } from '@fundamental-ngx/core/toolbar';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('./toolbar-header/toolbar-header.component').then((c) => c.ToolbarHeaderComponent),
        providers: [moduleDeprecationsProvider(DeprecatedToolbarSizeDirective)],
        children: [
            {
                path: '',
                loadComponent: () =>
                    import('./toolbar-documentation.component').then((c) => c.ToolbarDocumentationComponent)
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'toolbar';
export const API_FILE_KEY = 'toolbar';
