import { CollectionFilterAndGroup } from '@fundamental-ngx/platform/table';
import { SmartFilterBarFieldDefinition } from './smart-filter-bar-field-definition';
import { SmartFilterBarVisibilityCategory } from './smart-filter-bar-visibility-category';

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
     * Filters visibility category labels.
     */
    visibilityCategories: {
        [key in SmartFilterBarVisibilityCategory]: string;
    };
}
