import { Routes } from '@angular/router';
import { ApiComponent, ApiDocsService, currentComponentProvider } from '@fundamental-ngx/docs/shared';
import { API_FILES } from '../shared/src';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./upload-collection-header/upload-collection-header.component').then(
                (c) => c.UploadCollectionHeaderComponent
            ),
        providers: [currentComponentProvider('upload-collection'), ApiDocsService],
        children: [
            {
                path: '',
                loadComponent: () =>
                    import('./upload-collection-docs.component').then((c) => c.UploadCollectionDocsComponent)
            },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.uploadCollection } }
        ]
    }
];
