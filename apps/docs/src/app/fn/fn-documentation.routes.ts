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
                path: 'switch',
                loadChildren: () => import('./component-docs/switch/switch-docs.module').then((m) => m.SwitchDocsModule)
            },
            {
                path: 'progress-bar',
                loadChildren: () =>
                    import('./component-docs/progress-bar/progress-bar-docs.module').then(
                        (m) => m.ProgressBarDocsModule
                    )
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
            },
            {
                path: 'segmented-button',
                loadChildren: () =>
                    import('./component-docs/segmented-button/segmented-button-docs.module').then(
                        (m) => m.SegmentedButtonDocsModule
                    )
            },
            {
                path: 'list',
                loadChildren: () => import('./component-docs/list/list-docs.module').then((m) => m.ListDocsModule)
            },
            {
                path: 'list-byline',
                loadChildren: () =>
                    import('./component-docs/list-byline/list-byline-docs.module').then((m) => m.ListBylineDocsModule)
            },
            {
                path: 'avatar',
                loadChildren: () => import('./component-docs/avatar/avatar-docs.module').then((m) => m.AvatarDocsModule)
            },
            {
                path: 'info-label',
                loadChildren: () =>
                    import('./component-docs/info-label/info-label-docs.module').then((m) => m.InfoLabelDocsModule)
            },
            {
                path: 'message-strip',
                loadChildren: () =>
                    import('./component-docs/message-strip/message-strip-docs.module').then(
                        (m) => m.MessageStripDocsModule
                    )
            },
            {
                path: 'object-status',
                loadChildren: () =>
                    import('./component-docs/object-status/object-status-docs.module').then(
                        (m) => m.ObjectStatusDocsModule
                    )
            },
            {
                path: 'selectable-list',
                loadChildren: () =>
                    import('./component-docs/utilities/selectable-list/selectable-list-docs.module').then(
                        (m) => m.SelectableListDocsModule
                    )
            },
            {
                path: 'focusable-list',
                loadChildren: () =>
                    import('./component-docs/utilities/focusable-list/focusable-list-docs.module').then(
                        (m) => m.FocusableListDocsModule
                    )
            },
            {
                path: 'disabled',
                loadChildren: () =>
                    import('./component-docs/utilities/fn-disabled/fn-disabled-docs.module').then(
                        (m) => m.FnDisabledDocsModule
                    )
            },
            {
                path: 'clicked',
                loadChildren: () =>
                    import('./component-docs/utilities/fn-clicked/fn-clicked-docs.module').then(
                        (m) => m.FnClickedDocsModule
                    )
            }
        ]
    }
];
