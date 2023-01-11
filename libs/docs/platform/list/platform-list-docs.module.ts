import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { LinkModule } from '@fundamental-ngx/core/link';
import { ListModule } from '@fundamental-ngx/core/list';

import { API_FILES } from '@fundamental-ngx/docs/platform/shared';
import {
    ApiComponent,
    currentComponentProvider,
    getI18nKey,
    I18nDocsComponent,
    SharedDocumentationPageModule
} from '@fundamental-ngx/docs/shared';

import { ButtonModule } from '@fundamental-ngx/core/button';
import { ToolbarModule } from '@fundamental-ngx/core/toolbar';
import { CheckboxModule } from '@fundamental-ngx/core/checkbox';
import { IconModule } from '@fundamental-ngx/core/icon';
import { BusyIndicatorModule } from '@fundamental-ngx/core/busy-indicator';
import { DragAndDropModule } from '@fundamental-ngx/cdk/utils';
import { PlatformButtonModule } from '@fundamental-ngx/platform/button';
import { PlatformListModule, StandardListItemModule } from '@fundamental-ngx/platform/list';
import { FdpFormGroupModule, PlatformInputModule } from '@fundamental-ngx/platform/form';
import { PlatformListHeaderComponent } from './platform-list-header/platform-list-header.component';
import { PlatformListDocsComponent } from './platform-list-docs.component';
import {
    PlatformListExampleComponent,
    PlatformListWithGroupHeaderExampleComponent,
    PlatformListWithNoDataExampleComponent,
    PlatformListWithUnReadExampleComponent
} from './examples/platform-list-example.component';
import { PlatformListBorderLessExampleComponent } from './examples/platform-list-border-less-example.component';
import { PlatformListWithButtonsExampleComponent } from './examples/platform-list-with-buttons-example.component';
import { PlatformListWithFooterExampleComponent } from './examples/platform-list-with-footer-example.component';
import { PlatformListWithItemCounterExampleComponent } from './examples/platform-list-with-item-counter-example.component';
import { PlatformListWithNavigationExampleComponent } from './examples/platform-list-with-navigation-example.component';
import { PlatformListWithInfiniteScrollExampleComponent } from './examples/platform-list-with-infinite-scroll-example.component';
import { PlatformListWithMoreButtonExampleComponent } from './examples/platform-list-with-more-button-example.component';
import { PlatformListWithDeleteButtonExampleComponent } from './examples/platform-list-with-delete-button-example.component';
import { PlatformListWithSelectionExampleComponent } from './examples/platform-list-with-selection-example.component';
import { PlatformListWithSingleSelectionExampleComponent } from './examples/platform-list-with-single-selection-example.component';
import { platformContentDensityModuleDeprecationsProvider } from '@fundamental-ngx/platform/shared';
import { PlatformListFreeContentExampleComponent } from './examples/platform-list-free-content-example.component';
import { PlatformListLoadingExampleComponent } from './examples/loading/platform-list-loading-example.component';

const routes: Routes = [
    {
        path: '',
        component: PlatformListHeaderComponent,
        children: [
            { path: '', component: PlatformListDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.list } },
            { path: 'i18n', component: I18nDocsComponent, data: getI18nKey('platformList') }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        SharedDocumentationPageModule,
        ListModule,
        LinkModule,
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
        PlatformListWithUnReadExampleComponent,
        PlatformListFreeContentExampleComponent,
        PlatformListLoadingExampleComponent
    ],
    providers: [platformContentDensityModuleDeprecationsProvider('fd-list'), currentComponentProvider('list')]
})
export class PlatformListDocsModule {}
