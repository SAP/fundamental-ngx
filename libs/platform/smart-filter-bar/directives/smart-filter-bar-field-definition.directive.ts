import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { Directive, Input } from '@angular/core';
import { CollectionFilterGroupStrategy, FilterType, FilterableColumnDataType } from '@fundamental-ngx/platform/table';

@Directive({
    selector: '[fdpSmartFilterBarFieldDefinition], [fdp-smart-filter-bar-field-definition]',
    standalone: true
})
export class SmartFilterBarFieldDefinitionDirective {
    /** Field data accessor key. */
    @Input()
    key!: string;

    /** Unique field identifier. */
    @Input()
    name!: string;

    /** Field label. */
    @Input()
    label!: string;
    /** Field filter type */
    @Input()
    filterType!: FilterType;
    /** Field data type */
    @Input()
    dataType!: FilterableColumnDataType;
    /** Field custom filter type */
    @Input()
    customFilterType!: string;

    /** Condition strategy */
    @Input()
    conditionStrategy: CollectionFilterGroupStrategy = 'or';

    /** @ignore */
    private _smartFilterBarFilterable = true;

    /** Whether this field can be filtered. Default value is true. */
    @Input()
    set smartFilterBarFilterable(value: BooleanInput) {
        this._smartFilterBarFilterable = coerceBooleanProperty(value);
    }
    get smartFilterBarFilterable(): boolean {
        return this._smartFilterBarFilterable;
    }

    /** @ignore */
    private _required = false;

    /** Whether this field filter is mandatory. */
    @Input()
    set required(value: BooleanInput) {
        this._required = coerceBooleanProperty(value);
    }
    get required(): boolean {
        return this._required;
    }

    /** @ignore */
    private _defaultSelected = false;

    /** Whether this field filter is selected by default. */
    @Input()
    set defaultSelected(value: BooleanInput) {
        this._defaultSelected = coerceBooleanProperty(value);
    }
    get defaultSelected(): boolean {
        return this._defaultSelected;
    }

    /** Whether this field has autocomplete options */
    @Input()
    set hasOptions(value: BooleanInput) {
        this._hasOptions = coerceBooleanProperty(value);
    }
    get hasOptions(): boolean {
        return this._hasOptions;
    }

    /** @ignore */
    private _hasOptions = false;
}
