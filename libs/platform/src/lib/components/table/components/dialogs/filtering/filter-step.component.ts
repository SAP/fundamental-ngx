import { Component, EventEmitter, Input, Output } from '@angular/core';

import { FilterType } from '../../../enums';
import { CollectionFilter } from '../../../interfaces';
import { TableViewSettingsFilterComponent } from '../../table-view-settings-filter/table-view-settings-filter.component';

@Component({
    selector: 'fdp-filter-step',
    templateUrl: './filter-step.component.html'
})
export class FilterStepComponent {
    @Input()
    filter: TableViewSettingsFilterComponent;

    @Input()
    set filterBy(filterByList: CollectionFilter[]) {
        const field = this.filter?.column;
        this._filterBy = filterByList.find((filterBy) => filterBy.field === field);
    }

    @Output()
    confirm: EventEmitter<CollectionFilter> = new EventEmitter<CollectionFilter>();

    @Output()
    cancel: EventEmitter<void> = new EventEmitter<void>();

    @Output()
    back: EventEmitter<void> = new EventEmitter<void>();

    @Output()
    valueChange: EventEmitter<CollectionFilter> = new EventEmitter<CollectionFilter>();

    /** @hidden */
    readonly FILTER_TYPE = FilterType;

    /** @hidden */
    _filterBy: CollectionFilter;

    /** @hidden */
    _onFilterValueChange(filterValue: any): void {
        const filterBy = this._filterBy || { field: this.filter.column };

        const newFilterBy = { ...filterBy, value: filterValue };

        this.valueChange.emit(newFilterBy);
    }
}
