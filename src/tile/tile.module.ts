import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
    Tile,
    TileContent,
    TileTitle,
    TileMedia,
    TileActions,
    ProductTile,
    ProductTileMedia,
    ProductTileContent,
    ProductTileTitle,
    TileGrid
} from './tile';

@NgModule({
    imports: [CommonModule],
    exports: [
        Tile,
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
        Tile,
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
