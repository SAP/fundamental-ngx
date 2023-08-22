import { Routes } from '@angular/router';
import { API_FILES } from '@fundamental-ngx/docs/platform/shared';
import { ApiComponent, ApiDocsService, currentComponentProvider } from '@fundamental-ngx/docs/shared';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./platform-file-uploader-header/platform-file-uploader-header.component').then(
                (c) => c.PlatformFileUploaderHeaderComponent
            ),
        providers: [currentComponentProvider('file-uploader'), ApiDocsService],
        children: [
            {
                path: '',
                loadComponent: () =>
                    import('./platform-file-uploader-docs.component').then((c) => c.PlatformFileUploaderDocsComponent)
            },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.fileUploader } }
        ]
    }
];
