import { Component, QueryList, ViewChildren } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BarModule } from '@fundamental-ngx/core/bar';
import { BreadcrumbModule } from '@fundamental-ngx/core/breadcrumb';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { ContentDensityDirective } from '@fundamental-ngx/core/content-density';
import { DynamicPageModule } from '@fundamental-ngx/core/dynamic-page';
import { InlineHelpModule } from '@fundamental-ngx/core/inline-help';
import { LayoutGridModule } from '@fundamental-ngx/core/layout-grid';
import { TitleComponent } from '@fundamental-ngx/core/title';

import { FormControlComponent, FormItemComponent, FormLabelComponent } from '@fundamental-ngx/core/form';
import { MessageToastModule, MessageToastService } from '@fundamental-ngx/core/message-toast';

import { WizardModule, WizardService, WizardStepComponent, WizardStepStatus } from '@fundamental-ngx/core/wizard';

@Component({
    selector: 'fd-dp-wizard-example',
    templateUrl: './dp-wizard-example.component.html',
    styles: [
        `
            .overlay {
                height: 100%;
                width: 100%;
                position: fixed;
                z-index: 10;
                top: 0;
                left: 0;
                background-color: rgb(255, 255, 255);
            }
            .fd-dynamic-page-section-example {
                min-height: 20vh;
            }
        `
    ],
    imports: [
        ButtonComponent,
        DynamicPageModule,
        BreadcrumbModule,
        ContentDensityDirective,
        InlineHelpModule,
        BarModule,
        MessageToastModule,
        WizardModule,
        FormItemComponent,
        FormLabelComponent,
        FormControlComponent,
        FormsModule,
        LayoutGridModule,
        TitleComponent
    ]
})
export class DPWizardExampleComponent {
    /** @hidden */
    @ViewChildren(WizardStepComponent)
    steps: QueryList<WizardStepComponent>;

    visible = false;
    step1status: WizardStepStatus = 'current';
    step2status: WizardStepStatus = 'upcoming';
    step3status: WizardStepStatus = 'upcoming';
    step4status: WizardStepStatus = 'upcoming';
    summaryStatus: WizardStepStatus = 'upcoming';

    fullName = '';
    addressLine1 = '';
    addressLine2 = '';

    constructor(
        private _messageToastService: MessageToastService,
        private _wizardService: WizardService
    ) {}

    onCollapseChange(): void {
        console.log('collapse changed');
    }

    openPage(): void {
        this.visible = true;
        this._openToast('Dynamic Page has been opened');
    }

    closePage(): void {
        this.visible = false;
    }

    handleAction(action: string): void {
        this.closePage();
        this._openToast(action);
    }

    statusChanged(stepNumber: number, event: WizardStepStatus): void {
        if (event === 'current') {
            this.goToStep(stepNumber);
        }
    }

    goToStep(step: number): void {
        switch (step) {
            case 1: {
                this.step1status = 'current';
                this.step2status = 'upcoming';
                this.step3status = 'upcoming';
                this.step4status = 'upcoming';
                this.summaryStatus = 'upcoming';
                break;
            }
            case 2: {
                this.step1status = 'completed';
                this.step2status = 'current';
                this.step3status = 'upcoming';
                this.step4status = 'upcoming';
                this.summaryStatus = 'upcoming';
                break;
            }
            case 3: {
                this.step1status = 'completed';
                this.step2status = 'completed';
                this.step3status = 'current';
                this.step4status = 'upcoming';
                this.summaryStatus = 'upcoming';
                break;
            }
            case 4: {
                this.step1status = 'completed';
                this.step2status = 'completed';
                this.step3status = 'completed';
                this.step4status = 'current';
                this.summaryStatus = 'upcoming';
                break;
            }
            case 5: {
                this.step1status = 'completed';
                this.step2status = 'completed';
                this.step3status = 'completed';
                this.step4status = 'completed';
                this.summaryStatus = 'current';
                break;
            }
        }
    }
    handleFocus(event: KeyboardEvent, index: number): void {
        this._wizardService.progressBarKeyHandler(event, this.steps, index);
    }

    private _openToast(content: string): void {
        this._messageToastService.open(content, { duration: 3000 });
    }
}
