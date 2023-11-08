import { Routes } from '@angular/router';
import { moduleDeprecationsProvider } from '@fundamental-ngx/cdk/utils';
import { DeprecatedSelectCSSClasses } from '@fundamental-ngx/core/select';
import { SelectDocsComponent } from './select-docs.component';
import { SelectHeaderComponent } from './select-header/select-header.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: SelectHeaderComponent,
        providers: [moduleDeprecationsProvider(DeprecatedSelectCSSClasses)],
        children: [
            {
                path: '',
                component: SelectDocsComponent
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'select';
export const API_FILE_KEY = 'select';
