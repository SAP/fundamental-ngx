import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ApiComponent} from '../../../documentation/core-helpers/api/api.component';
import {SharedDocumentationModule} from '../../../documentation/shared-documentation.module';
import {API_FILES} from '../../api-files';
import {TreeDocsComponent} from './tree-docs.component';
import {TreeHeaderComponent} from './tree-header/tree-header.component';
import {SimpleTreeExampleComponent} from './examples/simple-tree-example.component';

const routes: Routes = [
    {
        path: '',
        component: TreeHeaderComponent,
        children: [
            {path: '', component: TreeDocsComponent},
            {path: 'api', component: ApiComponent, data: {content: API_FILES.tree}}
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        SharedDocumentationModule
    ],
    exports: [RouterModule],
    declarations: [
        TreeDocsComponent,
        TreeHeaderComponent,
        SimpleTreeExampleComponent
    ]
})
export class TreeDocsModule {
}
