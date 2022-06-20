import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DialogModule } from '@fundamental-ngx/core/dialog';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { WizardModule } from '@fundamental-ngx/core/wizard';
import { TitleModule } from '@fundamental-ngx/core/title';
import { PlatformLinkModule } from '@fundamental-ngx/platform/link';
import { LayoutGridModule } from '@fundamental-ngx/core/layout-grid';
import { FormLabelModule } from '@fundamental-ngx/core/form';
import {
    FORM_GENERATOR_CONFIG,
    FORM_GENERATOR_ITEM_CONFIG,
    FormGeneratorModuleConfig,
    PlatformFormGeneratorModule
} from '@fundamental-ngx/platform/form';
import { PlatformButtonModule } from '@fundamental-ngx/platform/button';
import { WizardGeneratorStepComponent } from './components/wizard-generator-step/wizard-generator-step.component';
import { WizardBodyComponent } from './components/wizard-body/wizard-body.component';
import { DialogWizardGeneratorComponent } from './components/dialog-wizard-generator/dialog-wizard-generator.component';
import { WizardDialogGeneratorService } from './wizard-dialog-generator.service';
import { WizardSummaryStepComponent } from './components/wizard-summary-step/wizard-summary-step.component';
import { WizardSummarySectionComponent } from './components/wizard-summary-step/wizard-summary-section/wizard-summary-section.component';
import { WizardGeneratorGoNextButtonDirective } from './directives/wizard-generator-go-next-button.directive';
import { WizardGeneratorFinishButtonDirective } from './directives/wizard-generator-finish-button.directive';
import { WizardGeneratorComponent } from './components/wizard-generator/wizard-generator.component';
import { WizardGeneratorSummaryStepDirective } from './directives/wizard-generator-summary-step.directive';
import { WizardGeneratorReviewButtonDirective } from './directives/wizard-generator-review-button.directive';

/**
 * Adds Wizard Generator functionality to your application.
 *
 * Can be imported in two ways:
 * * Plain PlatformWizardGeneratorModule with default configuration
 * * With `withConfig()` method which allows passing custom default configuration.
 */
@NgModule({
    declarations: [
        WizardGeneratorComponent,
        WizardGeneratorStepComponent,
        WizardBodyComponent,
        DialogWizardGeneratorComponent,
        WizardSummaryStepComponent,
        WizardSummarySectionComponent,
        WizardGeneratorGoNextButtonDirective,
        WizardGeneratorFinishButtonDirective,
        WizardGeneratorSummaryStepDirective,
        WizardGeneratorReviewButtonDirective
    ],
    imports: [
        CommonModule,
        DialogModule,
        ButtonModule,
        WizardModule,
        PlatformFormGeneratorModule,
        PlatformButtonModule,
        LayoutGridModule,
        TitleModule,
        FormLabelModule,
        PlatformLinkModule
    ],
    exports: [
        WizardGeneratorComponent,
        WizardGeneratorStepComponent,
        WizardBodyComponent,
        DialogWizardGeneratorComponent,
        WizardSummaryStepComponent,
        WizardSummarySectionComponent,
        WizardGeneratorGoNextButtonDirective,
        WizardGeneratorFinishButtonDirective,
        WizardGeneratorSummaryStepDirective,
        WizardGeneratorReviewButtonDirective
    ],
    providers: [WizardDialogGeneratorService]
})
export class PlatformWizardGeneratorModule {
    /**
     * Allows configuring module on a global level with custom configuration.
     * @param config User's custom configuration.
     */
    static withConfig(config: Partial<FormGeneratorModuleConfig>): ModuleWithProviders<PlatformWizardGeneratorModule> {
        return {
            ngModule: PlatformWizardGeneratorModule,
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
