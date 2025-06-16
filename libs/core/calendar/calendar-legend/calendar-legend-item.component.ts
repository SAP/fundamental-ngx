import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    OnChanges,
    OnInit,
    ViewEncapsulation,
    input
} from '@angular/core';
import { CssClassBuilder, applyCssClass } from '@fundamental-ngx/cdk/utils';

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
        tabindex: '0'
    }
})
export class CalendarLegendItemComponent implements OnChanges, OnInit, CssClassBuilder {
    /** The text of the legend item */
    text = input<string | undefined>();

    /** The color of the legend item marker */
    color = input<string>();

    /** If the marker is a circle or a square */
    circle = input<boolean>();

    /** @hidden */
    class = input<string | undefined>('');

    /** @hidden */
    constructor(public elementRef: ElementRef) {}

    /** @hidden */
    @applyCssClass
    buildComponentCssClass(): string[] {
        return [`fd-calendar-legend__item ${this.class()} ${this.getAppointmentClass()} ${this.getColorClass()}`];
    }

    /** @hidden */
    ngOnChanges(): void {
        this.buildComponentCssClass();
    }

    /** @hidden */
    ngOnInit(): void {
        this.buildComponentCssClass();
    }

    /** @hidden */
    getAppointmentClass(): string {
        return this.circle() ? `fd-calendar-legend__item--appointment` : '';
    }

    /** @hidden */
    getColorClass(): string {
        return this.color() ? `fd-calendar-legend__item--${this.color()}` : '';
    }
}
