import { FILTER_STRATEGY } from '@fundamental-ngx/platform/table';
import { SmartFilterBarCondition } from './interfaces/smart-filter-bar-condition';

export abstract class SmartFilterBar {
    defineStrategyLabels: {
        [key in typeof FILTER_STRATEGY[keyof typeof FILTER_STRATEGY]]: string;
    };
    getDisplayValue: (condition: SmartFilterBarCondition, filterType: string) => Promise<string>;
}
