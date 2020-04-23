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
    PlatformStandardListItemWithNavigationExampleComponent,
    PlatformStandardListItemWithSingleSelectionExampleComponent
} from './platform-standard-list-item-examples/platform-standard-list-item-example.component';
import { PlatformListModule, PlatformButtonModule } from '@fundamental-ngx/platform';
import { PlatformStandardListItemBorderLessExampleComponent } from './platform-standard-list-item-examples/Platform-standard-list-item-Border-Less-example.component';
import { PlatformStandardListItemtWithGroupHeaderExampleComponent } from './platform-standard-list-item-examples/platform-standard-list-item-with-group-header-example.component';



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
        PlatformButtonModule
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
