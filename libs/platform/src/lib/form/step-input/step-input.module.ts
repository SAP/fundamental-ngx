import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonModule } from '@fundamental-ngx/core/button';
import { ContentDensityModule } from '@fundamental-ngx/core/content-density';
import { OnlyDigitsModule, PipeModule } from '@fundamental-ngx/cdk/utils';
import { StepInputDecrementDirective } from './step-input-decrement.directive';
import { StepInputIncrementDirective } from './step-input-increment.directive';
import { StepInputControlDirective } from './step-input-control.directive';
import { NumberStepInputComponent } from './number/number-step-input.component';
import { FormInputMessageGroupModule, FormMessageModule } from '@fundamental-ngx/core/form';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        PipeModule,
        ButtonModule,
        OnlyDigitsModule,
        FormInputMessageGroupModule,
        FormMessageModule,
        ContentDensityModule
    ],
    declarations: [
        StepInputDecrementDirective,
        StepInputIncrementDirective,
        StepInputControlDirective,
        NumberStepInputComponent
    ],
    exports: [NumberStepInputComponent, ContentDensityModule]
})
export class PlatformStepInputModule {}
