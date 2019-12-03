import { Routes } from '@angular/router';
import { PlatformDocumentationComponent } from './documentation/platform-documentation.component';
import { PlatformHomeComponent } from './component-docs/platform-home/platform-home.component';
import { PlatformButtonDocsComponent } from './component-docs/platform-button/platform-button-docs.component';
import { PlatformButtonHeaderComponent } from './component-docs/platform-button/platform-button-header/platform-button-header.component';
import { ApiComponent } from './../documentation/core-helpers/api/api.component';
import { API_FILES } from './api-files';
import { NewComponentComponent } from './component-docs/new-component/new-component.component';
import { PlatformMenuHeaderComponent } from './component-docs/platform-menu/platform-menu-header/platform-menu-header.component';
import { PlatformMenuDocsComponent } from './component-docs/platform-menu/platform-menu-docs.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: PlatformDocumentationComponent,
        children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: PlatformHomeComponent },
            { path: 'new-component', component: NewComponentComponent },
            {
                path: 'button',
                component: PlatformButtonHeaderComponent,
                children: [
                    { path: '', component: PlatformButtonDocsComponent },
                    { path: 'api', component: ApiComponent, data: { content: API_FILES.button } }
                ]
            },
            {
                path: 'menu',
                component: PlatformMenuHeaderComponent,
                children: [
                    { path: '', component: PlatformMenuDocsComponent },
                    { path: 'api', component: ApiComponent, data: { content: API_FILES.menu } }
                ]
            }
        ]
    }
];
