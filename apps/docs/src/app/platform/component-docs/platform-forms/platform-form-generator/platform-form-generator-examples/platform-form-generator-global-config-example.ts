import { NgModule } from '@angular/core';
import { DynamicFormFieldItem, PlatformFormGeneratorModule } from '@fundamental-ngx/platform/form';

const DEFAULT_FORM_GENERATOR_CONFIG: Partial<DynamicFormFieldItem> = {
    // This will apply required validator to all controls where this property is not specified.
    required: true,
    // Use Label message as placeholder by default.
    useMessageAsPlaceholder: true
};

@NgModule({
    imports: [PlatformFormGeneratorModule.withConfig(DEFAULT_FORM_GENERATOR_CONFIG)]
})
export class ExampleAppModule {}
