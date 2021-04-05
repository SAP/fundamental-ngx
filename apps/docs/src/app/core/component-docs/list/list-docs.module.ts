import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent } from '../../../documentation/core-helpers/api/api.component';
import { API_FILES } from '../../api-files';
import { ListHeaderComponent } from './list-header/list-header.component';
import { ListDocsComponent } from './list-docs.component';
import { ListInfiniteScrollExampleComponent } from './examples/list-infinite-scroll-example.component';
import {
    ListComplexExampleComponent,
    ListExampleComponent,
    ListIconExampleComponent,
    ListSecondaryExampleComponent
} from './examples/list-examples.component';
import {
    CheckboxModule,
    InfiniteScrollModule,
    LinkModule,
    ListModule,
    RadioModule,
    DragAndDropModule,
    BusyIndicatorModule,
    ToolbarModule,
    InputGroupModule
} from '@fundamental-ngx/core';
import { SharedDocumentationPageModule } from '../../../documentation/shared-documentation-page.module';
import { ListDndExampleComponent } from './examples/list-dnd-example/list-dnd-example.component';
import { ListSelectionExampleComponent } from './examples/list-selection-example/list-selection-example.component';
import { ListBorderlessExampleComponent } from './examples/list-borderless-example/list-borderless-example.component';
import { ListActionExampleComponent } from './examples/list-action-example/list-action-example.component';
import { ListNavigationExampleComponent } from './examples/list-navigation-example/list-navigation-example.component';
import { ListKeyboardExampleComponent } from './examples/list-keyboard-example/list-keyboard-example.component';
import { ListNavIndicatorExampleComponent } from './examples/list-nav-indicator-example/list-nav-indicator-example.component';
import { ListDataExampleComponent } from './examples/list-data-example/list-data-example.component';
import { SharedDocumentationModule } from '../../../documentation/shared-documentation.module';
import { ListInteractiveExampleComponent } from './examples/list-interactive-example/list-interactive-example.component';

const routes: Routes = [
    {
        path: '',
        component: ListHeaderComponent,
        children: [
            { path: '', component: ListDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.list } }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        SharedDocumentationPageModule,
        ListModule,
        LinkModule,
        CheckboxModule,
        RadioModule,
        InfiniteScrollModule,
        DragAndDropModule,
        BusyIndicatorModule,
        ToolbarModule,
        InputGroupModule,
        SharedDocumentationModule
    ],
    exports: [RouterModule],
    declarations: [
        ListDocsComponent,
        ListHeaderComponent,
        ListExampleComponent,
        ListInfiniteScrollExampleComponent,
        ListSecondaryExampleComponent,
        ListIconExampleComponent,
        ListComplexExampleComponent,
        ListDndExampleComponent,
        ListSelectionExampleComponent,
        ListBorderlessExampleComponent,
        ListActionExampleComponent,
        ListNavigationExampleComponent,
        ListKeyboardExampleComponent,
        ListNavIndicatorExampleComponent,
        ListDataExampleComponent,
        ListInteractiveExampleComponent
    ]
})
export class ListDocsModule {}
