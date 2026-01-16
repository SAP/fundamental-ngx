import { NgModule } from '@angular/core';
import { CvaDirective } from './cva/cva.directive';

/**
 * @deprecated
 * Use direct imports of components and directives.
 */
@NgModule({
    imports: [CvaDirective],
    exports: [CvaDirective]
})
export class FormsModule {}
