import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, DoCheck } from '@angular/core';

import { CollectionSelectFilter } from '../../../interfaces';
import { TableViewSettingsFilterComponent } from '../../table-view-settings-filter/table-view-settings-filter.component';

@Component({
    selector: 'fdp-filter-custom',
    templateUrl: './filter-custom.component.html',
    // Keep it "Default" intentionally to run ngDoCheck when child template emits changes
    changeDetection: ChangeDetectionStrategy.Default
})
export class FilterCustomComponent implements DoCheck {
    @Input()
    filter: TableViewSettingsFilterComponent;

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

    @Output()
    valueChange: EventEmitter<unknown> = new EventEmitter<unknown>();

    /** @hidden */
    _value: object;

    /** @hidden */
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
