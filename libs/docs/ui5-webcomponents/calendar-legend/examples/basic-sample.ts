import { Component } from '@angular/core';
import { Calendar } from '@fundamental-ngx/ui5-webcomponents/calendar';
import { CalendarLegend } from '@fundamental-ngx/ui5-webcomponents/calendar-legend';
import { CalendarLegendItem } from '@fundamental-ngx/ui5-webcomponents/calendar-legend-item';
import { SpecialCalendarDate } from '@fundamental-ngx/ui5-webcomponents/special-calendar-date';
import { CalendarLegendItemType } from '@fundamental-ngx/ui5-webcomponents/types';

@Component({
    selector: 'ui5-calendar-legend-basic-example',
    standalone: true,
    imports: [Calendar, CalendarLegend, CalendarLegendItem, SpecialCalendarDate],
    templateUrl: './basic-sample.html',
    styles: [
        `
            .legend-examples {
                display: flex;
                flex-direction: column;
                gap: 1rem;
                padding: 1rem;
            }
        `
    ]
})
export class CalendarLegendBasicExample {
    specialDates: { value: string; type: CalendarLegendItemType }[] = [];

    constructor() {
        this.generateSpecialDates();
    }

    private generateSpecialDates(): void {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const formattedMonth = (currentDate.getMonth() + 1).toString().padStart(2, '0');
        const types = [
            CalendarLegendItemType.Type05,
            CalendarLegendItemType.Type07,
            CalendarLegendItemType.Type13,
            CalendarLegendItemType.NonWorking
        ];
        const daysInMonth = new Date(year, currentDate.getMonth() + 1, 0).getDate();
        const assignedDays = new Set<number>();

        for (let i = 0; i < 10; i++) {
            const day = this.generateUniqueRandomDay(assignedDays, daysInMonth);
            this.specialDates.push({ value: `${year}-${formattedMonth}-${day}`, type: types[i % types.length] });
        }
    }

    private generateUniqueRandomDay(assignedDays: Set<number>, daysInMonth: number): string {
        let randomDay;
        do {
            randomDay = Math.floor(Math.random() * daysInMonth) + 1;
        } while (assignedDays.has(randomDay));
        assignedDays.add(randomDay);
        return randomDay.toString().padStart(2, '0');
    }
}
