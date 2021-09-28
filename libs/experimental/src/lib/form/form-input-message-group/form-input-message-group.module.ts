import { CommonModule } from '@angular/common';
import { ExperimentalFormInputMessageGroupComponent } from './form-input-message-group.component';
import { NgModule } from '@angular/core';
import { PopoverModule } from '@fundamental-ngx/core/popover';

@NgModule({
    imports: [CommonModule, PopoverModule],
    exports: [ExperimentalFormInputMessageGroupComponent],
    declarations: [ExperimentalFormInputMessageGroupComponent]
})
export class ExperimentalFormInputMessageGroupModule {}
