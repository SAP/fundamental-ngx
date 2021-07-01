import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ApiComponent } from '../../../documentation/core-helpers/api/api.component';
import { API_FILES } from '../../api-files';
import { SharedDocumentationModule } from '../../../documentation/shared-documentation.module';
import { SharedDocumentationPageModule } from '../../../documentation/shared-documentation-page.module';
import { ObjectNumberDocsComponent } from './object-number-docs.component';
import {
    ObjectNumberBasicExampleComponent,
    ObjectNumberBoldExampleComponent,
    ObjectNumberDecimalExampleComponent,
    ObjectNumberLargeExampleComponent,
    ObjectNumberStatusExampleComponent,
    ObjectNumberTruncationExampleComponent,
    ObjectNumberUnitsExampleComponent
} from './examples/object-number-examples.component';
import { ObjectNumberHeaderComponent } from './object-number-header/object-number-header.component';
import { ObjectNumberModule } from '@fundamental-ngx/core/object-number';

const routes: Routes = [
    {
        path: '',
        component: ObjectNumberHeaderComponent,
        children: [
            { path: '', component: ObjectNumberDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.objectNumber } }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        SharedDocumentationModule,
        SharedDocumentationPageModule,
        ObjectNumberModule
    ],
    exports: [RouterModule],
    declarations: [
        ObjectNumberHeaderComponent,
        ObjectNumberDocsComponent,
        ObjectNumberBasicExampleComponent,
        ObjectNumberBoldExampleComponent,
        ObjectNumberLargeExampleComponent,
        ObjectNumberUnitsExampleComponent,
        ObjectNumberStatusExampleComponent,
        ObjectNumberDecimalExampleComponent,
        ObjectNumberTruncationExampleComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ObjectNumberDocsModule {}
