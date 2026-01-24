import { Routes } from '@angular/router';

/**
 * Application routes for the documentation site.
 * Uses a unified shell that displays all packages in the side navigation.
 * Each package's routes are loaded lazily and their providers are included.
 */
export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('@fundamental-ngx/docs/shared-pages').then((m) => m.UnifiedDocsShellPageComponent),
        children: [
            {
                path: 'core',
                loadChildren: () =>
                    import('@fundamental-ngx/docs/core').then((m) => {
                        const route = m.default[0];
                        return [
                            {
                                path: '',
                                providers: route.providers || [],
                                children: route.children
                            }
                        ];
                    })
            },
            {
                path: 'btp',
                loadChildren: () =>
                    import('@fundamental-ngx/docs/btp').then((m) => {
                        const route = m.default[0];
                        return [
                            {
                                path: '',
                                providers: route.providers || [],
                                children: route.children
                            }
                        ];
                    })
            },
            {
                path: 'platform',
                loadChildren: () =>
                    import('@fundamental-ngx/docs/platform').then((m) => {
                        const route = m.default[0];
                        return [
                            {
                                path: '',
                                providers: route.providers || [],
                                children: route.children
                            }
                        ];
                    })
            },
            {
                path: 'cx',
                loadChildren: () =>
                    import('@fundamental-ngx/docs/cx').then((m) => {
                        const route = m.default[0];
                        return [
                            {
                                path: '',
                                providers: route.providers || [],
                                children: route.children
                            }
                        ];
                    })
            },
            {
                path: 'cdk',
                loadChildren: () =>
                    import('@fundamental-ngx/docs/cdk').then((m) => {
                        const route = m.default[0];
                        return [
                            {
                                path: '',
                                providers: route.providers || [],
                                children: route.children
                            }
                        ];
                    })
            },
            {
                path: 'i18n',
                loadChildren: () =>
                    import('@fundamental-ngx/docs/i18n').then((m) => {
                        const route = m.default[0];
                        return [
                            {
                                path: '',
                                providers: route.providers || [],
                                children: route.children
                            }
                        ];
                    })
            },
            {
                path: 'ui5-webcomponents',
                loadChildren: () =>
                    import('@fundamental-ngx/docs/ui5-webcomponents').then((m) => {
                        const route = m.default[0];
                        return [
                            {
                                path: '',
                                providers: route.providers || [],
                                children: route.children
                            }
                        ];
                    })
            },
            {
                path: 'ui5-webcomponents-ai',
                loadChildren: () =>
                    import('@fundamental-ngx/docs/ui5-webcomponents-ai').then((m) => {
                        const route = m.default[0];
                        return [
                            {
                                path: '',
                                providers: route.providers || [],
                                children: route.children
                            }
                        ];
                    })
            },
            {
                path: 'ui5-webcomponents-fiori',
                loadChildren: () =>
                    import('@fundamental-ngx/docs/ui5-webcomponents-fiori').then((m) => {
                        const route = m.default[0];
                        return [
                            {
                                path: '',
                                providers: route.providers || [],
                                children: route.children
                            }
                        ];
                    })
            },
            { path: '', redirectTo: 'core/home', pathMatch: 'full' }
        ]
    }
];
