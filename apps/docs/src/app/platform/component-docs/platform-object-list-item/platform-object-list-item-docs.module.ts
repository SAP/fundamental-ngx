import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlatformListModule, ObjectListItemModule, PlatformButtonModule } from '@fundamental-ngx/platform';
import { ToolbarModule } from '@fundamental-ngx/core';
import { ApiComponent } from '../../../documentation/core-helpers/api/api.component';
import { SharedDocumentationPageModule } from '../../../documentation/shared-documentation-page.module';
import { API_FILES } from '../../api-files';
import { PlatformObjectListItemHeaderComponent } from './platform-object-list-item-header/platform-object-list-item-header.component';
import { PlatformObjectListItemDocsComponent } from './platform-object-list-item-docs.component';
import {
    PlatformObjectListItemExampleComponent
} from './platform-object-list-item-examples/platform-object-list-item-example.component';

import { PlatformObjectListItemBorderLessExampleComponent } from './platform-object-list-item-examples/platform-object-list-item-border-less-example.component';
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
        ObjectListItemModule
    ],
    exports: [RouterModule],
    declarations: [
        PlatformObjectListItemDocsComponent,
        PlatformObjectListItemHeaderComponent,
        PlatformObjectListItemExampleComponent,
        PlatformObjectListItemBorderLessExampleComponent
    ]
})
export class PlatformObjectListItemDocsModule {
}
