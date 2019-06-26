import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BadgeDirective } from './badge.directive';
import { LabelDirective } from './label.directive';

@NgModule({
    imports: [CommonModule],
    exports: [BadgeDirective, LabelDirective],
    declarations: [BadgeDirective, LabelDirective]
})
export class BadgeLabelModule { }
