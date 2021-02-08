import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent } from '../../../documentation/core-helpers/api/api.component';
import { SharedDocumentationPageModule } from '../../../documentation/shared-documentation-page.module';
import { API_FILES } from '../../api-files';
import { PlatformListHeaderComponent } from './platform-list-header/platform-list-header.component';
import { PlatformListDocsComponent } from './platform-list-docs.component';
import {
    PlatformListExampleComponent,
    PlatformListWithGroupHeaderExampleComponent,
    PlatformListWithNoDataExampleComponent,
    PlatformListWithNoSeperatorExampleComponent,
    PlatformListWithUnReadExampleComponent
} from './platform-list-examples/platform-list-example.component';
import { PlatformListModule, StandardListItemModule, PlatformInputModule, PlatformButtonModule, FdpFormGroupModule } from '@fundamental-ngx/platform';
import { ToolbarModule, CheckboxModule, IconModule, ButtonModule, BusyIndicatorModule, DragAndDropModule } from '@fundamental-ngx/core';
import { PlatformListBorderLessExampleComponent } from './platform-list-examples/platform-list-border-less-example.component';
import { PlatformListWithButtonsExampleComponent } from './platform-list-examples/platform-list-with-buttons-example.component';
import { PlatformListWithFooterExampleComponent } from './platform-list-examples/platform-list-with-footer-example.component';
import { PlatformListWithItemCounterExampleComponent } from './platform-list-examples/platform-list-with-item-counter-example.component';
import { PlatformListWithNavigationExampleComponent } from './platform-list-examples/platform-list-with-navigation-example.component';
import { PlatformListWithInfiniteScrollExampleComponent } from './platform-list-examples/platform-list-with-infinite-scroll-example.component';
import { PlatformListWithMoreButtonExampleComponent } from './platform-list-examples/platform-list-with-more-button-example.component';
import { PlatformListWithDeleteButtonExampleComponent } from './platform-list-examples/platform-list-with-delete-button-example.component';
import { PlatformListWithSelectionExampleComponent } from './platform-list-examples/platform-list-with-selection-example.component';
import { PlatformListWithSingleSelectionExampleComponent } from './platform-list-examples/platform-list-with-single-selection-example.component';
import { ScrollingModule } from '@angular/cdk/scrolling';

const routes: Routes = [
    {
        path: '',
        component: PlatformListHeaderComponent,
        children: [
            { path: '', component: PlatformListDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.list } }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        SharedDocumentationPageModule,
        PlatformListModule,
        StandardListItemModule,
        ButtonModule,
        ScrollingModule,
        ToolbarModule,
        CheckboxModule,
        IconModule,
        FormsModule,
        BusyIndicatorModule,
        DragAndDropModule,
        PlatformInputModule,
        PlatformButtonModule,
        FdpFormGroupModule
    ],
    exports: [RouterModule],
    declarations: [
        PlatformListDocsComponent,
        PlatformListHeaderComponent,
        PlatformListExampleComponent,
        PlatformListBorderLessExampleComponent,
        PlatformListWithDeleteButtonExampleComponent,
        PlatformListWithFooterExampleComponent,
        PlatformListWithGroupHeaderExampleComponent,
        PlatformListWithItemCounterExampleComponent,
        PlatformListWithSelectionExampleComponent,
        PlatformListWithNavigationExampleComponent,
        PlatformListWithSingleSelectionExampleComponent,
        PlatformListWithInfiniteScrollExampleComponent,
        PlatformListWithButtonsExampleComponent,
        PlatformListWithNoDataExampleComponent,
        PlatformListWithMoreButtonExampleComponent,
        PlatformListWithNoSeperatorExampleComponent,
        PlatformListWithUnReadExampleComponent
    ]
})
export class PlatformListDocsModule {
}
