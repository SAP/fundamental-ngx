import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent, currentComponentProvider, SharedDocumentationPageModule } from '@fundamental-ngx/docs/shared';
import { API_FILES } from '@fundamental-ngx/docs/core/shared';
import { TileDocsHeaderComponent } from './tile-docs-header/tile-docs-header.component';
import { TileDocsComponent } from './tile-docs.component';
import {
    ActionTileExampleComponent,
    BadgeTileExampleComponent,
    ClickableTileExampleComponent,
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
        TileDocsHeaderComponent,
        ClickableTileExampleComponent
    ],
    providers: [currentComponentProvider('tile')]
})
export class TileDocsModule {}
