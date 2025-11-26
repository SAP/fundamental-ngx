import { Routes } from '@angular/router';
import { ColorPalettePopoverDocs } from './color-palette-popover-docs';
import { ColorPalettePopoverHeader } from './header/color-palette-popover-header';

export const ROUTES: Routes = [
    {
        path: '',
        component: ColorPalettePopoverHeader,
        data: { primary: true },
        children: [
            {
                path: '',
                component: ColorPalettePopoverDocs
            }
        ]
    }
];
export const LIBRARY_NAME = 'color-palette-popover';
export const API_FILE_KEY = 'colorPalettePopover';
