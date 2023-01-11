import { NgModule } from '@angular/core';

import { OnlyDigitsDirective, DeprecatedOnlyDigitsDirective } from './only-digits.directive';

@NgModule({
    imports: [OnlyDigitsDirective, DeprecatedOnlyDigitsDirective],
    exports: [OnlyDigitsDirective, DeprecatedOnlyDigitsDirective]
})
export class OnlyDigitsModule {}
