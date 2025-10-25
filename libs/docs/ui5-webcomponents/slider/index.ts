import { Routes } from '@angular/router';
import { SliderHeaderComponent } from './header/slider-header';
import { SliderDocsComponent } from './slider-docs';

export const ROUTES: Routes = [
    {
        path: '',
        component: SliderHeaderComponent,
        data: { primary: true },
        children: [
            {
                path: '',
                component: SliderDocsComponent
            }
        ]
    }
];
export const LIBRARY_NAME = 'slider';
export const API_FILE_KEY = 'slider';
