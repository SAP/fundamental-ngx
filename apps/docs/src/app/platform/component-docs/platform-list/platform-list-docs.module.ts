import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { API_FILES } from '../../api-files';
import { ApiComponent } from '../../../documentation/core-helpers/api/api.component';
import { SharedDocumentationPageModule } from '../../../documentation/shared-documentation-page.module';

import { ButtonModule } from '@fundamental-ngx/core/button';
import { ToolbarModule } from '@fundamental-ngx/core/toolbar';
import { CheckboxModule } from '@fundamental-ngx/core/checkbox';
import { IconModule } from '@fundamental-ngx/core/icon';
import { BusyIndicatorModule } from '@fundamental-ngx/core/busy-indicator';
import { DragAndDropModule } from '@fundamental-ngx/core/utils';
import { PlatformButtonModule } from '@fundamental-ngx/platform/button';
import { PlatformListModule, StandardListItemModule } from '@fundamental-ngx/platform/list';
import { PlatformInputModule, FdpFormGroupModule } from '@fundamental-ngx/platform/form';
import { PlatformListHeaderComponent } from './platform-list-header/platform-list-header.component';
import { PlatformListDocsComponent } from './platform-list-docs.component';
import {
    PlatformListExampleComponent,
    PlatformListWithGroupHeaderExampleComponent,
    PlatformListWithNoDataExampleComponent,
    PlatformListWithUnReadExampleComponent
} from './platform-list-examples/platform-list-example.component';
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
        PlatformListWithUnReadExampleComponent
    ]
})
export class PlatformListDocsModule {}
