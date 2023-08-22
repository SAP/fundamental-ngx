import { Routes } from '@angular/router';
import { ApiComponent, ApiDocsService, currentComponentProvider } from '@fundamental-ngx/docs/shared';
import { API_FILES } from '../shared/src';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./carousel-header/carousel-header.component').then((c) => c.CarouselHeaderComponent),
        providers: [currentComponentProvider('carousel'), ApiDocsService],
        children: [
            {
                path: '',
                loadComponent: () => import('./carousel-docs.component').then((c) => c.CarouselDocsComponent)
            },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.carousel } }
        ]
    }
];
