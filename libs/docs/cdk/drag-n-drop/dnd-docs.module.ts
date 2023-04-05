import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DisabledBehaviorModule, DragAndDropModule } from '@fundamental-ngx/cdk/utils';
import { DndHeaderComponent } from './dnd-header/dnd-header.component';
import { ApiComponent, currentComponentProvider, SharedDocumentationPageModule } from '@fundamental-ngx/docs/shared';
import { API_FILES } from '@fundamental-ngx/docs/fn/shared';
import { DndDocsComponent } from './dnd-docs.component';
import { DefaultExampleComponent } from './examples/default-example/default-example.component';

const routes: Routes = [
    {
        path: '',
        component: DndHeaderComponent,
        children: [
            {
                path: '',
                component: DndDocsComponent
            },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.tabs } }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes), SharedDocumentationPageModule, DisabledBehaviorModule, DragAndDropModule],
    exports: [RouterModule],
    declarations: [DndHeaderComponent, DndDocsComponent, DefaultExampleComponent],
    providers: [currentComponentProvider('drag-n-drop')]
})
export class DndDocsModule {}
