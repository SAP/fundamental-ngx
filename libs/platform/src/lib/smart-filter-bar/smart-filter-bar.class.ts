import { SmartFilterBarCondition } from './interfaces/smart-filter-bar-condition';
import { SmartFilterBarStrategyLabels } from './interfaces/strategy-labels.type';

export abstract class SmartFilterBar {
    defineStrategyLabels?: SmartFilterBarStrategyLabels;
    getDisplayValue!: (condition: SmartFilterBarCondition, filterType: string) => Promise<string>;
}
