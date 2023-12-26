import { Routes } from '@angular/router';
import { SplitterRequiredParentWidthExampleComponent } from './examples/required-parent-width/splitter-required-parent-width-example.component';
import { SplitterDocsComponent } from './splitter-docs.component';
import { SplitterHeaderComponent } from './splitter-header/splitter-header.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: SplitterHeaderComponent,
        children: [
            {
                path: '',
                component: SplitterDocsComponent
            }
        ],
        data: {
            primary: true
        }
    },
    {
        path: 'example',
        component: SplitterRequiredParentWidthExampleComponent
    }
];
export const LIBRARY_NAME = 'splitter';
export const API_FILE_KEY = 'splitter';
export const I18N_KEY = 'coreSplitter';
