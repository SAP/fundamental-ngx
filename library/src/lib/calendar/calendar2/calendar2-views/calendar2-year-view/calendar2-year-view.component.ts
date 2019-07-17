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

    @Input()
    id: string;

    /** Function that allows to specify which function would be called, when focus wants to escape */
    @Input()
    focusEscapeFunction: Function;

    @Input()
    isActive: boolean;

    @Input()
    calendarYearList: number[];

    @Input()
    yearSelected: number;

    @Output()
    yearClicked: EventEmitter<any> = new EventEmitter();

    @Output()
    reGenerateYearList: EventEmitter<any> = new EventEmitter();

    currentYear: number = new Date().getFullYear();

    /** @hidden */
    ngAfterViewChecked() {
        if (this.newFocusedYearId) {
            this.focusElement(this.newFocusedYearId);
            this.newFocusedYearId = null;
        }
    }

    constructor(private eRef: ElementRef) { }

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

    focusElement(elementSelector: string): void {
        const elementToFocus: HTMLElement = this.eRef.nativeElement.querySelector('#' + elementSelector);
        if (elementToFocus) {
            this.eRef.nativeElement.querySelector('#' + elementSelector).focus();
        }
    }

    selectYear(selectedYear: number, event?: MouseEvent) {
        if (event) {
            event.stopPropagation();
        }
        this.yearSelected = selectedYear;
        this.yearClicked.emit(this.yearSelected);
    }
}
