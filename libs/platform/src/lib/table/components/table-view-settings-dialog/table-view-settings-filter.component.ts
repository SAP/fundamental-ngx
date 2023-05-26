import { ChangeDetectionStrategy, Component, ContentChild, Input, TemplateRef, ViewEncapsulation } from '@angular/core';

import { TableFilterSelectOption } from '../../interfaces/selection-value.interface';
import { FilterType } from '../../enums/filter-type.enum';
import { FdpViewSettingsFilterCustomDef } from '../../directives/table-view-settings-filter-custom.directive';

/**
 * View settings dialog filter component.
 *
 * ```html
 * <!-- With custom form -->
 * <fdp-table-view-settings-filter
 *     column="name"
 *     label="Name"
 *     type="custom">
 *         <ng-container *fdpViewSettingsFilterCustomDef="let model">
 *             <label>Enter name:</label>
 *             <fdp-input type="text" name="name" [(ngModel)]="model.name"></fdp-input>
 *         </ng-container>
 * </fdp-table-view-settings-filter>
 *
 * <!-- Single select -->
 * <fdp-table-view-settings-filter
 *     column="status"
 *     label="Status"
 *     type="single-select"
 *     values="[{value: 'OUT_OF_STOCK', label: 'Out of stock'}, { value: 'AVAILABLE', label: 'Available'}]">
 * </fdp-table-view-settings-filter>
 * ```
 *
 * */
@Component({
    selector: 'fdp-table-view-settings-filter',
    template: '',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class TableViewSettingsFilterComponent {
    /** Table column name on which to filter. */
    @Input()
    column: string;

    /** Label for the column. */
    @Input()
    label: string;

    /**
     * Type of filter interface.
     * @type {'single-select' | 'multi-select' | 'custom' 'category'}
     */
    @Input()
    type: FilterType;

    /** Selection values for 'single-select' or 'multi-select' filter types. */
    @Input()
    values: TableFilterSelectOption[];

    /** Custom filter template directive reference */
    customFilterTemplate: TemplateRef<any>;

    /** @hidden */
    @ContentChild(FdpViewSettingsFilterCustomDef)
    set _filterCustomDef(filterCustomDef: FdpViewSettingsFilterCustomDef) {
        this.customFilterTemplate = filterCustomDef?.templateRef;
    }
}
