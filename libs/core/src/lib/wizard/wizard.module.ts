import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WizardComponent } from './wizard.component';
import { WizardNavigationComponent } from './wizard-navigation/wizard-navigation.component';
import { WizardProgressBarDirective } from './wizard-progress-bar/wizard-progress-bar.directive';
import { WizardStepComponent } from './wizard-step/wizard-step.component';
import { WizardStepIndicatorComponent } from './wizard-step-indicator/wizard-step-indicator.component';
import { WizardContentComponent } from './wizard-content/wizard-content.component';
import { WizardNextStepComponent } from './wizard-next-step/wizard-next-step.component';
import { IconModule } from '../icon/icon.module';
import { ActionSheetModule } from '../action-sheet/action-sheet.module';
import { ScrollSpyModule } from '../scroll-spy/scroll-spy.module';

@NgModule({
    declarations: [
        WizardComponent,
        WizardNavigationComponent,
        WizardProgressBarDirective,
        WizardStepComponent,
        WizardStepIndicatorComponent,
        WizardContentComponent,
        WizardNextStepComponent
    ],
    imports: [CommonModule, IconModule, ScrollSpyModule, ActionSheetModule],
    exports: [
        WizardComponent,
        WizardNavigationComponent,
        WizardProgressBarDirective,
        WizardStepComponent,
        WizardStepIndicatorComponent,
        WizardNextStepComponent,
        WizardContentComponent
    ]
})
export class WizardModule {}
