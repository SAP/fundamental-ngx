import { Component, OnInit, ViewEncapsulation, Output, Input, EventEmitter, ElementRef, AfterViewChecked } from '@angular/core';

@Component({
    selector: 'fd-calendar2-year-view',
    templateUrl: './calendar2-year-view.component.html',
    styleUrls: ['./calendar2-year-view.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class Calendar2YearViewComponent implements AfterViewChecked {

    /** @hidden */
    newFocusedYearId: string;

    /** Parameter used for key */
    @Input()
    id: string;

    /** Function that allows to specify which function would be called, when focus wants to escape */
    @Input()
    focusEscapeFunction: Function;

    /** Parameter that stores the dozen of years that are currently being displayed */
    @Input()
    calendarYearList: number[];

    /** Parameter holding the year that is currently selected */
    @Input()
    yearSelected: number;

    /** Event fired when a year is selected */
    @Output()
    yearClicked: EventEmitter<any> = new EventEmitter();

    /** Event fired when the next/previous dozen of years must be displayed */
    @Output()
    reGenerateYearList: EventEmitter<any> = new EventEmitter();

    /** Parameter storing the year of the present day */
    currentYear: number = new Date().getFullYear();

    /** @hidden */
    ngAfterViewChecked() {
        if (this.newFocusedYearId) {
            this.focusElement(this.newFocusedYearId);
            this.newFocusedYearId = null;
        }
    }

    constructor(private eRef: ElementRef) { }

    /** Method for handling the keyboard navigation */
    onKeydownYearHandler(event, year: number, index: number) {
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
                        this.reGenerateYearList.emit('previousSet');
                        this.newFocusedYearId = this.id + '-fd-year-' + 11;
                    } else {
                        this.newFocusedYearId = this.id + '-fd-year-' + (index - 1);
                    }
                    break;
                }
                case 'ArrowRight': {
                    event.preventDefault();
                    if (index === 11) {
                        this.reGenerateYearList.emit('nextSet');
                        this.newFocusedYearId = this.id + '-fd-year-' + 0;
                    } else {
                        this.newFocusedYearId = this.id + '-fd-year-' + (index + 1);
                    }
                    break;
                }
                case 'ArrowUp': {
                    event.preventDefault();
                    if (index <= 3) {
                        this.reGenerateYearList.emit('previousSet');
                        this.newFocusedYearId = this.id + '-fd-year-' + (index + 8);
                    } else {
                        this.newFocusedYearId = this.id + '-fd-year-' + (index - 4);
                    }
                    break;
                }
                case 'ArrowDown': {
                    event.preventDefault();
                    if (index >= 8) {
                        this.reGenerateYearList.emit('nextSet');
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

    /** Method allowing focusing on elements within this component */
    focusElement(elementSelector: string): void {
        const elementToFocus: HTMLElement = this.eRef.nativeElement.querySelector('#' + elementSelector);
        if (elementToFocus) {
            this.eRef.nativeElement.querySelector('#' + elementSelector).focus();
        }
    }

    /** Method used */
    selectYear(selectedYear: number, event?: MouseEvent) {
        if (event) {
            event.stopPropagation();
        }
        this.yearSelected = selectedYear;
        this.yearClicked.emit(this.yearSelected);
    }
}
