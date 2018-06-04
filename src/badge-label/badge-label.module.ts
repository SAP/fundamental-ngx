import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BadgeComponent, LabelComponent } from './badge-label.component';

@NgModule({
    imports: [CommonModule],
    exports: [BadgeComponent, LabelComponent],
    declarations: [BadgeComponent, LabelComponent]
})
export class BadgeLabelModule {}
