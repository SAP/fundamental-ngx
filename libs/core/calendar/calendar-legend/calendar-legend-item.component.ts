import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { Nullable } from '@fundamental-ngx/cdk/utils';

let id = 0;

@Component({
    selector: 'fd-calendar-legend-item',
    standalone: true,
    imports: [CommonModule],
    template: `
        <span class="fd-calendar-legend__marker" [ngClass]="getAppointmentClass()"></span>
        <span class="fd-calendar-legend__text">
            <ng-content></ng-content>
        </span>
    `,
    host: {
        class: 'fd-calendar-legend__item',
        '[id]': 'id',
        '[style.color]': 'color',
        '[ngClass]': 'getTypeClass()'
    },
    styleUrl: './calendar-legend-item.component.scss'
})
export class LegendItemComponent {
    /** The color of the legend item marker */
    color = input<Nullable<string>>('');

    /** The type of the legend item  */
    type = input<Nullable<string>>('');

    /** If the marker is a circle or a square */
    circle = input<boolean>(false);

    /** The id of the legend item */
    id = input<string>(`fd-calendar-legend-item-${id++}`);

    /** The aria-label of the legend item */
    ariaLabel = input<string>();

    /** The aria-labelledby of the legend item */
    ariaLabelledBy = input<string>();

    /** The aria-describedby of the legend item */
    ariaDescribedBy = input<string>();

    /** @hidden */
    getTypeClass(): string {
        return this.type ? `fd-calendar-legend__item--${this.type}` : '';
    }

    /** @hidden */
    getAppointmentClass(): string {
        return this.circle() || this.type() === 'appointment' ? `fd-calendar-legend__item--appointment` : '';
    }

    /** @hidden */
    getColorClass(): string {
        return `fd-calendar-legend__item--${this.color()}`;
    }
}
