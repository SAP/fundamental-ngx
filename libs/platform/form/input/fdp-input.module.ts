import { NgModule } from '@angular/core';
import { InputComponent } from './input.component';

/**
 * @deprecated
 * Use direct imports of components and directives.
 */
@NgModule({
    imports: [InputComponent],
    exports: [InputComponent]
})
export class PlatformInputModule {}
