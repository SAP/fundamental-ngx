import { Directive, Input, booleanAttribute } from '@angular/core';
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

    /** Whether this field can be filtered. Default value is true. */
    @Input({ transform: booleanAttribute })
    smartFilterBarFilterable = true;

    /** Whether this field filter is mandatory. */
    @Input({ transform: booleanAttribute })
    required = false;

    /** Whether this field filter is selected by default. */
    @Input({ transform: booleanAttribute })
    defaultSelected = false;

    /** Whether this field has autocomplete options */
    @Input({ transform: booleanAttribute })
    hasOptions = false;
}
