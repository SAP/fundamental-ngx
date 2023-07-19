import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { cloneDeep, concat, mergeWith, uniq } from 'lodash-es';

import { FormGeneratorService } from '@fundamental-ngx/platform/form';
import { WizardGeneratorFormGroup, WizardGeneratorFormItem } from './interfaces/wizard-generator-form-group.interface';
import { isFunction, selectStrategy } from '@fundamental-ngx/cdk/utils';
import { PreparedWizardGeneratorItem, WizardGeneratorItem } from './interfaces/wizard-generator-item.interface';
import {
    WizardGeneratorDependencyFields,
    WizardGeneratorFormsValue,
    WizardStepSubmittedForms,
    WizardVisibleSteps
} from './interfaces/wizard-generator-forms.interface';
import { WizardGeneratorStep } from './interfaces/wizard-step.interface';

export type StepsComponents = Map<string, WizardGeneratorStep>;

export enum WizardGeneratorRefreshStrategy {
    REFRESH_STEP_VISIBILITY = 'refreshStepVisibility',
    REVALIDATE_STEP_FORMS = 'revalidateStepForms',
    REFRESH_FORM_VISIBILITY = 'refreshFormVisibility'
}

export interface DependencySteps {
    /** Step ID */
    [key: string]: {
        /** Form ID with array of form control id's */
        [key: string]: {
            [key in WizardGeneratorRefreshStrategy]?: string[];
        };
    };
}

export interface StepDependencyFields {
    /** Dependent step */
    [key: string]: DependencySteps;
}

/**
 * @description Helper service to keep all transformations and data in one place.
 */
@Injectable()
export class WizardGeneratorService {
    /** @hidden */
    items: PreparedWizardGeneratorItem[];

    /**
     * @description Visible steps components
     */
    stepsComponents: StepsComponents = new Map();

    /**
     * @description Object with steps that are dependencies for another steps.
     */
    dependencySteps: StepDependencyFields = {};

    /**
     * @description Whether to append the step to the wizard. If false, each step will be displayed on a different page.
     * Default is true.
     */
    appendToWizard = true;

    /** @hidden */
    _shouldRedirectToSummary = false;

    /**
     * @description Steps that are visible to the user.
     */
    public visibleWizardSteps: PreparedWizardGeneratorItem[] = [];

    /** @hidden */
    private _visibleWizardSteps$ = new Subject<PreparedWizardGeneratorItem[]>();

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

    /** @hidden */
    private _wizardStepIds: string[] = [];

    /** @hidden */
    constructor(private _formGeneratorService: FormGeneratorService) {}

    /**
     * @description Returns current step ID in Wizard.
     * @returns {string | undefined} Current step ID.
     */
    getCurrentStepId(): string | undefined {
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
    getStepIndex(stepId?: string): number {
        const stepIndex = this.visibleWizardSteps?.findIndex((i) => i.id === stepId);
        return stepIndex > -1 ? stepIndex : 0;
    }

    /**
     * @description Sends command to submit all forms inside the step.
     * @param stepId Step ID for which forms need's to be submitted.
     * @param skipIfUntouched Skip validation if form haven't been touched.
     * @returns {Observable<WizardStepSubmittedForms>} Observable, which will emit
     * when all visible forms in step are submitted.
     */
    submitStepForms(stepId?: string, skipIfUntouched = false): Observable<WizardStepSubmittedForms | null> {
        if (!stepId) {
            return of(null);
        }

        const step = this.stepsComponents.get(stepId);

        if (!step) {
            return of(null);
        }

        return step.submitForms(skipIfUntouched).pipe(
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

        if (!currentStepId) {
            return of(true);
        }

        return this.submitStepForms(currentStepId, skipIfUntouched).pipe(
            map((result) => result === null || Object.values(result).every((r) => r.success))
        );
    }

    /**
     * @description Sets new array of visible steps for Wizard.
     * @param steps steps that needs to be shown in Wizard.
     */
    setVisibleSteps(steps: PreparedWizardGeneratorItem[]): void {
        this.visibleWizardSteps = steps;
        this._visibleWizardSteps$.next(steps);

        this.setWizardStepIds(steps.map((s) => s.id));
    }

    /**
     * @returns {Observable<PreparedWizardGeneratorItem[]>} Observable, which will emit every time
     * when array of visible step items has been changed.
     */
    getVisibleSteps(): Observable<PreparedWizardGeneratorItem[]> {
        return this._visibleWizardSteps$.asObservable();
    }

    /**
     * @description Runs initial transformation for passed Wizard steps.
     * @param items All Wizard steps.
     * @returns {Promise<PreparedWizardGeneratorItem[]>} Array of transformed Wizard steps.
     */
    async prepareWizardItems(items: WizardGeneratorItem[]): Promise<PreparedWizardGeneratorItem[]> {
        let newItems: PreparedWizardGeneratorItem[] = await Promise.all(
            items.map(async (i, index) => {
                const item = { ...i };
                item.status = item.status || 'upcoming';
                item.title = await this._getFormItemPropertyValue(item, index, 'title');
                item.name = await this._getFormItemPropertyValue(item, index, 'name');
                return item as PreparedWizardGeneratorItem;
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

        this._buildDependencyMap(newItems);

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

        for (const item of this.items) {
            if (!isFunction(item.when)) {
                visibleStepIds[item.id] = true;
                continue;
            }

            const obj = item.when!(this._getCompletedStepIds(), formValue, this._formGeneratorService.forms);

            visibleStepIds[item.id] = await this._getFunctionValue(obj);
        }

        this.setVisibleSteps(this.items.filter((item) => visibleStepIds[item.id] === true));
    }

    /**
     * Checks whether current form group should be visible.
     * @param formGroup Form Group.
     */
    async refreshFormVisibility(formGroup: WizardGeneratorFormGroup): Promise<boolean> {
        const formValue = await this.getWizardFormValue();

        const obj = formGroup.when?.(this._getCompletedStepIds(), formValue, this._formGeneratorService.forms) ?? true;

        return await this._getFunctionValue(obj);
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
    addWizardStepComponent(component: WizardGeneratorStep, key: string): void {
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
     * @param step Step ID which includes dependency fields.
     * @returns Object with forms and their fields that are dependencies for other steps.
     */
    getStepDependencyFields(step: string): DependencySteps {
        return this.dependencySteps[step];
    }

    /**
     * Notifies step components to revalidate inner forms.
     * @param stepIds Step ID's which needs to be revalidated.
     */
    notifyStepsToRevalidateForms(stepIds: string[]): void {
        stepIds.forEach((stepId) => this.stepsComponents.get(stepId)?.updateFormsState());
    }

    /**
     * Notifies step components to refresh form groups visibility.
     * @param stepIds Step ID's which needs to be checked.
     */
    async refreshFormsVisibility(stepIds: string[]): Promise<void> {
        for (const stepId of stepIds) {
            await this.stepsComponents.get(stepId)?.refreshFormsVisibility();
        }
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

            const forms = component.getVisibleForms();

            for (const form of item?.formGroups ?? []) {
                if (!forms[form.id]) {
                    continue;
                }

                wizardFormValue[item.id][form.id] = formatted
                    ? await this._formGeneratorService.getFormValue(forms[form.id]?.form)
                    : this._formGeneratorService._getFormValueWithoutUngrouped(cloneDeep(forms[form.id]?.form.value));
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
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        return [...this.stepsComponents].every(([_, component]) =>
            component.formGenerators.toArray().every((item) => !item.form.touched)
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

        const summaryStepIndex = this.visibleWizardSteps.findIndex((s) => s.summary);

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

    /**
     * Set next step index.
     * @param index Next step index.
     */
    setNextStepIndex(index: number): void {
        this._nextStepIndex$.next(index);
    }

    /**
     * Returns observable of next step index which emits when index is changed.
     */
    trackNextStepIndex(): Observable<number> {
        return this._nextStepIndex$.asObservable();
    }

    /**
     * Returns observable which emits when steps order has been changed.
     */
    trackStepsOrder(): Observable<number> {
        return this._stepsOrderChanged$.asObservable();
    }

    /**
     * Stores original 'appendToWizard' input property.
     * @param value
     */
    setOriginalAppendToWizardState(value: boolean): void {
        this.appendToWizard = value;
        this._appendToWizard$.next(this.appendToWizard);
    }

    /**
     * Resets modified 'appendToWizard' property to original one.
     */
    restoreAppendToWizardState(): void {
        this._appendToWizard$.next(this.appendToWizard);
    }

    /**
     * Returns observable which emits when 'appendToWizard' property has been changed.
     */
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
    private _setBranchingSteps(items: PreparedWizardGeneratorItem[]): PreparedWizardGeneratorItem[] {
        const branchingItems = items
            .filter((i) => i.dependencyFields)
            .reduce((stepIds, item) => {
                if (item.dependencyFields) {
                    stepIds = [...stepIds, ...Object.keys(item.dependencyFields)];
                }

                return stepIds;
            }, [] as string[]);

        if (branchingItems.length > 0) {
            items = items.map((item) => {
                item.branching = item.branching || branchingItems.includes(item.id);
                return item;
            });
        }

        return items;
    }

    /** @hidden */
    private _normalizeDependencyStep(
        dependency: { [p: string]: string[] },
        strategy: WizardGeneratorRefreshStrategy,
        dependentStep?: string
    ): DependencySteps {
        const newDependency: DependencySteps = {};

        Object.entries(dependency).forEach(([key, value]) => {
            newDependency[key] = {};

            value.forEach((v) => {
                newDependency[key][v] = {
                    [strategy]: dependentStep ? [dependentStep] : []
                };
            });
        });
        return newDependency;
    }

    /** @hidden */
    private _buildDependencyMap(items: PreparedWizardGeneratorItem[]): void {
        this.dependencySteps = {};

        const mergeArrays = (objValue: any, srcValue: any): any => {
            if (Array.isArray(objValue) && !objValue.includes(srcValue)) {
                return uniq(objValue.concat(srcValue));
            }
        };

        const buildDependencySteps = (
            dependencyFields: WizardGeneratorDependencyFields,
            strategy: WizardGeneratorRefreshStrategy,
            stepId?: string
        ): void => {
            for (const [id, forms] of Object.entries(dependencyFields)) {
                this.dependencySteps[id] = mergeWith(
                    this.dependencySteps[id] || {},
                    this._normalizeDependencyStep(forms, strategy, stepId),
                    mergeArrays
                );
            }
        };

        items
            .filter((s) => s.formGroups?.length)
            .forEach((step) => {
                if (step.dependencyFields) {
                    buildDependencySteps(step.dependencyFields, WizardGeneratorRefreshStrategy.REFRESH_STEP_VISIBILITY);
                }

                const dependentForms = step.formGroups?.filter((form) => form.dependencyFields);

                dependentForms?.forEach((form) => {
                    buildDependencySteps(
                        form.dependencyFields!,
                        WizardGeneratorRefreshStrategy.REFRESH_FORM_VISIBILITY,
                        step.id
                    );
                });

                const stepFields: WizardGeneratorFormItem[] = concat(
                    ...[...(step.formGroups ?? [])].map((item) => item.formItems.filter((f) => f.dependencyFields))
                );

                stepFields.forEach((formItem) => {
                    buildDependencySteps(
                        formItem.dependencyFields!,
                        WizardGeneratorRefreshStrategy.REVALIDATE_STEP_FORMS,
                        step.id
                    );
                });
            });
    }

    /** @hidden */
    private _getCompletedStepIds(): string[] {
        return this.items.filter((i) => i.status === 'completed').map((i) => i.id);
    }
}
