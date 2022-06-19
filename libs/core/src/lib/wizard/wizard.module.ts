import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WizardComponent } from './wizard.component';
import { WizardNavigationComponent } from './wizard-navigation/wizard-navigation.component';
import { WizardProgressBarDirective } from './wizard-progress-bar/wizard-progress-bar.directive';
import { WizardStepComponent } from './wizard-step/wizard-step.component';
import { WizardStepIndicatorComponent } from './wizard-step-indicator/wizard-step-indicator.component';
import { WizardContentComponent } from './wizard-content/wizard-content.component';
import { WizardNextStepComponent } from './wizard-next-step/wizard-next-step.component';
import { IconModule } from '@fundamental-ngx/core/icon';
import { ActionSheetModule } from '@fundamental-ngx/core/action-sheet';
import { ScrollSpyModule } from '@fundamental-ngx/core/scroll-spy';
import { DeprecatedWizardCompactDirective } from './deprecated-wizard-compact.directive';
import { ContentDensityModule } from '@fundamental-ngx/core/content-density';

@NgModule({
    declarations: [
        WizardComponent,
        WizardNavigationComponent,
        WizardProgressBarDirective,
        WizardStepComponent,
        WizardStepIndicatorComponent,
        WizardContentComponent,
        WizardNextStepComponent,
        DeprecatedWizardCompactDirective
    ],
    imports: [CommonModule, IconModule, ScrollSpyModule, ActionSheetModule, ContentDensityModule],
    exports: [
        WizardComponent,
        WizardNavigationComponent,
        WizardProgressBarDirective,
        WizardStepComponent,
        WizardStepIndicatorComponent,
        WizardNextStepComponent,
        WizardContentComponent,
        DeprecatedWizardCompactDirective,
        ContentDensityModule
    ]
})
export class WizardModule {}
