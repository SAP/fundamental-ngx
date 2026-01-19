import { Component, signal } from '@angular/core';
import { Button } from '@fundamental-ngx/ui5-webcomponents/button';
import { CalendarLegend } from '@fundamental-ngx/ui5-webcomponents/calendar-legend';
import { CalendarLegendItem } from '@fundamental-ngx/ui5-webcomponents/calendar-legend-item';
import { CheckBox } from '@fundamental-ngx/ui5-webcomponents/check-box';

@Component({
    selector: 'ui5-calendar-legend-hidden-items-example',
    standalone: true,
    templateUrl: './hidden-items.html',
    imports: [CalendarLegend, CalendarLegendItem, Button, CheckBox],
    styles: [
        `
            .legend-controls {
                display: flex;
                flex-direction: column;
                gap: 0.5rem;
                margin-bottom: 1rem;
            }
            .control-buttons {
                display: flex;
                gap: 0.5rem;
                margin-top: 1rem;
            }
        `
    ]
})
export class CalendarLegendHiddenItemsExample {
    readonly hideToday = signal(false);
    readonly hideSelectedDay = signal(false);
    readonly hideNonWorkingDay = signal(false);
    readonly hideWorkingDay = signal(false);

    toggleToday(): void {
        this.hideToday.update((value) => !value);
    }

    toggleSelectedDay(): void {
        this.hideSelectedDay.update((value) => !value);
    }

    toggleNonWorkingDay(): void {
        this.hideNonWorkingDay.update((value) => !value);
    }

    toggleWorkingDay(): void {
        this.hideWorkingDay.update((value) => !value);
    }

    resetAll(): void {
        this.hideToday.set(false);
        this.hideSelectedDay.set(false);
        this.hideNonWorkingDay.set(false);
        this.hideWorkingDay.set(false);
    }

    hideAll(): void {
        this.hideToday.set(true);
        this.hideSelectedDay.set(true);
        this.hideNonWorkingDay.set(true);
        this.hideWorkingDay.set(true);
    }
}
