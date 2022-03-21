import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FormControlModule } from '@fundamental-ngx/core/form';
import { PipeModule } from '@fundamental-ngx/core/utils';
import { TextAreaComponent } from './text-area.component';
import { I18nModule } from '@fundamental-ngx/i18n';

@NgModule({
    imports: [I18nModule, CommonModule, FormsModule, ReactiveFormsModule, FormControlModule, PipeModule],
    exports: [TextAreaComponent],
    declarations: [TextAreaComponent]
})
export class PlatformTextAreaModule {}
