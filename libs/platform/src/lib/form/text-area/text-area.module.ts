import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FormControlModule } from '@fundamental-ngx/core/form';
import { PipeModule } from '@fundamental-ngx/cdk/utils';
import { ContentDensityModule } from '@fundamental-ngx/core/content-density';
import { TextAreaComponent } from './text-area.component';
import { I18nModule } from '@fundamental-ngx/i18n';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        FormControlModule,
        PipeModule,
        ContentDensityModule,
        I18nModule
    ],
    exports: [TextAreaComponent, ContentDensityModule],
    declarations: [TextAreaComponent]
})
export class PlatformTextAreaModule {}
