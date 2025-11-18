import { DecimalPipe } from '@angular/common';
import {
    booleanAttribute,
    ChangeDetectionStrategy,
    Component,
    computed,
    ElementRef,
    input,
    OnChanges,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import { applyCssClass, CssClassBuilder, Nullable } from '@fundamental-ngx/cdk/utils';
import { FdLanguageKeyIdentifier, FdTranslatePipe } from '@fundamental-ngx/i18n';

type ObjectStatus = 'negative' | 'critical' | 'positive' | 'informative';

@Component({
    selector: 'fd-object-number',
    templateUrl: './object-number.component.html',
    styleUrl: './object-number.component.scss',
    host: {
        '[attr.aria-labelledby]': 'ariaLabelledBy()',
        '[attr.aria-label]': 'ariaLabel()',
        '[attr.tabindex]': 'interactive() ? 0 : null',
        '[attr.role]': 'interactive() ? "button" : null'
    },
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [DecimalPipe, FdTranslatePipe]
})
export class ObjectNumberComponent implements OnInit, OnChanges, CssClassBuilder {
    /**
     * Numerical value of the object number.
     */
    number = input<number>(0);

    /**
     * Number of decimal places to show
     */
    decimal = input<number>(0);

    /** Sets unit of measure displayed. */
    unit = input<string>('');

    /** Set the value to true to display the object number in bold text */
    emphasized = input(false, { transform: booleanAttribute });

    /** Set the value to true to display the object number in large text */
    large = input(false, { transform: booleanAttribute });

    /** Sets status/semantic color  'negative' / 'critical' / 'positive' / 'informative' */
    status = input<ObjectStatus | null>(null);

    /** An optional status message for the object number */
    statusMessage = input<string>();

    /** Status key to translate for screen readers */
    statusKey = computed<FdLanguageKeyIdentifier | null>(() => {
        const status = this.status();
        if (this.isValidObjectStatus(status)) {
            return `coreObjectNumber.${status}`;
        }
        return null;
    });

    /** User's custom classes */
    class = input<string>();

    /** Id of the element that labels object number. */
    ariaLabelledBy = input<Nullable<string>>(null);

    /** Aria label for the object number. */
    ariaLabel = input<Nullable<string>>(null);

    /** Whether the object number is interactive */
    interactive = input(false, { transform: booleanAttribute });

    /** Whether the object number is inverted. */
    inverted = input(false, { transform: booleanAttribute });

    /** @hidden */
    _numberPipeConfig = '';

    /** @hidden */
    constructor(public readonly elementRef: ElementRef) {}

    /** @hidden
     * CssClassBuilder interface implementation
     * function must return single string
     * function is responsible for order which css classes are applied
     */
    @applyCssClass
    buildComponentCssClass(): string[] {
        return [
            'fd-object-number',
            this.large() ? 'fd-object-number--large' : '',
            this.status() ? `fd-object-number--${this.status()}` : '',
            this.interactive() ? 'fd-object-number--interactive' : '',
            this.inverted() ? 'fd-object-number--inverted' : '',
            this.class() ?? ''
        ];
    }

    /** @hidden */
    ngOnChanges(): void {
        this._onChanges();
    }

    /** @hidden */
    ngOnInit(): void {
        this._onChanges();
    }

    /** @hidden */
    private _onChanges(): void {
        this.buildComponentCssClass();
        this._buildNumberPipeConfig();
    }

    /** @hidden */
    private _buildNumberPipeConfig(): void {
        this._numberPipeConfig = `0.${this.decimal()}-${this.decimal()}`;
    }

    /**
     * Type guard to check if the status is a valid ObjectStatus
     * @hidden
     */
    private isValidObjectStatus(status: ObjectStatus | null): status is ObjectStatus {
        return status === 'negative' || status === 'critical' || status === 'positive' || status === 'informative';
    }
}
