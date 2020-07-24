import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TileComponent } from './tile.component';
import {
    TileContentDirective,
    TileHeaderDirective,
    TileFooterDirective,
    TileSectionDirective,
    TileSubtitleDirective,
    TileTitleDirective,
    TileRefreshDirective,
    TileFooterTextDirective,
    TileHeaderContentDirective,
    TileProfileImgDirective
} from './directives/tile.directives';
import {
    NumericContentDirective,
    NumericContentKpiContainerDirective,
    NumericContentKpiDirective,
    NumericContentLaunchIconContainerDirective,
    NumericContentLaunchIconDirective, NumericContentScaleArrowDirective,
    NumericContentScaleContainerDirective,
    NumericContentScaleDirective,
    NumericContentScaleTextDirective, NumericContentSmallTileDirective,
    TileLaunchDirective
} from './directives/numeric-content.directives';

@NgModule({
    imports: [CommonModule],
    exports: [
        TileComponent,
        TileHeaderDirective,
        TileContentDirective,
        TileFooterDirective,
        TileTitleDirective,
        TileSubtitleDirective,
        TileSectionDirective,
        TileLaunchDirective,
        TileRefreshDirective,
        TileFooterTextDirective,
        TileHeaderContentDirective,
        TileProfileImgDirective,
        NumericContentDirective,
        NumericContentKpiContainerDirective,
        NumericContentKpiDirective,
        NumericContentLaunchIconContainerDirective,
        NumericContentLaunchIconDirective,
        NumericContentScaleArrowDirective,
        NumericContentScaleContainerDirective,
        NumericContentScaleDirective,
        NumericContentScaleTextDirective,
        NumericContentSmallTileDirective
    ],
    declarations: [
        TileComponent,
        TileHeaderDirective,
        TileContentDirective,
        TileFooterDirective,
        TileTitleDirective,
        TileSubtitleDirective,
        TileSectionDirective,
        TileLaunchDirective,
        TileRefreshDirective,
        TileFooterTextDirective,
        TileHeaderContentDirective,
        TileProfileImgDirective,
        NumericContentDirective,
        NumericContentScaleArrowDirective,
        NumericContentKpiContainerDirective,
        NumericContentKpiDirective,
        NumericContentLaunchIconContainerDirective,
        NumericContentLaunchIconDirective,
        NumericContentScaleContainerDirective,
        NumericContentScaleDirective,
        NumericContentScaleTextDirective,
        NumericContentSmallTileDirective
    ]
})
export class TileModule {}
