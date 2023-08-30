import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GenericTagComponent } from './generic-tag.component';

@NgModule({
    imports: [CommonModule],
    exports: [GenericTagComponent],
    declarations: [GenericTagComponent]
})
export class GenericTagModule {}
