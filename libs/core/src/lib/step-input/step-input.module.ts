import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { A11yModule } from '@angular/cdk/a11y';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { ContentDensityModule } from '@fundamental-ngx/core/content-density';
import { FormInputMessageGroupComponent, FormMessageComponent } from '@fundamental-ngx/core/form';
import { I18nModule } from '@fundamental-ngx/i18n';
import { StepInputComponent } from './step-input.component';

@NgModule({
    declarations: [StepInputComponent],
    imports: [
        CommonModule,
        ButtonModule,
        FormInputMessageGroupComponent,
        FormMessageComponent,
        A11yModule,
        ContentDensityModule,
        I18nModule
    ],
    exports: [StepInputComponent, ContentDensityModule]
})
export class StepInputModule {}
