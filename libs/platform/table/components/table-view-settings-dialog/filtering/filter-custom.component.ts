import {
    afterEveryRender,
    afterNextRender,
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    inject,
    Injector,
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
export class FilterCustomComponent implements AfterViewInit {
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
    private readonly _elementRef = inject(ElementRef);

    /** @hidden */
    private readonly _injector = inject(Injector);

    /** @hidden */
    constructor(private contentDensityObserver: ContentDensityObserver) {
        afterEveryRender(() => this._checkValueChanges());
    }

    /** @hidden */
    ngAfterViewInit(): void {
        const focusableSelectors = [
            'input:not([disabled])',
            'select:not([disabled])',
            'textarea:not([disabled])',
            'button:not([disabled])',
            'a[href]',
            '[tabindex]:not([tabindex="-1"])'
        ].join(', ');

        afterNextRender(
            () => {
                const firstFocusable: HTMLElement = this._elementRef.nativeElement.querySelector(focusableSelectors);
                if (
                    !firstFocusable ||
                    firstFocusable.style.display === 'none' ||
                    firstFocusable.style.visibility === 'hidden' ||
                    firstFocusable.style.opacity === '0'
                ) {
                    return;
                }

                const dialog = this._elementRef.nativeElement.closest('fd-dialog, [fd-dialog]');
                if (!dialog) {
                    return;
                }

                const dialogRect = dialog.getBoundingClientRect();
                const elementRect = firstFocusable.getBoundingClientRect();
                const isWithinBounds =
                    elementRect.top >= dialogRect.top &&
                    elementRect.left >= dialogRect.left &&
                    elementRect.bottom <= dialogRect.bottom &&
                    elementRect.right <= dialogRect.right;

                if (isWithinBounds) {
                    firstFocusable.focus();
                }
            },
            { injector: this._injector }
        );
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
