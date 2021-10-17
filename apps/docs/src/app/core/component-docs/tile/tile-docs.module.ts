import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent } from '../../../documentation/core-helpers/api/api.component';
import { SharedDocumentationPageModule } from '../../../documentation/shared-documentation-page.module';
import { API_FILES } from '../../api-files';
import { TileDocsHeaderComponent } from './tile-docs-header/tile-docs-header.component';
import { TileDocsComponent } from './tile-docs.component';
import {
    ActionTileExampleComponent,
    BadgeTileExampleComponent,
    FeedTileExampleComponent,
    KpiTileExampleComponent,
    LaunchTileExampleComponent,
    LineTileExampleComponent,
    SlideTileExampleComponent,
    TileColumnsExampleComponent,
    TileGenericExampleComponent
} from './examples/tile-examples.component';
import { TileModule } from '@fundamental-ngx/core/tile';
import { AvatarModule } from '@fundamental-ngx/core/avatar';

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
    imports: [RouterModule.forChild(routes), SharedDocumentationPageModule, TileModule, AvatarModule],
    exports: [RouterModule],
    declarations: [
        TileDocsComponent,
        TileGenericExampleComponent,
        TileColumnsExampleComponent,
        LaunchTileExampleComponent,
        KpiTileExampleComponent,
        SlideTileExampleComponent,
        ActionTileExampleComponent,
        BadgeTileExampleComponent,
        FeedTileExampleComponent,
        LineTileExampleComponent,
        TileDocsHeaderComponent
    ]
})
export class TileDocsModule {}
