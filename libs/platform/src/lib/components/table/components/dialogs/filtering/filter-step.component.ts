import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    forwardRef,
    Input,
    Output,
    TemplateRef,
    ViewChild
} from '@angular/core';

import { FilterType } from '../../../enums';
import { CollectionFilter } from '../../../interfaces';
import { TableViewSettingsFilterComponent } from '../../table-view-settings-filter/table-view-settings-filter.component';
import { FiltersViewStep, FILTERS_VIEW_STEP_TOKEN } from './filters-active-step';

@Component({
    selector: 'fdp-filter-step',
    templateUrl: './filter-step.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [{ provide: FILTERS_VIEW_STEP_TOKEN, useExisting: forwardRef(() => FilterStepComponent) }]
})
export class FilterStepComponent implements FiltersViewStep {
    @Input()
    filter: TableViewSettingsFilterComponent;

    @Input()
    columnKey: string;

    @Input()
    set filterBy(filterByList: CollectionFilter[]) {
        this._filterBy = filterByList.find(({ field }) => field === this.columnKey);
    }

    @Output()
    back: EventEmitter<void> = new EventEmitter<void>();

    @Output()
    valueChange: EventEmitter<CollectionFilter> = new EventEmitter<CollectionFilter>();

    @ViewChild('titleTemplate')
    titleTemplateRef: TemplateRef<any>;

    @ViewChild('bodyTemplate')
    bodyTemplateRef: TemplateRef<any>;

    /** @hidden */
    readonly FILTER_TYPE = FilterType;

    /** @hidden */
    _filterBy: CollectionFilter;

    /** @hidden */
    _onFilterValueChange(filterValue: any): void {
        const filterBy: CollectionFilter = this._filterBy || { field: this.columnKey, value: null, strategy: null };

        const newFilterBy = { ...filterBy, value: filterValue };

        this.valueChange.emit(newFilterBy);
    }
}
