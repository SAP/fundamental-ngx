import { Routes } from '@angular/router';
import { moduleDeprecationsProvider } from '@fundamental-ngx/cdk/utils';
import { DeprecatedToolbarSizeDirective } from '@fundamental-ngx/core/toolbar';
import { ToolbarDocumentationComponent } from './toolbar-documentation.component';
import { ToolbarHeaderComponent } from './toolbar-header/toolbar-header.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: ToolbarHeaderComponent,
        providers: [moduleDeprecationsProvider(DeprecatedToolbarSizeDirective)],
        children: [
            {
                path: '',
                component: ToolbarDocumentationComponent
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'toolbar';
export const LIBRARY_IMPORT_PATH = '@fundamental-ngx/core/toolbar';
export const API_FILE_KEY = 'toolbar';
