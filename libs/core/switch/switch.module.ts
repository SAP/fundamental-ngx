import { NgModule } from '@angular/core';
import { SwitchComponent } from './switch.component';

/**
 * @deprecated
 * Use direct imports of components and directives.
 */
@NgModule({
    imports: [SwitchComponent],
    exports: [SwitchComponent]
})
export class SwitchModule {}
