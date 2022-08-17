import { CollectionFilterAndGroup } from '@fundamental-ngx/platform/table';
import { SmartFilterBarFieldDefinition } from './smart-filter-bar-field-definition';
import { SmartFilterBarVisibilityCategoryLabels } from './smart-filter-bar-visibility-category';

export interface SmartFilterSettingsDialogConfig {
    /**
     * Available fields.
     */
    fields: SmartFilterBarFieldDefinition[];
    /**
     * Applied filters.
     */
    filterBy: CollectionFilterAndGroup[];
    /**
     * Selected filters.
     */
    selectedFilters: string[];

    /**
     * @deprecated use i18n capabilities instead
     * Filters visibility category labels.
     */
    visibilityCategories?: SmartFilterBarVisibilityCategoryLabels;
}
