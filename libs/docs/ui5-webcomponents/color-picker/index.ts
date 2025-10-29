import { Routes } from '@angular/router';
import { ColorPickerDocs } from './color-picker-docs';
import { ColorPickerHeader } from './header/color-picker-header';

export const ROUTES: Routes = [
    {
        path: '',
        component: ColorPickerHeader,
        data: { primary: true },
        children: [
            {
                path: '',
                component: ColorPickerDocs
            }
        ]
    }
];
export const LIBRARY_NAME = 'color-picker';
export const API_FILE_KEY = 'colorPicker';
