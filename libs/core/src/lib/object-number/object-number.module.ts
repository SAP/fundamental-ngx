import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ObjectNumberComponent } from './object-number.component';

@NgModule({
    declarations: [ObjectNumberComponent],
    imports: [CommonModule],
    exports: [ObjectNumberComponent]
})
export class ObjectNumberModule {}
