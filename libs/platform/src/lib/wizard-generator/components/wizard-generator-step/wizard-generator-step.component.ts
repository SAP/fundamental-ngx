import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnDestroy,
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
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { WizardGeneratorItem } from '../../interfaces/wizard-generator-item.interface';
import {
    DependencySteps,
    WizardGeneratorRefreshStrategy,
    WizardGeneratorService
} from '../../wizard-generator.service';

export interface WizardStepSubmittedForms {
    [key: string]: SubmitFormEventResult;
}

export interface WizardStepForms {
    [key: string]: {
        title: string;
        form: DynamicFormGroup;
    };
}

@Component({
    selector: 'fdp-wizard-generator-step',
    templateUrl: './wizard-generator-step.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WizardGeneratorStepComponent implements OnDestroy, OnChanges {
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
    private _formSubmitted$ = new Subject<WizardStepSubmittedForms>();

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
            title: this.item.formGroups.find((g) => g.id === key)?.title as string,
            form
        };

        await this._wizardGeneratorService.refreshStepVisibility();

        if (Object.keys(this._forms).length === this.item.formGroups.length) {
            await this.addComponentToParent();
            this.formsCreated.emit(this._forms);
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
     * @returns Step submitted forms values.
     */
    getFormValues(): WizardStepSubmittedForms {
        return this._submittedForms;
    }

    /**
     *
     * @returns component
     */
    getForms(): WizardStepForms {
        return this._forms;
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
            Object.entries(this._trackedFields[key]).forEach(([fieldId, dependants]) => {
                const control = this._formGeneratorService.getFormControl(form, fieldId);

                control?.valueChanges.pipe(debounceTime(50), takeUntil(this._onDestroy$)).subscribe(async () => {
                    if (dependants.strategy.includes(WizardGeneratorRefreshStrategy.REFRESH_STEP_VISIBILITY)) {
                        await this._wizardGeneratorService.refreshStepVisibility();
                    }

                    if (dependants.dependentSteps?.length > 0) {
                        this._wizardGeneratorService.notifyStepsToRevalidateForms(dependants.dependentSteps);
                    }
                });
            });
        }
    }

    /**
     * Triggers form value revalidation and checks if field in form should be visible.
     */
    async updateFormsState(): Promise<void> {
        for (const formGenerator of this.formGenerators?.toArray()) {
            await formGenerator.refreshStepsVisibility();
        }
    }
}
