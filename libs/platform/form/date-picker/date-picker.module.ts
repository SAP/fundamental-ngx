import { NgModule } from '@angular/core';
import { PlatformDatePickerComponent } from './date-picker.component';

/**
 * @deprecated
 * Use direct imports of components and directives.
 */
@NgModule({
    imports: [PlatformDatePickerComponent],
    exports: [PlatformDatePickerComponent]
})
export class PlatformDatePickerModule {}
