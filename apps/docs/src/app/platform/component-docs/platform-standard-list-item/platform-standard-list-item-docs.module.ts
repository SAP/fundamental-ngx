import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent } from '../../../documentation/core-helpers/api/api.component';
import { SharedDocumentationModule } from '../../../documentation/shared-documentation.module';
import { API_FILES } from '../../api-files';
import { PlatformStandardListItemHeaderComponent } from './platform-standard-list-item-header/platform-standard-list-item-header.component';
import { PlatformStandardListItemDocsComponent } from './platform-standard-list-item-docs.component';
import {
    PlatformStandardListItemExampleComponent,
    PlatformStandardListItemWithSecondaryTypeExampleComponent,
    PlatformStandardListItemWithFooterExampleComponent,
    PlatformStandardListItemWithSelectionExampleComponent,
    PlatformStandardListItemWithNavigationExampleComponent
} from './platform-standard-list-item-examples/platform-standard-list-item-example.component';
import { PlatformListModule, StandardListItemModule, PlatformButtonModule } from '@fundamental-ngx/platform';
import { ToolbarModule } from '@fundamental-ngx/core';
import { PlatformStandardListItemBorderLessExampleComponent } from './platform-standard-list-item-examples/platform-standard-list-item-border-less-example.component';
import { PlatformStandardListItemtWithGroupHeaderExampleComponent } from './platform-standard-list-item-examples/platform-standard-list-item-with-group-header-example.component';
import { PlatformStandardListItemWithSingleSelectionExampleComponent } from './platform-standard-list-item-examples/platform-standard-list-item-with-single-selection-example.component';
const routes: Routes = [
    {
        path: '',
        component: PlatformStandardListItemHeaderComponent,
        children: [
            { path: '', component: PlatformStandardListItemDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.list } }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        SharedDocumentationModule,
        PlatformListModule,
        PlatformButtonModule,
        ToolbarModule,
        StandardListItemModule
    ],
    exports: [RouterModule],
    declarations: [
        PlatformStandardListItemDocsComponent,
        PlatformStandardListItemHeaderComponent,
        PlatformStandardListItemExampleComponent,
        PlatformStandardListItemBorderLessExampleComponent,
        PlatformStandardListItemWithSecondaryTypeExampleComponent,
        PlatformStandardListItemWithFooterExampleComponent,
        PlatformStandardListItemtWithGroupHeaderExampleComponent,
        PlatformStandardListItemWithSelectionExampleComponent,
        PlatformStandardListItemWithNavigationExampleComponent,
        PlatformStandardListItemWithSingleSelectionExampleComponent
    ]
})
export class PlatformStandardListItemDocsModule {
}
