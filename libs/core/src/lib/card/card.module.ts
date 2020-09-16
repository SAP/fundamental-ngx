import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonModule } from '../button/button.module';
import { AvatarModule } from '../avatar/avatar.module';
import { ObjectStatusModule } from '../object-status/object-status.module';
import { ToolbarModule } from '../toolbar/toolbar.module';
import { BadgeModule } from '../badge/badge.module';
import { TileModule } from '../tile/tile.module';

import { CardComponent } from './card.component';
import { CardHeaderComponent } from './card-header.component';
import { CardTitleComponent } from './card-title.component';
import { CardSubtitleComponent } from './card-subtitle.component';
import { CardSecondSubtitleComponent } from './card-second-subtitle.component';
import { CardCounterComponent } from './card-counter.component';
import { CardContentComponent } from './card-content.component';
import { CardFooterComponent } from './card-footer.component';
import { CardLoaderComponent } from './card-loader.component';

import { CardKpiHeaderComponent } from './kpi/card-kpi-header.component';
import { CardKpiValueComponent } from './kpi/card-kpi-value.component';
import { CardKpiScaleIconComponent } from './kpi/card-kpi-scale-icon.component';
import { CardKpiScaleTextComponent } from './kpi/card-kpi-scale-text.component';
import { CardKpiAnalyticsComponent } from './kpi/card-kpi-analytics.component';
import { CardKpiAnalyticsLabelComponent } from './kpi/card-kpi-analytics-label.component';
import { CardKpiAnalyticsContentComponent } from './kpi/card-kpi-analytics-content.component';

const components = [
    CardComponent,
    CardHeaderComponent,
    CardContentComponent,
    CardFooterComponent,
    CardTitleComponent,
    CardSubtitleComponent,
    CardSecondSubtitleComponent,
    CardCounterComponent,
    CardLoaderComponent,

    CardKpiHeaderComponent,
    CardKpiValueComponent,
    CardKpiScaleIconComponent,
    CardKpiScaleTextComponent,
    CardKpiAnalyticsComponent,
    CardKpiAnalyticsLabelComponent,
    CardKpiAnalyticsContentComponent
];

@NgModule({
    declarations: [...components],
    imports: [CommonModule, BadgeModule, ButtonModule, AvatarModule, ObjectStatusModule, ToolbarModule, TileModule],
    exports: [ButtonModule, AvatarModule, TileModule, ...components]
})
export class CardModule {}
