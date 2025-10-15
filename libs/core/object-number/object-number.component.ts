import { DecimalPipe } from '@angular/common';
import {
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
        '[attr.aria-label]': 'ariaLabel()'
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
    emphasized = input<boolean>(false);

    /** Set the value to true to display the object number in large text */
    large = input<boolean>(false);

    /** Sets status/semantic color  'negative' / 'critical' / 'positive' / 'informative' */
    status = input<ObjectStatus | null>(null);

    /** Status key to translate for screen readers */
    statusKey = computed<FdLanguageKeyIdentifier | null>(() => {
        const status = this.status();
        if (this.isValidObjectStatus(status)) {
            return `coreObjectNumber.${status}`;
        }
        return null;
    });

    /** User's custom classes */
    class = input<string | undefined>('');

    /** Id of the element that labels object number. */
    ariaLabelledBy = input<Nullable<string>>(null);

    /** Aria label for the object number. */
    ariaLabel = input<Nullable<string>>(null);

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
