import { ChangeDetectionStrategy, Component, QueryList, ViewChildren, ViewEncapsulation } from '@angular/core';

import { FilterAllStrategy, FILTER_STRATEGY } from '@fundamental-ngx/platform/table';
import { SelectItem } from '@fundamental-ngx/platform/shared';
import { DialogRef } from '@fundamental-ngx/core/dialog';
import { DynamicFormControl, DynamicFormItem, FormGeneratorComponent } from '@fundamental-ngx/platform/form';
import { SmartFilterBarCondition, SmartFilterBarConditionBuilder } from '../../interfaces/smart-filter-bar-condition';
import { SmartFilterBarService } from '../../smart-filter-bar.service';
import { getSelectItemValue } from '../../helpers';

@Component({
    selector: 'fdp-smart-filter-bar-conditions-dialog',
    templateUrl: './smart-filter-bar-conditions-dialog.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SmartFilterBarConditionsDialogComponent {
    /** Condition builder config. */
    config: SmartFilterBarConditionBuilder;

    /** Available condition operator options. */
    conditionOperatorOptions: SelectItem[] = [];

    /** @hidden */
    _formItems: DynamicFormItem[][] = [];

    /**
     * Generated condition forms.
     */
    @ViewChildren(FormGeneratorComponent)
    formGenerators!: QueryList<FormGeneratorComponent>;

    /** @hidden */
    private _submittedForms: any[] = [];

    /** @hidden */
    constructor(
        private _dialogRef: DialogRef<SmartFilterBarConditionBuilder, SmartFilterBarCondition[]>,
        private _smartFilterBarService: SmartFilterBarService
    ) {
        this.config = this._dialogRef.data;

        this.conditionOperatorOptions = this._getApplicableConditionOperators();

        this._addExistingConditions(getSelectItemValue(this.config.conditions));

        if (this.config.conditions.length === 0) {
            // Add first empty condition
            this.addCondition();
        }
    }

    /**
     * Adds empty condition.
     */
    addCondition(): void {
        this._formItems.push(this._generateFormGeneratorItems());
    }

    /**
     * Removes condition at defined index
     * @param index Index of the condition in the array.
     */
    removeCondition(index: number): void {
        this._formItems.splice(index, 1);

        if (this._formItems.length === 0) {
            this.addCondition();
        }
    }

    /**
     * Submits all condition forms.
     */
    applyConditions(): void {
        this._submittedForms = [];
        this.formGenerators.toArray().forEach((formGenerator) => formGenerator.submit());
    }

    /**
     * @hidden
     * Callback function when form generator form has been submitted.
     * Will close dialog in case if all forms are valid.
     * @param form Form generator form value.
     */
    _onFormSubmitted(form: SmartFilterBarCondition): void {
        this._submittedForms.push(form);

        if (this._submittedForms.length === this.formGenerators.length) {
            const formsResult = this._submittedForms.map((f) => {
                f.value = f.value1 !== undefined ? f.value1 : f.value;
                return f;
            });

            this._dialogRef.close(
                formsResult.filter((c: SmartFilterBarCondition) => c.value !== undefined && c.value !== null)
            );
        }
    }

    /** @hidden */
    _cancel(): void {
        this._dialogRef.dismiss();
    }

    /**
     * @hidden
     * Returns applicable condition options of the filter.
     * @returns Array of applicable condition options.
     */
    private _getApplicableConditionOperators(): SelectItem[] {
        const strategy = this._smartFilterBarService.getApplicableFilterConditions(
            this.config.filterType,
            this.config.dataType
        );

        const selectItems: SelectItem[] = [];

        strategy.forEach((s: FilterAllStrategy) => {
            selectItems.push({
                label: this.config.defineStrategyLabels[s],
                value: s
            });
        });

        return selectItems;
    }

    /**
     * Transforms filter conditions into form generator form items array.
     * @param conditions existing smart filter bar filter conditions.
     */
    private _addExistingConditions(conditions: SmartFilterBarCondition[]): void {
        conditions.forEach((condition) => {
            const conditionGroup = this._generateFormGeneratorItems(condition);

            this._formItems.push(conditionGroup);
        });
    }

    /** @hidden */
    private _generateFormGeneratorItems(condition?: SmartFilterBarCondition): DynamicFormItem[] {
        return [
            {
                name: 'operator',
                message: 'operator',
                default: condition
                    ? this.conditionOperatorOptions.find((o) => o.value === condition.operator)?.value
                    : this.conditionOperatorOptions[0].value,
                type: 'select',
                choices: this.conditionOperatorOptions,
                required: true,
                guiOptions: {
                    inline: false,
                    column: 1,
                    noLabelLayout: true
                }
            },
            {
                name: 'value',
                message: 'value',
                default: condition?.value,
                type: this.config.filterType,
                choices: this.config.choices,
                placeholder: 'value',
                controlType: this.config.controlType,
                when: (value) => value.operator !== FILTER_STRATEGY.BETWEEN,
                onchange: (value, _, control: DynamicFormControl) => {
                    control.parent?.get('value1')?.setValue(value, { emitEvent: false });
                },
                guiOptions: {
                    inline: false,
                    column: 2,
                    noLabelLayout: true
                }
            },
            {
                name: 'value1',
                message: 'value1',
                default: condition?.value,
                type: this.config.filterType,
                choices: this.config.choices,
                placeholder: 'from',
                controlType: this.config.controlType,
                when: (value) => value.operator === FILTER_STRATEGY.BETWEEN,
                onchange: (value, _, control: DynamicFormControl) => {
                    control.parent?.get('value')?.setValue(value, { emitEvent: false });
                },
                guiOptions: {
                    inline: false,
                    column: 2,
                    noLabelLayout: true
                }
            },
            {
                name: 'value2',
                message: 'value2',
                default: condition?.value2,
                type: this.config.filterType,
                choices: this.config.choices,
                placeholder: 'to',
                required: true,
                controlType: this.config.controlType,
                when: (value) => value?.operator === FILTER_STRATEGY.BETWEEN,
                guiOptions: {
                    inline: false,
                    column: 3,
                    noLabelLayout: true
                }
            }
        ];
    }
}
