import { NgModule } from '@angular/core';

import { DeprecatedRepeatDirective, RepeatDirective } from './repeat.directive';

@NgModule({
    imports: [RepeatDirective, DeprecatedRepeatDirective],
    exports: [RepeatDirective, DeprecatedRepeatDirective]
})
export class RepeatModule {}
