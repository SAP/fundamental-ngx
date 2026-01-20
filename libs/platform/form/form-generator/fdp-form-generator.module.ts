import { ModuleWithProviders, NgModule } from '@angular/core';
import { ContentDensityModule } from '@fundamental-ngx/core/content-density';
import { DynamicFormGeneratorCheckboxComponent } from './controls/dynamic-form-generator-checkbox/dynamic-form-generator-checkbox.component';
import { DynamicFormGeneratorDatepickerComponent } from './controls/dynamic-form-generator-datepicker/dynamic-form-generator-datepicker.component';
import { DynamicFormGeneratorEditorComponent } from './controls/dynamic-form-generator-editor/dynamic-form-generator-editor.component';
import { DynamicFormGeneratorInputComponent } from './controls/dynamic-form-generator-input/dynamic-form-generator-input.component';
import { DynamicFormGeneratorMultiInputComponent } from './controls/dynamic-form-generator-multi-input/dynamic-form-generator-multi-input.component';
import { DynamicFormGeneratorObjectStatusComponent } from './controls/dynamic-form-generator-object-status/dynamic-form-generator-object-status.component';
import { DynamicFormGeneratorRadioComponent } from './controls/dynamic-form-generator-radio/dynamic-form-generator-radio.component';
import { DynamicFormGeneratorSelectComponent } from './controls/dynamic-form-generator-select/dynamic-form-generator-select.component';
import { DynamicFormGeneratorSwitchComponent } from './controls/dynamic-form-generator-switch/dynamic-form-generator-switch.component';
import { DynamicFormControlFieldDirective } from './dynamic-form-control-field.directive';
import { DynamicFormControlDirective } from './dynamic-form-control.directive';
import { FormGeneratorComponentsAccessorService } from './form-generator-components-accessor.service';
import { FormGeneratorFieldComponent } from './form-generator-field/form-generator-field.component';
import { FormGeneratorService } from './form-generator.service';
import { FormGeneratorComponent } from './form-generator/form-generator.component';
import { FormGeneratorModuleConfig } from './interfaces/form-generator-module-config';
import { GetHintOptionsPipe } from './pipes/get-hint-options.pipe';
import { GetOrderedFieldControlsPipe } from './pipes/get-ordered-form-controls.pipe';
import {
    FORM_GENERATOR_CONFIG,
    FORM_GENERATOR_ITEM_CONFIG,
    defaultFormGeneratorConfigProvider,
    defaultFormGeneratorItemConfigProvider
} from './providers/providers';

/**
 * Adds Form Generator functionality to your application.
 *
 * Can be imported in two ways:
 * * Plain PlatformFormGeneratorModule with default configuration
 * * With `withConfig()` method which allows passing custom default configuration.
 */
/**
 * @deprecated
 * Use direct imports of components and directives.
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
