import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IdentifierComponent } from './identifier.component';

@NgModule({
    imports: [CommonModule],
    exports: [IdentifierComponent],
    declarations: [IdentifierComponent]
})
export class IdentifierModule {}
