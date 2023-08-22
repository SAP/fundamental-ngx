import { Routes } from '@angular/router';
import { ApiComponent, ApiDocsService, currentComponentProvider } from '@fundamental-ngx/docs/shared';
import { API_FILES } from '../shared/src';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./object-identifier-header/object-identifier-header.component').then(
                (c) => c.ObjectIdentifierHeaderComponent
            ),
        providers: [currentComponentProvider('object-identifier'), ApiDocsService],
        children: [
            {
                path: '',
                loadComponent: () =>
                    import('./object-identifier-docs.component').then((c) => c.ObjectIdentifierDocsComponent)
            },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.objectIdentifier } }
        ]
    }
];
