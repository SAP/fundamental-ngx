import { Routes } from '@angular/router';
import { CoreDocumentationComponent } from './documentation/experimental-documentation.component';
import { HomeDocsComponent } from './component-docs/experimental-home/experimental-home.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: CoreDocumentationComponent,
        children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeDocsComponent },
            {
                path: 'button',
                loadChildren: () => import('./component-docs/button/button-docs.module').then((m) => m.ButtonDocsModule)
            },
            {
                path: 'checkbox',
                loadChildren: () => import('./component-docs/checkbox/checkbox-docs.module').then((m) => m.CheckboxDocsModule)
            },
            {
                path: 'select',
                loadChildren: () => import('./component-docs/select/select-docs.module').then((m) => m.SelectDocsModule)
            },
            {
                path: 'tabs',
                loadChildren: () => import('./component-docs/tabs/tabs-docs.module').then((m) => m.TabsDocsModule)
            },
            {
                path: 'switch',
                loadChildren: () => import('./component-docs/switch/switch-docs.module').then((m) => m.SwitchDocsModule)
            },
            {
                path: 'radio',
                loadChildren: () => import('./component-docs/radio/radio-docs.module').then((m) => m.RadioDocsModule)
            },
            {
                path: 'input',
                loadChildren: () => import('./component-docs/input/input-docs.module').then((m) => m.InputDocsModule)
            },
            {
                path: 'search',
                loadChildren: () => import('./component-docs/search/search-docs.module').then((m) => m.SearchDocsModule)
            }
        ]
    }
];
