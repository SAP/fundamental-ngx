import { DecimalPipe } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    ViewEncapsulation,
    booleanAttribute,
    computed,
    input
} from '@angular/core';
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
export class ObjectNumberComponent {
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

    /** User's custom classes */
    readonly class = input<string>('');

    /** Id of the element that labels object number. */
    readonly ariaLabelledBy = input<string | null>();

    /** Aria label for the object number. */
    readonly ariaLabel = input<string | null>();

    /** Whether the object number is interactive */
    readonly interactive = input(false, { transform: booleanAttribute });

    /** Whether the object number is inverted. */
    readonly inverted = input(false, { transform: booleanAttribute });

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
    protected readonly _cssClass = computed(() => {
        const classes: string[] = ['fd-object-number'];

        if (this.large()) {
            classes.push('fd-object-number--large');
        }

        const status = this.status();
        if (status) {
            classes.push(`fd-object-number--${status}`);
        }

        const interactive = this.interactive();
        if (interactive) {
            classes.push('fd-object-number--interactive');
        }

        const inverted = this.inverted();
        if (inverted) {
            classes.push('fd-object-number--inverted');
        }

        const customClass = this.class();
        if (customClass) {
            classes.push(customClass);
        }

        return classes.join(' ');
    });

    /**
     * Type guard to check if the status is a valid ObjectStatus
     * @hidden
     */
    private isValidObjectStatus(status: ObjectStatus | undefined): status is ObjectStatus {
        return status === 'negative' || status === 'critical' || status === 'positive' || status === 'informative';
    }
}
