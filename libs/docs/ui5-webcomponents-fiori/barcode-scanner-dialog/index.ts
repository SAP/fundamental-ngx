import { Routes } from '@angular/router';
import { BarcodeScannerDialogDocs } from './barcode-scanner-dialog-docs';
import { BarcodeScannerDialogHeader } from './header/barcode-scanner-dialog-header';

export const ROUTES: Routes = [
    {
        path: '',
        component: BarcodeScannerDialogHeader,
        data: { primary: true },
        children: [
            {
                path: '',
                component: BarcodeScannerDialogDocs
            }
        ]
    }
];
export const LIBRARY_NAME = 'barcode-scanner-dialog';
export const API_FILE_KEY = 'barcodeScannerDialog';
