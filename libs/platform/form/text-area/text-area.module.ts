import { NgModule } from '@angular/core';
import { TextAreaComponent } from './text-area.component';

/**
 * @deprecated
 * Use direct imports of components and directives.
 */
@NgModule({
    imports: [TextAreaComponent],
    exports: [TextAreaComponent]
})
export class PlatformTextAreaModule {}
