import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BadgeComponent } from './badge.component';
import { LabelComponent } from './label.component';

@NgModule({
    imports: [CommonModule],
    exports: [BadgeComponent, LabelComponent],
    declarations: [BadgeComponent, LabelComponent]
})
export class BadgeLabelModule {}
