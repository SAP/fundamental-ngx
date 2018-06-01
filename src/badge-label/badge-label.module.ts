import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Badge, Label } from './badge-label';

@NgModule({
    imports: [CommonModule],
    exports: [Badge, Label],
    declarations: [Badge, Label]
})
export class BadgeLabelModule {}
