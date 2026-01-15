import { NgModule } from '@angular/core';
import { PlatformMultiInputComponent } from './multi-input.component';

/**
 * @deprecated
 * Use direct imports of components and directives.
 */
@NgModule({
    imports: [PlatformMultiInputComponent],
    exports: [PlatformMultiInputComponent]
})
export class PlatformMultiInputModule {}
