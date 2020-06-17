import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent } from '../../../documentation/core-helpers/api/api.component';
import { SharedDocumentationModule } from '../../../documentation/shared-documentation.module';
import { API_FILES } from '../../api-files';
import { TileDocsHeaderComponent } from './tile-docs-header/tile-docs-header.component';
import { TileDocsComponent } from './tile-docs.component';
import {
    TileActionsExampleComponent,
    TileButtonExampleComponent,
    TileDisabledExampleComponent,
    TileExampleComponent,
    TileMediaExampleComponent,
    TileProductExampleComponent
} from './examples/tile-examples.component';
import { IdentifierModule, ImageModule, ListModule, TileModule } from '@fundamental-ngx/core';

const routes: Routes = [
    {
        path: '',
        component: TileDocsHeaderComponent,
        children: [
            { path: '', component: TileDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.tile } }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        SharedDocumentationModule,
        IdentifierModule,
        TileModule,
        ListModule,
        ImageModule
    ],
    exports: [RouterModule],
    declarations: [
        TileDocsComponent,
        TileExampleComponent,
        TileDocsHeaderComponent,
        TileMediaExampleComponent,
        TileButtonExampleComponent,
        TileActionsExampleComponent,
        TileProductExampleComponent,
        TileDisabledExampleComponent
    ]
})
export class TileDocsModule {}
