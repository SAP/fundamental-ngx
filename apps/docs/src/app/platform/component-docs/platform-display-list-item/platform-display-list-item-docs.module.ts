import { NgModule } from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { RouterModule, Routes } from '@angular/router';
import { PlatformListModule, DisplayListItemModule, PlatformButtonModule } from '@fundamental-ngx/platform';
import { ToolbarModule, DragAndDropModule } from '@fundamental-ngx/core';
import { ApiComponent } from '../../../documentation/core-helpers/api/api.component';
import { SharedDocumentationPageModule } from '../../../documentation/shared-documentation-page.module';
import { API_FILES } from '../../api-files';
import { PlatformDisplayListItemHeaderComponent } from './platform-display-list-item-header/platform-display-list-item-header.component';
import { PlatformDisplayListItemDocsComponent } from './platform-display-list-item-docs.component';
import {
    PlatformDisplayListItemExampleComponent,
    PlatformDisplayListItemWithFooterExampleComponent,
    PlatformDisplayListItemWithNavigationExampleComponent
} from './platform-display-list-item-examples/platform-display-list-item-example.component';
import { PlatformDisplayListItemBorderLessExampleComponent } from './platform-display-list-item-examples/platform-display-list-item-border-less-example.component';
import { PlatformDisplayListItemtWithGroupHeaderExampleComponent } from './platform-display-list-item-examples/platform-display-list-item-with-group-header-example.component';
const routes: Routes = [
    {
        path: '',
        component: PlatformDisplayListItemHeaderComponent,
        children: [
            { path: '', component: PlatformDisplayListItemDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.displaylistitem } }
        ]
    }
];

@NgModule({
    imports: [
        DragDropModule,
        DragAndDropModule,
        RouterModule.forChild(routes),
        SharedDocumentationPageModule,
        ToolbarModule,
        PlatformListModule,
        PlatformButtonModule,
        DisplayListItemModule
    ],
    exports: [RouterModule],
    declarations: [
        PlatformDisplayListItemDocsComponent,
        PlatformDisplayListItemHeaderComponent,
        PlatformDisplayListItemExampleComponent,
        PlatformDisplayListItemBorderLessExampleComponent,
        PlatformDisplayListItemWithFooterExampleComponent,
        PlatformDisplayListItemtWithGroupHeaderExampleComponent,
        PlatformDisplayListItemWithNavigationExampleComponent
    ]
})
export class PlatformDisplayListItemDocsModule {
}
