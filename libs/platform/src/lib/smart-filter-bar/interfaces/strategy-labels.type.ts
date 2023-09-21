import { FdLanguage } from '@fundamental-ngx/i18n';
import { FILTER_STRATEGY } from '@fundamental-ngx/platform/table';

type SmartFilterBarStrategy = (typeof FILTER_STRATEGY)[keyof typeof FILTER_STRATEGY];

type SmartFilterBarStrategyLabelI18nKey = {
    [Key in keyof FdLanguage['platformSmartFilterBar']]: Key extends `filterCondition${Capitalize<SmartFilterBarStrategy>}`
        ? Key
        : never;
};
export type SmartFilterBarStrategyLabels = {
    [key in SmartFilterBarStrategy]: SmartFilterBarStrategyLabelI18nKey[`filterCondition${Capitalize<key>}`];
};
