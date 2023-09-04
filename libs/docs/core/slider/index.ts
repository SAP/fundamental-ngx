import { Routes } from '@angular/router';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('./slider-header/slider-header.component').then((c) => c.SliderHeaderComponent),
        children: [
            {
                path: '',
                loadComponent: () => import('./slider-docs.component').then((c) => c.SliderDocsComponent)
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'slider';
export const API_FILE_KEY = 'slider';
export const I18N_KEY = 'coreSlider';
