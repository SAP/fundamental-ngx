import { Routes } from '@angular/router';
import { ApiComponent, ApiDocsService, currentComponentProvider } from '@fundamental-ngx/docs/shared';
import { API_FILES } from '../shared/src';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./segmented-button-header/segmented-button-header.component').then(
                (c) => c.SegmentedButtonHeaderComponent
            ),
        providers: [currentComponentProvider('segmented-button'), ApiDocsService],
        children: [
            {
                path: '',
                loadComponent: () =>
                    import('./segmented-button-docs.component').then((c) => c.SegmentedButtonDocsComponent)
            },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.segmentedButton } }
        ]
    }
];
