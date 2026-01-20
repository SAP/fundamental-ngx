import { NgModule } from '@angular/core';

import { CardListDirective } from './card-list/card-list.directive';
import { CardComponent } from './card.component';
import { CardContentComponent } from './content/card-content.component';
import { CardFooterComponent } from './footer/card-footer.component';
import { CardCounterDirective } from './header-elements/card-counter.directive';
import { CardSecondSubtitleDirective } from './header-elements/card-second-subtitle.directive';
import { CardSubtitleDirective } from './header-elements/card-subtitle.directive';
import { CardTitleDirective } from './header-elements/card-title.directive';
import { CardHeaderComponent } from './header/card-header.component';

import { ContentDensityModule } from '@fundamental-ngx/core/content-density';
import { CardFooterActionItemDirective } from './footer/card-footer-action-item.directive';
import { CardIndicatorTitleDirective } from './header-elements/card-indicator-title.directive';
import { CardIndicatorValueDirective } from './header-elements/card-indicator-value.directive';
import { CardIndicatorComponent } from './header-elements/card-indicator.component';
import { CardNumericContainerComponent } from './header-elements/card-numeric-container.component';
import { CardHeaderActionDirective } from './header/card-header-action.directive';
import { CardHeaderColumnDirective } from './header/card-header-column.directive';
import { CardExtendedHeaderComponent } from './header/card-header-extended.component';
import { CardMainHeaderComponent } from './header/card-header-main.component';
import { CardNumericHeaderComponent } from './header/card-header-numeric.component';
import { CardHeaderRowDirective } from './header/card-header-row.directive';
import { CardKpiAnalyticsContentDirective } from './kpi/card-kpi-analytics-content.directive';
import { CardKpiAnalyticsLabelDirective } from './kpi/card-kpi-analytics-label.directive';
import { CardKpiAnalyticsDirective } from './kpi/card-kpi-analytics.directive';
import { CardKpiHeaderComponent } from './kpi/card-kpi-header.component';
import { CardKpiScaleIconDirective } from './kpi/card-kpi-scale-icon.directive';
import { CardKpiScaleTextDirective } from './kpi/card-kpi-scale-text.directive';
import { CardKpiValueDirective } from './kpi/card-kpi-value.directive';
import { CardLoaderComponent } from './loader/card-loader.component';
import { CardMediaContentContainerDirective } from './media/card-media-content-container.directive';
import { CardMediaHeadingDirective } from './media/card-media-heading.directive';
import { CardMediaImageContainerDirective } from './media/card-media-image-container.directive';
import { CardMediaImageDirective } from './media/card-media-image.directive';
import { CardMediaTextDirective } from './media/card-media-text.directive';
import { CardMediaComponent } from './media/card-media.component';

const components = [
    CardComponent,
    CardListDirective,
    CardHeaderComponent,
    CardMainHeaderComponent,
    CardHeaderActionDirective,
    CardExtendedHeaderComponent,
    CardNumericHeaderComponent,
    CardHeaderRowDirective,
    CardHeaderColumnDirective,
    CardNumericContainerComponent,
    CardIndicatorComponent,
    CardIndicatorTitleDirective,
    CardIndicatorValueDirective,
    CardContentComponent,
    CardTitleDirective,
    CardSubtitleDirective,
    CardSecondSubtitleDirective,
    CardCounterDirective,
    CardLoaderComponent,
    CardKpiHeaderComponent,
    CardKpiValueDirective,
    CardKpiScaleIconDirective,
    CardKpiScaleTextDirective,
    CardKpiAnalyticsDirective,
    CardKpiAnalyticsLabelDirective,
    CardKpiAnalyticsContentDirective,
    CardFooterComponent,
    CardFooterActionItemDirective,
    CardMediaComponent,
    CardMediaImageDirective,
    CardMediaImageContainerDirective,
    CardMediaContentContainerDirective,
    CardMediaHeadingDirective,
    CardMediaTextDirective
];

/**
 * @deprecated
 * Use direct imports of components and directives.
 */
@NgModule({
    imports: [...components, ContentDensityModule],
    exports: [...components, ContentDensityModule]
})
export class CardModule {}
