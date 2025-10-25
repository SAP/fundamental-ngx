import { Routes } from '@angular/router';
import { CarouselDocs } from './carousel-docs';
import { CarouselHeader } from './header/carousel-header';

export const ROUTES: Routes = [
    {
        path: '',
        component: CarouselHeader,
        data: { primary: true },
        children: [
            {
                path: '',
                component: CarouselDocs
            }
        ]
    }
];
export const LIBRARY_NAME = 'carousel';
export const API_FILE_KEY = 'carousel';
