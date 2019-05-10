import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TileComponent } from './tile.component';
import { TileContentDirective } from './tile-content/tile-content.directive';
import { TileTitleDirective } from './tile-title/tile-title.directive';
import { TileMediaDirective } from './tile-media/tile-media.directive';
import { TileActionsComponent } from './tile-actions/tile-actions.component';
import { ProductTileComponent } from './product-tile.component';
import { ProductTileMediaComponent } from './product-tile-media/product-tile-media.component';
import { ProductTileContentComponent } from './product-tile-content/product-tile-content.component';
import { ProductTileTitleDirective } from './product-tile-title/product-tile-title.directive';
import { TileGridDirective } from './tile-grid/tile-grid.directive';

@NgModule({
    imports: [CommonModule],
    exports: [
        TileComponent,
        TileContentDirective,
        TileTitleDirective,
        TileMediaDirective,
        TileActionsComponent,
        ProductTileComponent,
        ProductTileMediaComponent,
        ProductTileContentComponent,
        ProductTileTitleDirective,
        TileGridDirective
    ],
    declarations: [
        TileComponent,
        TileContentDirective,
        TileTitleDirective,
        TileMediaDirective,
        TileActionsComponent,
        ProductTileComponent,
        ProductTileMediaComponent,
        ProductTileContentComponent,
        ProductTileTitleDirective,
        TileGridDirective
    ]
})
export class TileModule {}
