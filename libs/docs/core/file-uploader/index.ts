import { Routes } from '@angular/router';
import { API_FILES } from '@fundamental-ngx/docs/core/shared';
import { ApiComponent, ApiDocsService, currentComponentProvider } from '@fundamental-ngx/docs/shared';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./file-uploader-header/file-uploader-header.component').then((c) => c.FileUploaderHeaderComponent),
        providers: [currentComponentProvider('file-uploader'), ApiDocsService],
        children: [
            {
                path: '',
                loadComponent: () => import('./file-uploader-docs.component').then((c) => c.FileUploaderDocsComponent)
            },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.fileUploader } }
        ]
    }
];
