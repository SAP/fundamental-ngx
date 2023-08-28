import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { CheckboxModule } from '@fundamental-ngx/core/checkbox';
import { SegmentedButtonModule } from '@fundamental-ngx/core/segmented-button';
import { TextModule } from '@fundamental-ngx/core/text';
import { TreeModule } from '@fundamental-ngx/core/tree';
import { API_FILES } from '@fundamental-ngx/docs/core/shared';
import { ApiComponent, SharedDocumentationPageModule, currentComponentProvider } from '@fundamental-ngx/docs/shared';
import { LazilyLoadedTreeItemsExampleComponent } from './examples/lazily-loaded-tree-items-example.component';
import { NavigatableTreeExampleComponent } from './examples/navigatable-tree-example.component';
import { SimpleTreeExampleComponent } from './examples/simple-tree-example.component';
import { TreeActionButtonsExampleComponent } from './examples/tree-action-buttons-example.component';
import { TreeHighlightIndicatorsExampleComponent } from './examples/tree-highlight-indicators-example.component';
import { TreeWithFormsExampleComponent } from './examples/tree-with-forms-example.component';
import { TreeDocsComponent } from './tree-docs.component';
import { TreeHeaderComponent } from './tree-header/tree-header.component';

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
    imports: [
        RouterModule.forChild(routes),
        SharedDocumentationPageModule,
        TreeModule,
        SegmentedButtonModule,
        TextModule,
        ButtonModule,
        ReactiveFormsModule,
        CheckboxModule,
        TreeDocsComponent,
        TreeHeaderComponent,
        SimpleTreeExampleComponent,
        TreeWithFormsExampleComponent,
        NavigatableTreeExampleComponent,
        TreeHighlightIndicatorsExampleComponent,
        TreeActionButtonsExampleComponent,
        LazilyLoadedTreeItemsExampleComponent
    ],
    exports: [
        RouterModule,
        TreeWithFormsExampleComponent,
        NavigatableTreeExampleComponent,
        TreeHighlightIndicatorsExampleComponent,
        TreeActionButtonsExampleComponent
    ],
    providers: [currentComponentProvider('tree')]
})
export class TreeDocsModule {}
