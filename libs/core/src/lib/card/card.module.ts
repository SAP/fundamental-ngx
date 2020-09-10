import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardComponent } from './card.component';
import { CardHeaderComponent } from './card-header.component';
import { CardContentComponent } from './card-content.component';
import { CardFooterComponent } from './card-footer.component';

@NgModule({
    declarations: [CardComponent, CardHeaderComponent, CardContentComponent, CardFooterComponent],
    imports: [CommonModule],
    exports: [CardComponent, CardHeaderComponent, CardContentComponent, CardFooterComponent]
})
export class CardModule {}
