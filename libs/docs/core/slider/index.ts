import { Routes } from '@angular/router';
import {
    ApiComponent,
    ApiDocsService,
    I18nDocsComponent,
    currentComponentProvider,
    getI18nKey
} from '@fundamental-ngx/docs/shared';
import { API_FILES } from '../shared/src';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('./slider-header/slider-header.component').then((c) => c.SliderHeaderComponent),
        providers: [currentComponentProvider('slider'), ApiDocsService],
        children: [
            {
                path: '',
                loadComponent: () => import('./slider-docs.component').then((c) => c.SliderDocsComponent)
            },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.slider } },
            { path: 'i18n', component: I18nDocsComponent, data: getI18nKey('coreSlider') }
        ]
    }
];
