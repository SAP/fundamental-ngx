import { NgModule } from '@angular/core';
import { PlatformDatetimePickerComponent } from './datetime-picker.component';

/**
 * @deprecated
 * Use direct imports of components and directives.
 */
@NgModule({
    imports: [PlatformDatetimePickerComponent],
    exports: [PlatformDatetimePickerComponent]
})
export class PlatformDatetimePickerModule {}
