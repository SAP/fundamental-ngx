import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnDestroy,
    Output,
    QueryList,
    ViewChildren,
    ViewEncapsulation
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { FormGeneratorComponent, SubmitFormEventResult } from '../../../form/form-generator/form-generator/form-generator.component';
import { DynamicFormGroup } from '../../../form/form-generator/interfaces/dynamic-form-group';
import { DynamicFormValue } from '../../../form/form-generator/interfaces/dynamic-form-item';
import { WizardGeneratorItem } from '../../interfaces/wizard-generator-item.interface';
import { WizardGeneratorService } from '../../wizard-generator.service';

export interface WizardStepSubmittedForms {
    [key: string]: SubmitFormEventResult;
}

export interface WizardStepForms {
    [key: string]: {
        title: string;
        form: DynamicFormGroup;
    }
}

@Component({
  selector: 'fdp-wizard-generator-step',
  templateUrl: './wizard-generator-step.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WizardGeneratorStepComponent implements OnDestroy {

    /**
     * @description Step forms components.
     */
    @ViewChildren(FormGeneratorComponent) forms: QueryList<FormGeneratorComponent>;

    /**
     * @description Current step.
     */
    @Input()
    item: WizardGeneratorItem;

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
    private _trackedFields: {[key: string]: string[]};

    /**
     * @hidden
     * An RxJS Subject that will kill the data stream upon component’s destruction (for unsubscribing)
     */
     private readonly _onDestroy$: Subject<void> = new Subject<void>();

    /** @hidden */
    constructor(
        private _wizardGeneratorService: WizardGeneratorService
    ) { }

    /**
     * @hidden
     */
    ngOnDestroy(): void {
        this._wizardGeneratorService.removeWizardStepComponent(this.item.id);
        this._onDestroy$.next();
        this._onDestroy$.complete();
    }

    /**
     * @description Adds created form instance to the object of the forms.
     * @param form Form instance
     * @param key Form ID from @see item
     */
    async onFormCreated(form: DynamicFormGroup, key: string): Promise<void> {
        this._forms[key] = {
            title: (this.item.formGroups.find(g => g.id === key)?.title) as string,
            form: form
        };

        this._trackDependencyFieldsChanges(form, key);

        await this._wizardGeneratorService.refreshStepVisibility();

        if (Object.keys(this._forms).length === this.item.formGroups.length) {
            await this.addComponentToParent();
            this.formsCreated.emit(this._forms);
        }
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

        if (Object.keys(this._submittedForms).length === this.forms.length) {
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
            this.forms.forEach(formComponent => {
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
    private _trackDependencyFieldsChanges(form: FormGroup, key: string): void {
        this._trackedFields = this._wizardGeneratorService.getDependencyFields(this.item.id);

        if (this._trackedFields && this._trackedFields[key]) {
            for (const control of Object.values(form.controls)) {

                control.valueChanges
                .pipe(debounceTime(50), takeUntil(this._onDestroy$))
                .subscribe(async () => {
                    await this._wizardGeneratorService.refreshStepVisibility();
                });
            }
        }
    }
}
