import { Routes } from '@angular/router';
import { PlatformIconTabBarDocsComponent } from './platform-icon-tab-bar-docs.component';
import { PlatformIconTabBarHeaderComponent } from './platform-icon-tab-bar-header/platform-icon-tab-bar-header.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: PlatformIconTabBarHeaderComponent,
        children: [
            {
                path: '',
                component: PlatformIconTabBarDocsComponent
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'icon-tab-bar';
export const API_FILE_KEY = 'iconTabBar';

export * from './examples/tabs-content/icon-tab-bar-tabs-content-example.component';
