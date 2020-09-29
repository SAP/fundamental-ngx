import { CommonModule } from '@angular/common';
import { FormInputMessageGroupComponent } from './form-input-message-group.component';
import { NgModule } from '@angular/core';
import { PopoverModule } from '../../popover/public_api';

@NgModule({
    imports: [CommonModule, PopoverModule],
    exports: [FormInputMessageGroupComponent],
    declarations: [FormInputMessageGroupComponent]
})
export class FormInputMessageGroupModule {
}
