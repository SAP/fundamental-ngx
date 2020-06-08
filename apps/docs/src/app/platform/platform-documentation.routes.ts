import { Routes } from '@angular/router';
import { PlatformDocumentationComponent } from './documentation/platform-documentation.component';
import { PlatformHomeComponent } from './component-docs/platform-home/platform-home.component';
import { NewComponentComponent } from './component-docs/new-component/new-component.component';

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
                loadChildren: () =>
                    import('./component-docs/platform-button/platform-button.module').then(
                        (m) => m.PlatformButtonDocsModule
                    )
            },
            {
                path: 'action-bar',
                loadChildren: () =>
                    import('./component-docs/platform-action-bar/platform-action-bar.module').then(
                        (m) => m.PlatformActionBarDocsModule
                    )
            },
            {
                path: 'link',
                loadChildren: () =>
                    import('./component-docs/platform-link/platform-link.module').then((m) => m.PlatformLinkDocsModule)
            },
            {
                path: 'menu',
                loadChildren: () =>
                    import('./component-docs/platform-menu/platform-menu.module').then((m) => m.PlatformMenuDocsModule)
            },
            {
                path: 'menu-button',
                loadChildren: () =>
                    import('./component-docs/platform-menu-button/platform-menu-button.module').then(
                        (m) => m.PlatformMenuButtonDocsModule
                    )
            },
            {
                path: 'search-field',
                loadChildren: () =>
                    import('./component-docs/platform-search-field/platform-search-field.module').then(
                        (m) => m.PlatformSearchFieldDocsModule
                    )
            },
            {
                path: 'select',
                loadChildren: () =>
                    import('./component-docs/platform-select/platform-select.module').then(
                        (m) => m.PlatformSelectDocsModule
                    )
            },
            {
                path: 'radio-group',
                loadChildren: () =>
                    import('./component-docs/platform-forms/radio-group/platform-radio-group.module').then(
                        (m) => m.PlatformRadioGroupDocsModule
                    )
            },
            {
                path: 'split-menu-button',
                loadChildren: () =>
                    import('./component-docs/platform-split-menu-button/platform-split-menu-button.module').then(
                        (m) => m.PlatformSplitMenuButtonDocsModule
                    )
            },
            {
                path: 'info-label',
                loadChildren: () =>
                    import('./component-docs/platform-info-label/platform-info-label-docs-module').then((m) => m.PlatformInfoLabelDocsModule)
            },
        ]
    }
];
