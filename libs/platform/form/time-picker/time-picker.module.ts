import { NgModule } from '@angular/core';
import { PlatformTimePickerComponent } from './time-picker.component';

/**
 * @deprecated
 * Use direct imports of components and directives.
 */
@NgModule({
    imports: [PlatformTimePickerComponent],
    exports: [PlatformTimePickerComponent]
})
export class PlatformTimePickerModule {}
