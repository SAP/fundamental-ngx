import { ScrollingModule } from '@angular/cdk/scrolling';
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
import { ContentDensityModule } from '@fundamental-ngx/core/content-density';
import { ScrollbarModule } from '@fundamental-ngx/core/scrollbar';
import { WizardService } from './wizard.service';

@NgModule({
    declarations: [
        WizardComponent,
        WizardNavigationComponent,
        WizardProgressBarDirective,
        WizardStepComponent,
        WizardStepIndicatorComponent,
        WizardContentComponent,
        WizardNextStepComponent,
            ],
    imports: [
        CommonModule,
        IconModule,
        ScrollSpyModule,
        ActionSheetModule,
        ScrollingModule,
        ContentDensityModule,
        ScrollbarModule
    ],
    exports: [
        WizardComponent,
        WizardNavigationComponent,
        WizardProgressBarDirective,
        WizardStepComponent,
        WizardStepIndicatorComponent,
        WizardNextStepComponent,
        WizardContentComponent,
                ContentDensityModule
    ],
    providers: [WizardService]
})
export class WizardModule {}
