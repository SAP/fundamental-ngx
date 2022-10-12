import { Routes } from '@angular/router';
import { CxDocumentationComponent } from './documentation/cx-documentation.component';
import { HomeDocsComponent } from './component-docs/cx-home/cx-home.component';
import { NewComponentComponent } from './component-docs/new-component/new-component.component';

// BEING UPDATED WITH THE SAP-COMPONENT SCHEMATIC; DO NOT MODIFY THE STRUCTURE!
export const ROUTES: Routes = [
    {
        path: '',
        component: CxDocumentationComponent,
        children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeDocsComponent },
            { path: 'new-component', component: NewComponentComponent },
            {
                path: 'i18n',
                loadChildren: () => import('@fundamental-ngx/docs/shared').then((m) => m.PlatformI18nDocsModule)
            }
        ]
    }
];
