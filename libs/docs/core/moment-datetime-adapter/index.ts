import { Routes } from '@angular/router';
import { CURRENT_LIB } from '@fundamental-ngx/docs/shared';
import { MomentDatetimeAdapterDocsComponent } from './moment-datetime-adapter-docs.component';
import { MomentDatetimeAdapterHeaderComponent } from './moment-datetime-adapter-header/moment-datetime-adapter-header.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: MomentDatetimeAdapterHeaderComponent,
        providers: [
            {
                provide: CURRENT_LIB,
                useValue: 'moment-adapter'
            }
        ],
        children: [
            {
                path: '',
                component: MomentDatetimeAdapterDocsComponent
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'moment-datetime-adapter';
export const LIBRARY_IMPORT_PATH = '@fundamental-ngx/moment-adapter';
export const API_FILE_KEY = 'momentDatetimeAdapter';
