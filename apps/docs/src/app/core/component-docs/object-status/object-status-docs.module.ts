import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent } from '../../../documentation/core-helpers/api/api.component';
import { API_FILES } from '../../api-files';
import { ObjectStatusDocsComponent } from './object-status-docs.component';
import {
    ObjectStatusDefaultExampleComponent,
    ObjectStatusTextExampleComponent,
    ObjectStatusTextIconExampleComponent,
    ObjectStatusClickableAndIconExampleComponent,
    ObjectStatusGenericExampleComponent,
    ObjectStatusInvertedGenericTextExampleComponent,
    ObjectStatusInvertedTextExampleComponent,
    ObjectStatusLargeExampleComponent
} from './examples/object-status-examples.component';
import { ObjectStatusHeaderComponent } from './object-status-header/object-status-header.component';
import { ObjectStatusModule } from '@fundamental-ngx/core';
import { SharedDocumentationPageModule } from '../../../documentation/shared-documentation-page.module';

const routes: Routes = [
    {
        path: '',
        component: ObjectStatusHeaderComponent,
        children: [
            { path: '', component: ObjectStatusDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.objectStatus } }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes), SharedDocumentationPageModule, ObjectStatusModule],
    exports: [RouterModule],
    declarations: [
        ObjectStatusDocsComponent,
        ObjectStatusHeaderComponent,
        ObjectStatusDefaultExampleComponent,
        ObjectStatusTextExampleComponent,
        ObjectStatusTextIconExampleComponent,
        ObjectStatusClickableAndIconExampleComponent,
        ObjectStatusGenericExampleComponent,
        ObjectStatusInvertedGenericTextExampleComponent,
        ObjectStatusInvertedTextExampleComponent,
        ObjectStatusLargeExampleComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ObjectStatusDocsModule {}
