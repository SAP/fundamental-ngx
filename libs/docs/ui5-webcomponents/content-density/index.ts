import { Routes } from '@angular/router';
import { ContentDensityDocs } from './content-density-docs';
import { ContentDensityHeader } from './header/content-density-header';

export const ROUTES: Routes = [
    {
        path: '',
        component: ContentDensityHeader,
        data: { primary: true },
        children: [
            {
                path: '',
                component: ContentDensityDocs
            }
        ]
    }
];
export const LIBRARY_NAME = 'content-density';
export const API_FILE_KEY = 'contentDensity';
