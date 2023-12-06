import { CollectionFilterAndGroup } from '@fundamental-ngx/platform/table';
import { SmartFilterBarFieldDefinition } from './smart-filter-bar-field-definition';

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
}
