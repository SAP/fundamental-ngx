import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent } from '../../../documentation/core-helpers/api/api.component';
import { API_FILES } from '../../api-files';
import { SharedDocumentationModule } from '../../../documentation/shared-documentation.module';
import { VariantManagementDocsComponent } from './variant-management-docs.component';
import { VariantManagementExampleComponent } from './examples/variant-management-example/variant-management-example.component';
import { VariantManagementHeaderComponent } from './variant-management-header/variant-management-header.component';
import {
    TableModule,
    VariantManagementModule,
    ToolbarModule,
    PopoverModule,
    ListModule,
    FormModule,
    MessageToastModule
} from '@fundamental-ngx/core';
import { SharedDocumentationPageModule } from '../../../documentation/shared-documentation-page.module';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
    {
        path: '',
        component: VariantManagementHeaderComponent,
        children: [
            { path: '', component: VariantManagementDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.variantManagement } }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes),
        SharedDocumentationModule,
        VariantManagementModule,
        SharedDocumentationPageModule,
        TableModule,
        ToolbarModule,
        PopoverModule,
        MessageToastModule,
        ListModule,
        FormModule,
        FormsModule
    ],
    exports: [RouterModule],
    declarations: [
        VariantManagementHeaderComponent,
        VariantManagementDocsComponent,
        VariantManagementExampleComponent
    ]
})
export class VariantManagementDocsModule { }
