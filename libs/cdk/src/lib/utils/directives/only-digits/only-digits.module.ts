import { NgModule } from '@angular/core';

import { OnlyDigitsDirective } from './only-digits.directive';

@NgModule({
    imports: [OnlyDigitsDirective],
    exports: [OnlyDigitsDirective]
})
export class OnlyDigitsModule {}
