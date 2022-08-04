import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ApiComponent } from '../../../documentation/core-helpers/api/api.component';
import { SharedDocumentationPageModule } from '../../../documentation/shared-documentation-page.module';
import { API_FILES } from '../../api-files';

import { ToolbarModule } from '@fundamental-ngx/core/toolbar';
import { ObjectMarkerModule } from '@fundamental-ngx/core/object-marker';
import { ObjectStatusModule } from '@fundamental-ngx/core/object-status';
import { PlatformButtonModule } from '@fundamental-ngx/platform/button';
import { PlatformMenuModule } from '@fundamental-ngx/platform/menu';
import { ObjectListItemModule, PlatformListModule } from '@fundamental-ngx/platform/list';
import { PlatformObjectStatusModule } from '@fundamental-ngx/platform/object-status';
import { PlatformObjectListItemHeaderComponent } from './platform-object-list-item-header/platform-object-list-item-header.component';
import { PlatformObjectListItemDocsComponent } from './platform-object-list-item-docs.component';
import { PlatformObjectListItemExampleComponent } from './platform-object-list-item-examples/platform-object-list-item-example.component';
import { PlatformObjectListItemBorderLessExampleComponent } from './platform-object-list-item-examples/platform-object-list-item-border-less-example.component';
import { PlatformObjectListItemWithRowSelectionExampleComponent } from './platform-object-list-item-examples/platform-object-list-item-with-row-selection-example.component';
import { PlatformObjectListItemWithRowNavigationExampleComponent } from './platform-object-list-item-examples/platform-object-list-item-with-row-navigation-example.component';
import { PlatformObjectListItemWithRowSelectionAndNavigationExampleComponent } from './platform-object-list-item-examples/platform-object-list-item-with-row-selection-and-navigation-example.component';
import { getI18nKey, I18nDocsComponent } from '../../../documentation/core-helpers/i18n-docs/i18n-docs.component';
import { platformContentDensityModuleDeprecationsProvider } from '@fundamental-ngx/platform/shared';

const routes: Routes = [
    {
        path: '',
        component: PlatformObjectListItemHeaderComponent,
        children: [
            { path: '', component: PlatformObjectListItemDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.objectlistitem } },
            { path: 'i18n', component: I18nDocsComponent, data: getI18nKey('platformObjectListItem') }
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
        ObjectListItemModule,
        ObjectMarkerModule,
        ObjectStatusModule,
        PlatformObjectStatusModule,
        PlatformMenuModule
    ],
    exports: [RouterModule],
    declarations: [
        PlatformObjectListItemDocsComponent,
        PlatformObjectListItemHeaderComponent,
        PlatformObjectListItemBorderLessExampleComponent,
        PlatformObjectListItemWithRowSelectionExampleComponent,
        PlatformObjectListItemExampleComponent,
        PlatformObjectListItemWithRowNavigationExampleComponent,
        PlatformObjectListItemWithRowSelectionAndNavigationExampleComponent
    ],
    providers: [
        platformContentDensityModuleDeprecationsProvider('fdp-list'),
        platformContentDensityModuleDeprecationsProvider('fdp-object-list-item')
    ]
})
export class PlatformObjectListItemDocsModule {}
