import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent } from '../../../documentation/core-helpers/api/api.component';
import { SharedDocumentationModule } from '../../../documentation/shared-documentation.module';
import { DropdownHeaderComponent } from './dropdown-header/dropdown-header.component';
import { DropdownDocsComponent } from './dropdown-docs.component';
import { DropdownContextualMenuExampleComponent } from './examples/dropdown-contextual-menu-example.component';
import { DropdownDefaultExampleComponent } from './examples/dropdown-default-example.component';
import { DropdownIconsExampleComponent } from './examples/dropdown-icons-example.component';
import { DropdownStateExampleComponent } from './examples/dropdown-state-example.component';
import { DropdownInfiniteScrollExampleComponent } from './examples/dropdown-infinite-scroll-example.component';
import { DropdownToolbarExampleComponent } from './examples/dropdown-toolbar-example.component';
import { InfiniteScrollModule, ListModule, MessageStripModule, PopoverModule } from '@fundamental-ngx/core';

const routes: Routes = [
    {
        path: '',
        component: DropdownHeaderComponent,
        children: [
            { path: '', component: DropdownDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: [] } }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        SharedDocumentationModule,
        InfiniteScrollModule,
        MessageStripModule,
        PopoverModule,
        ListModule
    ],
    exports: [RouterModule],
    declarations: [
        DropdownDocsComponent,
        DropdownHeaderComponent,
        DropdownIconsExampleComponent,
        DropdownStateExampleComponent,
        DropdownDefaultExampleComponent,
        DropdownToolbarExampleComponent,
        DropdownInfiniteScrollExampleComponent,
        DropdownContextualMenuExampleComponent
    ]
})
export class DropdownDocsModule {}
