import { Routes } from '@angular/router';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('./dnd-header/dnd-header.component').then((c) => c.DndHeaderComponent),
        data: { primary: true },
        children: [
            {
                path: '',
                loadComponent: () => import('./dnd-docs.component').then((c) => c.DndDocsComponent)
            }
        ]
    }
];

export const LIBRARY_NAME = 'drag-n-drop';
