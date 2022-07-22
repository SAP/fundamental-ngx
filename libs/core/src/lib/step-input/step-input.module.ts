import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonModule } from '@fundamental-ngx/core/button';
import { FormInputMessageGroupModule, FormMessageModule } from '@fundamental-ngx/core/form';
import { A11yModule } from '@angular/cdk/a11y';
import { I18nModule } from '@fundamental-ngx/i18n';
import { StepInputComponent } from './step-input.component';
import { DeprecatedStepInputCompactDirective } from './deprecated-step-input-compact.directive';
import { ContentDensityModule } from '@fundamental-ngx/core/content-density';

@NgModule({
    declarations: [StepInputComponent, DeprecatedStepInputCompactDirective],
    imports: [
        CommonModule,
        ButtonModule,
        FormInputMessageGroupModule,
        FormMessageModule,
        A11yModule,
        ContentDensityModule,
        I18nModule
    ],
    exports: [StepInputComponent, DeprecatedStepInputCompactDirective, ContentDensityModule]
})
export class StepInputModule {}
