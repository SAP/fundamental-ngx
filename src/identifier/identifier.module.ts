import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IdentifierDirective } from './identifier.directive';

@NgModule({
    imports: [CommonModule],
    exports: [IdentifierDirective],
    declarations: [IdentifierDirective]
})
export class IdentifierModule {}
