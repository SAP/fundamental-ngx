import { Routes } from '@angular/router';
import { InfiniteScrollDocsComponent } from './infinite-scroll-docs.component';
import { InfiniteScrollHeaderComponent } from './infinite-scroll-header/infinite-scroll-header.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: InfiniteScrollHeaderComponent,
        children: [
            {
                path: '',
                component: InfiniteScrollDocsComponent
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'infinite-scroll';
export const LIBRARY_IMPORT_PATH = '@fundamental-ngx/core/infinite-scroll';
export const API_FILE_KEY = 'infiniteScroll';
