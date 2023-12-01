import { FdLanguage } from '@fundamental-ngx/i18n';

export type SmartFilterBarVisibilityCategory = 'all' | 'visible' | 'active' | 'visibleAndActive' | 'mandatory';

type SmartFilterBarCategoryLabelI18nKey = {
    [Key in keyof FdLanguage['platformSmartFilterBar']]: Key extends `settingsCategory${Capitalize<SmartFilterBarVisibilityCategory>}`
        ? Key
        : never;
};

export type SmartFilterBarVisibilityCategoryLabels = {
    [key in SmartFilterBarVisibilityCategory]: SmartFilterBarCategoryLabelI18nKey[`settingsCategory${Capitalize<key>}`];
};
