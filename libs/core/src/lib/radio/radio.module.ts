import { NgModule } from '@angular/core';
import { RadioButtonComponent } from './radio-button/radio-button.component';

/**
 * @deprecated
 * Use direct import of `RadioButtonComponent`.
 */
@NgModule({
    exports: [RadioButtonComponent],
    imports: [RadioButtonComponent]
})
export class RadioModule {}
