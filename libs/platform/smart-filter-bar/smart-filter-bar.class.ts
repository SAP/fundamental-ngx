import { Directive, EventEmitter, Input, Output } from '@angular/core';
import { SearchInput } from '@fundamental-ngx/platform/search-field';
import { PresetManagedComponent } from '@fundamental-ngx/platform/shared';
import { CollectionFilterGroup } from '@fundamental-ngx/platform/table';
import { SmartFilterBarManagedPreset } from './interfaces/smart-filter-bar-change';
import { SmartFilterBarCondition } from './interfaces/smart-filter-bar-condition';

@Directive()
export abstract class SmartFilterBar implements PresetManagedComponent<SmartFilterBarManagedPreset> {
    abstract search: SearchInput | undefined;

    /** @hidden */
    abstract getDisplayValue(condition: SmartFilterBarCondition, filterType: string): Promise<string>;

    /** Method for setting predefined configuration preset. */
    abstract setPreset(data: SmartFilterBarManagedPreset): void;

    /** Returns current preset configuration. */
    abstract getCurrentPreset(): SmartFilterBarManagedPreset;

    abstract getFormattedConditions(): Promise<CollectionFilterGroup[]>;

    /** Component name used in Preset managed component. */
    @Input()
    name = 'platformSmartFilterBar';

    /** Event emitted when smart filter bar configuration has been changed. */
    @Output()
    presetChanged = new EventEmitter<SmartFilterBarManagedPreset>();
}
