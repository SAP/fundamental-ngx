import { DecimalPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewEncapsulation, computed, input } from '@angular/core';
import { Nullable } from '@fundamental-ngx/cdk/utils';

type ObjectStatus = 'negative' | 'critical' | 'positive' | 'informative';

@Component({
    selector: 'fd-object-number',
    templateUrl: './object-number.component.html',
    styleUrl: './object-number.component.scss',
    host: {
        '[attr.aria-labelledby]': 'ariaLabelledBy()',
        '[attr.aria-label]': 'ariaLabel()',
        '[class]': '_cssClass()'
    },
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [DecimalPipe]
})
export class ObjectNumberComponent {
    /**
     * Numerical value of the object number.
     */
    readonly number = input<number | undefined>(undefined);

    /**
     * Number of decimal places to show
     */
    readonly decimal = input(0);

    /** Sets unit of measure displayed. */
    readonly unit = input<string | undefined>(undefined);

    /** Set the value to true to display the object number in bold text */
    readonly emphasized = input(false);

    /** Set the value to true to display the object number in large text */
    readonly large = input(false);

    /** Sets status/semantic color  'negative' / 'critical' / 'positive' / 'informative' */
    readonly status = input<ObjectStatus | undefined>(undefined);

    /** User's custom classes */
    readonly class = input<string>('');

    /** Id of the element that labels object number. */
    readonly ariaLabelledBy = input<Nullable<string>>();

    /** Aria label for the object number. */
    readonly ariaLabel = input<Nullable<string>>();

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

        const customClass = this.class();
        if (customClass) {
            classes.push(customClass);
        }

        return classes.join(' ');
    });
}
