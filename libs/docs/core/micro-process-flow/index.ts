import { Routes } from '@angular/router';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./micro-process-flow-header/micro-process-flow-header.component').then(
                (c) => c.MicroProcessFlowHeaderComponent
            ),
        children: [
            {
                path: '',
                loadComponent: () =>
                    import('./micro-process-flow-docs.component').then((c) => c.MicroProcessFlowDocsComponent)
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'micro-process-flow';
export const API_FILE_KEY = 'microProcessFlow';
