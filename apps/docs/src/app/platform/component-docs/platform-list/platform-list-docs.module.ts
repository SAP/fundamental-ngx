import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent } from '../../../documentation/core-helpers/api/api.component';
import { SharedDocumentationModule } from '../../../documentation/shared-documentation.module';
import { API_FILES } from '../../api-files';
import { PlatformListHeaderComponent } from './platform-list-header/platform-list-header.component';
import { PlatformListDocsComponent } from './platform-list-docs.component';
import {
    PlatformListExampleComponent,
    PlatformListWithFooterExampleComponent,
    PlatformListWithItemCounterExampleComponent,
    PlatformListWithNavigationExampleComponent,
    PlatformListWithSingleSelectionExampleComponent,
    PlatformListWithButtonsExampleComponent
} from './platform-list-examples/platform-list-example.component';
import { PlatformListModule, StandardListItemModule, PlatformButtonModule, PlatformCheckboxModule } from '@fundamental-ngx/platform';
import { ToolbarModule, CheckboxModule, IconModule } from '@fundamental-ngx/core';
import { PlatformListBorderLessExampleComponent } from './platform-list-examples/platform-list-border-less-example.component';
import { PlatformListWithGroupHeaderExampleComponent } from './platform-list-examples/platform-list-with-group-header-example.component';
import { PlatformListWithInfiniteScrollExampleComponent } from './platform-list-examples/platform-list-with-infinite-scroll-example.component';
import { PlatformListWithDeleteButtonExampleComponent } from './platform-list-examples/platform-list-with-delete-button-example.component';
import { PlatformListWithSelectionExampleComponent } from './platform-list-examples/platform-list-with-selection-example.component';
import { PlatformListWithi18nExampleComponent } from './platform-list-examples/platform-list-with-i18n-example.component';
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
        SharedDocumentationModule,
        PlatformListModule,
        StandardListItemModule,
        PlatformButtonModule,
        ScrollingModule,
        ToolbarModule,
        CheckboxModule,
        PlatformCheckboxModule,
        IconModule
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
        PlatformListWithi18nExampleComponent,
        PlatformListWithButtonsExampleComponent
    ]
})
export class PlatformListDocsModule {
}
