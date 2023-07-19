import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    Output,
    QueryList,
    SimpleChanges,
    ViewChildren,
    ViewEncapsulation
} from '@angular/core';
import { WizardStepStatus } from '@fundamental-ngx/core/wizard';

import {
    DynamicFormGroup,
    DynamicFormValue,
    FormGeneratorComponent,
    FormGeneratorService,
    SubmitFormEventResult
} from '@fundamental-ngx/platform/form';
import { isFunction } from '@fundamental-ngx/platform/shared';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { WizardGeneratorItem } from '../../interfaces/wizard-generator-item.interface';
import {
    DependencySteps,
    WizardGeneratorRefreshStrategy,
    WizardGeneratorService
} from '../../wizard-generator.service';
import { WizardGeneratorStep } from '../../interfaces/wizard-step.interface';
import { WizardStepForms, WizardStepSubmittedForms } from '../../interfaces/wizard-generator-forms.interface';

@Component({
    selector: 'fdp-wizard-generator-step',
    templateUrl: './wizard-generator-step.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WizardGeneratorStepComponent implements WizardGeneratorStep, OnInit, OnDestroy, OnChanges {
    /**
     * @description Step Form Generator components.
     */
    @ViewChildren(FormGeneratorComponent) formGenerators: QueryList<FormGeneratorComponent>;

    /**
     * @description Current step.
     */
    @Input()
    item: WizardGeneratorItem;

    /**
     * Wizard step status.
     */
    @Input()
    stepStatus: WizardStepStatus;

    /** Whether all form items should have identical layout provided for form group. */
    @Input()
    unifiedLayout = true;

    /**
     * @description Emits when all forms in the step has been submited
     */
    @Output()
    formsSubmitted = new EventEmitter<DynamicFormValue[]>();

    /**
     * @description Emits when all forms in the step has been created
     */
    @Output()
    formsCreated = new EventEmitter<WizardStepForms>();

    /**
     * @hidden
     */
    private _submittedForms: WizardStepSubmittedForms = {};

    /**
     * @hidden
     */
    private _formSubmitted$ = new Subject<WizardStepSubmittedForms | null>();

    /**
     * @hidden
     */
    private _forms: WizardStepForms = {};

    /**
     * @hidden
     */
    private _trackedFields: DependencySteps;

    /**
     * @hidden
     */
    _visibleFormGroupIds: Record<string, boolean>;

    /**
     * @hidden
     * @private
     */
    private _hiddenFormGroupValues: {
        [key: string]: any;
    } = {};

    /**
     * @hidden
     * An RxJS Subject that will kill the data stream upon component’s destruction (for unsubscribing)
     */
    private readonly _onDestroy$: Subject<void> = new Subject<void>();

    /** @hidden */
    constructor(
        private _wizardGeneratorService: WizardGeneratorService,
        private _formGeneratorService: FormGeneratorService
    ) {}

    /**
     * @hidden
     */
    ngOnInit(): void {
        this.refreshFormsVisibility();
    }

    /**
     * @hidden
     */
    ngOnDestroy(): void {
        this._wizardGeneratorService.removeWizardStepComponent(this.item.id);
        this._onDestroy$.next();
        this._onDestroy$.complete();
    }

    /** @hidden */
    async ngOnChanges(changes: SimpleChanges): Promise<void> {
        if (changes.stepStatus && changes.stepStatus.currentValue === 'current' && this.formGenerators?.length > 0) {
            await this.updateFormsState();
        }
    }

    /**
     * @description Adds created form instance to the object of the forms.
     * @param form Form instance
     * @param key Form ID from @see item
     */
    async onFormCreated(form: DynamicFormGroup, key: string): Promise<void> {
        this._forms[key] = {
            title: this.item.formGroups?.find((g) => g.id === key)?.title ?? '',
            form
        };

        await this._wizardGeneratorService.refreshStepVisibility();

        if (Object.keys(this._forms).length === this.item.formGroups?.length) {
            await this.addComponentToParent();
            this.formsCreated.emit(this._forms);
        }

        if (this._hiddenFormGroupValues[key]) {
            form?.patchValue(this._hiddenFormGroupValues[key]);
        }

        this._trackDependencyFieldsChanges(form, key);
    }

    /**
     * @description Adds component to the service for further usage.
     */
    async addComponentToParent(): Promise<void> {
        this._wizardGeneratorService.addWizardStepComponent(this, this.item.id);
    }

    /**
     * @description Callback function when form has been submitted.
     * @param result Form submission result.
     * @param index Form index in the step.
     */
    onFormSubmitted(result: SubmitFormEventResult, index: string): void {
        this._submittedForms[index] = result;

        if (Object.keys(this._submittedForms).length === this.formGenerators.length) {
            // Last form submission. Send data back to the parent component.
            this._formSubmitted$.next(this._submittedForms);
        }
    }

    /**
     * Returns visible forms in the step.
     */
    getVisibleForms(): WizardStepForms {
        return Object.keys(this._forms).reduce((acc, key) => {
            if (this._visibleFormGroupIds[key] || this._visibleFormGroupIds[key] === undefined) {
                acc[key] = this._forms[key];
            }
            return acc;
        }, {});
    }

    /**
     * @description Clears previously submitted form values and re-submit them again.
     * @returns Subject, which will return forms value.
     */
    submitForms(skipIfUntouched = false): Subject<WizardStepSubmittedForms | null> {
        if (skipIfUntouched && !this._wizardGeneratorService.stepSubmitted(this.item.id)) {
            setTimeout(() => {
                this._formSubmitted$.next(null);
            });
            return this._formSubmitted$;
        }

        // Clear previously submitted form values and re-submit them again.
        this._submittedForms = {};

        setTimeout(() => {
            this.formGenerators.forEach((formComponent) => {
                formComponent.submit();
            });
        });

        return this._formSubmitted$;
    }

    /**
     * @hidden
     * @description Keeps track on dependency fields for other steps and refreshes the view when they changed.
     * @param form
     * @param key
     */
    private _trackDependencyFieldsChanges(form: DynamicFormGroup, key: string): void {
        this._trackedFields = this._wizardGeneratorService.getStepDependencyFields(this.item.id);

        if (this._trackedFields && this._trackedFields[key]) {
            Object.entries(this._trackedFields[key]).forEach(([fieldId, strategies]) => {
                const control = this._formGeneratorService.getFormControl(form, fieldId);

                const refreshSteps = strategies[WizardGeneratorRefreshStrategy.REFRESH_STEP_VISIBILITY] !== undefined;
                const revalidateForms = strategies[WizardGeneratorRefreshStrategy.REVALIDATE_STEP_FORMS];
                const refreshFormVisibility = strategies[WizardGeneratorRefreshStrategy.REFRESH_FORM_VISIBILITY];

                control?.valueChanges.pipe(debounceTime(50), takeUntil(this._onDestroy$)).subscribe(async () => {
                    if (refreshSteps) {
                        await this._wizardGeneratorService.refreshStepVisibility();
                    }

                    if (revalidateForms?.length) {
                        this._wizardGeneratorService.notifyStepsToRevalidateForms(revalidateForms);
                    }

                    if (refreshFormVisibility?.length) {
                        await this._wizardGeneratorService.refreshFormsVisibility(refreshFormVisibility);
                    }
                });
            });
        }
    }

    /**
     * Triggers form value revalidation and checks if field in form should be visible.
     */
    async updateFormsState(): Promise<void> {
        if (this.formGenerators) {
            for (const formGenerator of this.formGenerators.toArray()) {
                await formGenerator.refreshStepsVisibility();
            }
        }
    }

    /**
     * Refreshes step form group visibility.
     */
    async refreshFormsVisibility(): Promise<void> {
        this._visibleFormGroupIds = {};

        if (!this.item.formGroups) {
            return;
        }

        for (const formGroup of this.item.formGroups.filter((fg) => isFunction(fg.when))) {
            const result = await this._wizardGeneratorService.refreshFormVisibility(formGroup);

            if (result === this._visibleFormGroupIds[formGroup.id]) {
                return;
            }

            const form = this._forms[formGroup.id]?.form;

            // Store form value so it could be restored later.
            if (!result) {
                this._hiddenFormGroupValues[formGroup.id] = form?.value;
            }

            this._visibleFormGroupIds[formGroup.id] = result;
        }
    }
}
