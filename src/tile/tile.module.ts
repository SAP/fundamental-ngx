import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
    TileComponent,
    TileContent,
    TileTitle,
    TileMedia,
    TileActions,
    ProductTile,
    ProductTileMedia,
    ProductTileContent,
    ProductTileTitle,
    TileGrid
} from './tile.component';

@NgModule({
    imports: [CommonModule],
    exports: [
        TileComponent,
        TileContent,
        TileTitle,
        TileMedia,
        TileActions,
        ProductTile,
        ProductTileMedia,
        ProductTileContent,
        ProductTileTitle,
        TileGrid
    ],
    declarations: [
        TileComponent,
        TileContent,
        TileTitle,
        TileMedia,
        TileActions,
        ProductTile,
        ProductTileMedia,
        ProductTileContent,
        ProductTileTitle,
        TileGrid
    ]
})
export class TileModule {}
