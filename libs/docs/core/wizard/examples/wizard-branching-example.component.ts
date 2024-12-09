import { A11yModule } from '@angular/cdk/a11y';
import { CdkScrollable } from '@angular/cdk/overlay';

import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    QueryList,
    TemplateRef,
    ViewChild,
    ViewChildren,
    ViewEncapsulation
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InitialFocusDirective } from '@fundamental-ngx/cdk/utils';
import { BarModule } from '@fundamental-ngx/core/bar';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { ContentDensityDirective } from '@fundamental-ngx/core/content-density';
import { DialogModule, DialogService } from '@fundamental-ngx/core/dialog';
import {
    FieldsetComponent,
    FormControlComponent,
    FormGroupComponent,
    FormItemComponent,
    FormLabelComponent,
    FormLegendDirective
} from '@fundamental-ngx/core/form';
import { RadioButtonComponent, RadioModule } from '@fundamental-ngx/core/radio';
import { ScrollbarDirective } from '@fundamental-ngx/core/scrollbar';
import { WizardModule, WizardService, WizardStepComponent, WizardStepStatus } from '@fundamental-ngx/core/wizard';

@Component({
    selector: 'fd-wizard-branching-example',
    templateUrl: './wizard-branching-example.component.html',
    styleUrls: ['./wizard-branching-example.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'fd-wizard-example'
    },
    imports: [
        ButtonComponent,
        A11yModule,
        WizardModule,
        FormItemComponent,
        FormLabelComponent,
        FormControlComponent,
        ContentDensityDirective,
        FieldsetComponent,
        FormLegendDirective,
        FormGroupComponent,
        RadioModule,
        FormsModule,
        BarModule,
        DialogModule,
        CdkScrollable,
        ScrollbarDirective,
        InitialFocusDirective
    ]
})
export class WizardBranchingExampleComponent {
    /**
     * documentation related property
     * provides access to the HTML element with "overlay" reference
     */
    @ViewChild('overlay')
    overlay: ElementRef<HTMLElement>;

    @ViewChild('bankButton')
    bankButton: RadioButtonComponent;

    @ViewChild('creditButton')
    creditButton: RadioButtonComponent;

    /** @hidden */
    @ViewChildren(WizardStepComponent)
    steps: QueryList<WizardStepComponent>;

    /**
     * documentation related property
     * specifies if the doc example is rendered in fullscreen or not
     */
    fullscreen = false;

    step1status: WizardStepStatus = 'current';
    step2status: WizardStepStatus = 'upcoming';
    step3status: WizardStepStatus = 'upcoming';

    paymentSelection = '';

    oldPayment = '';

    init = false;

    constructor(
        private _dialogService: DialogService,
        private _wizardService: WizardService
    ) {}

    statusChanged(stepNumber: number, event: WizardStepStatus): void {
        if (event === 'current') {
            this.goToStep(stepNumber);
        }
    }

    paymentSelectionChanged(dialog: TemplateRef<any>): void {
        if (!this.init) {
            this.oldPayment = this.paymentSelection;
            this.init = true;
        } else if (this.oldPayment !== this.paymentSelection) {
            const dialogRef = this._dialogService.open(dialog, { responsivePadding: true });

            dialogRef.afterClosed
                .subscribe(
                    () => {
                        this.oldPayment = this.paymentSelection;
                    },
                    () => {
                        this.paymentSelection = this.oldPayment;
                    }
                )
                .add(() => {
                    setTimeout(() => {
                        this.paymentSelection === 'bank'
                            ? this.bankButton.inputElement.nativeElement.focus()
                            : this.creditButton.inputElement.nativeElement.focus();
                    });
                });
        }
    }

    goToStep(step: number): void {
        switch (step) {
            case 2: {
                this.step1status = 'completed';
                this.step2status = 'current';
                this.step3status = 'upcoming';
                break;
            }
            case 3: {
                this.step1status = 'completed';
                this.step2status = 'completed';
                this.step3status = 'current';
                break;
            }
        }
    }

    /**
     * documentation related function
     * opens the example in full screen
     */
    enterFullscreenExample(): void {
        this.goToStep(1);
        this.fullscreen = true;
        this.overlay.nativeElement.style.width = '100%';
    }

    /**
     * documentation related function
     * exits the full screen mode of the example
     */
    exitFullscreenExample(event: Event): void {
        event.stopPropagation();
        this.fullscreen = false;
        this.overlay.nativeElement.style.width = '0%';
    }

    // Handle focus on key press
    /** @hidden */
    handleFocus(event: KeyboardEvent, index: number): void {
        this._wizardService.progressBarKeyHandler(event, this.steps, index);
    }
}
