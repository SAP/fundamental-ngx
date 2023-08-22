import { NgModule } from '@angular/core';
import { PlatformDatetimePickerComponent } from './datetime-picker.component';

@NgModule({
    imports: [PlatformDatetimePickerComponent],
    exports: [PlatformDatetimePickerComponent]
})
export class PlatformDatetimePickerModule {}
