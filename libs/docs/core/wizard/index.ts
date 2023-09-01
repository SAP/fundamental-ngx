import { Routes } from '@angular/router';
import { API_FILES } from '@fundamental-ngx/docs/core/shared';
import { ApiComponent, ApiDocsService, currentComponentProvider } from '@fundamental-ngx/docs/shared';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('./wizard-header/wizard-header.component').then((c) => c.WizardHeaderComponent),
        providers: [currentComponentProvider('wizard'), ApiDocsService],
        children: [
            {
                path: '',
                loadComponent: () => import('./wizard-docs.component').then((c) => c.WizardDocsComponent)
            },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.wizard } }
        ]
    }
];
