import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    QueryList,
    ViewChildren,
    ViewEncapsulation
} from '@angular/core';

import { CdkScrollable } from '@angular/cdk/overlay';

import { FormsModule } from '@angular/forms';
import { TemplateDirective } from '@fundamental-ngx/cdk/utils';
import { BarElementDirective, BarLeftDirective, ButtonBarComponent } from '@fundamental-ngx/core/bar';
import { BusyIndicatorComponent } from '@fundamental-ngx/core/busy-indicator';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import {
    DialogBodyComponent,
    DialogComponent,
    DialogFooterComponent,
    DialogHeaderComponent,
    DialogRef
} from '@fundamental-ngx/core/dialog';
import { LayoutGridColDirective, LayoutGridComponent, LayoutGridRowDirective } from '@fundamental-ngx/core/layout-grid';
import { ScrollbarDirective } from '@fundamental-ngx/core/scrollbar';
import { TitleComponent } from '@fundamental-ngx/core/title';
import { FdTranslatePipe, resolveTranslationSyncFn } from '@fundamental-ngx/i18n';
import { DynamicFormControl, DynamicFormItem, FormGeneratorComponent } from '@fundamental-ngx/platform/form';
import { SelectItem } from '@fundamental-ngx/platform/shared';
import { FILTER_STRATEGY, FilterAllStrategy } from '@fundamental-ngx/platform/table';
import { getSelectItemValue } from '../../helpers';
import { SmartFilterBarCondition, SmartFilterBarConditionBuilder } from '../../interfaces/smart-filter-bar-condition';
import { SmartFilterBarStrategy, SmartFilterBarStrategyLabels } from '../../interfaces/strategy-labels.type';
import { SmartFilterBarService } from '../../smart-filter-bar.service';

@Component({
    selector: 'fdp-smart-filter-bar-conditions-dialog',
    templateUrl: './smart-filter-bar-conditions-dialog.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        DialogComponent,
        DialogHeaderComponent,
        TemplateDirective,
        BarLeftDirective,
        BarElementDirective,
        TitleComponent,
        CdkScrollable,
        ScrollbarDirective,
        DialogBodyComponent,
        FormsModule,
        LayoutGridComponent,
        LayoutGridRowDirective,
        LayoutGridColDirective,
        FormGeneratorComponent,
        ButtonComponent,
        DialogFooterComponent,
        ButtonBarComponent,
        BusyIndicatorComponent,
        FdTranslatePipe
    ]
})
export class SmartFilterBarConditionsDialogComponent {
    /**
     * Generated condition forms.
     */
    @ViewChildren(FormGeneratorComponent)
    formGenerators!: QueryList<FormGeneratorComponent>;

    /** Condition builder config. */
    config: SmartFilterBarConditionBuilder;

    /** Available condition operator options. */
    conditionOperatorOptions: SelectItem[] = [];

    /** @hidden */
    _formItems: DynamicFormItem[][] = [];

    /** @hidden */
    loaded = false;

    /** @hidden */
    private readonly _conditionLabelKeys: SmartFilterBarStrategyLabels = {
        contains: 'filterConditionContains',
        equalTo: 'filterConditionEqualTo',
        between: 'filterConditionBetween',
        beginsWith: 'filterConditionBeginsWith',
        endsWith: 'filterConditionEndsWith',
        lessThan: 'filterConditionLessThan',
        lessThanOrEqualTo: 'filterConditionLessThanOrEqualTo',
        greaterThan: 'filterConditionGreaterThan',
        greaterThanOrEqualTo: 'filterConditionGreaterThanOrEqualTo',
        after: 'filterConditionAfter',
        onOrAfter: 'filterConditionOnOrAfter',
        before: 'filterConditionBefore',
        beforeOrOn: 'filterConditionBeforeOrOn'
    };

    /** @hidden */
    private _submittedForms: any[] = [];

    /** @hidden */
    private resolveTranslation = resolveTranslationSyncFn();

    /** @hidden */
    constructor(
        private _dialogRef: DialogRef<SmartFilterBarConditionBuilder, SmartFilterBarCondition[]>,
        private readonly _cdr: ChangeDetectorRef,
        private _smartFilterBarService: SmartFilterBarService
    ) {
        this._init();
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
        this._cdr.detectChanges();
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

        if (this._submittedForms.length !== this.formGenerators.length) {
            return;
        }

        const formsResult = this._submittedForms.map((f) => {
            f.value = f.value1 !== undefined ? f.value1 : f.value;
            return f;
        });

        this._dialogRef.close(
            formsResult.filter((c: SmartFilterBarCondition) => c.value !== undefined && c.value !== null)
        );
    }

    /** @hidden */
    _cancel(): void {
        this._dialogRef.dismiss();
    }

    /** @hidden */
    private _init(): void {
        this.config = this._dialogRef.data;

        this.conditionOperatorOptions = this._getApplicableConditionOperators();

        this._addExistingConditions(getSelectItemValue(this.config.conditions));

        if (this.config.conditions.length === 0) {
            // Add first empty condition
            this.addCondition();
        }
        this.loaded = true;
        this._cdr.markForCheck();
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

        const labelsConfig: Record<SmartFilterBarStrategy, string> = { ...this._conditionLabelKeys };
        for (const strategyItem of Object.keys(this._conditionLabelKeys) as SmartFilterBarStrategy[]) {
            const translationKey = 'platformSmartFilterBar.' + labelsConfig[strategyItem];
            labelsConfig[strategyItem] = this.resolveTranslation(
                translationKey as `platformSmartFilterBar.${SmartFilterBarStrategyLabels[SmartFilterBarStrategy]}`
            );
        }

        return strategy.map((s: FilterAllStrategy) => ({
            label: labelsConfig![s],
            value: s
        }));
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
                placeholder: this.resolveTranslation('platformSmartFilterBar.filterConditionValuePlaceholder'),
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
                placeholder: this.resolveTranslation('platformSmartFilterBar.filterConditionValueFromPlaceholder'),
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
                placeholder: this.resolveTranslation('platformSmartFilterBar.filterConditionValueToPlaceholder'),
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
