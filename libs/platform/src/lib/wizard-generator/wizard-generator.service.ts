import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { isFunction, mergeDeep, selectStrategy } from '@fundamental-ngx/platform/shared';
import { FormGeneratorService } from '@fundamental-ngx/platform/form';
import {
    WizardGeneratorStepComponent,
    WizardStepSubmittedForms
} from './components/wizard-generator-step/wizard-generator-step.component';
import {
    WizardGeneratorFormsValue,
    WizardGeneratorItem,
    WizardVisibleSteps
} from './interfaces/wizard-generator-item.interface';

export type StepsComponents = Map<string, WizardGeneratorStepComponent>;

/**
 * @description Helper service to keep all transformations and data in one place.
 */
@Injectable()
export class WizardGeneratorService {
    items: WizardGeneratorItem[];

    /**
     * @description Visible steps components
     */
    stepsComponents: StepsComponents = new Map<string, WizardGeneratorStepComponent>();

    /**
     * @description Object with steps that are dependencies for another steps.
     */
    dependencySteps: any = {};

    /**
     * @description Whether or not to append the step to the wizard. If false, each step will be displayed on a different page.
     * Default is true.
     */
    appendToWizard = true;

    /** @hidden */
    _shouldRedirectToSummary = false;

    /**
     * @description Steps that are visible to the user.
     */
    public visibleWizardSteps: WizardGeneratorItem[] = [];

    /** @hidden */
    private _visibleWizardSteps$ = new Subject<WizardGeneratorItem[]>();

    /** @hidden */
    private _appendToWizard$ = new BehaviorSubject<boolean>(this.appendToWizard);

    /** @hidden */
    private _stepsComponents$ = new Subject<StepsComponents>();

    /** @hidden */
    private _stepsOrderChanged$ = new Subject<number>();

    /** @hidden */
    private _nextStepIndex$ = new BehaviorSubject<number>(1);

    /** @hidden */
    private _submittedFormRawValues: WizardGeneratorFormsValue = {};

    private _wizardStepIds: string[] = [];

    /** @hidden */
    constructor(private _formGeneratorService: FormGeneratorService) {}

    /**
     * @description Returns current step ID in Wizard.
     * @returns {string | null} Current step ID.
     */
    getCurrentStepId(): string | null {
        const currentStepId = this.visibleWizardSteps?.find((i) => i.status === 'current');

        return currentStepId?.id;
    }

    /**
     * @description Returns current step index.
     * @returns {number} Index of the current step in array of Wizard steps.
     */
    getCurrentStepIndex(): number {
        const currentStepId = this.getCurrentStepId();
        return this.getStepIndex(currentStepId);
    }

    /**
     * Searches for the index of the step based on it's ID
     * @param stepId Step ID
     * @returns Index in the array of steps for defined step ID.
     */
    getStepIndex(stepId: string): number {
        const stepIndex = this.visibleWizardSteps?.findIndex((i) => i.id === stepId);
        return stepIndex > -1 ? stepIndex : 0;
    }

    /**
     * @description Sends command to submit all forms inside the step.
     * @param stepId Step ID for which forms needs to be submitted.
     * @param skipIfUntouched Skip validation if form haven't been touched.
     * @returns {Observable<WizardStepSubmittedForms>} Observable, which will emit
     * when all visible forms in step are submitted.
     */
    submitStepForms(stepId: string, skipIfUntouched = false): Observable<WizardStepSubmittedForms | null> {
        return this.stepsComponents
            .get(stepId)
            .submitForms(skipIfUntouched)
            .pipe(
                take(1),
                map((result) => {
                    if (result) {
                        this._submittedFormRawValues[stepId] = result;
                    }
                    return result;
                })
            );
    }

    /**
     * @description Triggers validation for current step forms.
     * @returns {Observable<boolean>} Observable with validation result.
     */
    validateStepForms(skipIfUntouched = false): Observable<boolean> {
        const currentStepId = this.getCurrentStepId();
        return this.submitStepForms(currentStepId, skipIfUntouched).pipe(
            map((result) => result === null || Object.values(result).every((r) => r.success))
        );
    }

    /**
     * @description Sets new array of visible steps for Wizard.
     * @param steps steps that needs to be shown in Wizard.
     */
    setVisibleSteps(steps: WizardGeneratorItem[]): void {
        this.visibleWizardSteps = steps;
        this._visibleWizardSteps$.next(steps);

        this.setWizardStepIds(steps.map(s => s.id));
    }

    /**
     * @returns {Observable<WizardGeneratorItem[]>} Observable, which will emit every time
     * when array of visible step items has been changed.
     */
    getVisibleSteps(): Observable<WizardGeneratorItem[]> {
        return this._visibleWizardSteps$.asObservable();
    }

    /**
     * @description Runs initial transformation for passed Wizard steps.
     * @param items All Wizard steps.
     * @returns {Promise<WizardGeneratorItem[]>} Array of transformed Wizard steps.
     */
    async prepareWizardItems(items: WizardGeneratorItem[]): Promise<WizardGeneratorItem[]> {
        let newItems = await Promise.all(
            items.map(async (i, index) => {
                const item = { ...i };
                item.status = item.status || 'upcoming';
                item.title = await this._getFormItemPropertyValue(item, index, 'title');
                item.name = await this._getFormItemPropertyValue(item, index, 'name');
                return item;
            })
        );

        // Summary step must be the last one in array
        const summaryStepIndex = newItems.findIndex((i) => i.summary === true);

        if (summaryStepIndex !== -1 && summaryStepIndex !== newItems.length - 1) {
            newItems.splice(newItems.length - 1, 0, newItems.splice(summaryStepIndex, 1)[0]);
        }

        // If no current step found, set first as current.
        if (newItems.findIndex((i) => i.status === 'current') === -1) {
            newItems[0].status = 'current';
        }

        newItems = this._setBranchingSteps(newItems);

        this.dependencySteps = newItems.reduce((steps, step) => {
            if (step.dependencyFields) {
                for (const [id, forms] of Object.entries(step.dependencyFields)) {
                    steps[id] = mergeDeep(steps[id] || {}, forms);
                }
            }

            return steps;
        }, {});

        this.items = newItems;
        await this.refreshStepVisibility();

        return newItems;
    }

    /**
     * @description Runs conditional function for each step to define if step should be shown.
     */
    async refreshStepVisibility(): Promise<void> {
        const formValue = await this.getWizardFormValue();

        const visibleStepIds: WizardVisibleSteps = {};

        const completedStepIds = this.items.filter((i) => i.status === 'completed').map((i) => i.id);

        for (const item of this.items) {
            if (!isFunction(item.when)) {
                visibleStepIds[item.id] = true;
                continue;
            }

            const obj = item.when(completedStepIds, formValue);

            visibleStepIds[item.id] = await this._getFunctionValue(obj);
        }

        this.setVisibleSteps(this.items.filter((item) => visibleStepIds[item.id] === true));
    }

    /**
     * @description Clears array of Wizard steps components.
     */
    clearWizardStepComponents(): void {
        this.stepsComponents.clear();
        this._stepsComponents$.next(this.stepsComponents);
    }

    /**
     * @returns {Observable<StepsComponents>} Observable, which will emit every time
     * when Set visible steps components has been changed.
     */
    trackStepsComponents(): Observable<StepsComponents> {
        return this._stepsComponents$.asObservable();
    }

    /**
     * @description Adds new component to the set of Wizard steps components.
     * @param component Wizard Step component to add.
     * @param key Wizard Step ID.
     */
    addWizardStepComponent(component: WizardGeneratorStepComponent, key: string): void {
        this.stepsComponents.set(key, component);
        this._stepsComponents$.next(this.stepsComponents);
    }

    /**
     * @description Removes Component from the set of Wizard steps components.
     * @param key
     */
    removeWizardStepComponent(key: string): void {
        this.stepsComponents.delete(key);
        this._stepsComponents$.next(this.stepsComponents);
    }

    /**
     *
     * @param step Step ID which includes dependency fields.
     * @returns Object with forms and their fields that are dependencies for other steps.
     */
    getDependencyFields(step: string): any {
        return this.dependencySteps[step];
    }

    /**
     * @param formatted Flag defining whether form value should be formatted by form control
     * transformers, or return raw value
     * @returns {WizardGeneratorFormsValue} Wizard form value
     */
    async getWizardFormValue(formatted = false): Promise<WizardGeneratorFormsValue> {
        const wizardFormValue: WizardGeneratorFormsValue = {};

        if (!this.visibleWizardSteps) {
            return wizardFormValue;
        }

        for (const item of this.visibleWizardSteps.filter((s) => !s.summary)) {
            wizardFormValue[item.id] = {};

            const component = this.stepsComponents.get(item.id);

            if (!component) {
                continue;
            }

            const forms = component.getForms();

            for (const form of item.formGroups) {
                wizardFormValue[item.id][form.id] = formatted
                    ? await this._formGeneratorService.getFormValue(forms[form.id]?.form)
                    : forms[form.id]?.form.value;
            }
        }

        return wizardFormValue;
    }

    /**
     *
     * @param stepId Step ID to check.
     * @returns {Boolean} indicator if step was previously validated and submitted.
     */
    stepSubmitted(stepId: string): boolean {
        return this._submittedFormRawValues[stepId] !== undefined;
    }

    /**
     *
     * @returns {Boolean} if steps are untouched, will return true, if yes - false
     */
    isStepsUntouched(): boolean {
        return [...this.stepsComponents].every(([_, component]) =>
            component.forms.toArray().every((item) => !item.form.touched)
        );
    }

    /**
     * Reverts wizard to defined step.
     * @param stepId Step ID to edit
     */
    editStep(stepId: string): void {
        const stepIndex = this.visibleWizardSteps.findIndex((s) => s.id === stepId);

        this.visibleWizardSteps = this.visibleWizardSteps.map((step, index) => {
            step.status = index === stepIndex ? 'current' : index < stepIndex ? 'completed' : 'upcoming';

            return step;
        });

        const summaryStepIndex = this.visibleWizardSteps.findIndex(s => s.summary);

        this._shouldRedirectToSummary = true;

        this._appendToWizard$.next(false);

        this.setVisibleSteps(this.visibleWizardSteps);

        this.setNextStepIndex(summaryStepIndex);
    }

    /**
     * Set's current set of step ID's
     * @param ids step ID's
     */
    setWizardStepIds(ids: string[]): void {
        if (!this._wizardStepIds.every((stepId, index) => ids[index] === stepId)) {

            const firstChangedStepIndex = this._wizardStepIds.findIndex((stepId, index) => ids[index] !== stepId);

            this._nextStepIndex$.next(firstChangedStepIndex);

            this._stepsOrderChanged$.next(firstChangedStepIndex);
        }

        this._wizardStepIds = ids;
    }

    setNextStepIndex(index: number): void {
        this._nextStepIndex$.next(index);
    }

    trackNextStepindex(): Observable<number> {
        return this._nextStepIndex$.asObservable();
    }

    trackStepsOrder(): Observable<number> {
        return this._stepsOrderChanged$.asObservable();
    }

    setOriginalAppendToWizardState(value: boolean): void {
        this.appendToWizard = value;
        this._appendToWizard$.next(this.appendToWizard);
    }

    restoreAppendToWizardState(): void {
        this._appendToWizard$.next(this.appendToWizard);
    }

    trackAppendToWizardState(): Observable<boolean> {
        return this._appendToWizard$.asObservable();
    }

    /**
     * @hidden
     * @param items
     * @param index
     * @param key
     * @returns
     */
    private async _getFormItemPropertyValue<T = string>(
        items: WizardGeneratorItem,
        index: number,
        key: keyof WizardGeneratorItem
    ): Promise<T> {
        let value: any = items[key];

        if (typeof value === 'function') {
            const obj = value(index);

            value = await this._getFunctionValue(obj);
        }

        return value as T;
    }

    /**
     * @hidden
     * @description Returns value from Promise-like, Observable-like, simple function or just some object.
     * @param obj
     * @returns
     */
    private async _getFunctionValue(obj: any): Promise<any> {
        const strategy = selectStrategy(obj);

        let result: any;

        await strategy.createSubscription(obj, (value: any) => {
            result = value;
        });

        if (isFunction(result)) {
            await this._getFunctionValue(result);
        }

        return result;
    }

    /**
     * @hidden
     * @description Sets `branching` property for the steps that will create new branches.
     * @param items
     * @returns
     */
    private _setBranchingSteps(items: WizardGeneratorItem[]): WizardGeneratorItem[] {
        const branchingItems: string[] = items
            .filter((i) => i.dependencyFields)
            .reduce((stepIds, item) => {
                stepIds = [...stepIds, ...Object.keys(item.dependencyFields)];

                return stepIds;
            }, []);

        if (branchingItems.length > 0) {
            items = items.map((item) => {
                item.branching = item.branching || branchingItems.includes(item.id);
                return item;
            });
        }

        return items;
    }
}
