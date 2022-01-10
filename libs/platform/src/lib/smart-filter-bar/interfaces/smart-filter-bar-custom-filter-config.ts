import { Type } from '@angular/core';
import { BaseDynamicFormGeneratorControl } from '@fundamental-ngx/platform/form';
import { FilterAllStrategy } from '@fundamental-ngx/platform/table';
import { Observable } from 'rxjs';
import { SmartFilterBarCondition } from './smart-filter-bar-condition';
import { SelectItem } from '@fundamental-ngx/platform/shared';

export interface SmartFilterBarCustomFilterConfig {
    /**
     * Component to be used to render the control in conditions dialog.
     */
    conditionComponent?: Type<BaseDynamicFormGeneratorControl>;

    /**
     * Component to be used to render the condition in smart filter bar.
     */
    rendererComponent?: Type<BaseDynamicFormGeneratorControl>;

    /**
     * Available filtering strategies.
     */
    filterStrategies?: FilterAllStrategy[];
    /**
     * Transforms raw filter item value.
     * @param value raw filter item value.
     * @returns updated filter item value to be used in the filters value hash.
     */
    valueTransformer?: (value: any) => SelectItem<SmartFilterBarCondition>[] | any[] | undefined;

    /**
     * Transforms filter raw value so it could be rendered in renderer component.
     * @param condition Generated condition rule.
     * @returns string which will be used in renderer component.
     */
    valueRenderer?: (condition: SmartFilterBarCondition) => string | Promise<string> | Observable<string>;

    /**
     * Filter type.
     */
    types: string[];
    /**
     * Additional data that can be used later in the component.
     */
    additionalData?: {
        [key: string]: any;
    };
}
