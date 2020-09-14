import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonModule } from '../button/button.module';
import { AvatarModule } from '../avatar/avatar.module';
import { ObjectStatusModule } from '../object-status/object-status.module';
import { ToolbarModule } from '../toolbar/toolbar.module';
import { BadgeModule } from '../badge/badge.module';

import { CardComponent } from './card.component';
import { CardHeaderComponent } from './card-header.component';
import { CardTitleComponent } from './card-title.component';
import { CardSubtitleComponent } from './card-subtitle.component';
import { CardCounterComponent } from './card-counter.component';
import { CardContentComponent } from './card-content.component';
import { CardFooterComponent } from './card-footer.component';
import { CardLoaderComponent } from './card-loader.component';

@NgModule({
    declarations: [
        CardComponent,
        CardHeaderComponent,
        CardContentComponent,
        CardFooterComponent,
        CardTitleComponent,
        CardSubtitleComponent,
        CardCounterComponent,
        CardLoaderComponent
    ],
    imports: [CommonModule, BadgeModule, ButtonModule, AvatarModule, ObjectStatusModule, ToolbarModule],
    exports: [
        ButtonModule,
        AvatarModule,
        CardComponent,
        CardHeaderComponent,
        CardContentComponent,
        CardFooterComponent,
        CardTitleComponent,
        CardSubtitleComponent,
        CardCounterComponent,
        CardLoaderComponent
    ]
})
export class CardModule {}
