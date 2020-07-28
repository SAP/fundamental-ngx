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
    TileProfileImgDirective,
    TileLogoDirective
} from './directives/tile.directives';
import {
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
        TileRefreshDirective,
        TileFooterTextDirective,
        TileHeaderContentDirective,
        TileProfileImgDirective,
        TileLogoDirective,
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
        TileRefreshDirective,
        TileFooterTextDirective,
        TileHeaderContentDirective,
        TileProfileImgDirective,
        TileLogoDirective,
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
