import { Routes } from '@angular/router';
import { DynamicPageDocsComponent } from './dynamic-page-docs.component';
import { DynamicPageDocsHeaderComponent } from './dynamic-page-header/dynamic-page-docs-header.component';
import { DummyComponent } from './examples/dynamic-page-routing/dynamic-page-routing-example.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: DynamicPageDocsHeaderComponent,
        children: [
            {
                path: '',
                component: DynamicPageDocsComponent,
                children: [
                    {
                        path: 'example1',
                        component: DummyComponent,
                        data: {
                            text: `I'm example 1`
                        }
                    },
                    {
                        path: 'example2',
                        component: DummyComponent,
                        data: {
                            text: `I'm example 2`
                        }
                    },
                    {
                        path: 'example3',
                        component: DummyComponent,
                        data: {
                            text: `I'm example 3`
                        }
                    }
                ]
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'dynamic-page';
export const API_FILE_KEY = 'dynamicPage';
export const I18N_KEY = 'coreDynamicPage';
