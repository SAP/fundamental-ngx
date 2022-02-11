import { Routes } from '@angular/router';
import { CoreDocumentationComponent } from './documentation/fn-documentation.component';
import { HomeDocsComponent } from './component-docs/fn-home/fn-home.component';

// BEING UPDATED WITH THE SAP-COMPONENT SCHEMATIC; DO NOT MODIFY THE STRUCTURE!
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
                loadChildren: () =>
                    import('./component-docs/checkbox/checkbox-docs.module').then((m) => m.CheckboxDocsModule)
            },
            {
                path: 'generic-tag',
                loadChildren: () =>
                    import('./component-docs/generic-tag/generic-tag-docs.module').then((m) => m.GenericTagDocsModule)
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
                path: 'tag',
                loadChildren: () => import('./component-docs/tag/tag-docs.module').then((m) => m.TagDocsModule)
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
            },
            {
                path: 'slider',
                loadChildren: () => import('./component-docs/slider/slider-docs.module').then((m) => m.SliderDocsModule)
            }
        ]
    }
];
