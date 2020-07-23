import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TileComponent } from './tile.component';
import { TileHeaderDirective } from './directives/tile-header.directive';
import { TileContentDirective } from './directives/tile-content.directive';
import { TileFooterDirective } from './directives/tile-footer.directive';
import { TileTitleDirective } from './directives/tile-title.directive';
import { TileSubtitleDirective } from './directives/tile-subtitle.directive';
import { TileSectionDirective } from './directives/tile-section.directive';

@NgModule({
    imports: [CommonModule],
    exports: [
        TileComponent,
        TileHeaderDirective,
        TileContentDirective,
        TileFooterDirective,
        TileTitleDirective,
        TileSubtitleDirective,
        TileSectionDirective
    ],
    declarations: [
        TileComponent,
        TileHeaderDirective,
        TileContentDirective,
        TileFooterDirective,
        TileTitleDirective,
        TileSubtitleDirective,
        TileSectionDirective
    ]
})
export class TileModule {}
