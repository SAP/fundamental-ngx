import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BadgeComponent } from './badge-label/badge.component';
import { LabelComponent } from './label/label.component';
import { StatusLabelComponent } from './status-label/status-label.component';

@NgModule({
    imports: [CommonModule],
    exports: [BadgeComponent, LabelComponent, StatusLabelComponent],
    declarations: [BadgeComponent, LabelComponent, StatusLabelComponent]
})
export class BadgeLabelModule { }
