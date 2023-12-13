import { Routes } from '@angular/router';
import { DndDocsComponent } from './dnd-docs.component';
import { DndHeaderComponent } from './dnd-header/dnd-header.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: DndHeaderComponent,
        data: { primary: true },
        children: [
            {
                path: '',
                component: DndDocsComponent
            }
        ]
    }
];

export const LIBRARY_NAME = 'drag-n-drop';
export const LIBRARY_IMPORT_PATH = '@fundamental-ngx/cdk/utils';
export const API_FILE_KEY = 'dnd';
