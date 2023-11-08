import { Routes } from '@angular/router';
import { SliderDocsComponent } from './slider-docs.component';
import { SliderHeaderComponent } from './slider-header/slider-header.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: SliderHeaderComponent,
        children: [
            {
                path: '',
                component: SliderDocsComponent
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
