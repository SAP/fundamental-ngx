import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { Directive, Input } from '@angular/core';
import { CollectionFilterGroupStrategy, FilterableColumnDataType, FilterType } from '@fundamental-ngx/platform/table';

@Directive({
    selector: '[fdpSmartFilterBarFieldDefinition], [fdp-smart-filter-bar-field-definition]'
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

    @Input()
    conditionStrategy: CollectionFilterGroupStrategy = 'or';

    /** @hidden */
    private _filterable = false;

    get filterable(): boolean {
        return this._filterable;
    }

    /** Whether this field can be filtered. */
    @Input()
    set filterable(value: BooleanInput) {
        this._filterable = coerceBooleanProperty(value);
    }

    /** @hidden */
    private _required = false;

    get required(): boolean {
        return this._required;
    }

    /** Whether this field filter is mandatory. */
    @Input()
    set required(value: BooleanInput) {
        this._required = coerceBooleanProperty(value);
    }

    /** @hidden */
    private _defaultSelected = false;

    get defaultSelected(): boolean {
        return this._defaultSelected;
    }

    /** Whether this field filter is selected by default. */
    @Input()
    set defaultSelected(value: BooleanInput) {
        this._defaultSelected = coerceBooleanProperty(value);
    }
    /** Whether this field has autocomplete options */
    @Input()
    set hasOptions(value: BooleanInput) {
        this._hasOptions = coerceBooleanProperty(value);
    }

    get hasOptions(): boolean {
        return this._hasOptions;
    }

    /** @hidden */
    private _hasOptions = false;
}
