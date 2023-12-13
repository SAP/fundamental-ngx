import { Routes } from '@angular/router';
import { CarouselDocsComponent } from './carousel-docs.component';
import { CarouselHeaderComponent } from './carousel-header/carousel-header.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: CarouselHeaderComponent,
        children: [
            {
                path: '',
                component: CarouselDocsComponent
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'carousel';
export const LIBRARY_IMPORT_PATH = '@fundamental-ngx/core/carousel';
export const API_FILE_KEY = 'carousel';
export const I18N_KEY = 'coreCarousel';
