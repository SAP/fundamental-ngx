import {
    AfterContentInit,
    Component,
    ContentChildren,
    ElementRef,
    Input,
    OnInit,
    QueryList,
    ViewContainerRef,
    input
} from '@angular/core';
import { SpecialDayRule } from '@fundamental-ngx/core/shared';
import { CalendarLegendFocusingService } from './calendar-legend-focusing.service';
import { LegendItemComponent } from './calendar-legend-item.component';

let calIndex = 0;

@Component({
    selector: 'fd-calendar-legend',
    standalone: true,
    template: ` <ng-content></ng-content> `,
    host: {
        class: 'fd-calendar-legend',
        '[class.fd-calendar-legend--auto-column]': 'col',
        '[attr.data-calendar-index]': 'calIndex'
    }
})
export class CalendarLegendComponent<D> implements OnInit, AfterContentInit {
    /** Get all legend Items */
    @ContentChildren(LegendItemComponent, { descendants: true })
    legendItems: QueryList<LegendItemComponent>;

    /** Special
     * days rules to be displayed in the legend */
    @Input() specialDaysRules: SpecialDayRule<D>[] = [];

    /**
     * Make it a column instead
     */
    @Input() col = false;

    /** Calendar's index */
    calIndex = input<number>(calIndex++);

    /** Element getting focused */
    focusedElement = input<string>('');

    /** @hidden */
    constructor(
        private elementRef: ElementRef,
        private viewContainer: ViewContainerRef,
        private focusingService: CalendarLegendFocusingService
    ) {}

    /** @hidden */
    ngOnInit(): void {
        this._addCalendarLegend();
    }

    /** @hidden */
    ngAfterContentInit(): void {
        this.legendItems.forEach((item) => {
            item.focusedElementEvent.subscribe((event: string) => {
                this.focusedElementEventHandle(event);
            });
        });
    }

    /** @hidden */
    _addCalendarLegend(): void {
        this.specialDaysRules.forEach((day) => {
            if (day.legendText) {
                const componentRef = this.viewContainer.createComponent(LegendItemComponent);
                componentRef.instance.text = day.legendText;
                componentRef.instance.color = `placeholder-${day.specialDayNumber}`;
                componentRef.instance.focusedElementEvent.subscribe((event: string) => {
                    this.focusedElementEventHandle(event, day.specialDayNumber);
                });

                this.elementRef.nativeElement.appendChild(componentRef.location.nativeElement);
            }
        });
    }

    /** @hidden */
    focusedElementEventHandle(event: string, specialNumber?: number): void {
        this.focusingService.setFocusOnCell(
            this.elementRef.nativeElement.querySelector(`#${event}`),
            this.calIndex(),
            specialNumber
        );
    }
}
