import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TileComponent } from './tile.component';
import { TileContentDirective } from './tile-content/tile-content.directive';
import { TileTextDirective } from './tile-text/tile-text.directive';
import { TileTitleDirective } from './tile-title/tile-title.directive';
import { TileMediaDirective } from './tile-media/tile-media.directive';
import { TileActionsDirective } from './tile-actions/tile-actions.directive';
import { ProductTileComponent } from './product-tile.component';
import { ProductTileMediaDirective } from './product-tile-media/product-tile-media.directive';
import { ProductTileContentDirective } from './product-tile-content/product-tile-content.directive';
import { ProductTileTextDirective } from './product-tile-text/product-tile-text.directive';
import { ProductTileTitleDirective } from './product-tile-title/product-tile-title.directive';

@NgModule({
    imports: [CommonModule],
    exports: [
        TileComponent,
        TileContentDirective,
        TileTextDirective,
        TileTitleDirective,
        TileMediaDirective,
        TileActionsDirective,
        ProductTileComponent,
        ProductTileMediaDirective,
        ProductTileContentDirective,
        ProductTileTextDirective,
        ProductTileTitleDirective
    ],
    declarations: [
        TileComponent,
        TileContentDirective,
        TileTextDirective,
        TileTitleDirective,
        TileMediaDirective,
        TileActionsDirective,
        ProductTileComponent,
        ProductTileMediaDirective,
        ProductTileContentDirective,
        ProductTileTextDirective,
        ProductTileTitleDirective
    ]
})
export class TileModule {}
