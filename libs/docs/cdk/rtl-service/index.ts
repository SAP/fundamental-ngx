import { Routes } from '@angular/router';
import { RtlServiceDocsComponent } from './rtl-service-docs.component';
import { RtlServiceHeaderComponent } from './rtl-service-header/rtl-service-header.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: RtlServiceHeaderComponent,
        children: [
            {
                path: '',
                component: RtlServiceDocsComponent
            }
        ],
        data: {
            primary: true
        }
    }
];

export const LIBRARY_NAME = 'rtl-service';
export const API_FILE_KEY = 'rtlService';
