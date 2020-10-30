import {
    Component,
    OnInit,
    OnChanges,
    Input,
    Output,
    EventEmitter,
    ElementRef,
    ChangeDetectionStrategy,
    SimpleChanges,
    HostBinding,
    ViewEncapsulation,
    ViewChild,
    OnDestroy,
    ChangeDetectorRef
} from '@angular/core';
import { ENTER, SPACE, LEFT_ARROW, RIGHT_ARROW } from '@angular/cdk/keycodes';
import { Subject, Subscription } from 'rxjs';
import { distinctUntilChanged, debounceTime, tap } from 'rxjs/operators';
import { PopperOptions } from 'popper.js';

import { CssClassBuilder, applyCssClass, KeyUtil } from '../../utils/public_api';
import { PopoverComponent } from '../../popover/popover.component';
import { INDICATOR_DEFAULT_TOTAL, INDICATOR_RANGE, INDICATOR_PREFIX, INDICATOR_CLASSES, RatingIndicatorSize } from '../constants';

let ratingUID = 0;

interface NumberKey<T> {
    [key: number]: T;
}

@Component({
    selector: 'fd-rating-indicator',
    templateUrl: './rating-indicator.component.html',
    styleUrls: [
        './rating-indicator.component.scss',
        /*
        * NOTE: Will be remove this style after merge PR with fix for this issue:
        * Issue link: https://github.com/SAP/fundamental-styles/issues/1753
        * PR link: https://github.com/SAP/fundamental-styles/pull/1782
        */
        './rating-indicator.css'
    ],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RatingIndicatorComponent implements OnInit, OnChanges, OnDestroy, CssClassBuilder {
    /** User's custom classes */
    @Input()
    class: string;

    /** User's aria-label attr */
    @Input()
    @HostBinding('attr.aria-label')
    ariaLabel: string;

    /**
     * Whether the rating indicator is disabled
     */
    @Input()
    @HostBinding('class.is-disabled')
    @HostBinding('attr.aria-disabled')
    @HostBinding('attr.disable')
    disabled = false;

    /**
     *
     * Whether the rating indicator is in displayMode
     */
    @Input()
    @HostBinding('class.is-display-mode')
    displayMode = false;

    /**
     * Number of stars/icons/images to display. Max value is 7 and min valud is 3
     */
    @Input()
    set indicatorTotal(value: number) {
        if (isNaN(value)) {
            this._indicatorTotal = INDICATOR_DEFAULT_TOTAL;
        } else {
            this._indicatorTotal = Math.max(INDICATOR_RANGE.min, Math.min(INDICATOR_RANGE.max, +value));
        }
    }

    /**
     * Whether or not to display half values.
     */
    @Input()
    allowHalves = false;

    /**
     * User's value number of ratings. If provided, Overrides ratingAverage.
     */
    @Input()
    value = 0;

    /**
     * Total number of ratings. If provided, will display text showing the total number of ratings.
     */
    @Input()
    totalRatings: number | null = null;

    /**
     * Rating average
     */
    @Input()
    ratingAverage: number | null = null;

    /**
     * Object containing key-value pairs where the key is the rating and the value is the total sum of those ratings.
     * Overrides totalRatings and ratingAverage.
     */
    @Input()
    ratings: NumberKey<number> | null = null;

    /**
     * Whether or not to display the popover that shows the sum of each rating. Requires [ratings] object.
     */
    @Input()
    displaySumPopover = false;

    /**
     * Icon class from fundamental-styles lib https://sap.github.io/fundamental-styles/?path=/docs/components-icon--sizes
     */
    @Input()
    ratedIcon: string | null = null;

    @Input()
    unratedIcon: string | null = null;

    /**
     * Possible values are 'xs', 'sm', 'md', 'lg', 'cozy', 'compact', 'condensed'
     */
    @Input()
    size: RatingIndicatorSize = 'md';

    @Input()
    dynamicTextIndicator = 'of';

    @Input()
    navigationNote = 'Please press enter/space for the vote.';

    /**
     * Fired when the user sets or changes their rating.
     */
    @Output()
    ratingChanged = new EventEmitter<number>();

    /** @hidden */
    @ViewChild(PopoverComponent, { static: false })
    navigationArrowNote: PopoverComponent;

    /** @hidden */
    $navigationArrowNote = new Subject();
    /** @hidden */
    _icons: { id: string; value: number }[] = [];
    /** @hidden */
    _ratingItems: {
        rate: number;
        total: number;
    }[] = [];

    /** @hidden */
    private _ratingUID = ratingUID++;
    /** @hidden */
    private _indicatorTotal = INDICATOR_DEFAULT_TOTAL;
    /** @hidden */
    private _value = 0;
    /** @hidden */
    private _hideDynamicText = false;
    /** @hidden */
    private _navigationArrowNoteSub: Subscription;

    /** @hidden */
    constructor(
        private readonly _elementRef: ElementRef,
        private readonly _cdr: ChangeDetectorRef
    ) { }

    /** @hidden */
    get _arrowNavigationOptions(): PopperOptions {
        return {
            placement: 'top-end'
        };
    };
    /** @hidden */
    get viewRatingUID(): number {
        return this._ratingUID;
    }
    /** @hidden */
    get indicatorCount(): number {
        return this._indicatorTotal;
    }
    /** @hidden */
    get viewValue(): number {
        return this._value;
    }

    /** @hidden */
    ngOnInit(): void {
        this._value = this._convertToValue();
        this._icons = this._getRates();
        this.buildComponentCssClass();
        this._generateRatings();
        this._navigationArrowNoteSub = this.$navigationArrowNote.pipe(
            debounceTime(100),
            distinctUntilChanged(),
            tap({
                next: (state: boolean) => {
                    if (!state) {
                        this.navigationArrowNote.close();
                        this._cdr.detectChanges();
                    }

                }
            })
        ).subscribe();
    }

    /** @hidden */
    ngOnChanges(changes: SimpleChanges): void {
        if ('class' in changes || 'size' in changes) {
            this.buildComponentCssClass();
        }
        if ('value' in changes) {
            this._value = this._convertToValue();
        }
        if ('indicatorTotal' in changes || 'allowHalves' in changes) {
            this._value = this._convertToValue();
            this._icons = this._getRates();
            this.buildComponentCssClass();
        }
        if ('ratedIcon' in changes || 'unratedIcon' in changes) {
            this.buildComponentCssClass();
        }

        if ('ratings' in changes) {
            this._generateRatings();
        }
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._navigationArrowNoteSub.unsubscribe();
    }

    /** @hidden */
    trackByFn(index: number, item: { id: string; value: number }): number | string {
        if (item.id) {
            return item.id;
        }

        return index;
    }

    /** @hidden */
    onSelect(value: number): void {
        this.value = this._value = value;
        this.navigationArrowNote.close();
        this.ratingChanged.emit(value);
    }

    /** @hidden */
    elementRef(): ElementRef<RatingIndicatorComponent> {
        return this._elementRef;
    }

    @applyCssClass
    /** CssClassBuilder interface implementation
     * function must return single string
     * function is responsible for order which css classes are applied
     */
    buildComponentCssClass(): string[] {
        return [
            INDICATOR_PREFIX,
            `${INDICATOR_PREFIX}--${this.size}`,
            this.allowHalves ? INDICATOR_CLASSES.halves : '',
            !!this.ratedIcon && !!this.unratedIcon ? INDICATOR_CLASSES.icon : '',
            this._hideDynamicText || !this._value ? INDICATOR_CLASSES.hideDynamicText : '',
            this.class
        ];
    }
/** @hidden */
    onFocus(): void {
        this.$navigationArrowNote.next(true);
    }
/** @hidden */
    onBlur(): void {
        this.$navigationArrowNote.next(false);
    }

    onKeydown(event: KeyboardEvent, rateValue: number): void {
        if (KeyUtil.isKeyCode(event, [LEFT_ARROW, RIGHT_ARROW])) {
            this.navigationArrowNote.open();
        }
        if (KeyUtil.isKeyCode(event, [ENTER, SPACE])) {
            this.onSelect(rateValue);
        }
    }

    /** @hidden */
    private _generateRatings(): void {
        if (!this.ratings) {
            return;
        }
        const ratings = Object.entries(this.ratings);
        // simple validation for input rating's data
        const isValid = ratings.some(([key, value]) => !isNaN(+key) && !isNaN(+value));
        if (!isValid) {
            return;
        }
        let sum = 0;
        let allVotes = 0;

        const items = ratings
            .filter(([key]) => key)
            .reduce((acc, [key, votes]) => {
                const _key = +key;
                if (_key < 0 || _key > INDICATOR_RANGE.max) {
                    return acc;
                }
                sum += _key * votes;
                allVotes += votes;
                acc.push({
                    rate: _key,
                    total: votes
                });

                return acc;
            }, []);

        this._ratingItems = items;
        this.ratingAverage = sum / allVotes;
        this.totalRatings = allVotes;
        this._value = this._convertToValue();
    }
/**
 * get converted viewValue for render in component template from original value if it still exist, or ratingAverage.
 */
    /** @hidden */
    private _convertToValue(): number {
        return this.value ? this._parseValue(+this.value) : this._parseValue(this.ratingAverage);
    }
/**
 * get converted value from original to view value with depends on halves
 * For example,
 *  original value is equal to 2.34, you will get and render 2
 *  original value is equal to 3.74, you will get and render 4
 */
    /** @hidden */
    private _parseValue(value: number): number {
        if (value === 0) {
            return 0;
        }
        const integer = Math.floor(value);
        const fractional = Math.round(+value * 10) / 10 - Math.floor(value);
        let v = integer;

        if (this.allowHalves && fractional > 0.25 && fractional <= 0.5) {
            v = integer + 0.5;
        } else if (fractional > 0.5) {
            v = integer + 1;
        }

        return Math.min(this.indicatorCount, v);
    }
/**
 * get rating icons array with value and unic id
 */
    /** @hidden */
    private _getRates(): { id: string; value: number }[] {
        const withHalves = this.allowHalves ? 2 : 1;
        return Array(this.indicatorCount * withHalves)
            .fill(`rating-${this._ratingUID}`)
            .map((_name, index) => ({
                id: `${_name}-${index + 1}`,
                value: (index + 1) / withHalves
            }));
    }
}
