import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent } from '../../../documentation/core-helpers/api/api.component';
import { API_FILES } from '../../api-files';
import { SharedDocumentationModule } from '../../../documentation/shared-documentation.module';
import { BarDocsComponent } from './bar-docs.component';
import {
    BarDefaultExampleComponent,
    BarHeaderExampleComponent,
    BarSubHeaderExampleComponent,
    BarHeaderSubHeaderExampleComponent,
    BarFooterExampleComponent,
    BarFloatingFooterExampleComponent,
    BarPageExampleComponent,
    BarPageResponsiveExampleComponent
} from './examples/bar-examples.component';
import { BarHeaderComponent } from './bar-header/bar-header.component';
import { BarModule, ImageModule } from '@fundamental-ngx/core';


const routes: Routes = [
    {
        path: '',
        component: BarHeaderComponent,
        children: [
            { path: '', component: BarDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.bar } }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        SharedDocumentationModule,
        BarModule,
        ImageModule
    ],
    exports: [RouterModule],
    declarations: [
        BarDocsComponent,
        BarHeaderComponent,
        BarDefaultExampleComponent,
        BarHeaderExampleComponent,
        BarSubHeaderExampleComponent,
        BarHeaderSubHeaderExampleComponent,
        BarFooterExampleComponent,
        BarFloatingFooterExampleComponent,
        BarPageExampleComponent,
        BarPageResponsiveExampleComponent
    ],
})
export class BarDocsModule {
}
