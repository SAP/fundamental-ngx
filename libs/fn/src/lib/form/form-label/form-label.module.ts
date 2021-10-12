import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ExperimentalFormLabelComponent } from './form-label.component';
import { IconModule } from '@fundamental-ngx/core/icon';
import { InlineHelpModule } from '@fundamental-ngx/core/inline-help';

@NgModule({
    imports: [CommonModule, IconModule, InlineHelpModule],
    exports: [ExperimentalFormLabelComponent],
    declarations: [ExperimentalFormLabelComponent]
})
export class ExperimentalFormLabelModule {}
