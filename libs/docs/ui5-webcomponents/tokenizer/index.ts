import { Routes } from '@angular/router';
import { TokenizerHeader } from './header/tokenizer-header';
import { TokenizerDocs } from './tokenizer-docs';

export const ROUTES: Routes = [
    {
        path: '',
        component: TokenizerHeader,
        data: { primary: true },
        children: [
            {
                path: '',
                component: TokenizerDocs
            }
        ]
    }
];
export const LIBRARY_NAME = 'tokenizer';
export const API_FILE_KEY = 'tokenizer';
