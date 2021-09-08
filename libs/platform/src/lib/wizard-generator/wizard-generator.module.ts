import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DialogModule } from '@fundamental-ngx/core/dialog';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { WizardModule } from '@fundamental-ngx/core/wizard';
import { TitleModule } from '@fundamental-ngx/core/title';
import { LayoutGridModule } from '@fundamental-ngx/core/layout-grid';
import { FormLabelModule } from '@fundamental-ngx/core/form';
import { PlatformFormGeneratorModule } from '@fundamental-ngx/platform/form';
import { PlatformButtonModule } from '@fundamental-ngx/platform/button';
import { WizardGeneratorStepComponent } from './components/wizard-generator-step/wizard-generator-step.component';
import { WizardBodyComponent } from './components/wizard-body/wizard-body.component';
import { DialogWizardGeneratorComponent } from './components/dialog-wizard-generator/dialog-wizard-generator.component';
import { WizardDialogGeneratorService } from './wizard-dialog-generator.service';
import { WizardSummaryStepComponent } from './components/wizard-summary-step/wizard-summary-step.component';
import { WizardSummarySectionComponent } from './components/wizard-summary-step/wizard-summary-section/wizard-summary-section.component';
import { FdpWizardGeneratorGoNextButtonDirective } from './directives/fdp-wizard-generator-go-next-button.directive';
import { FdpWizardGeneratorFinishButtonDirective } from './directives/fdp-wizard-generator-finish-button.directive';
import { WizardGeneratorComponent } from './components/wizard-generator/wizard-generator.component';

@NgModule({
    declarations: [
        WizardGeneratorComponent,
        WizardGeneratorStepComponent,
        WizardBodyComponent,
        DialogWizardGeneratorComponent,
        WizardSummaryStepComponent,
        WizardSummarySectionComponent,
        FdpWizardGeneratorGoNextButtonDirective,
        FdpWizardGeneratorFinishButtonDirective
    ],
    entryComponents: [DialogWizardGeneratorComponent],
    imports: [
        CommonModule,
        DialogModule,
        ButtonModule,
        WizardModule,
        PlatformFormGeneratorModule,
        PlatformButtonModule,
        LayoutGridModule,
        TitleModule,
        FormLabelModule
    ],
    exports: [
        WizardGeneratorComponent,
        WizardGeneratorStepComponent,
        WizardBodyComponent,
        DialogWizardGeneratorComponent,
        WizardSummaryStepComponent,
        WizardSummarySectionComponent,
        FdpWizardGeneratorGoNextButtonDirective,
        FdpWizardGeneratorFinishButtonDirective
    ],
    providers: [WizardDialogGeneratorService]
})
export class PlatformWizardGeneratorModule { }
