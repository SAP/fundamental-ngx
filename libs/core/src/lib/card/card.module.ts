import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AvatarComponent } from '@fundamental-ngx/core/avatar';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { ContentDensityModule } from '@fundamental-ngx/core/content-density';
import { ObjectStatusComponent } from '@fundamental-ngx/core/object-status';

import { CardContentComponent } from './card-content.component';
import { CardCounterDirective } from './card-counter.directive';
import { CardFooterComponent } from './card-footer.component';
import { CardHeaderComponent } from './card-header.component';
import { CardSecondSubtitleDirective } from './card-second-subtitle.directive';
import { CardSubtitleDirective } from './card-subtitle.directive';
import { CardTitleDirective } from './card-title.directive';
import { CardComponent } from './card.component';

import { CardFooterActionItemDirective } from './card-footer-action-item.directive';
import { CardLoaderComponent } from './card-loader.component';
import { CardKpiAnalyticsContentDirective } from './kpi/card-kpi-analytics-content.directive';
import { CardKpiAnalyticsLabelDirective } from './kpi/card-kpi-analytics-label.directive';
import { CardKpiAnalyticsDirective } from './kpi/card-kpi-analytics.directive';
import { CardKpiHeaderComponent } from './kpi/card-kpi-header.component';
import { CardKpiScaleIconDirective } from './kpi/card-kpi-scale-icon.directive';
import { CardKpiScaleTextDirective } from './kpi/card-kpi-scale-text.directive';
import { CardKpiValueDirective } from './kpi/card-kpi-value.directive';

const components = [
    CardComponent,
    CardHeaderComponent,
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
    CardFooterActionItemDirective
];

@NgModule({
    declarations: [...components],
    imports: [CommonModule, ButtonModule, AvatarComponent, ObjectStatusComponent, ContentDensityModule],
    exports: [ButtonModule, AvatarComponent, ...components, ContentDensityModule]
})
export class CardModule {}
