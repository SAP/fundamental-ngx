import { Routes } from '@angular/router';
import { API_FILES } from '@fundamental-ngx/docs/platform/shared';
import {
    ApiComponent,
    ApiDocsService,
    I18nDocsComponent,
    currentComponentProvider,
    getI18nKey
} from '@fundamental-ngx/docs/shared';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./platform-wizard-generator-header/platform-wizard-generator-header.component').then(
                (c) => c.PlatformWizardGeneratorHeaderComponent
            ),
        providers: [currentComponentProvider('wizard-generator'), ApiDocsService],
        children: [
            {
                path: '',
                loadComponent: () =>
                    import('./platform-wizard-generator-docs.component').then(
                        (c) => c.PlatformWizardGeneratorDocsComponent
                    )
            },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.wizardGenerator } },
            { path: 'i18n', component: I18nDocsComponent, data: getI18nKey('platformWizardGenerator') }
        ]
    }
];
