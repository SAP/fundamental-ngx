import { Routes } from '@angular/router';
import { ResponsivePopoverHeader } from './header/responsive-popover-header';
import { ResponsivePopoverDocs } from './responsive-popover-docs';

export const ROUTES: Routes = [
    {
        path: '',
        component: ResponsivePopoverHeader,
        data: { primary: true },
        children: [
            {
                path: '',
                component: ResponsivePopoverDocs
            }
        ]
    }
];
export const LIBRARY_NAME = 'responsive-popover';
export const API_FILE_KEY = 'responsivePopover';
