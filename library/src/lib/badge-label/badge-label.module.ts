import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BadgeDirective } from './badge.directive';
import { LabelDirective } from './label.directive';
import { StatusLabelDirective } from './status-label.directive';

@NgModule({
    imports: [CommonModule],
    exports: [BadgeDirective, LabelDirective, StatusLabelDirective],
    declarations: [BadgeDirective, LabelDirective, StatusLabelDirective]
})
export class BadgeLabelModule { }
