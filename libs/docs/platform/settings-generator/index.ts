import { Routes } from '@angular/router';
import { API_FILES } from '@fundamental-ngx/docs/platform/shared';
import { ApiComponent, ApiDocsService, currentComponentProvider } from '@fundamental-ngx/docs/shared';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./settings-generator-header/settings-generator-header.component').then(
                (c) => c.SettingsGeneratorHeaderComponent
            ),
        providers: [currentComponentProvider('settings-generator'), ApiDocsService],
        children: [
            {
                path: '',
                loadComponent: () =>
                    import('./settings-generator-docs.component').then((c) => c.SettingsGeneratorDocsComponent)
            },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.settingsGenerator } }
        ]
    }
];
