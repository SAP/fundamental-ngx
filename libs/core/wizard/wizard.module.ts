import { NgModule } from '@angular/core';
import { WizardContentComponent } from './wizard-content/wizard-content.component';
import { WizardNavigationComponent } from './wizard-navigation/wizard-navigation.component';
import { WizardNextStepComponent } from './wizard-next-step/wizard-next-step.component';
import { WizardProgressBarDirective } from './wizard-progress-bar/wizard-progress-bar.directive';
import { WizardStepIndicatorComponent } from './wizard-step-indicator/wizard-step-indicator.component';
import { WizardStepComponent } from './wizard-step/wizard-step.component';
import { WizardComponent } from './wizard.component';
import { WizardService } from './wizard.service';

const components = [
    WizardComponent,
    WizardNavigationComponent,
    WizardProgressBarDirective,
    WizardStepComponent,
    WizardStepIndicatorComponent,
    WizardContentComponent,
    WizardNextStepComponent
];

/**
 * @deprecated
 * Use direct imports of `WizardComponent`,
    `WizardNavigationComponent`,
    `WizardProgressBarDirective`,
    `WizardStepComponent`,
    `WizardStepIndicatorComponent`,
    `WizardContentComponent`,
    `WizardNextStepComponent`
 */
@NgModule({
    imports: [...components],
    exports: [...components],
    providers: [WizardService]
})
export class WizardModule {}
