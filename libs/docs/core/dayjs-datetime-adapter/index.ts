import { Routes } from '@angular/router';
import { DayjsDatetimeAdapterDocsComponent } from './dayjs-datetime-adapter-docs.component';
import { DayjsDatetimeAdapterHeaderComponent } from './dayjs-datetime-adapter-header/dayjs-datetime-adapter-header.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: DayjsDatetimeAdapterHeaderComponent,
        children: [
            {
                path: '',
                component: DayjsDatetimeAdapterDocsComponent
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'dayjs-datetime-adapter';
export const API_FILE_KEY = 'dayjsDatetimeAdapter';
