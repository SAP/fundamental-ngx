import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { API_FILES } from '@fundamental-ngx/docs/platform/shared';
import {
    ApiComponent,
    currentComponentProvider,
    getI18nKey,
    I18nDocsComponent,
    SharedDocumentationPageModule
} from '@fundamental-ngx/docs/shared';

import { ObjectMarkerModule } from '@fundamental-ngx/core/object-marker';
import { ObjectStatusModule } from '@fundamental-ngx/core/object-status';
import { ToolbarModule } from '@fundamental-ngx/core/toolbar';
import { PlatformButtonModule } from '@fundamental-ngx/platform/button';
import { ObjectListItemModule, PlatformListModule } from '@fundamental-ngx/platform/list';
import { PlatformMenuModule } from '@fundamental-ngx/platform/menu';
import { PlatformObjectStatusModule } from '@fundamental-ngx/platform/object-status';
import { PlatformObjectListItemBorderLessExampleComponent } from './examples/platform-object-list-item-border-less-example.component';
import { PlatformObjectListItemExampleComponent } from './examples/platform-object-list-item-example.component';
import { PlatformObjectListItemWithRowNavigationExampleComponent } from './examples/platform-object-list-item-with-row-navigation-example.component';
import { PlatformObjectListItemWithRowSelectionAndNavigationExampleComponent } from './examples/platform-object-list-item-with-row-selection-and-navigation-example.component';
import { PlatformObjectListItemWithRowSelectionExampleComponent } from './examples/platform-object-list-item-with-row-selection-example.component';
import { PlatformObjectListItemDocsComponent } from './platform-object-list-item-docs.component';
import { PlatformObjectListItemHeaderComponent } from './platform-object-list-item-header/platform-object-list-item-header.component';

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
        PlatformMenuModule,
        PlatformObjectListItemDocsComponent,
        PlatformObjectListItemHeaderComponent,
        PlatformObjectListItemBorderLessExampleComponent,
        PlatformObjectListItemWithRowSelectionExampleComponent,
        PlatformObjectListItemExampleComponent,
        PlatformObjectListItemWithRowNavigationExampleComponent,
        PlatformObjectListItemWithRowSelectionAndNavigationExampleComponent
    ],
    exports: [RouterModule],
    providers: [currentComponentProvider('object-list-item')]
})
export class PlatformObjectListItemDocsModule {}
