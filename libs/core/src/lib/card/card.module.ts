import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonModule } from '../button/button.module';
import { AvatarModule } from '../avatar/avatar.module';

import { CardComponent } from './card.component';
import { CardHeaderComponent } from './card-header.component';
import { CardContentComponent } from './card-content.component';
import { CardFooterComponent } from './card-footer.component';

@NgModule({
    declarations: [CardComponent, CardHeaderComponent, CardContentComponent, CardFooterComponent],
    imports: [CommonModule, ButtonModule, AvatarModule],
    exports: [CardComponent, CardHeaderComponent, CardContentComponent, CardFooterComponent]
})
export class CardModule {}
