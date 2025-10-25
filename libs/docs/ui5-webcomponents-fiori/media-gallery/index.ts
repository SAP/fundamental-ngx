import { Routes } from '@angular/router';
import { MediaGalleryHeader } from './header/media-gallery-header';
import { MediaGalleryDocs } from './media-gallery-docs';

export const ROUTES: Routes = [
    {
        path: '',
        component: MediaGalleryHeader,
        data: { primary: true },
        children: [
            {
                path: '',
                component: MediaGalleryDocs
            }
        ]
    }
];
export const LIBRARY_NAME = 'media-gallery';
export const API_FILE_KEY = 'mediaGallery';
