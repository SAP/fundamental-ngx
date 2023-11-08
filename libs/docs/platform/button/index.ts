import { Routes } from '@angular/router';
import { moduleDeprecationsProvider } from '@fundamental-ngx/cdk/utils';
import { DeprecatedButtonAriaPressed, DeprecatedButtonAriaSelected } from '@fundamental-ngx/platform/button';
import { PlatformButtonDocsComponent } from './platform-button-docs.component';
import { PlatformButtonHeaderComponent } from './platform-button-header/platform-button-header.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: PlatformButtonHeaderComponent,
        providers: [
            moduleDeprecationsProvider(DeprecatedButtonAriaPressed),
            moduleDeprecationsProvider(DeprecatedButtonAriaSelected)
        ],
        children: [
            {
                path: '',
                component: PlatformButtonDocsComponent
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'button';
export const API_FILE_KEY = 'button';
