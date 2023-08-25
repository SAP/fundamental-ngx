import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    TemplateRef,
    ViewChild,
    ViewEncapsulation,
    inject
} from '@angular/core';
import { FormGeneratorService } from '@fundamental-ngx/platform/form';
import { filter, takeUntil } from 'rxjs/operators';

import { DialogModule, DialogRef } from '@fundamental-ngx/core/dialog';
import { BaseWizardGenerator } from '../../base-wizard-generator';
import { WizardDialogData } from '../../interfaces/wizard-dialog-data.interface';
import { WizardTitle } from '../../interfaces/wizard-title.interface';
import { WizardGeneratorService } from '../../wizard-generator.service';
import { MessageBoxModule, MessageBoxService } from '@fundamental-ngx/core/message-box';
import { NgIf, NgTemplateOutlet } from '@angular/common';
import { WizardBodyComponent } from '../wizard-body/wizard-body.component';
import { CdkScrollable } from '@angular/cdk/overlay';
import { TitleComponent } from '@fundamental-ngx/core/title';
import { ScrollbarDirective } from '@fundamental-ngx/core/scrollbar';
import { BarModule } from '@fundamental-ngx/core/bar';
import { PlatformButtonModule } from '@fundamental-ngx/platform/button';
import { ContentDensityDirective } from '@fundamental-ngx/core/content-density';
import { InitialFocusDirective } from '@fundamental-ngx/cdk/utils';

@Component({
    selector: 'fdp-dialog-wizard-generator',
    templateUrl: './dialog-wizard-generator.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [WizardGeneratorService, FormGeneratorService],
    standalone: true,
    imports: [
        DialogModule,
        TitleComponent,
        CdkScrollable,
        ScrollbarDirective,
        WizardBodyComponent,
        NgIf,
        BarModule,
        PlatformButtonModule,
        ContentDensityDirective,
        NgTemplateOutlet,
        MessageBoxModule,
        InitialFocusDirective
    ]
})
export class DialogWizardGeneratorComponent extends BaseWizardGenerator {
    /** @hidden */
    @ViewChild('defaultConfirmationDialogTemplate') defaultConfirmationDialogTemplate: TemplateRef<HTMLElement>;

    /**
     * @description Wizards dialog title configuration.
     */
    title: WizardTitle;

    /**
     * @description Confirmation message when wizard dialog close button has been clicked.
     */
    confirmationDialogText = 'Are you sure you want to discard your progress?';
    /**
     * @description Confirm button text for close confirmation dialog.
     */
    confirmationDialogCloseText = 'Confirm';
    /**
     * @description Cancel button text for close confirmation dialog.
     */
    confirmationDialogCancelText = 'Cancel';

    /**
     * User-defined template for "Go Next" button.
     */
    goNextButtonTemplate?: TemplateRef<HTMLElement>;

    /**
     * User-defined template for "Go Back" button.
     */
    goBackButtonTemplate?: TemplateRef<HTMLElement>;

    /**
     * User-defined template for "Finish" button.
     */
    finishButtonTemplate?: TemplateRef<HTMLElement>;

    /**
     * User-defined template for "Cancel" button.
     */
    cancelButtonTemplate?: TemplateRef<HTMLElement>;

    /**
     * User-defined template for cancellation confirmation dialog.
     */
    confirmationDialogTemplate?: TemplateRef<HTMLElement>;

    /**
     * User-defined template for summary step.
     */
    summaryStepTemplate?: TemplateRef<HTMLElement>;

    /** User-defined template for "Review" button */
    reviewButtonTemplate?: TemplateRef<HTMLElement>;

    /** @hidden */
    private readonly _messageBoxService = inject(MessageBoxService);

    /** @hidden */
    constructor(
        _wizardGeneratorService: WizardGeneratorService,
        _cd: ChangeDetectorRef,
        private _dialogRef: DialogRef<WizardDialogData>
    ) {
        super(_wizardGeneratorService, _cd);

        this.items = this._dialogRef.data.items;
        this.title = this._dialogRef.data.title;
        this.appendToWizard = this._dialogRef.data.appendToWizard;
        this.navigationButtonLabels = this._dialogRef.data.navigationButtonLabels ?? {};
        this.contentHeight = this._dialogRef.data.contentHeight;
        this.responsivePaddings = this._dialogRef.data.responsivePaddings;
        this.goNextButtonTemplate = this._dialogRef.data.goNextButtonTemplate;
        this.goBackButtonTemplate = this._dialogRef.data.goBackButtonTemplate;
        this.finishButtonTemplate = this._dialogRef.data.finishButtonTemplate;
        this.cancelButtonTemplate = this._dialogRef.data.cancelButtonTemplate;
        this.confirmationDialogTemplate = this._dialogRef.data.confirmationDialogTemplate;
        this.displaySummaryStep = this._dialogRef.data.displaySummaryStep || false;
        this.summaryStepTemplate = this._dialogRef.data.summaryStepTemplate;
        this.reviewButtonTemplate = this._dialogRef.data.reviewButtonTemplate;

        if (this._dialogRef.data.unifiedLayout !== undefined) {
            this.unifiedLayout = this._dialogRef.data.unifiedLayout;
        }

        if (this._dialogRef.data.navigationButtons !== undefined) {
            this.navigationButtons = this._dialogRef.data.navigationButtons;
        }

        if (this._dialogRef.data.confirmationDialogText) {
            this.confirmationDialogText = this._dialogRef.data.confirmationDialogText;
        }

        if (this._dialogRef.data.confirmationDialogCancelText) {
            this.confirmationDialogCancelText = this._dialogRef.data.confirmationDialogCancelText;
        }

        if (this._dialogRef.data.confirmationDialogCloseText) {
            this.confirmationDialogCloseText = this._dialogRef.data.confirmationDialogCloseText;
        }
    }

    /**
     * @description Cancels Wizard progress and closes the dialog.
     */
    cancel(): void {
        if (this._wizardGeneratorService.isStepsUntouched()) {
            this._dialogRef.dismiss();

            return;
        }

        const template = this.confirmationDialogTemplate || this.defaultConfirmationDialogTemplate;

        const messageBoxRef = this._messageBoxService.open(template, { responsivePadding: true });

        messageBoxRef.afterClosed
            .pipe(
                filter((result) => result),
                takeUntil(this._onDestroy$)
            )
            .subscribe(() => {
                this._dialogRef.dismiss();
            });
    }

    /**
     * @description Completes Wizard process, emits Wizard result and closes the dialog.
     */
    async finish(): Promise<void> {
        if (this.isSummaryStep) {
            const wizardResult = await this._wizardGeneratorService.getWizardFormValue(true);
            this._dialogRef.close(wizardResult);
            return;
        }

        const currentStepId = this._wizardGeneratorService.getCurrentStepId();
        this.submitStepForms(currentStepId)
            .pipe(takeUntil(this._onDestroy$))
            .subscribe(async (result) => {
                if (result && Object.values(result).some((r) => !r.success)) {
                    return;
                }

                const wizardResult = await this._wizardGeneratorService.getWizardFormValue(true);
                this._dialogRef.close(wizardResult);
            });
    }

    /**
     * @hidden
     */
    _goBackFn: () => void = () => this.goBack();
    /**
     * @hidden
     */
    _goNextFn: () => Promise<void> = () => this.goNext();

    /**
     * @hidden
     */
    _finishFn: () => Promise<void> = () => this.finish();

    /**
     * @hidden
     */
    _cancelFn: () => void = () => this.cancel();
}
