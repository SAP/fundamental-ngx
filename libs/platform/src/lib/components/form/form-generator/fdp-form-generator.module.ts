import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormGeneratorComponent } from './form-generator/form-generator.component';
import { DynamicFormControlFieldDirective } from './dynamic-form-control-field.directive';
import { PlatformInputModule } from '../input/fdp-input.module';
import { FdpFormGroupModule } from '../form-group/fdp-form.module';
import { PlatformButtonModule } from '../../button/button.module';
import { PlatformCheckboxGroupModule } from '../checkbox-group/checkbox-group.module';
import { PlatformSelectModule } from '../select';
import { PlatformRadioGroupModule } from '../radio-group/radio-group.module';
import { PlatformTextAreaModule } from '../text-area/text-area.module';
import { PlatformDatePickerModule } from '../date-picker/date-picker.module';
import { PlatformSwitchModule } from '../switch/switch.module';
import { DynamicFormControlDirective } from './dynamic-form-control.directive';
import { DynamicFormGeneratorCheckboxComponent } from './dynamic-form-generator-checkbox/dynamic-form-generator-checkbox.component';
import { DynamicFormGeneratorInputComponent } from './dynamic-form-generator-input/dynamic-form-generator-input.component';
import { DynamicFormGeneratorEditorComponent } from './dynamic-form-generator-editor/dynamic-form-generator-editor.component';
import { DynamicFormGeneratorSelectComponent } from './dynamic-form-generator-select/dynamic-form-generator-select.component';
import { DynamicFormGeneratorRadioComponent } from './dynamic-form-generator-radio/dynamic-form-generator-radio.component';
import { DynamicFormGeneratorDatepickerComponent } from './dynamic-form-generator-datepicker/dynamic-form-generator-datepicker.component';
import { DynamicFormGeneratorSwitchComponent } from './dynamic-form-generator-switch/dynamic-form-generator-switch.component';
import { FormGeneratorService } from './form-generator.service';
import { FormMessageModule } from '@fundamental-ngx/core/form';
import { BusyIndicatorModule } from '@fundamental-ngx/core/busy-indicator';

@NgModule({
    declarations: [
        FormGeneratorComponent,
        DynamicFormControlFieldDirective,
        DynamicFormControlDirective,
        DynamicFormGeneratorCheckboxComponent,
        DynamicFormGeneratorInputComponent,
        DynamicFormGeneratorEditorComponent,
        DynamicFormGeneratorSelectComponent,
        DynamicFormGeneratorRadioComponent,
        DynamicFormGeneratorDatepickerComponent,
        DynamicFormGeneratorSwitchComponent
    ],
    imports: [
        CommonModule,
        FdpFormGroupModule,
        PlatformInputModule,
        FormsModule,
        ReactiveFormsModule,
        PlatformButtonModule,
        PlatformCheckboxGroupModule,
        PlatformSelectModule,
        PlatformRadioGroupModule,
        PlatformTextAreaModule,
        PlatformInputModule,
        PlatformDatePickerModule,
        PlatformSwitchModule,
        FormMessageModule,
        BusyIndicatorModule
    ],
    providers: [FormGeneratorService],
    exports: [FormGeneratorComponent]
})
export class PlatformFormGeneratorModule {
}
