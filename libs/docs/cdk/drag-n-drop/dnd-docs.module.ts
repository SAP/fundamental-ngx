import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { DisabledBehaviorModule, DragAndDropModule } from '@fundamental-ngx/cdk/utils';
import { BusyIndicatorModule } from '@fundamental-ngx/core/busy-indicator';
import { CheckboxModule } from '@fundamental-ngx/core/checkbox';
import { SegmentedButtonModule } from '@fundamental-ngx/core/segmented-button';
import { API_FILES } from '@fundamental-ngx/docs/cdk/shared';
import { ApiComponent, SharedDocumentationPageModule, currentComponentProvider } from '@fundamental-ngx/docs/shared';
import { DndDocsComponent } from './dnd-docs.component';
import { DndHeaderComponent } from './dnd-header/dnd-header.component';
import { DefaultExampleComponent } from './examples/default-example/default-example.component';
import { DisabledExampleComponent } from './examples/disabled-example/disabled-example.component';

const routes: Routes = [
    {
        path: '',
        component: DndHeaderComponent,
        children: [
            {
                path: '',
                component: DndDocsComponent
            },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.dnd } }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        SharedDocumentationPageModule,
        DisabledBehaviorModule,
        DragAndDropModule,
        SegmentedButtonModule,
        CheckboxModule,
        FormsModule,
        BusyIndicatorModule,
        DndHeaderComponent,
        DndDocsComponent,
        DefaultExampleComponent,
        DisabledExampleComponent
    ],
    exports: [RouterModule],
    providers: [currentComponentProvider('drag-n-drop')]
})
export class DndDocsModule {}
