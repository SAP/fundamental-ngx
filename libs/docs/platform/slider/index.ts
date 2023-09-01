import { Routes } from '@angular/router';
import { API_FILES } from '@fundamental-ngx/docs/platform/shared';
import { ApiComponent, ApiDocsService, currentComponentProvider } from '@fundamental-ngx/docs/shared';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('./slider-header/slider-header.component').then((c) => c.SliderHeaderComponent),
        providers: [currentComponentProvider('slider'), ApiDocsService],
        children: [
            {
                path: '',
                loadComponent: () => import('./slider-docs.component').then((c) => c.PlatformSliderDocsComponent)
            },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.slider } }
        ]
    }
];
