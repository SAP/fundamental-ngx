import { CdkScrollable } from '@angular/cdk/overlay';

import {
    ChangeDetectionStrategy,
    Component,
    QueryList,
    TemplateRef,
    ViewChildren,
    ViewEncapsulation
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { BarModule } from '@fundamental-ngx/core/bar';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { DialogModule, DialogService } from '@fundamental-ngx/core/dialog';
import { FormControlComponent, FormItemComponent, FormLabelComponent } from '@fundamental-ngx/core/form';
import { LayoutGridModule } from '@fundamental-ngx/core/layout-grid';
import { LinkComponent } from '@fundamental-ngx/core/link';
import { MessageStripComponent } from '@fundamental-ngx/core/message-strip';
import { ScrollbarDirective } from '@fundamental-ngx/core/scrollbar';
import { TitleComponent } from '@fundamental-ngx/core/title';
import { WizardModule, WizardService, WizardStepComponent, WizardStepStatus } from '@fundamental-ngx/core/wizard';

@Component({
    selector: 'fd-wizard-dialog-example',
    templateUrl: './wizard-dialog-example.component.html',
    styleUrls: ['./wizard-dialog-example.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        DialogModule,
        TitleComponent,
        CdkScrollable,
        ScrollbarDirective,
        WizardModule,
        MessageStripComponent,
        FormItemComponent,
        FormLabelComponent,
        FormControlComponent,
        FormsModule,
        LayoutGridModule,
        LinkComponent,
        RouterLink,
        BarModule,
        ButtonComponent
    ]
})
export class WizardDialogExampleComponent {
    step1status: WizardStepStatus = 'current';
    step2status: WizardStepStatus = 'upcoming';
    step3status: WizardStepStatus = 'upcoming';
    step4status: WizardStepStatus = 'upcoming';
    summaryStatus: WizardStepStatus = 'upcoming';

    fullName = '';
    addressLine1 = '';
    addressLine2 = '';

    currentStep = 1;

    @ViewChildren(WizardStepComponent)
    steps: QueryList<WizardStepComponent>;

    constructor(
        private _dialogService: DialogService,
        private _wizardService: WizardService
    ) {}

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

    handleFocus(event: KeyboardEvent, index: number): void {
        this._wizardService.progressBarKeyHandler(event, this.steps, index);
    }

    validateStep = (): boolean | Promise<boolean> => {
        return (this.fullName != '' && this.addressLine1 != '');
      };

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
}
