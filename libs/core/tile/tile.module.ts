import { NgModule } from '@angular/core';

import {
    NumericContentDirective,
    NumericContentKpiContainerDirective,
    NumericContentKpiDirective,
    NumericContentLaunchIconContainerDirective,
    NumericContentLaunchIconDirective,
    NumericContentScaleArrowDirective,
    NumericContentScaleContainerDirective,
    NumericContentScaleDirective,
    NumericContentScaleTextDirective
} from './directives/numeric-content.directives';
import {
    TileActionCloseDirective,
    TileActionContainerDirective,
    TileActionIndicatorDirective,
    TileBackgroundImgDirective,
    TileContainerDirective,
    TileContentDirective,
    TileContentTextDirective,
    TileFooterDirective,
    TileFooterTextDirective,
    TileHeaderContentDirective,
    TileHeaderDirective,
    TileLogoDirective,
    TilePageIndicatorDirective,
    TileProfileImgDirective,
    TileRefreshDirective,
    TileSectionDirective,
    TileSubtitleDirective,
    TileTitleContainerDirective,
    TileTitleDirective,
    TileToggleDirective
} from './directives/tile.directives';
import { TileComponent } from './tile.component';

/**
 * @deprecated
 * Use direct imports of components and directives.
 */
@NgModule({
    imports: [
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
        TileContentTextDirective,
        TileBackgroundImgDirective,
        TileToggleDirective,
        TileContainerDirective,
        TilePageIndicatorDirective,
        TileActionCloseDirective,
        TileActionIndicatorDirective,
        TileTitleContainerDirective,
        TileActionContainerDirective,
        NumericContentDirective,
        NumericContentScaleArrowDirective,
        NumericContentKpiContainerDirective,
        NumericContentKpiDirective,
        NumericContentLaunchIconContainerDirective,
        NumericContentLaunchIconDirective,
        NumericContentScaleContainerDirective,
        NumericContentScaleDirective,
        NumericContentScaleTextDirective
    ],
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
        TileContentTextDirective,
        TileBackgroundImgDirective,
        TileToggleDirective,
        TileContainerDirective,
        TilePageIndicatorDirective,
        TileActionCloseDirective,
        TileActionIndicatorDirective,
        TileTitleContainerDirective,
        TileActionContainerDirective,
        NumericContentDirective,
        NumericContentKpiContainerDirective,
        NumericContentKpiDirective,
        NumericContentLaunchIconContainerDirective,
        NumericContentLaunchIconDirective,
        NumericContentScaleArrowDirective,
        NumericContentScaleContainerDirective,
        NumericContentScaleDirective,
        NumericContentScaleTextDirective
    ]
})
export class TileModule {}
