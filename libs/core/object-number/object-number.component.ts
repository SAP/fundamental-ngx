import { DecimalPipe } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    ViewEncapsulation,
    booleanAttribute,
    computed,
    inject,
    input
} from '@angular/core';
import { HasElementRef } from '@fundamental-ngx/cdk/utils';
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
        '[attr.role]': 'interactive() ? "button" : null',
        '[class]': '_cssClass()'
    },
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [DecimalPipe, FdTranslatePipe]
})
export class ObjectNumberComponent implements HasElementRef {
    /**
     * Numerical value of the object number.
     */
    readonly number = input<number>();

    /**
     * Number of decimal places to show
     */
    readonly decimal = input(0);

    /** Sets unit of measure displayed. */
    readonly unit = input<string>();

    /** Set the value to true to display the object number in bold text */
    readonly emphasized = input(false);

    /** Set the value to true to display the object number in large text */
    readonly large = input(false);

    /** Sets status/semantic color  'negative' / 'critical' / 'positive' / 'informative' */
    readonly status = input<ObjectStatus>();

    /** An optional status message for the object number */
    readonly statusMessage = input<string>();

    /** Id of the element that labels object number. */
    readonly ariaLabelledBy = input<string>();

    /** Aria label for the object number. */
    readonly ariaLabel = input<string>();

    /** Whether the object number is interactive */
    readonly interactive = input(false, { transform: booleanAttribute });

    /** Whether the object number is inverted. */
    readonly inverted = input(false, { transform: booleanAttribute });

    /** @hidden */
    readonly elementRef = inject(ElementRef);

    /** @hidden Computed number pipe configuration */
    protected readonly _numberPipeConfig = computed(() => `0.${this.decimal()}-${this.decimal()}`);

    /** @hidden Status key to translate for screen readers */
    protected readonly statusKey = computed<FdLanguageKeyIdentifier | null>(() => {
        const status = this.status();
        if (this.isValidObjectStatus(status)) {
            return `coreObjectNumber.${status}`;
        }
        return null;
    });

    /** @hidden Computed CSS classes */
    protected readonly _cssClass = computed(() =>
        [
            'fd-object-number',
            this.large() ? 'fd-object-number--large' : '',
            this.interactive() ? 'fd-object-number--interactive' : '',
            this.inverted() ? 'fd-object-number--inverted' : '',
            this.status() ? `fd-object-number--${this.status()}` : ''
        ]
            .filter(Boolean)
            .join(' ')
    );

    /**
     * Type guard to check if the status is a valid ObjectStatus
     * @hidden
     */
    private isValidObjectStatus(status: ObjectStatus | undefined): status is ObjectStatus {
        return status === 'negative' || status === 'critical' || status === 'positive' || status === 'informative';
    }
}
