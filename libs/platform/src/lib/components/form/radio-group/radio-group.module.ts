import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormModule as FdFormModule } from '@fundamental-ngx/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FdpRadioButtonModule } from './radio/radio.module';
import { GroupRadioButtonComponent } from './radio-group.component';

@NgModule({
    imports: [CommonModule, FdFormModule, FdpRadioButtonModule, FormsModule, ReactiveFormsModule],
    exports: [GroupRadioButtonComponent],
    declarations: [GroupRadioButtonComponent]
})
export class FdpRadioButtonGroupModule {}
