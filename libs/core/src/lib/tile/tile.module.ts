import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TileComponent } from './tile.component';
import {
    TileContentDirective,
    TileHeaderDirective,
    TileFooterDirective,
    TileSectionDirective,
    TileSubtitleDirective,
    TileTitleDirective
} from './directives/tile.directives';
import {
    NumericContentKpiContainerDirective,
    NumericContentKpiDirective,
    NumericContentLaunchIconContainerDirective,
    NumericContentLaunchIconDirective,
    NumericContentScaleContainerDirective,
    NumericContentScaleDirective,
    NumericContentScaleTextDirective,
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
        NumericContentKpiContainerDirective,
        NumericContentKpiDirective,
        NumericContentLaunchIconContainerDirective,
        NumericContentLaunchIconDirective,
        NumericContentScaleContainerDirective,
        NumericContentScaleDirective,
        NumericContentScaleTextDirective
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
        NumericContentKpiContainerDirective,
        NumericContentKpiDirective,
        NumericContentLaunchIconContainerDirective,
        NumericContentLaunchIconDirective,
        NumericContentScaleContainerDirective,
        NumericContentScaleDirective,
        NumericContentScaleTextDirective
    ]
})
export class TileModule {}
