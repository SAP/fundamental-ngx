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
    ViewEncapsulation
} from '@angular/core';

import { CssClassBuilder, applyCssClass } from '../../utils/public_api';
import { RatingIndicatorOutput } from '../models/rate-indicator.output';
import { INDICATOR_RANGE, INDICATOR_PREFIX, INDICATOR_CLASSES, RatingIndicatorSize } from '../constants';

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
export class RatingIndicatorComponent implements OnInit, OnChanges, CssClassBuilder {
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
        if (isNaN(+value)) {
            this._indicatorTotal = 5;
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

    /**
     * Fired when the user sets or changes their rating.
     */
    @Output()
    ratingChanged = new EventEmitter<RatingIndicatorOutput>();

    /** @hidden */
    icons: { id: string; value: number }[] = [];
    /** @hidden */
    ratingItems: {
        rate: number;
        total: number;
    }[] = [];

    /** @hidden */
    private ratingUID = 0;
    /** @hidden */
    private _indicatorTotal = 5;
    /** @hidden */
    private _value = 0;
    /** @hidden */
    private _hideDynamicText = false;

    /** @hidden */
    constructor(private readonly _elementRef: ElementRef) { }

    /** @hidden */
    get viewRatingUID(): number {
        return this.ratingUID;
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
        ratingUID++;
        this.ratingUID = ratingUID;

        this._value = this._convertToValue();
        this.icons = this._getRates();
        this.buildComponentCssClass();
        this._generateRatings();
        this._renderIcon();
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
            this.icons = this._getRates();
            this.buildComponentCssClass();
        }
        if ('ratedIcon' in changes || 'unratedIcon' in changes) {
            this._renderIcon();
            this.buildComponentCssClass();
        }

        if ('ratings' in changes) {
            this._generateRatings();
        }
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
        this.ratingChanged.emit({ value: value });
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
    private _renderIcon(): void {
        if (!!this.ratedIcon) {
            this._elementRef.nativeElement.style.setProperty('custom-indicator-icon-rated', `${this.ratedIcon}`);
        }
        if (!!this.unratedIcon) {
            this._elementRef.nativeElement.style.setProperty('custom-indicator-icon-unrated', `${this.unratedIcon}`);
        }
    }

    /** @hidden */
    private _generateRatings(): void {
        if (this.ratings) {
            let sum = 0;
            let allVoites = 0;
            const items = [];

            for (const key in this.ratings) {
                if (+key < INDICATOR_RANGE.min || +key > INDICATOR_RANGE.max) {
                    continue;
                }
                if (this.ratings[key]) {
                    sum += +key * this.ratings[key];
                    allVoites += this.ratings[key];
                    items.push({
                        rate: +key,
                        total: this.ratings[key]
                    });
                }
            }
            this.ratingItems = items;
            this.ratingAverage = sum / allVoites * 10;
            this.totalRatings = allVoites;
            this._value = this._convertToValue();
        }

    }

    /** @hidden */
    private _convertToValue(): number {
        return this.value ? this._parseValue(+this.value) : this._parseValue(this.ratingAverage);
    }

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

    /** @hidden */
    private _getRates(): { id: string; value: number }[] {
        const withHalves = this.allowHalves ? 2 : 1;
        return Array(this.indicatorCount * withHalves)
            .fill(`rating-${ratingUID}`)
            .map((_name, index) => ({
                id: `${_name}-${index + 1}`,
                value: (index + 1) / withHalves
            }));
    }
}
