import { Component, OnInit, TemplateRef, ViewEncapsulation } from '@angular/core';
import { DialogService, WizardStepStatus } from '@fundamental-ngx/core';

@Component({
    selector: 'fd-wizard-branching-example',
    templateUrl: './wizard-branching-example.component.html',
    encapsulation: ViewEncapsulation.None,
    host: {
        class: 'fd-wizard-example'
    }
})
export class WizardBranchingExampleComponent implements OnInit {
    step1status: WizardStepStatus = 'current';
    step2status: WizardStepStatus = 'upcoming';
    step3status: WizardStepStatus = 'upcoming';

    paymentSelection = '';

    oldPayment = '';

    init = true;

    constructor(private _dialogService: DialogService) {}

    ngOnInit(): void {
        this.oldPayment = this.paymentSelection;
    }

    paymentSelectionChanged(dialog: TemplateRef<any>): void {
        if (this.oldPayment !== this.paymentSelection) {
            if (!this.init) {
                const dialogRef = this._dialogService.open(dialog, { responsivePadding: true });

                dialogRef.afterClosed.subscribe(
                    () => {
                        this.oldPayment = this.paymentSelection;
                    },
                    () => {
                        this.paymentSelection = this.oldPayment;
                    }
                );
            } else {
                this.init = false;
            }
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
}
