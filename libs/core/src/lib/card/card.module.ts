import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonModule } from '../button/button.module';
import { AvatarModule } from '../avatar/avatar.module';
import { ObjectStatusModule } from '../object-status/object-status.module';

import { CardComponent } from './card.component';
import { CardHeaderComponent } from './card-header.component';
import { CardTitleDirective } from './card-title.directive';
import { CardSubtitleDirective } from './card-subtitle.directive';
import { CardSecondSubtitleDirective } from './card-second-subtitle.directive';
import { CardCounterDirective } from './card-counter.directive';
import { CardContentComponent } from './card-content.component';
import { CardLoaderComponent } from './card-loader.component';

import { CardKpiHeaderComponent } from './kpi/card-kpi-header.component';
import { CardKpiValueDirective } from './kpi/card-kpi-value.directive';
import { CardKpiScaleIconDirective } from './kpi/card-kpi-scale-icon.directive';
import { CardKpiScaleTextDirective } from './kpi/card-kpi-scale-text.directive';
import { CardKpiAnalyticsDirective } from './kpi/card-kpi-analytics.directive';
import { CardKpiAnalyticsLabelDirective } from './kpi/card-kpi-analytics-label.directive';
import { CardKpiAnalyticsContentDirective } from './kpi/card-kpi-analytics-content.directive';

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
    CardKpiAnalyticsContentDirective
];

@NgModule({
    declarations: [...components],
    imports: [CommonModule, ButtonModule, AvatarModule, ObjectStatusModule],
    exports: [ButtonModule, AvatarModule, ...components]
})
export class CardModule {}
