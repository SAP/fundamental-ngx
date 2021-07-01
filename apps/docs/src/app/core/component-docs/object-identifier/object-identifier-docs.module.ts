import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent } from '../../../documentation/core-helpers/api/api.component';
import { API_FILES } from '../../api-files';
import { ObjectIdentifierDocsComponent } from './object-identifier-docs.component';
import { ObjectIdentifierHeaderComponent } from './object-identifier-header/object-identifier-header.component';
import { SharedDocumentationPageModule } from '../../../documentation/shared-documentation-page.module';
import {
    ObjectIdentifierBoldExampleComponent,
    ObjectIdentifierDefaultExampleComponent,
    ObjectIdentifierDescriptiveExampleComponent,
    ObjectIdentifierLinkExampleComponent
} from './examples/object-identifier-components';
import { ObjectIdentifierTableExampleComponent } from './examples/object-identifier-table-example.component';
import { ObjectIdentifierModule } from '@fundamental-ngx/core/object-identifier';
import { TableModule } from '@fundamental-ngx/core/table';

const routes: Routes = [
    {
        path: '',
        component: ObjectIdentifierHeaderComponent,
        children: [
            { path: '', component: ObjectIdentifierDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.objectIdentifier } }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes), SharedDocumentationPageModule, ObjectIdentifierModule, TableModule],
    declarations: [
        ObjectIdentifierDocsComponent,
        ObjectIdentifierHeaderComponent,
        ObjectIdentifierDefaultExampleComponent,
        ObjectIdentifierLinkExampleComponent,
        ObjectIdentifierTableExampleComponent,
        ObjectIdentifierBoldExampleComponent,
        ObjectIdentifierDescriptiveExampleComponent
    ]
})
export class ObjectIdentifierDocsModule {}
