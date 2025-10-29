import { Routes } from '@angular/router';
import { ColorPaletteDocs } from './color-palette-docs';
import { ColorPaletteHeader } from './header/color-palette-header';

export const ROUTES: Routes = [
    {
        path: '',
        component: ColorPaletteHeader,
        data: { primary: true },
        children: [
            {
                path: '',
                component: ColorPaletteDocs
            }
        ]
    }
];
export const LIBRARY_NAME = 'color-palette';
export const API_FILE_KEY = 'colorPalette';
