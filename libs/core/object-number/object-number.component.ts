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
    protected readonly number = input<number>();

    /**
     * Number of decimal places to show
     */
    protected readonly decimal = input(0);

    /** Sets unit of measure displayed. */
    protected readonly unit = input<string>();

    /** Set the value to true to display the object number in bold text */
    protected readonly emphasized = input(false);

    /** Set the value to true to display the object number in large text */
    protected readonly large = input(false);

    /** Sets status/semantic color  'negative' / 'critical' / 'positive' / 'informative' */
    protected readonly status = input<ObjectStatus>();

    /** An optional status message for the object number */
    protected readonly statusMessage = input<string>();

    /** Status key to translate for screen readers */
    protected readonly statusKey = computed<FdLanguageKeyIdentifier | null>(() => {
        const status = this.status();
        if (this.isValidObjectStatus(status)) {
            return `coreObjectNumber.${status}`;
        }
        return null;
    });

    /** User's custom classes */
    protected readonly class = input<string>('');

    /** Id of the element that labels object number. */
    protected readonly ariaLabelledBy = input<string | null>();

    /** Aria label for the object number. */
    protected readonly ariaLabel = input<string | null>();

    /** Whether the object number is interactive */
    protected readonly interactive = input(false, { transform: booleanAttribute });

    /** Whether the object number is inverted. */
    protected readonly inverted = input(false, { transform: booleanAttribute });

    /** @hidden Computed number pipe configuration */
    protected readonly _numberPipeConfig = computed(() => `0.${this.decimal()}-${this.decimal()}`);

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
        console.log('classes', classes.join(' '));

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
