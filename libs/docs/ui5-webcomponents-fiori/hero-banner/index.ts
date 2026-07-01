import { Routes } from '@angular/router';
import { HeroBannerHeader } from './header/hero-banner-header';
import { HeroBannerDocs } from './hero-banner-docs';

export const ROUTES: Routes = [
    {
        path: '',
        component: HeroBannerHeader,
        data: { primary: true },
        children: [
            {
                path: '',
                component: HeroBannerDocs
            }
        ]
    }
];
export const LIBRARY_NAME = 'hero-banner';
export const API_FILE_KEY = 'heroBanner';
