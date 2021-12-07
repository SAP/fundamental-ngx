import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Directive, Input } from '@angular/core';
import { FilterableColumnDataType, FilterType } from '@fundamental-ngx/platform/table';

@Directive({
    selector: '[fdpSmartFilterBarFieldDefinition], [fdp-smart-filter-bar-field-definition]'
})
export class SmartFilterBarFieldDefinitionDirective {
    /** Field data accessor key. */
    @Input()
    key: string;

    /** Field label. */
    @Input()
    label: string;

    /** Whether or not this field can be filtered. */
    @Input()
    set filterable(value: boolean) {
        this._filterable = coerceBooleanProperty(value);
    }

    get filterable(): boolean {
        return this._filterable;
    }

    /** Whether or not this field filter is mandatory */
    @Input()
    set mandatoryFilter(value: boolean) {
        this._mandatoryFilter = coerceBooleanProperty(value);
    }

    get mandatoryFilter(): boolean {
        return this._mandatoryFilter;
    }

    /** Field filter type */
    @Input()
    filterType: FilterType;

    /** Field data type */
    @Input()
    dataType: FilterableColumnDataType;

    /** Field custom filter type */
    @Input()
    customFilterType: string;

    private _filterable = false;

    private _mandatoryFilter = false;
}
