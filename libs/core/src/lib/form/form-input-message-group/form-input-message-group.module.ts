import { CommonModule } from '@angular/common';
import { FormInputMessageGroupComponent } from './form-input-message-group.component';
import { NgModule } from '@angular/core';
import { PopoverModule } from '@fundamental-ngx/core/popover';

@NgModule({
    imports: [CommonModule, PopoverModule],
    exports: [FormInputMessageGroupComponent],
    declarations: [FormInputMessageGroupComponent]
})
export class FormInputMessageGroupModule {}
