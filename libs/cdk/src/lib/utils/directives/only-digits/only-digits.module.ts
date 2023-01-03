import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OnlyDigitsDirective } from './only-digits.directive';

@NgModule({
    imports: [CommonModule],
    exports: [OnlyDigitsDirective],
    declarations: [OnlyDigitsDirective]
})
export class OnlyDigitsModule {}
