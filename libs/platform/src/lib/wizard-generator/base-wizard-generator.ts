import { ChangeDetectorRef, Directive, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, finalize, takeUntil } from 'rxjs/operators';

import { WizardStepStatus } from '@fundamental-ngx/core/wizard';
import { WizardGeneratorFormsValue, WizardGeneratorItem } from './interfaces/wizard-generator-item.interface';
import { WizardNavigationButtons } from './interfaces/wizard-navigation-buttons.interface';
import { WizardGeneratorService } from './wizard-generator.service';
import { WizardStepSubmittedForms } from './components/wizard-generator-step/wizard-generator-step.component';

/**
 * @description Default button labels.
 */
export const DEFAULT_WIZARD_NAVIGATION_BUTTONS: WizardNavigationButtons = {
    goBack: {
        label: 'Previous Step',
        contentDensity: 'compact',
        type: 'ghost'
    },
    goNext: {
        label: 'Next Step',
        contentDensity: 'compact',
        type: 'emphasized'
    },
    cancel: {
        label: 'Cancel',
        contentDensity: 'compact',
        type: 'ghost'
    },
    finish: {
        label: 'Finish',
        contentDensity: 'compact',
        type: 'emphasized'
    }
}

/**
 * @description Base Wizard Generator component with necessary inputs and methods.
 */
@Directive()
export class BaseWizardGenerator implements OnDestroy {

    /**
     * @description Whether or not apply responsive paddings styling.
     */
     @Input()
     responsivePaddings = true;

    /**
     * @description Button labels to be used in Wizard navigation
     */
    @Input()
    get navigationButtonLabels(): WizardNavigationButtons {
        return this._navigationButtonLabels;
    }

    set navigationButtonLabels(value: WizardNavigationButtons) {
        this._navigationButtonLabels = Object.assign({}, DEFAULT_WIZARD_NAVIGATION_BUTTONS, value);
    }

    /**
     * @description Array of Wizard Steps.
     */
    @Input()
    get items(): WizardGeneratorItem[] {
        return this._items;
    }

    set items(items: WizardGeneratorItem[]) {
        this._wizardCreated = false;
        this._wizardGeneratorService.clearWizardStepComponents();

        this._wizardGeneratorService.prepareWizardItems(items)
        .then(newItems => {
            this._items = newItems;
            this._visibleItems = newItems;
            this._wizardCreated = true;
            this._cd.detectChanges();
        });
    }

    /**
     * Whether or not to append the step to the wizard. If false, each step will be displayed on a different page.
     * Default is true.
     */
    @Input()
    appendToWizard = true;

    /**
     * Custom height to use for the wizard's content pane. By default, this value is calc(100vh - 144px), where 144px
     * is the combined height of the shellbar, wizard header and wizard footer.
     */
    @Input()
    contentHeight: string;

    /**
     * @description Boolean flag indicating whether or not to display Summary step in Wizard progress bar.
     */
    @Input()
    displaySummaryStep = false;

    /**
     * @description Emits wizard value when it's completed.
     */
    @Output()
    wizardFinished: EventEmitter<WizardGeneratorFormsValue> = new EventEmitter();

    /**
     * @hidden
     */
    _wizardCreated = false;

    /**
     * @description Is current step is summary step.
     */
    get isSummaryStep(): boolean {
        const currentIndex = this._wizardGeneratorService.getCurrentStepIndex();

        return this.visibleItems[currentIndex]?.summary === true;
    }

    /**
     * @description Array of visible Wizard Steps.
     */
    get visibleItems(): WizardGeneratorItem[] {
        return this._visibleItems || this._items;
    }

    set visibleItems(items: WizardGeneratorItem[]) {
        this._visibleItems = items;
    }

    /**
     * @description Whether or not Wizard is currently on the first step
     */
    get isFirstStep(): boolean {
        return this.visibleItems[0]?.status === 'current';
    }

    /**
     * @description Whether or not Wizard is currently on the last step
     */
    get isLastStep(): boolean {
        const lastStep = this.visibleItems[this.visibleItems.length - 1]
        return lastStep?.status === 'current' && !lastStep.branching;
    }

    get isBranchingStep(): boolean {
        const currentIndex = this._wizardGeneratorService.getCurrentStepIndex();

        return this._visibleItems[currentIndex]?.branching === true;
    }

    get hasSummaryStep(): boolean {
        return this._visibleItems.some(i => i.summary === true);
    }

    /**
     * @hidden
     */
    _visibleItems: WizardGeneratorItem[] = [];

    /**
     * @hidden
     */
    private _items: WizardGeneratorItem[] = [];

    /**
     * @hidden
     */
    private _formPending = false;

    /**
     * @hidden
     * An RxJS Subject that will kill the data stream upon component’s destruction (for unsubscribing)
     */
    protected readonly _onDestroy$: Subject<void> = new Subject<void>();

    /**
     * @hidden
     */
    private _navigationButtonLabels = DEFAULT_WIZARD_NAVIGATION_BUTTONS;

    /** @hidden */
    constructor(
        protected _wizardGeneratorService: WizardGeneratorService,
        private _cd: ChangeDetectorRef
    ) {
        this._wizardGeneratorService.getVisibleSteps()
        .pipe(debounceTime(10), takeUntil(this._onDestroy$))
        .subscribe((visibleSteps) => {
            this.visibleItems = visibleSteps;
            this._cd.detectChanges();
        });

        this._wizardGeneratorService.trackStepsComponents()
        .pipe(debounceTime(10), takeUntil(this._onDestroy$))
        .subscribe(async (stepsComponents) => {
            if (stepsComponents.size === this.items?.length) {
                await this._setVisibleSteps();
            }
        });
    }

    /**
     * @hidden
     */
    ngOnDestroy(): void {
        this._onDestroy$.next();
        this._onDestroy$.complete();
    }

    /**
     * @description Reverts Wizard progress one step back.
     */
    goBack(): void {
        const currentStepIndex = this._wizardGeneratorService.getCurrentStepIndex();

        if (this.visibleItems[currentStepIndex - 1] !== undefined) {
            this.visibleItems[currentStepIndex].status = 'upcoming';
            this.visibleItems[currentStepIndex - 1].status = 'current';
        }

        this._wizardGeneratorService.setVisibleSteps(this.visibleItems);

        this._cd.detectChanges();
    }

    /**
     * @description Progresses the Wizard one step further.
     */
    async goNext(): Promise<void> {

        if (this._formPending) {
            return;
        }

        const currentStepIndex = this._wizardGeneratorService.getCurrentStepIndex();

        this._wizardGeneratorService.validateStepForms()
        .pipe(takeUntil(this._onDestroy$))
        .subscribe(async (result) => {

            if (!result) {
                return;
            }

            await this._setVisibleSteps();

            const steps = this.visibleItems;

            if (steps[currentStepIndex + 1] !== undefined) {
                steps[currentStepIndex].status = 'completed';
                steps[currentStepIndex + 1].status = 'current';
            }

            this._wizardGeneratorService.setVisibleSteps(steps);

            this._cd.detectChanges();
        });
    }

    /**
     * @description Submits step forms.
     * @param currentStepIndex current step index.
     * @returns {Observable<WizardStepSubmittedForms>} Observable with form values.
     */
    submitStepForms(currentStepIndex: string): Observable<WizardStepSubmittedForms> {
        this._formPending = true;

        return this._wizardGeneratorService.submitStepForms(currentStepIndex).pipe(finalize(() => {
            this._formPending = false;
        }));
    }

    /**
     * @description Completes the wizard and emits it's formatted value.
     */
    async finish(): Promise<void> {

        if (this.isSummaryStep) {
            const wizardResult = await this._wizardGeneratorService.getWizardFormValue(true);
            this.wizardFinished.emit(wizardResult);
            return;
        }

        this._wizardGeneratorService.validateStepForms()
        .pipe(takeUntil(this._onDestroy$))
        .subscribe(async (result) => {

            if (!result) {
                return;
            }

            const wizardResult = await this._wizardGeneratorService.getWizardFormValue(true);

            this.wizardFinished.emit(wizardResult);
        });
    }

    /**
     * @description Callback function to update steps status.
     * @param stepNumber Step ID to be updated.
     * @param status New step status.
     */
    async stepStatusChanged(stepId: string, status: WizardStepStatus): Promise<void> {

        const stepIndex = this._visibleItems.findIndex(s => s.id === stepId);

        this._visibleItems[stepIndex].status = status;

        await this._wizardGeneratorService.refreshStepVisibility();
    }

    /**
     * @hidden
     */
    private async _setVisibleSteps(): Promise<void> {
        await this._wizardGeneratorService.refreshStepVisibility();

        this._wizardCreated = true;

        this._cd.detectChanges();
    }
}
