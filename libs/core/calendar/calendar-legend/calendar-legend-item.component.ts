import {
    ChangeDetectionStrategy,
    Component,
    computed,
    ElementRef,
    inject,
    input,
    ViewEncapsulation
} from '@angular/core';

@Component({
    selector: 'fd-calendar-legend-item',
    standalone: true,
    imports: [],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <span class="fd-calendar-legend__marker"></span>
        <span class="fd-calendar-legend__text">
            <ng-content>{{ text() }}</ng-content>
        </span>
    `,
    host: {
        tabindex: '0',
        '[class]': '_componentClasses()'
    }
})
export class CalendarLegendItemComponent {
    /** The text of the legend item */
    text = input<string | undefined>();

    /** The color of the legend item marker */
    color = input<string>();

    /** If the marker is a circle or a square */
    circle = input<boolean>();

    /** @hidden */
    class = input<string | undefined>('');

    /** @hidden */
    readonly elementRef = inject(ElementRef);

    /** @hidden Computed CSS classes based on inputs */
    protected readonly _componentClasses = computed(() => {
        const classes = ['fd-calendar-legend__item'];

        classes.push(this.class()!);

        if (this.circle()) {
            classes.push('fd-calendar-legend__item--appointment');
        }

        if (this.color()) {
            classes.push(`fd-calendar-legend__item--${this.color()}`);
        }
        return classes.join(' ');
    });
}
