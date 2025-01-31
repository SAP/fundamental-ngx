import { CommonModule } from '@angular/common';
import { Component, ContentChildren, ElementRef, Input, QueryList, input } from '@angular/core';
import { SpecialDayRule } from '@fundamental-ngx/core/shared';
import { CalendarLegendFocusingService } from './calendar-legend-focusing.service';
import { LegendItemComponent } from './calendar-legend-item.component';

@Component({
    selector: 'fd-calendar-legend',
    standalone: true,
    template: `
        <ng-content></ng-content>
        <ng-container>
            <fd-calendar-legend-item
                *ngFor="let rule of specialDaysRules()"
                [text]="rule.legendText"
                [color]="'placeholder-' + rule.specialDayNumber"
                (focusedElementEvent)="handleFocusedElementEvent($event, rule.specialDayNumber)"
            >
            </fd-calendar-legend-item>
        </ng-container>
    `,
    host: {
        class: 'fd-calendar-legend',
        '[class.fd-calendar-legend--auto-column]': 'col',
        '[attr.fd-data-calendar-index]': 'calIndex'
    },
    imports: [CommonModule, LegendItemComponent]
})
export class CalendarLegendComponent<D> {
    /** Get all legend Items */
    @ContentChildren(LegendItemComponent, { descendants: true })
    legendItems: QueryList<LegendItemComponent>;

    /**
     * Make it a column instead
     */
    @Input() col = false;

    /** Special
     * days rules to be displayed in the legend */
    specialDaysRules = input<SpecialDayRule<D>[]>([]);

    /** Calendar's index */
    calIndex: number;

    /** Element getting focused */
    focusedElement = input<string>('');

    /** @hidden */
    constructor(
        private elementRef: ElementRef,
        private focusingService: CalendarLegendFocusingService
    ) {
        this.calIndex = this.focusingService.getCalIndex() - 1;
    }

    /** @hidden */
    handleFocusedElementEvent(event: string, specialDayNumber: number): void {
        this.focusedElementEventHandle(event, specialDayNumber);
    }

    /** @hidden */
    focusedElementEventHandle(event: string, specialNumber?: number): void {
        this.focusingService.setFocusOnCell(
            this.elementRef.nativeElement.querySelector(`#${event}`),
            this.calIndex,
            specialNumber
        );
    }
}
