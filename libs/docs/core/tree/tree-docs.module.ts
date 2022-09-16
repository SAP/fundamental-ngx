import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent, currentComponentProvider, SharedDocumentationPageModule } from '@fundamental-ngx/docs/shared';
import { API_FILES } from '@fundamental-ngx/docs/core/shared';
import { TreeDocsComponent } from './tree-docs.component';
import { TreeHeaderComponent } from './tree-header/tree-header.component';
import { SimpleTreeExampleComponent } from './examples/simple-tree-example.component';
import { TreeModule } from '@fundamental-ngx/core/tree';

const routes: Routes = [
    {
        path: '',
        component: TreeHeaderComponent,
        children: [
            { path: '', component: TreeDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.tree } }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes), SharedDocumentationPageModule, TreeModule],
    exports: [RouterModule],
    declarations: [TreeDocsComponent, TreeHeaderComponent, SimpleTreeExampleComponent],
    providers: [currentComponentProvider('tree')]
})
export class TreeDocsModule {}
