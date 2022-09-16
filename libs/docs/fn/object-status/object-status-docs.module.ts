import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent, currentComponentProvider, SharedDocumentationPageModule } from '@fundamental-ngx/docs/shared';
import { API_FILES } from '@fundamental-ngx/docs/fn/shared';
import { ObjectStatusHeaderComponent } from './object-status-header/object-status-header.component';
import { ObjectStatusDocsComponent } from './object-status-docs.component';
import { examples } from './examples';
import { ObjectStatusModule } from '@fundamental-ngx/fn/object-status';
import { ObjectStatusInteractiveExampleComponent } from './examples/interactive/object-status-interactive-example.component';

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
        examples,
        ObjectStatusDocsComponent,
        ObjectStatusHeaderComponent,
        ObjectStatusInteractiveExampleComponent
    ],
    providers: [currentComponentProvider('object-status')]
})
export class ObjectStatusDocsModule {}
