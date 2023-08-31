import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GenericTagComponent } from './generic-tag.component';

@NgModule({
    imports: [CommonModule, GenericTagComponent],
    exports: [GenericTagComponent]
})
export class GenericTagModule {}
