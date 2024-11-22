import { Component, ElementRef, OnInit, ViewContainerRef, input } from '@angular/core';
import { SpecialDayRule } from '@fundamental-ngx/core/shared';
import { LegendItemComponent } from './calendar-legend-item.component';

@Component({
    selector: 'fd-calendar-legend',
    standalone: true,
    template: ` <ng-content></ng-content> `,
    host: {
        class: 'fd-calendar-legend'
    }
})
export class CalendarLegendComponent<D> implements OnInit {
    /**
     * @hidden
     * Special Days Rules
     */
    specialDaysRules = input<SpecialDayRule<D>[]>([]);

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
                this.elementRef.nativeElement.appendChild(componentRef.location.nativeElement);
            }
        });
    }
}
