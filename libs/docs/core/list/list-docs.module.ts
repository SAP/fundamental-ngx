import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
    ApiComponent,
    currentComponentProvider,
    SharedDocumentationModule,
    SharedDocumentationPageModule
} from '@fundamental-ngx/docs/shared';
import { API_FILES } from '@fundamental-ngx/docs/core/shared';
import { ListHeaderComponent } from './list-header/list-header.component';
import { ListDocsComponent } from './list-docs.component';
import { ListInfiniteScrollExampleComponent } from './examples/list-infinite-scroll-example.component';
import {
    ListComplexExampleComponent,
    ListExampleComponent,
    ListIconExampleComponent,
    ListSecondaryExampleComponent
} from './examples/list-examples.component';
import { ListDndExampleComponent } from './examples/list-dnd-example/list-dnd-example.component';
import { ListSelectionExampleComponent } from './examples/list-selection-example/list-selection-example.component';
import { ListBorderlessExampleComponent } from './examples/list-borderless-example/list-borderless-example.component';
import { ListActionExampleComponent } from './examples/list-action-example/list-action-example.component';
import { ListNavigationExampleComponent } from './examples/list-navigation-example/list-navigation-example.component';
import { ListKeyboardExampleComponent } from './examples/list-keyboard-example/list-keyboard-example.component';
import { ListNavIndicatorExampleComponent } from './examples/list-nav-indicator-example/list-nav-indicator-example.component';
import { ListDataExampleComponent } from './examples/list-data-example/list-data-example.component';
import { ListInteractiveExampleComponent } from './examples/list-interactive-example/list-interactive-example.component';
import { DeprecatedListContentDensityDirective, ListModule } from '@fundamental-ngx/core/list';
import { LinkModule } from '@fundamental-ngx/core/link';
import { CheckboxModule } from '@fundamental-ngx/core/checkbox';
import { RadioModule } from '@fundamental-ngx/core/radio';
import { InfiniteScrollModule } from '@fundamental-ngx/core/infinite-scroll';
import { DragAndDropModule, moduleDeprecationsProvider } from '@fundamental-ngx/core/utils';
import { BusyIndicatorModule } from '@fundamental-ngx/core/busy-indicator';
import { ToolbarModule } from '@fundamental-ngx/core/toolbar';
import { InputGroupModule } from '@fundamental-ngx/core/input-group';

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
    ],
    providers: [moduleDeprecationsProvider(DeprecatedListContentDensityDirective), currentComponentProvider('list')]
})
export class ListDocsModule {}
