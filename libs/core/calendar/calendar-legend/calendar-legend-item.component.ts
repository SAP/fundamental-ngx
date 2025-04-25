import { CommonModule } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    EventEmitter,
    OnChanges,
    OnInit,
    Output,
    ViewEncapsulation,
    input
} from '@angular/core';
import { CssClassBuilder, Nullable, applyCssClass } from '@fundamental-ngx/cdk/utils';

let id = 0;

@Component({
    selector: 'fd-calendar-legend-item',
    standalone: true,
    imports: [CommonModule],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <span class="fd-calendar-legend__marker"></span>
        <span class="fd-calendar-legend__text">
            <ng-content>{{ text() }}</ng-content>
        </span>
    `,
    host: {
        '[attr.id]': 'id()',
        '(focus)': 'onFocus()',
        tabindex: '0'
    }
})
export class LegendItemComponent implements OnChanges, OnInit, CssClassBuilder {
    /** Sending the focused item to parent */
    @Output() focusedElementEvent = new EventEmitter<string>();

    /** The text of the legend item */
    text = input<string | undefined>();

    /** The color of the legend item marker */
    color = input<string>();

    /** The type of the legend item  */
    type = input<Nullable<string> | undefined>();

    /** If the marker is a circle or a square */
    circle = input<boolean>();

    /** The id of the legend item */
    id = input<string>(`fd-calendar-legend-item-${id++}`);

    /** The aria-label of the legend item */
    ariaLabel = input<string>();

    /** The aria-labelledby of the legend item */
    ariaLabelledBy = input<string>();

    /** The aria-describedby of the legend item */
    ariaDescribedBy = input<string>();

    /** @hidden */
    class: string;

    /** @hidden */
    constructor(public elementRef: ElementRef) {}

    /** @hidden */
    @applyCssClass
    buildComponentCssClass(): string[] {
        return [
            `fd-calendar-legend__item ${this.getTypeClass()} ${this.getAppointmentClass()} ${this.getColorClass()}`
        ];
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
    getTypeClass(): string {
        return this.type() ? `fd-calendar-legend__item--${this.type()}` : '';
    }

    /** @hidden */
    getAppointmentClass(): string {
        return this.circle() || this.type() === 'appointment' ? `fd-calendar-legend__item--appointment` : '';
    }

    /** @hidden */
    getColorClass(): string {
        return this.color() ? `fd-calendar-legend__item--${this.color()}` : '';
    }

    /** @hidden */
    onFocus(): void {
        this.focusedElementEvent.emit(this.id());
    }
}
