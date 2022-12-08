import { NgModule } from '@angular/core';
import { PlatformFormGeneratorModule, FormGeneratorModuleConfig } from '@fundamental-ngx/platform/form';

const DEFAULT_FORM_GENERATOR_CONFIG: Partial<FormGeneratorModuleConfig> = {
    itemConfig: {
        // This will apply required validator to all controls where this property is not specified.
        required: true,
        // Use Label message as placeholder by default.
        useMessageAsPlaceholder: true
    },
    formConfig: {
        // This will change default group name which holds all ungrouped controls.
        ungroupedControlsName: 'ungrouped',
        // This will change default control name separator in case of multidimensional form controls.
        controlNameSeparator: '|'
    }
};

@NgModule({
    imports: [PlatformFormGeneratorModule.withConfig(DEFAULT_FORM_GENERATOR_CONFIG)]
})
export class ExampleAppModule {}
