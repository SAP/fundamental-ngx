import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedDocumentationPageModule } from '../../../documentation/shared-documentation-page.module';
import { ApiComponent } from '../../../documentation/core-helpers/api/api.component';
import { API_FILES } from '../../api-files';


import { FlexibleColumnLayoutDocsComponent } from './flexible-column-layout-docs.component';
import { FlexibleColumnLayoutDocsHeaderComponent } from './flexible-column-layout-docs-header/flexible-column-layout-docs-header.component';


import { FlexibleColumnLayoutExampleComponent } from './examples/default/flexible-column-layout-example.component';
import { FlexibleColumnLayoutDynamicPageExampleComponent } from './examples/dynamic-page/flexible-column-layout-dynamic-page-example.component';
import { FlexibleColumnLayoutModule } from '@fundamental-ngx/core/flexible-column-layout';
import { DynamicPageModule } from '@fundamental-ngx/core/dynamic-page';
import { ToolbarModule } from '@fundamental-ngx/core/toolbar';
import { ButtonModule } from '@fundamental-ngx/core/button';

const routes: Routes = [
    {
        path: '',
        component: FlexibleColumnLayoutDocsHeaderComponent,
        children: [
            { path: '', component: FlexibleColumnLayoutDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.flexibleColumnLayout } }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        SharedDocumentationPageModule,
        FlexibleColumnLayoutModule,
        DynamicPageModule,
        ToolbarModule,
        ButtonModule
    ],
    exports: [RouterModule],
    declarations: [
        FlexibleColumnLayoutDocsComponent,
        FlexibleColumnLayoutExampleComponent,
        FlexibleColumnLayoutDynamicPageExampleComponent,
        FlexibleColumnLayoutDocsHeaderComponent
    ]
})
export class FlexibleColumnLayoutDocsModule {}
