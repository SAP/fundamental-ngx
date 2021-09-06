import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, DoCheck } from '@angular/core';

import { CollectionSelectFilter } from '../../../interfaces/collection-filter.interface';
import { TableViewSettingsFilterComponent } from '../../table-view-settings-dialog/table-view-settings-filter.component';

/**
 * Custom Select filter type.
 *
 * Used to render user's custom filter template
 *
 */

@Component({
    selector: 'fdp-filter-custom',
    templateUrl: './filter-custom.component.html',
    // Keep it "Default" intentionally to run ngDoCheck when child template emits changes
    changeDetection: ChangeDetectionStrategy.Default
})
export class FilterCustomComponent implements DoCheck {
    /** ViewSettingsFilter options the filter is created from */
    @Input()
    filter: TableViewSettingsFilterComponent;

    /** The filter model */
    @Input()
    set filterBy(filterBy: CollectionSelectFilter) {
        if (!filterBy?.value || Object.prototype.toString.call(filterBy?.value) !== '[object Object]') {
            // force value to be an object
            this._value = {};
        } else {
            this._value = { ...filterBy.value };
        }

        this._valueLastEmitted = { ...this._value };
    }

    /** Filter model change event */
    @Output()
    valueChange: EventEmitter<unknown> = new EventEmitter<unknown>();

    /**
     * @hidden
     * Currently selected value
     */
    _value: object;

    /**
     * @hidden
     * Last emitted value
     */
    _valueLastEmitted: object;

    /** @hidden */
    ngDoCheck(): void {
        try {
            // Didn't find a better way to catch changes in the custom template
            if (JSON.stringify(this._value) === JSON.stringify(this._valueLastEmitted)) {
                return;
            }

            this._valueLastEmitted = { ...this._value };

            this.valueChange.emit(this._value);
        } catch (e) {}
    }
}
