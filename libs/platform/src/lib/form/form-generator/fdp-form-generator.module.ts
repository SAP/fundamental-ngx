import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormGeneratorComponentsAccessorService } from './form-generator-components-accessor.service';
import { FormGeneratorComponent } from './form-generator/form-generator.component';
import { DynamicFormControlFieldDirective } from './dynamic-form-control-field.directive';
import { DynamicFormControlDirective } from './dynamic-form-control.directive';
import { DynamicFormGeneratorCheckboxComponent } from './controls/dynamic-form-generator-checkbox/dynamic-form-generator-checkbox.component';
import { DynamicFormGeneratorInputComponent } from './controls/dynamic-form-generator-input/dynamic-form-generator-input.component';
import { DynamicFormGeneratorEditorComponent } from './controls/dynamic-form-generator-editor/dynamic-form-generator-editor.component';
import { DynamicFormGeneratorSelectComponent } from './controls/dynamic-form-generator-select/dynamic-form-generator-select.component';
import { DynamicFormGeneratorRadioComponent } from './controls/dynamic-form-generator-radio/dynamic-form-generator-radio.component';
import { DynamicFormGeneratorDatepickerComponent } from './controls/dynamic-form-generator-datepicker/dynamic-form-generator-datepicker.component';
import { DynamicFormGeneratorSwitchComponent } from './controls/dynamic-form-generator-switch/dynamic-form-generator-switch.component';
import { FormGeneratorService } from './form-generator.service';
import { FormGeneratorFieldComponent } from './form-generator-field/form-generator-field.component';
import { DynamicFormGeneratorMultiInputComponent } from './controls/dynamic-form-generator-multi-input/dynamic-form-generator-multi-input.component';
import { FormGeneratorModuleConfig } from './interfaces/form-generator-module-config';
import { GetOrderedFieldControlsPipe } from './pipes/get-ordered-form-controls.pipe';
import {
    defaultFormGeneratorConfigProvider,
    defaultFormGeneratorItemConfigProvider,
    FORM_GENERATOR_CONFIG,
    FORM_GENERATOR_ITEM_CONFIG
} from './providers/providers';
import { ContentDensityModule } from '@fundamental-ngx/core/content-density';
import { DynamicFormGeneratorObjectStatusComponent } from './controls/dynamic-form-generator-object-status/dynamic-form-generator-object-status.component';
import { GetHintOptionsPipe } from './pipes/get-hint-options.pipe';

/**
 * Adds Form Generator functionality to your application.
 *
 * Can be imported in two ways:
 * * Plain PlatformFormGeneratorModule with default configuration
 * * With `withConfig()` method which allows passing custom default configuration.
 */
@NgModule({
    imports: [
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
        GetOrderedFieldControlsPipe,
        DynamicFormGeneratorObjectStatusComponent,
        GetHintOptionsPipe
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
        ContentDensityModule,
        DynamicFormGeneratorObjectStatusComponent,
        GetHintOptionsPipe
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
