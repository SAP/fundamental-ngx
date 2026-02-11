import { coerceNumberProperty } from '@angular/cdk/coercion';
import { NgTemplateOutlet } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    ViewEncapsulation,
    booleanAttribute,
    computed,
    effect,
    forwardRef,
    inject,
    input,
    output,
    signal
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { HasElementRef } from '@fundamental-ngx/cdk/utils';
import { FormItemControl, registerFormItemControl } from '@fundamental-ngx/core/form';
import { PopoverComponent, PopoverTriggerDirective } from '@fundamental-ngx/core/popover';
import { FD_LANGUAGE, FdLanguage, FdTranslatePipe } from '@fundamental-ngx/i18n';
import { Observable } from 'rxjs';
import {
    INDICATOR_CLASSES,
    INDICATOR_DEFAULT_CAPACITY,
    INDICATOR_PREFIX,
    RatingIndicatorSize,
    RatingIndicatorSizeEnum
} from '../constants';
import { RatingStarLabelPipe } from '../pipes/rating-star-label.pipe';

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
    styleUrl: './rating-indicator.component.scss',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => RatingIndicatorComponent),
            multi: true
        },
        registerFormItemControl(RatingIndicatorComponent)
    ],
    imports: [NgTemplateOutlet, PopoverTriggerDirective, PopoverComponent, RatingStarLabelPipe, FdTranslatePipe],
    host: {
        '[class]': 'cssClass()',
        '[attr.aria-label]': 'ariaLabel()',
        '[attr.aria-labelledby]': 'ariaLabelledBy()',
        '[attr.disabled]': 'disabled()'
    }
})
export class RatingIndicatorComponent implements ControlValueAccessor, FormItemControl, HasElementRef {
    /** Sets [name] attribute of input. */
    readonly name = input<string>();

    /**
     * Sets the aria-label attribute to the element.
     */
    readonly ariaLabel = input<string | null>();

    /**
     * Sets the aria-labelledby attribute to the element.
     */
    readonly ariaLabelledBy = input<string | null | undefined>();

    /**
     * Sets the aria-roledescription attribute to the element.
     */
    readonly ariaRoledescription = input<string | null | undefined>();

    /**
     * Input for disabled state from parent component.
     * Sets the aria-disabled attribute to the element.
     * Sets the is-disabled class to the element.
     */
    readonly disabled = input(false, { transform: booleanAttribute });

    /**
     * Whether the rating indicator is in displayMode
     */
    readonly displayMode = input(false, { transform: booleanAttribute });

    /**
     * Whether the rating indicator is in non-interactive state.
     */
    readonly nonInteractive = input(false, { transform: booleanAttribute });

    /**
     * Number of rates to display
     */
    readonly indicatorCapacity = input(INDICATOR_DEFAULT_CAPACITY, {
        transform: (value: number) => {
            const val = coerceNumberProperty(value, INDICATOR_DEFAULT_CAPACITY);
            return val < 1 ? INDICATOR_DEFAULT_CAPACITY : val;
        }
    });

    /**
     * Whether or not to display half values.
     */
    readonly allowHalves = input(false, { transform: booleanAttribute });

    /**
     * User's value number of ratings. If provided, Overrides ratingAverage.
     */
    readonly value = input(0);

    /**
     * Total number of ratings. If provided, will display text showing the total number of ratings.
     */
    readonly totalRatings = input<number | undefined | null>(undefined);

    /**
     * Rating average
     */
    readonly ratingAverage = input<number | undefined | null>(undefined);

    /**
     * Object containing key-value pairs where the key is the rating and the value is the total sum of those ratings.
     * Overrides totalRatings and ratingAverage.
     */
    readonly ratings = input<NumberKey<number> | undefined | null>(undefined);

    /**
     * Whether or not to display the popover that shows the sum of each rating. Requires [ratings] object.
     */
    readonly displayAllRatings = input(false, { transform: booleanAttribute });

    /**
     * Icon class for rated icon from fundamental-styles lib https://sap.github.io/fundamental-styles/?path=/docs/components-icon--sizes
     */
    readonly ratedIcon = input<string | undefined>(undefined);

    /**
     * Icon class for unrated icon from fundamental-styles lib https://sap.github.io/fundamental-styles/?path=/docs/components-icon--sizes
     */
    readonly unratedIcon = input<string | undefined>(undefined);

    /**
     * Possible values are 'xs', 'sm', 'md', 'lg', 'cozy', 'compact', 'condensed'
     */
    readonly size = input<RatingIndicatorSize>('md');

    /**
     * Text divider label between view value and indicator count.
     */
    readonly dynamicTextIndicator = input('of');

    /**
     * Whether to display the dynamic text (rating value and count) after the rating indicator.
     * When false, only the star rating UI is shown without any text.
     */
    readonly showDynamicText = input(true, { transform: booleanAttribute });

    /**
     * Fired when the user sets or changes their rating.
     */
    readonly ratingChanged = output<number>();

    /** @hidden */
    readonly elementRef = inject(ElementRef<HTMLElement>);

    /** Computed display value - returns the current internal value */
    readonly displayValue = computed(() => this.internalValue());

    /** @hidden Current language signal for i18n */
    protected readonly language = toSignal(inject<Observable<FdLanguage>>(FD_LANGUAGE), {
        initialValue: {} as FdLanguage
    });

    /** @hidden Internal mutable value for CVA and computed display value */
    protected readonly internalValue = signal(0);

    /**
     * Internal mutable disabled state.
     * Allows ControlValueAccessor to modify disabled state independently of input.
     */
    protected readonly internalDisabled = signal(false);

    /** @hidden Internal total ratings for computed state */
    protected readonly internalTotalRatings = signal<number | undefined | null>(undefined);

    /** @hidden Internal rating average for computed state */
    protected readonly internalRatingAverage = signal<number | undefined | null>(undefined);

    /** @hidden Rating items for popover content */
    protected readonly ratingItems = signal<RatingViewItem[]>([]);

    /** @hidden Unique ID for this rating indicator instance */
    protected readonly ratingUID = ratingUID++;

    /** @hidden Computed size class based on size input */
    protected readonly sizeClass = computed(() => this._getSizeClass(this.size()));

    /** @hidden Computed rates array based on capacity and halves setting */
    protected readonly rates = computed(() => this._getRates());

    /** @hidden Computed signal to determine if dynamic text should be hidden */
    protected readonly hideDynamicText = computed(() => {
        const value = this.displayValue();
        const totalRatings = this.computedTotalRatings;
        // Only hide if value is 0 AND we don't have total ratings to show
        return !value && (totalRatings === undefined || totalRatings === null);
    });

    /** @hidden Computed CSS classes for host binding */
    protected readonly cssClass = computed(() => {
        const classes: string[] = [
            INDICATOR_PREFIX,
            this.sizeClass(),
            this.allowHalves() ? INDICATOR_CLASSES.halves : '',
            this.ratedIcon() && this.unratedIcon() ? INDICATOR_CLASSES.icon : '',
            this.hideDynamicText() ? INDICATOR_CLASSES.hideDynamicText : '',
            this.disabled() || this.internalDisabled() ? 'is-disabled' : '',
            this.displayMode() ? 'fd-rating-indicator--display-mode' : '',
            this.nonInteractive() ? 'fd-rating-indicator--non-interactive' : ''
        ];
        return classes.filter(Boolean).join(' ');
    });

    /** @hidden */
    constructor() {
        // Sync ratings input with internal state
        effect(() => {
            const ratingsInput = this.ratings();
            if (ratingsInput) {
                this._generateRatings(ratingsInput);
            }
        });

        // Initialize internalValue from inputs once, then let CVA handle updates
        let initialized = false;
        effect(() => {
            // Only run once for initialization
            if (initialized) {
                return;
            }

            // Read all potential sources
            const inputValue = this.value();
            const internalAvg = this.internalRatingAverage();
            const avgValue = this.ratingAverage();

            // Determine source value with proper priority
            let sourceValue = 0;
            if (inputValue && inputValue !== 0) {
                sourceValue = inputValue;
            } else if (internalAvg !== undefined && internalAvg !== null) {
                sourceValue = internalAvg;
            } else if (avgValue !== undefined && avgValue !== null) {
                sourceValue = avgValue;
            }

            const parsedValue = this._parseValue(sourceValue);
            this.internalValue.set(parsedValue);
            initialized = true;
        });
    }

    /** @hidden CVA onChange callback */
    onChange: (value: number) => void = () => {};

    /** @hidden CVA onTouched callback */
    onTouched = (): void => {};

    /**
     * @deprecated Use `displayValue()` signal directly instead
     * @hidden Backward compatibility getter
     */
    get viewValue(): number {
        return this.displayValue();
    }

    /**
     * @deprecated Use `ratingUID` property directly instead
     * @hidden Backward compatibility getter
     */
    get viewRatingUID(): number {
        return this.ratingUID;
    }

    /**
     * @deprecated Use `indicatorCapacity()` signal directly instead
     * @hidden Backward compatibility getter
     */
    get indicatorCount(): number {
        return this.indicatorCapacity();
    }

    /** Public getter for computed rating average value. */
    get computedRatingAverage(): number | undefined | null {
        return this.internalRatingAverage() ?? this.ratingAverage();
    }

    /** Public getter for computed total ratings value. */
    get computedTotalRatings(): number | undefined | null {
        return this.internalTotalRatings() ?? this.totalRatings();
    }

    /** @hidden CVA writeValue - updates internal value signal */
    writeValue(value: number): void {
        this.internalValue.set(this._parseValue(value));
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
        this.internalDisabled.set(isDisabled);
    }

    /** @hidden User selection handler */
    protected onSelect(value: number): void {
        this.internalValue.set(value);
        this.onChange(value);
        this.onTouched();
        this.ratingChanged.emit(value);
    }

    /**
     * @hidden
     * Generate rating items for popover content from ratings object
     */
    private _generateRatings(ratingsInput: NumberKey<number>): void {
        const ratings = Object.entries(ratingsInput)
            .filter(([rate, vote]) => {
                const numRate = +rate;
                const numVote = +vote;
                return !isNaN(numRate) && !isNaN(numVote) && numRate > 0;
            })
            .map(([rate, votes]) => ({ rate: +rate, votes }));

        if (ratings.length === 0) {
            return;
        }

        const { totalVotes, totalRating } = ratings.reduce(
            (acc, rating) => ({
                totalVotes: acc.totalVotes + rating.votes,
                totalRating: acc.totalRating + rating.rate * rating.votes
            }),
            { totalVotes: 0, totalRating: 0 }
        );

        this.ratingItems.set(ratings);
        this.internalRatingAverage.set(totalRating / totalVotes);
        this.internalTotalRatings.set(totalVotes);
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

        if (this.allowHalves() && fractional > 0.25 && fractional <= 0.5) {
            v = integer + 0.5;
        } else if (fractional > 0.5) {
            v = integer + 1;
        }

        return Math.min(this.indicatorCapacity(), v);
    }

    /**
     * @hidden
     * get rating icons array with value and unique id
     */
    private _getRates(): { id: string; value: number }[] {
        const withHalves = this.allowHalves() ? 2 : 1;
        const capacity = this.indicatorCapacity();
        return Array(capacity * withHalves)
            .fill(`rating-${this.ratingUID}`)
            .map((name, index) => ({
                id: `${name}-${index + 1}`,
                value: (index + 1) / withHalves
            }));
    }

    /**
     * @hidden
     * Get size class for the rating indicator
     */
    private _getSizeClass(size: RatingIndicatorSize): string {
        return `${INDICATOR_PREFIX}--${size in RatingIndicatorSizeEnum ? size : 'md'}`;
    }
}
