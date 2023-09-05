import { Routes } from '@angular/router';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./message-popover-header/message-popover-header.component').then(
                (c) => c.MessagePopoverHeaderComponent
            ),
        children: [
            {
                path: '',
                loadComponent: () =>
                    import('./message-popover-docs.component').then((c) => c.MessagePopoverDocsComponent)
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'message-popover';
export const API_FILE_KEY = 'messagePopover';
export const I18N_KEY = 'platformMessagePopover';
