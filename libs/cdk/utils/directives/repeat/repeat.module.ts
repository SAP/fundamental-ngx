import { NgModule } from '@angular/core';

import { RepeatDirective } from './repeat.directive';

/**
 * @deprecated
 * Use direct imports of components and directives.
 */
@NgModule({
    imports: [RepeatDirective],
    exports: [RepeatDirective]
})
export class RepeatModule {}
