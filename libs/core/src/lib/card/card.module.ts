import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HammerModule } from '@angular/platform-browser';
import 'hammerjs';

import { ButtonModule } from '../button/button.module';
import { AvatarModule } from '../avatar/avatar.module';
import { ObjectStatusModule } from '../object-status/object-status.module';
import { ToolbarModule } from '../toolbar/toolbar.module';

import { CardComponent } from './card.component';
import { CardHeaderComponent } from './card-header.component';
import { CardTitleComponent } from './card-title.component';
import { CardSubtitleComponent } from './card-subtitle.component';
import { CardCounterComponent } from './card-counter.component';
import { CardContentComponent } from './card-content.component';
import { CardFooterComponent } from './card-footer.component';

@NgModule({
    declarations: [
        CardComponent,
        CardHeaderComponent,
        CardContentComponent,
        CardFooterComponent,
        CardTitleComponent,
        CardSubtitleComponent,
        CardCounterComponent
    ],
    imports: [CommonModule, HammerModule, ButtonModule, AvatarModule, ObjectStatusModule, ToolbarModule],
    exports: [
        ButtonModule,
        AvatarModule,
        CardComponent,
        CardHeaderComponent,
        CardContentComponent,
        CardFooterComponent,
        CardTitleComponent,
        CardSubtitleComponent,
        CardCounterComponent
    ]
})
export class CardModule {}
