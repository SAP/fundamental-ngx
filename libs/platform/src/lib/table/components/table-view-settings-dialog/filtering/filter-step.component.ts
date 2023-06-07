import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    forwardRef,
    Input,
    Output,
    TemplateRef,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';

import { ContentDensity } from '@fundamental-ngx/cdk/utils';
import { CollectionFilter, FILTER_STRATEGY, FilterType } from '@fundamental-ngx/platform/table-helpers';

import { TableViewSettingsFilterComponent } from '../table-view-settings-filter.component';
import { FiltersViewStep, FILTERS_VIEW_STEP_TOKEN } from './filters-active-step';

/**
 * Filter dialog step.
 *
 * Used to render selected filter options.
 *
 */

@Component({
    selector: 'fdp-filter-step',
    templateUrl: './filter-step.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    /** Each filters dialog step must provide FILTERS_VIEW_STEP_TOKEN to be accessible */
    providers: [{ provide: FILTERS_VIEW_STEP_TOKEN, useExisting: forwardRef(() => FilterStepComponent) }]
})
export class FilterStepComponent implements FiltersViewStep {
    /** ViewSettingsFilter options the filter is created from */
    @Input()
    filter: TableViewSettingsFilterComponent;

    /** Column key to apply this filter to */
    @Input()
    columnKey: string;

    /** Table's content density to be used */
    @Input()
    contentDensity: ContentDensity;

    /** The current filter model */
    @Input()
    set filterBy(filterByList: CollectionFilter[]) {
        this._filterBy = filterByList.find(({ field }) => field === this.columnKey);
    }

    /** Go back event */
    @Output()
    back: EventEmitter<void> = new EventEmitter<void>();

    /** Filter model change event */
    @Output()
    valueChange: EventEmitter<CollectionFilter> = new EventEmitter<CollectionFilter>();

    /** Template ref to the filter title */
    @ViewChild('titleTemplate')
    titleTemplateRef: TemplateRef<any>;

    /** Template ref to the filter body */
    @ViewChild('bodyTemplate')
    bodyTemplateRef: TemplateRef<any>;

    /** @hidden */
    readonly FILTER_TYPE = FilterType;

    /** @hidden */
    _filterBy?: CollectionFilter;

    /** @hidden */
    _onFilterValueChange(filterValue: any): void {
        const filterBy: CollectionFilter = this._filterBy || {
            field: this.columnKey,
            value: null,
            strategy: FILTER_STRATEGY.EQ,
            exclude: false
        };

        const newFilterBy = { ...filterBy, value: filterValue };

        this.valueChange.emit(newFilterBy);
    }
}
