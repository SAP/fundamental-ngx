import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ApiComponent } from '../../../documentation/core-helpers/api/api.component';
import { SharedDocumentationPageModule } from '../../../documentation/shared-documentation-page.module';
import { API_FILES } from '../../api-files';

import { ToolbarModule } from '@fundamental-ngx/core/toolbar';
import { PlatformButtonModule } from '@fundamental-ngx/platform/button';
import { PlatformListModule, StandardListItemModule } from '@fundamental-ngx/platform/list';
import { PlatformStandardListItemHeaderComponent } from './platform-standard-list-item-header/platform-standard-list-item-header.component';
import { PlatformStandardListItemDocsComponent } from './platform-standard-list-item-docs.component';
import {
    PlatformStandardListItemExampleComponent,
    PlatformStandardListItemWithSecondaryTypeExampleComponent,
    PlatformStandardListItemtWithGroupHeaderExampleComponent,
    PlatformStandardListItemWithInvertedSecondaryTypeExampleComponent,
    PlatformNonByLineStandardListItemExampleComponent
} from './platform-standard-list-item-examples/platform-standard-list-item-example.component';
import { PlatformStandardListItemWithFooterExampleComponent } from './platform-standard-list-item-examples/platform-standard-list-item-with-footer-example.component';
import { PlatformStandardListItemBorderLessExampleComponent } from './platform-standard-list-item-examples/platform-standard-list-item-border-less-example.component';
import { PlatformStandardListItemWithNavigationExampleComponent } from './platform-standard-list-item-examples/platform-standard-list-item-with-navigation-example.component';
import { PlatformStandardListItemWithSingleSelectionExampleComponent } from './platform-standard-list-item-examples/platform-standard-list-item-with-single-selection-example.component';
import { PlatformStandardListItemWithSelectionExampleComponent } from './platform-standard-list-item-examples/platform-standard-list-item-with-selection-example.component';
import { getI18nKey, I18nDocsComponent } from '../../../documentation/core-helpers/i18n-docs/i18n-docs.component';

const routes: Routes = [
    {
        path: '',
        component: PlatformStandardListItemHeaderComponent,
        children: [
            { path: '', component: PlatformStandardListItemDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.standardlistitem } },
            { path: 'i18n', component: I18nDocsComponent, data: getI18nKey('platformStandardListItem') }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        SharedDocumentationPageModule,
        ToolbarModule,
        PlatformListModule,
        PlatformButtonModule,
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
        PlatformStandardListItemWithSingleSelectionExampleComponent,
        PlatformStandardListItemWithInvertedSecondaryTypeExampleComponent,
        PlatformNonByLineStandardListItemExampleComponent
    ]
})
export class PlatformStandardListItemDocsModule {}
