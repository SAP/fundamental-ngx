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
    ChangeDetectorRef,
    forwardRef
} from '@angular/core';
import { coerceNumberProperty } from '@angular/cdk/coercion';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import {
    INDICATOR_DEFAULT_CAPACITY,
    INDICATOR_PREFIX,
    INDICATOR_CLASSES,
    RatingIndicatorSize,
    RatingIndicatorSizeEnum
} from '../constants';
import { CssClassBuilder, applyCssClass } from '@fundamental-ngx/cdk/utils';
import { Nullable } from '@fundamental-ngx/cdk/utils';
import { registerFormItemControl, FormItemControl } from '@fundamental-ngx/core/form';

let ratingUID = 0;

interface NumberKey<T> {
    [key: number]: T;
}

interface RatingViewItem {
    rate: number;
    votes: number;
}

@Component({
    selector: 'fd-rating-indicator',
    templateUrl: './rating-indicator.component.html',
    styleUrls: ['./rating-indicator.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => RatingIndicatorComponent),
            multi: true
        },
        registerFormItemControl(RatingIndicatorComponent)
    ]
})
export class RatingIndicatorComponent
    implements OnInit, OnChanges, CssClassBuilder, ControlValueAccessor, FormItemControl
{
    /** User's custom classes */
    @Input()
    class: string;

    /** Sets [name] attribute of input. */
    @Input()
    name: string;

    /**
     * Sets the aria-label attribute to the element.
     */
    @Input()
    @HostBinding('attr.aria-label')
    ariaLabel: Nullable<string>;

    /**
     * Sets the aria-labelledby attribute to the element.
     */
    @Input()
    @HostBinding('attr.aria-label')
    ariaLabelledBy: Nullable<string>;

    /**
     * Sets the aria-disabled attribute to the element.
     * Sets the is-disabled class to the element.
     * Whether the rating indicator is disabled
     */
    @Input()
    @HostBinding('class.is-disabled')
    @HostBinding('attr.aria-disabled')
    disabled = false;

    /**
     * Sets the is-display-mode class to the element.
     * Whether the rating indicator is in displayMode
     */
    @Input()
    @HostBinding('class.is-display-mode')
    displayMode = false;

    /**
     * Number of rates to display
     */
    @Input()
    set indicatorCapacity(value: number) {
        const val = coerceNumberProperty(value, INDICATOR_DEFAULT_CAPACITY);
        this._indicatorCapacity = val < 1 ? INDICATOR_DEFAULT_CAPACITY : val;
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
    totalRatings: number;

    /**
     * Rating average
     */
    @Input()
    ratingAverage: number;

    /**
     * Object containing key-value pairs where the key is the rating and the value is the total sum of those ratings.
     * Overrides totalRatings and ratingAverage.
     */
    @Input()
    ratings: NumberKey<number>;

    /**
     * Whether or not to display the popover that shows the sum of each rating. Requires [ratings] object.
     */
    @Input()
    displayAllRatings = false;

    /**
     * Icon class for rated icon from fundamental-styles lib https://sap.github.io/fundamental-styles/?path=/docs/components-icon--sizes
     */
    @Input()
    ratedIcon: string;
    /**
     * Icon class for unrated icon from fundamental-styles lib https://sap.github.io/fundamental-styles/?path=/docs/components-icon--sizes
     */
    @Input()
    unratedIcon: string;

    /**
     * Possible values are 'xs', 'sm', 'md', 'lg', 'cozy', 'compact', 'condensed'
     */
    @Input()
    size: RatingIndicatorSize = 'md';

    /**
     * Text divider label between view value and indicator count.
     */
    @Input()
    dynamicTextIndicator = 'of';

    /**
     * Fired when the user sets or changes their rating.
     */
    @Output()
    ratingChanged = new EventEmitter<number>();

    /** @hidden */
    sizeClass = this._getSizeClass(this.size);
    /** @hidden */
    _rates: { id: string; value: number }[] = [];
    /** @hidden */
    _ratingItems: RatingViewItem[] = [];

    /** @hidden */
    private _ratingUID = ratingUID++;
    /** @hidden */
    private _indicatorCapacity = INDICATOR_DEFAULT_CAPACITY;
    /** @hidden */
    private _value = 0;
    /** @hidden */
    private _hideDynamicText = false;

    /** @hidden */
    constructor(public readonly elementRef: ElementRef, private readonly _changeDetectorRef: ChangeDetectorRef) {}
    /** @hidden */
    get viewRatingUID(): number {
        return this._ratingUID;
    }
    /** @hidden */
    get indicatorCount(): number {
        return this._indicatorCapacity;
    }
    /** @hidden */
    get viewValue(): number {
        return this._value;
    }

    /** @hidden */
    onChange: (value: number) => void = () => {};

    /** @hidden */
    onTouched = (): void => {};

    /** @hidden */
    ngOnInit(): void {
        this._value = this._convertToValue();
        this._rates = this._getRates();
        this.buildComponentCssClass();
        this._generateRatings();
    }

    /** @hidden */
    ngOnChanges(changes: SimpleChanges): void {
        if (
            'class' in changes ||
            'size' in changes ||
            'ratedIcon' in changes ||
            'unratedIcon' in changes ||
            'allowHalves' in changes
        ) {
            this.buildComponentCssClass();
        }
        if ('value' in changes) {
            this._value = this._convertToValue();
        }
        if ('indicatorCapacity' in changes) {
            this._rates = this._getRates();
        }
        if ('allowHalves' in changes) {
            this._value = this._convertToValue();
            this._rates = this._getRates();
        }

        if ('ratings' in changes) {
            this._generateRatings();
        }
    }

    /** @hidden */
    writeValue(value: number): void {
        this._value = this._parseValue(value);
        this._changeDetectorRef.markForCheck();
    }

    /** @hidden */
    registerOnChange(fn: (value: number) => void): void {
        this.onChange = fn;
    }

    /** @hidden */
    registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }
    /** @hidden */
    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    /** @hidden */
    trackByFn(index: number, item: { id: string; value: number }): number | string {
        return item.id;
    }

    /** @hidden */
    onSelect(value: number): void {
        this.value = this._value = value;
        this.onChange(value);
        this.onTouched();
        this.ratingChanged.emit(value);
    }

    /** @hidden
     * CssClassBuilder interface implementation
     * function must return single string
     * function is responsible for order which css classes are applied
     */
    @applyCssClass
    buildComponentCssClass(): string[] {
        this.sizeClass = this._getSizeClass(this.size);

        return [
            INDICATOR_PREFIX,
            this.sizeClass,
            this.allowHalves ? INDICATOR_CLASSES.halves : '',
            !!this.ratedIcon && !!this.unratedIcon ? INDICATOR_CLASSES.icon : '',
            this._hideDynamicText || !this._value ? INDICATOR_CLASSES.hideDynamicText : '',
            this.class
        ];
    }

    /**
     * @hidden
     * Generate rating items for popover content if rating object was defined
     */
    private _generateRatings(): void {
        if (!this.ratings) {
            return;
        }
        const ratings = Object.entries(this.ratings)
            .filter(([rate, vote]) => {
                const _rate = +rate;
                return !isNaN(_rate) && !isNaN(+vote) && _rate > 0;
            })
            .map(([rate, votes]) => ({ rate: +rate, votes }));
        if (ratings.length === 0) {
            return;
        }
        const { totalVotes, totalRating } = ratings.reduce(
            (total, rating) => ({
                totalVotes: total.totalVotes + rating.votes,
                totalRating: total.totalRating + rating.rate * rating.votes
            }),
            { totalVotes: 0, totalRating: 0 }
        );

        this._ratingItems = ratings;
        this.ratingAverage = totalRating / totalVotes;
        this.totalRatings = totalVotes;
        this._value = this._convertToValue();
    }
    /**
     * @hidden
     * get converted viewValue for render in component template from original value if it still exists, or ratingAverage.
     */
    private _convertToValue(): number {
        return this._parseValue(this.value || this.ratingAverage);
    }
    /**
     * @hidden
     * get converted value from original to view value with depends on halves
     * For example,
     *  original value is equal to 2.34, you will get and render 2
     *  original value is equal to 3.74, you will get and render 4
     */
    private _parseValue(value: number): number {
        if (!value || value === 0) {
            return 0;
        }
        const integer = Math.floor(value);
        const fractional = value % 1;
        let v = integer;

        if (this.allowHalves && fractional > 0.25 && fractional <= 0.5) {
            v = integer + 0.5;
        } else if (fractional > 0.5) {
            v = integer + 1;
        }

        return Math.min(this.indicatorCount, v);
    }
    /**
     * @hidden
     * get rating icons array with value and unic id
     */
    private _getRates(): { id: string; value: number }[] {
        const withHalves = this.allowHalves ? 2 : 1;
        return Array(this.indicatorCount * withHalves)
            .fill(`rating-${this._ratingUID}`)
            .map((name, index) => ({
                id: `${name}-${index + 1}`,
                value: (index + 1) / withHalves
            }));
    }

    /**
     * @hidden
     * get rating icons array with value and unic id
     */
    private _getSizeClass(size: RatingIndicatorSize): string {
        return `${INDICATOR_PREFIX}--${size in RatingIndicatorSizeEnum ? size : 'md'}`;
    }
}
