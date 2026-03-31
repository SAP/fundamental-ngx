import {
    afterEveryRender,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    inject,
    Input,
    Output
} from '@angular/core';
import { CollectionFilter } from '@fundamental-ngx/platform/table-helpers';

import { NgTemplateOutlet } from '@angular/common';
import {
    ContentDensityMode,
    ContentDensityObserver,
    contentDensityObserverProviders
} from '@fundamental-ngx/core/content-density';
import { TableViewSettingsFilterComponent } from '../table-view-settings-filter.component';

/**
 * Custom Select filter type.
 *
 * Used to render user's custom filter template
 *
 */

@Component({
    selector: 'fdp-filter-custom',
    templateUrl: './filter-custom.component.html',
    // afterEveryRender is used to detect mutations on the _value object after each render cycle.
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [contentDensityObserverProviders()],
    imports: [NgTemplateOutlet]
})
export class FilterCustomComponent {
    /** ViewSettingsFilter options the filter is created from */
    @Input()
    filter: TableViewSettingsFilterComponent;

    /** The filter model */
    @Input()
    set filterBy(filterBy: CollectionFilter | undefined) {
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

    /** Content Density, comes from table injector */
    get contentDensity(): ContentDensityMode {
        return this.contentDensityObserver.value;
    }
    /**
     * @hidden
     * Currently selected value
     */
    _value: Record<string, any>;

    /**
     * @hidden
     * Last emitted value
     */
    _valueLastEmitted: Record<string, any>;

    /** @hidden */
    private readonly _cdr = inject(ChangeDetectorRef);

    /** @hidden */
    constructor(private contentDensityObserver: ContentDensityObserver) {
        afterEveryRender(() => this._checkValueChanges());
    }

    /** @hidden */
    _checkValueChanges(): void {
        try {
            if (JSON.stringify(this._value) === JSON.stringify(this._valueLastEmitted)) {
                return;
            }

            this._valueLastEmitted = { ...this._value };

            this.valueChange.emit(this._value);
            this._cdr.markForCheck();
        } catch {}
    }
}
