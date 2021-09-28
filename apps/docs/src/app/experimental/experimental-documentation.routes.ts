import { Routes } from '@angular/router';
import { CoreDocumentationComponent } from './documentation/experimental-documentation.component';
import { HomeDocsComponent } from './component-docs/experimental-home/experimental-home.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: CoreDocumentationComponent,
        children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeDocsComponent },
            {
                path: 'tabs',
                loadChildren: () => import('./component-docs/tabs/tabs-docs.module').then((m) => m.TabsDocsModule)
            }
        ]
    }
];
