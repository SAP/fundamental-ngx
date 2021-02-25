import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ApiComponent } from '../../../documentation/core-helpers/api/api.component';
import { API_FILES } from '../../api-files';
import { SharedDocumentationModule } from '../../../documentation/shared-documentation.module';

import { VariantManagementDocsComponent } from './variant-management-docs.component';
import {
    VariantManagementHeaderComponent
} from './variant-management-header/variant-management-header.component';

import {
    VariantManagementExampleComponent
} from './examples/variant-management-example/variant-management-example.component';
import {
    VariantManagementCustomLabelExampleComponent
} from './examples/variant-management-custom-label-example/variant-management-custom-label-example.component';
import {
    VariantManagementHeaderSizeExampleComponent
} from './examples/variant-management-header-size-example/variant-management-header-size-example.component';


import {
    TableModule,
    VariantManagementModule,
    ToolbarModule,
    PopoverModule,
    ListModule,
    FormModule,
    MessageToastModule,
    CheckboxModule
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
        FormsModule,
        CheckboxModule
    ],
    exports: [RouterModule],
    declarations: [
        VariantManagementHeaderComponent,
        VariantManagementDocsComponent,
        VariantManagementExampleComponent,
        VariantManagementCustomLabelExampleComponent,
        VariantManagementHeaderSizeExampleComponent
    ]
})
export class VariantManagementDocsModule { }
