import {
    ChangeDetectionStrategy,
    Component,
    QueryList,
    TemplateRef,
    ViewChildren,
    ViewEncapsulation
} from '@angular/core';
import { DialogService } from '@fundamental-ngx/core/dialog';
import { WizardService, WizardStepComponent, WizardStepStatus } from '@fundamental-ngx/core/wizard';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { NgIf } from '@angular/common';
import { BarModule } from '@fundamental-ngx/core/bar';
import { RouterLink } from '@angular/router';
import { LinkComponent } from '@fundamental-ngx/core/link';
import { LayoutGridModule } from '@fundamental-ngx/core/layout-grid';
import { FormsModule } from '@angular/forms';
import { FormControlModule } from '@fundamental-ngx/core/form';
import { FormLabelModule } from '@fundamental-ngx/core/form';
import { FormItemModule } from '@fundamental-ngx/core/form';
import { MessageStripComponent } from '@fundamental-ngx/core/message-strip';
import { WizardModule } from '@fundamental-ngx/core/wizard';
import { ScrollbarDirective } from '@fundamental-ngx/core/scrollbar';
import { CdkScrollable } from '@angular/cdk/overlay';
import { TitleComponent } from '@fundamental-ngx/core/title';
import { DialogModule } from '@fundamental-ngx/core/dialog';

@Component({
    selector: 'fd-wizard-visible-summary-example',
    templateUrl: './wizard-visible-summary-example.component.html',
    styleUrls: ['./wizard-visible-summary-example.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [
        DialogModule,
        TitleComponent,
        CdkScrollable,
        ScrollbarDirective,
        WizardModule,
        MessageStripComponent,
        FormItemModule,
        FormLabelModule,
        FormControlModule,
        FormsModule,
        LayoutGridModule,
        LinkComponent,
        RouterLink,
        BarModule,
        NgIf,
        ButtonModule
    ]
})
export class WizardVisibleSummaryExampleComponent {
    step1status: WizardStepStatus = 'current';
    step2status: WizardStepStatus = 'upcoming';
    step3status: WizardStepStatus = 'upcoming';
    step4status: WizardStepStatus = 'upcoming';
    summaryStatus: WizardStepStatus = 'upcoming';

    fullName = '';
    addressLine1 = '';
    addressLine2 = '';

    currentStep = 1;

    /** @hidden */
    @ViewChildren(WizardStepComponent)
    wizardStepComponents: QueryList<WizardStepComponent>;

    constructor(private _dialogService: DialogService, private _wizardService: WizardService) {}

    statusChanged(stepNumber: number, event: WizardStepStatus): void {
        if (event === 'current') {
            this.goToStep(stepNumber);
        }
    }

    openDialog(dialog: TemplateRef<any>): void {
        this._dialogService.open(dialog, {
            width: '100%',
            height: '100%'
        });
    }

    goToStep(step: number): void {
        switch (step) {
            case 1: {
                this.step1status = 'current';
                this.step2status = 'upcoming';
                this.step3status = 'upcoming';
                this.step4status = 'upcoming';
                this.summaryStatus = 'upcoming';
                this.currentStep = 1;
                break;
            }
            case 2: {
                this.step1status = 'completed';
                this.step2status = 'current';
                this.step3status = 'upcoming';
                this.step4status = 'upcoming';
                this.summaryStatus = 'upcoming';
                this.currentStep = 2;
                break;
            }
            case 3: {
                this.step1status = 'completed';
                this.step2status = 'completed';
                this.step3status = 'current';
                this.step4status = 'upcoming';
                this.summaryStatus = 'upcoming';
                this.currentStep = 3;
                break;
            }
            case 4: {
                this.step1status = 'completed';
                this.step2status = 'completed';
                this.step3status = 'completed';
                this.step4status = 'current';
                this.summaryStatus = 'upcoming';
                this.currentStep = 4;
                break;
            }
            case 5: {
                this.step1status = 'completed';
                this.step2status = 'completed';
                this.step3status = 'completed';
                this.step4status = 'completed';
                this.summaryStatus = 'current';
                this.currentStep = 5;
                break;
            }
        }
    }

    // Handle focus on key press first example
    /** @hidden */
    handleFocus(event: KeyboardEvent, index: number): void {
        this._wizardService.progressBarKeyHandler(event, this.wizardStepComponents, index);
    }
}
