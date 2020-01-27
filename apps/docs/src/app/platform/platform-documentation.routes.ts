import { Routes } from '@angular/router';
import { PlatformDocumentationComponent } from './documentation/platform-documentation.component';
import { PlatformHomeComponent } from './component-docs/platform-home/platform-home.component';
import { PlatformButtonDocsComponent } from './component-docs/platform-button/platform-button-docs.component';
import { PlatformButtonHeaderComponent } from './component-docs/platform-button/platform-button-header/platform-button-header.component';
import { PlatformActionbarHeaderComponent } from './component-docs/platform-action-bar/platform-action-bar-header/platform-action-bar-header.component';
import { PlatformActionBarDocsComponent } from './component-docs/platform-action-bar/platform-action-bar-docs.component';
import { ApiComponent } from './../documentation/core-helpers/api/api.component';
import { API_FILES } from './api-files';
import { NewComponentComponent } from './component-docs/new-component/new-component.component';
import { PlatformMenuHeaderComponent } from './component-docs/platform-menu/platform-menu-header/platform-menu-header.component';
import { PlatformMenuDocsComponent } from './component-docs/platform-menu/platform-menu-docs.component';
import { PlatformSelectHeaderComponent } from './component-docs/platform-select/platform-select-header/platform-select-header.component';
import { PlatformSelectDocsComponent } from './component-docs/platform-select/platform-select-docs.component';
import { LinkExampleComponent } from './component-docs/platform-link/link-example.component';

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

                path: 'action-bar',
                component: PlatformActionbarHeaderComponent,
                children: [
                    { path: '', component: PlatformActionBarDocsComponent },
                    { path: 'api', component: ApiComponent, data: { content: API_FILES.actionbar } }]
            },
          {
                path: 'menu',
                component: PlatformMenuHeaderComponent,
                children: [
                    { path: '', component: PlatformMenuDocsComponent },
                    { path: 'api', component: ApiComponent, data: { content: API_FILES.menu } }
                ]
            },
            {
                path: 'select',
                component: PlatformSelectHeaderComponent,
                children: [
                    { path: '', component: PlatformSelectDocsComponent },
                    { path: 'api', component: ApiComponent, data: { content: API_FILES.menu } }
                ]
            },
            {
                path: 'link',
                component: LinkExampleComponent,
                children: [
                    { path: '', component: LinkExampleComponent },
                    { path: 'api', component: ApiComponent, data: { content: API_FILES.menu } }
                ]
            }
        ]
    }
];
