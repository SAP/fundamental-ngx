import { ChangeDetectionStrategy, Component, Input, TemplateRef, ViewChild } from '@angular/core';

import { SelectionValue } from '../../interfaces';
import { FilterType } from '../../enums';

/**
 * View settings dialog component.
 * ```html
 * <fdp-table-view-settings-filter
 *     column="name"
 *     label="Name"
 *     type="custom">
 *        <label>Enter name:</label><fdp-input type="text" name="name"></fdp-input>
 * </fdp-table-view-settings-filter>
 *
 * <fdp-table-view-settings-filter
 *     [column]="'status'"
 *     [label]="'Status'"
 *     [type]="'single-select'"
 *     [values]="[{key: 'OUT_OF_STOCK', label: {'out of stock'}}, { key: 'AVAILABLE', label: 'available'}]">
 * </fdp-table-view-settings-filter>
 * ```
 * */
@Component({
    selector: 'fdp-table-view-settings-filter',
    template: '<ng-template><ng-content></ng-content></ng-template>',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableViewSettingsFilterComponent {
    /** Column data on which to filter. */
    @Input()
    column: string;

    /** Label for the column. */
    @Input()
    label: string;

    /** Type of filter interface. */
    @Input()
    type: FilterType;

    /** Selection values for 'single-select' or 'multi-select' filter interface. */
    @Input()
    values: SelectionValue[];

    /** Responsive padding for dialog */
    @Input()
    dialogResponsivePadding = false;

    /** Vertical padding for dialog */
    @Input()
    dialogVerticalPadding = true;

    /** @hidden */
    @ViewChild(TemplateRef)
    contentTemplateRef: TemplateRef<any>;
}
