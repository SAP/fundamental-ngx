import { Component, ElementRef, OnInit, ViewContainerRef, input } from '@angular/core';
import { SpecialDayRule } from '@fundamental-ngx/core/shared';
import { LegendItemComponent } from './calendar-legend-item.component';

@Component({
    selector: 'fd-calendar-legend',
    standalone: true,
    template: ` <ng-content></ng-content> `,
    host: {
        class: 'fd-calendar-legend',
        '[ngClass]': 'columnOrNot()'
    }
})
export class CalendarLegendComponent<D> implements OnInit {
    /** Special
     * days rules to be displayed in the legend */
    specialDaysRules = input<SpecialDayRule<D>[]>([]);

    /**
     * Make it a column instead
     */
    col = input<boolean>(false);

    /** @hidden */
    constructor(
        private elementRef: ElementRef,
        private viewContainer: ViewContainerRef
    ) {}

    /** @hidden */
    ngOnInit(): void {
        this._addCalendarLegend();
    }

    /** @hidden */
    _addCalendarLegend(): void {
        this.specialDaysRules().forEach((day) => {
            if (day.legendText) {
                const componentRef = this.viewContainer.createComponent(LegendItemComponent);
                componentRef.instance.text = day.legendText;
                componentRef.instance.color = `placeholder-${day.specialDayNumber}`;
                this.elementRef.nativeElement.appendChild(componentRef.location.nativeElement);
            }
        });
    }

    /** @hidden */
    columnOrNot(): string {
        return this.col() ? 'fd-calendar-legend--column' : '';
    }
}
