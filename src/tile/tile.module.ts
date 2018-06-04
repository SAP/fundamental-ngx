import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
    TileComponent,
    TileContentDirective,
    TileTitleComponent,
    TileMediaDirective,
    TileActionsComponent,
    ProductTileComponent,
    ProductTileMediaComponent,
    ProductTileContentComponent,
    ProductTileTitleComponent,
    TileGridDirective
} from './tile.component';

@NgModule({
    imports: [CommonModule],
    exports: [
        TileComponent,
        TileContentDirective,
        TileTitleComponent,
        TileMediaDirective,
        TileActionsComponent,
        ProductTileComponent,
        ProductTileMediaComponent,
        ProductTileContentComponent,
        ProductTileTitleComponent,
        TileGridDirective
    ],
    declarations: [
        TileComponent,
        TileContentDirective,
        TileTitleComponent,
        TileMediaDirective,
        TileActionsComponent,
        ProductTileComponent,
        ProductTileMediaComponent,
        ProductTileContentComponent,
        ProductTileTitleComponent,
        TileGridDirective
    ]
})
export class TileModule {}
