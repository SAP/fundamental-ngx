import { Routes } from '@angular/router';
import { PlatformSliderDocsComponent } from './slider-docs.component';
import { SliderHeaderComponent } from './slider-header/slider-header.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: SliderHeaderComponent,
        children: [
            {
                path: '',
                component: PlatformSliderDocsComponent
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'slider';
export const LIBRARY_IMPORT_PATH = '@fundamental-ngx/platform/slider';
export const API_FILE_KEY = 'slider';
