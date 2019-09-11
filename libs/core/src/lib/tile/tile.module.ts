import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TileComponent } from './tile.component';
import { TileContentComponent } from './tile-content/tile-content.component';
import { TileTextComponent } from './tile-text/tile-text.component';
import { TileTitleComponent } from './tile-title/tile-title.component';
import { TileMediaComponent } from './tile-media/tile-media.component';
import { TileActionsComponent } from './tile-actions/tile-actions.component';
import { ProductTileComponent } from './product-tile.component';
import { ProductTileMediaComponent } from './product-tile-media/product-tile-media.component';
import { ProductTileContentComponent } from './product-tile-content/product-tile-content.component';
import { ProductTileTextComponent } from './product-tile-text/product-tile-text.component';
import { ProductTileTitleComponent } from './product-tile-title/product-tile-title.component';

@NgModule({
    imports: [CommonModule],
    exports: [
        TileComponent,
        TileContentComponent,
        TileTextComponent,
        TileTitleComponent,
        TileMediaComponent,
        TileActionsComponent,
        ProductTileComponent,
        ProductTileMediaComponent,
        ProductTileContentComponent,
        ProductTileTextComponent,
        ProductTileTitleComponent
        
    ],
    declarations: [
        TileComponent,
        TileContentComponent,
        TileTextComponent,
        TileTitleComponent,
        TileMediaComponent,
        TileActionsComponent,
        ProductTileComponent,
        ProductTileMediaComponent,
        ProductTileContentComponent,
        ProductTileTextComponent,
        ProductTileTitleComponent
    ]
})
export class TileModule {}
