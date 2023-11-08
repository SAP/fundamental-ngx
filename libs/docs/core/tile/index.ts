import { Routes } from '@angular/router';
import { TileDocsHeaderComponent } from './tile-docs-header/tile-docs-header.component';
import { TileDocsComponent } from './tile-docs.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: TileDocsHeaderComponent,
        children: [
            {
                path: '',
                component: TileDocsComponent
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'tile';
export const API_FILE_KEY = 'tile';
