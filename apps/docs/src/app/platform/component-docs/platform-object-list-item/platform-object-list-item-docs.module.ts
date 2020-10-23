import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ToolbarModule, ObjectMarkerModule, ObjectStatusModule } from '@fundamental-ngx/core';
import { PlatformListModule, ObjectListItemModule, PlatformButtonModule, PlatformObjectStatusModule, PlatformMenuModule } from '@fundamental-ngx/platform';

import { ApiComponent } from '../../../documentation/core-helpers/api/api.component';
import { SharedDocumentationPageModule } from '../../../documentation/shared-documentation-page.module';
import { API_FILES } from '../../api-files';

import { PlatformObjectListItemHeaderComponent } from './platform-object-list-item-header/platform-object-list-item-header.component';
import { PlatformObjectListItemDocsComponent } from './platform-object-list-item-docs.component';
import {
    PlatformObjectListItemExampleComponent
} from './platform-object-list-item-examples/platform-object-list-item-example.component';

import { PlatformObjectListItemBorderLessExampleComponent } from './platform-object-list-item-examples/platform-object-list-item-border-less-example.component';
import { PlatformObjectListItemWithRowSelectionExampleComponent } from './platform-object-list-item-examples/platform-object-list-item-with-row-selection-example.component';
import { PlatformObjectListItemWithRowNavigationExampleComponent } from './platform-object-list-item-examples/platform-object-list-item-with-row-navigation-example.component';
import { PlatformObjectListItemWithRowSelectionAndNavigationExampleComponent } from './platform-object-list-item-examples/platform-object-list-item-with-row-selection-and-navigation-example.component';


const routes: Routes = [
    {
        path: '',
        component: PlatformObjectListItemHeaderComponent,
        children: [
            { path: '', component: PlatformObjectListItemDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.objectlistitem } }
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

    ]
})
export class PlatformObjectListItemDocsModule { }
