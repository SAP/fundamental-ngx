import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TileComponent } from './tile.component';
import { TileContentDirective } from './tile-content.directive';
import { TileTitleComponent } from './tile-title.component';
import { TileMediaDirective } from './tile-media.directive';
import { TileActionsComponent } from './tile-actions.component';
import { ProductTileComponent } from './product-tile.component';
import { ProductTileMediaComponent } from './product-tile-media.component';
import { ProductTileContentComponent } from './product-tile-content.component';
import { ProductTileTitleComponent } from './product-tile-title.component';
import { TileGridDirective } from './tile-grid.directive';

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
