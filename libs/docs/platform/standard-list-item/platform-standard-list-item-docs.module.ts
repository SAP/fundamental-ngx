import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
    ApiComponent,
    currentComponentProvider,
    getI18nKey,
    I18nDocsComponent,
    SharedDocumentationPageModule
} from '@fundamental-ngx/docs/shared';
import { API_FILES } from '@fundamental-ngx/docs/platform/shared';

import { ToolbarModule } from '@fundamental-ngx/core/toolbar';
import { PlatformButtonModule } from '@fundamental-ngx/platform/button';
import { PlatformListModule, StandardListItemModule } from '@fundamental-ngx/platform/list';
import { PlatformStandardListItemHeaderComponent } from './platform-standard-list-item-header/platform-standard-list-item-header.component';
import { PlatformStandardListItemDocsComponent } from './platform-standard-list-item-docs.component';
import {
    PlatformNonByLineStandardListItemExampleComponent,
    PlatformStandardListItemExampleComponent,
    PlatformStandardListItemtWithGroupHeaderExampleComponent,
    PlatformStandardListItemWithInvertedSecondaryTypeExampleComponent,
    PlatformStandardListItemWithSecondaryTypeExampleComponent
} from './examples/platform-standard-list-item-example.component';
import { PlatformStandardListItemWithFooterExampleComponent } from './examples/platform-standard-list-item-with-footer-example.component';
import { PlatformStandardListItemBorderLessExampleComponent } from './examples/platform-standard-list-item-border-less-example.component';
import { PlatformStandardListItemWithNavigationExampleComponent } from './examples/platform-standard-list-item-with-navigation-example.component';
import { PlatformStandardListItemWithSingleSelectionExampleComponent } from './examples/platform-standard-list-item-with-single-selection-example.component';
import { PlatformStandardListItemWithSelectionExampleComponent } from './examples/platform-standard-list-item-with-selection-example.component';

import { PlatformStandardListUnreadExampleComponent } from './examples/platform-standard-list-unread-example.component';

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
        PlatformNonByLineStandardListItemExampleComponent,
        PlatformStandardListUnreadExampleComponent
    ],
    providers: [currentComponentProvider('standard-list-item')]
})
export class PlatformStandardListItemDocsModule {}
