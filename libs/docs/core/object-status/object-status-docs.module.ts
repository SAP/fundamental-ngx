import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent, currentComponentProvider, SharedDocumentationPageModule } from '@fundamental-ngx/docs/shared';
import { API_FILES } from '@fundamental-ngx/docs/core/shared';
import { ObjectStatusDocsComponent } from './object-status-docs.component';
import {
    ObjectStatusClickableAndIconExampleComponent,
    ObjectStatusGenericExampleComponent,
    ObjectStatusInvertedGenericTextExampleComponent,
    ObjectStatusInvertedTextExampleComponent,
    ObjectStatusLargeExampleComponent,
    ObjectStatusTextExampleComponent,
    ObjectStatusTextIconExampleComponent
} from './examples/object-status-examples.component';
import { ObjectStatusHeaderComponent } from './object-status-header/object-status-header.component';
import { ObjectStatusModule } from '@fundamental-ngx/core/object-status';
import { ObjectStatusDefaultExampleComponent } from './examples/object-status-default-example.component';

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
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers: [currentComponentProvider('object-status')]
})
export class ObjectStatusDocsModule {}
