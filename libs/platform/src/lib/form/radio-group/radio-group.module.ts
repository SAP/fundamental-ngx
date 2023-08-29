import { NgModule } from '@angular/core';
import { RadioGroupComponent } from './radio-group.component';
import { RadioButtonComponent } from './radio/radio.component';

@NgModule({
    imports: [RadioGroupComponent, RadioButtonComponent],
    exports: [RadioGroupComponent, RadioButtonComponent]
})
export class PlatformRadioGroupModule {}
