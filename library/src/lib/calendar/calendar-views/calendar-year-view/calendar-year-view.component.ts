import { Component, OnInit, ViewEncapsulation, Output, Input, EventEmitter, ElementRef, AfterViewChecked } from '@angular/core';
import { FdDate } from '../../models/fd-date';

/** Component representing the YearView of the Calendar Component. */
@Component({
    selector: 'fd-calendar-year-view',
    templateUrl: './calendar-year-view.component.html',
    styleUrls: ['./calendar-year-view.component.scss'],
    encapsulation: ViewEncapsulation.None,
    host: {
        '[attr.id]': 'id + "-year-view"'
    }
})
export class CalendarYearViewComponent implements AfterViewChecked, OnInit {

    /** Parameter that stores the dozen of years that are currently being displayed. */
    calendarYearList: number[];

    /** Parameter storing the year of the present day. */
    currentYear: number = FdDate.getToday().year;

    /** Parameter storing first shown year on list */
    firstYearInList: number = this.currentYear;

    /** @hidden */
    private newFocusedYearId: string;

    /** Parameter used in id of years used for help with focusing on the correct element during keyboard navigation. */
    @Input()
    id: string;

    /** Function that is called when the focus would escape the element. */
    @Input()
    focusEscapeFunction: Function;

    /** Parameter holding the year that is currently selected. */
    @Input()
    yearSelected: number;

    /** Event fired when a year is selected. */
    @Output()
    readonly yearClicked: EventEmitter<number> = new EventEmitter<number>();

    /** @hidden */
    ngAfterViewChecked(): void {
        if (this.newFocusedYearId) {
            this.focusElement(this.newFocusedYearId);
            this.newFocusedYearId = null;
        }
    }

    /** @hidden */
    ngOnInit(): void {
        this.firstYearInList = this.yearSelected;
        this.constructYearList();
    }

    /** @hidden */
    constructor(private eRef: ElementRef) { }

    /** @hidden */
    private constructYearList(): void {
        this.calendarYearList = [];
        for (let x = 0; x < 12; x++) {
            this.calendarYearList.push(this.firstYearInList + x);
        }
    }

    /** Method for handling the keyboard navigation. */
    onKeydownYearHandler(event, year: number, index: number): void {
        if (event.code === 'Tab' && !event.shiftKey) {
            if (this.focusEscapeFunction) {
                event.preventDefault();
                this.focusEscapeFunction();
            }
        } else {
            switch (event.code) {
                case 'Enter':
                case 'Space': {
                    event.preventDefault();
                    this.selectYear(year);
                    break;
                }
                case 'ArrowLeft': {
                    event.preventDefault();
                    if (index === 0) {
                        this.loadPreviousYearList();
                        this.newFocusedYearId = this.id + '-fd-year-' + 11;
                    } else {
                        this.newFocusedYearId = this.id + '-fd-year-' + (index - 1);
                    }
                    break;
                }
                case 'ArrowRight': {
                    event.preventDefault();
                    if (index === 11) {
                        this.loadNextYearList();
                        this.newFocusedYearId = this.id + '-fd-year-' + 0;
                    } else {
                        this.newFocusedYearId = this.id + '-fd-year-' + (index + 1);
                    }
                    break;
                }
                case 'ArrowUp': {
                    event.preventDefault();
                    if (index <= 3) {
                        this.loadPreviousYearList()
                        this.newFocusedYearId = this.id + '-fd-year-' + (index + 8);
                    } else {
                        this.newFocusedYearId = this.id + '-fd-year-' + (index - 4);
                    }
                    break;
                }
                case 'ArrowDown': {
                    event.preventDefault();
                    if (index >= 8) {
                        this.loadNextYearList()
                        this.newFocusedYearId = this.id + '-fd-year-' + (index - 8);
                    } else {
                        this.newFocusedYearId = this.id + '-fd-year-' + (index + 4);
                    }
                    break;
                }
            }
            this.focusElement(this.newFocusedYearId);
        }
    }

    /** Method used to load the previous 12 years to be displayed. */
    loadNextYearList() {
        this.firstYearInList += 12;
        this.constructYearList();
    }

    /** Method used to load the next 12 years to be displayed. */
    loadPreviousYearList() {
        this.firstYearInList -= 12;
        this.constructYearList();
    }

    /** Method allowing focusing on elements within this component. */
    focusElement(elementSelector: string): void {
        const elementToFocus: HTMLElement = this.eRef.nativeElement.querySelector('#' + elementSelector);
        if (elementToFocus) {
            this.eRef.nativeElement.querySelector('#' + elementSelector).focus();
        }
    }

    /** Method that sends the year to the parent component when it is clicked. */
    selectYear(selectedYear: number, event?: MouseEvent) {
        if (event) {
            event.stopPropagation();
        }
        this.yearSelected = selectedYear;
        this.yearClicked.emit(this.yearSelected);
    }
}
