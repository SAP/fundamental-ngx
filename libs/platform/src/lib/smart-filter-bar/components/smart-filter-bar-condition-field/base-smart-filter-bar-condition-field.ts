import { Directive, Injector } from '@angular/core';
import { DialogService } from '@fundamental-ngx/core/dialog';
import {
    BaseDynamicFormGeneratorControl,
    DynamicFormControl,
    dynamicFormFieldProvider,
    dynamicFormGroupChildProvider
} from '@fundamental-ngx/platform/form';
import { take } from 'rxjs/operators';
import { SmartFilterBarCondition, SmartFilterBarConditionBuilder } from '../../interfaces/smart-filter-bar-condition';
import { SmartFilterBarConditionsDialogComponent } from '../smart-filter-bar-conditions-dialog/smart-filter-bar-conditions-dialog.component';
import { SmartFilterBar } from '../../smart-filter-bar.class';
import { smartFilterBarProvider } from '../../providers/smart-filter-bar.provider';
import { isSelectItem, SelectItem } from '@fundamental-ngx/platform/shared';

@Directive({
    providers: [dynamicFormFieldProvider, dynamicFormGroupChildProvider, smartFilterBarProvider]
})
export abstract class BaseSmartFilterBarConditionField extends BaseDynamicFormGeneratorControl {
    protected constructor(
        protected _dialogService: DialogService,
        protected _smartFilterBar: SmartFilterBar,
        protected _injector: Injector
    ) {
        super();
    }

    /**
     * Method for opening conditions configuration dialog.
     */
    openConditionsDialog: () => void = () => {
        const currentValue = this.getField().value;

        const dialogData: SmartFilterBarConditionBuilder = {
            header: this.formItem.message as string,
            dataType: this.formItem.guiOptions?.additionalData.dataType,
            filterType: this.formItem.guiOptions?.additionalData.type,
            conditions: currentValue || [],
            choices: this.formItem.guiOptions?.additionalData.choices,
            controlType: this.formItem.guiOptions?.additionalData.controlType,
            defineStrategyLabels: this._smartFilterBar.defineStrategyLabels
        };

        const dialogRef = this._dialogService.open(
            SmartFilterBarConditionsDialogComponent,
            {
                data: dialogData,
                width: '67.5rem',
                minHeight: '30%'
            },
            this._injector
        );

        dialogRef.afterClosed.pipe(take(1)).subscribe(
            async (conditions: SmartFilterBarCondition[]) => {
                const field = this.getField();
                const normalizedConditions = (await this.normalizeConditions(conditions)).map((c: any) => {
                    if (isSelectItem(c)) {
                        return c;
                    }

                    const condition: SelectItem = {
                        label: c.displayValue,
                        value: c
                    };

                    return condition;
                });
                field.setValue(normalizedConditions);
            },
            (_) => {}
        );
    };

    /**
     * Method for retrieving current form control of the generated form.
     * @returns Found form control.
     */
    getField(): DynamicFormControl {
        return this.form.get(`${this.formGroupName}.${this.name}`) as DynamicFormControl;
    }

    /**
     * Method for normalizing generated conditions to display in human-readable format.
     * @param conditions Array of generated conditions.
     * @returns Formatted array of conditions.
     */
    async normalizeConditions(conditions: SmartFilterBarCondition[]): Promise<SmartFilterBarCondition[]> {
        const normalizedConditions: SmartFilterBarCondition[] = [];

        for (const condition of conditions) {
            const newCondition = Object.assign({}, condition);

            newCondition.displayValue = await this._smartFilterBar.getDisplayValue(
                newCondition,
                this.formItem.guiOptions?.additionalData.type
            );

            normalizedConditions.push(newCondition);
        }

        return normalizedConditions;
    }
}
