import { NgModule } from '@angular/core';

import { RepeatDirective } from './repeat.directive';

@NgModule({
    imports: [RepeatDirective],
    exports: [RepeatDirective]
})
export class RepeatModule {}
