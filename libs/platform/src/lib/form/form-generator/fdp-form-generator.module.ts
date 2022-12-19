import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FormMessageModule } from '@fundamental-ngx/core/form';
import { BusyIndicatorModule } from '@fundamental-ngx/core/busy-indicator';
import { PlatformButtonModule } from '@fundamental-ngx/platform/button';
import { SkeletonModule } from '@fundamental-ngx/core/skeleton';
import { FormGeneratorComponentsAccessorService } from './form-generator-components-accessor.service';
import { FormGeneratorComponent } from './form-generator/form-generator.component';
import { DynamicFormControlFieldDirective } from './dynamic-form-control-field.directive';
import { PlatformInputModule } from '../input/fdp-input.module';
import { FdpFormGroupModule } from '../form-group/fdp-form.module';
import { PlatformCheckboxGroupModule } from '../checkbox-group/checkbox-group.module';
import { PlatformSelectModule } from '../select/select.module';
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
import { FormGeneratorFieldComponent } from './form-generator-field/form-generator-field.component';
import { DynamicFormGeneratorMultiInputComponent } from './dynamic-form-generator-multi-input/dynamic-form-generator-multi-input.component';
import { FormGeneratorModuleConfig } from './interfaces/form-generator-module-config';
import { GetOrderedFieldControlsPipe } from './pipes/get-ordered-form-controls.pipe';
import { PlatformMultiComboboxModule } from '../multi-combobox/multi-combobox.module';
import { PlatformMultiInputModule } from '../multi-input/multi-input.module';
import {
    defaultFormGeneratorConfigProvider,
    defaultFormGeneratorItemConfigProvider,
    FORM_GENERATOR_CONFIG,
    FORM_GENERATOR_ITEM_CONFIG
} from './providers/providers';
import { ContentDensityModule } from '@fundamental-ngx/core/content-density';

/**
 * Adds Form Generator functionality to your application.
 *
 * Can be imported in two ways:
 * * Plain PlatformFormGeneratorModule with default configuration
 * * With `withConfig()` method which allows passing custom default configuration.
 */
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
        DynamicFormGeneratorSwitchComponent,
        FormGeneratorFieldComponent,
        DynamicFormGeneratorMultiInputComponent,
        GetOrderedFieldControlsPipe
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
        BusyIndicatorModule,
        PlatformMultiComboboxModule,
        PlatformMultiInputModule,
        ContentDensityModule,
        SkeletonModule
    ],
    providers: [
        FormGeneratorService,
        FormGeneratorComponentsAccessorService,
        defaultFormGeneratorItemConfigProvider,
        defaultFormGeneratorConfigProvider
    ],
    exports: [
        FormGeneratorComponent,
        DynamicFormControlFieldDirective,
        DynamicFormControlDirective,
        DynamicFormGeneratorCheckboxComponent,
        DynamicFormGeneratorInputComponent,
        DynamicFormGeneratorEditorComponent,
        DynamicFormGeneratorSelectComponent,
        DynamicFormGeneratorRadioComponent,
        DynamicFormGeneratorDatepickerComponent,
        DynamicFormGeneratorSwitchComponent,
        FormGeneratorFieldComponent,
        ContentDensityModule
    ]
})
export class PlatformFormGeneratorModule {
    /**
     * Allows configuring module on a global level with custom configuration.
     * @param config User's custom configuration.
     */
    static withConfig(config: Partial<FormGeneratorModuleConfig>): ModuleWithProviders<PlatformFormGeneratorModule> {
        return {
            ngModule: PlatformFormGeneratorModule,
            providers: [
                {
                    provide: FORM_GENERATOR_ITEM_CONFIG,
                    useValue: config.itemConfig
                },
                {
                    provide: FORM_GENERATOR_CONFIG,
                    useValue: config.formConfig
                }
            ]
        };
    }
}
