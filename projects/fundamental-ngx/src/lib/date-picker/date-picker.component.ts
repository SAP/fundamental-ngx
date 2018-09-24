import { Component, Input, OnInit, HostListener, ElementRef, EventEmitter, Output } from '@angular/core';
import { CalendarDay, CalendarType } from '../calendar/calendar.component';

@Component({
    selector: 'fd-date-picker',
    templateUrl: './date-picker.component.html',
    styleUrls: ['./date-picker.component.scss']
})
export class DatePickerComponent implements OnInit {
    @Input() type: CalendarType = 'single';
    inputFieldDate = null;
    isValidDateInput: boolean = false;
    isOpen: boolean = false;
    dateFromDatePicker: string = '';

    @Input()
    selectedDay: CalendarDay = {
        date: null
    };
    @Output()
    selectedDayChange = new EventEmitter();

    @Input()
    selectedRangeFirst: CalendarDay = {
        date: null
    };
    @Output() selectedRangeFirstChange = new EventEmitter();

    @Input()
    selectedRangeLast: CalendarDay = {
        date: null
    };
    @Output() selectedRangeLastChange = new EventEmitter();

    openCalendar(e) {
        this.isOpen = !this.isOpen;
        this.getInputValue(e);
        if (this.isValidDateInput) {
            this.inputFieldDate = null;
        }
    }

    closeCalendar() {
        if (this.isOpen) {
            if (this.isValidDateInput) {
                this.inputFieldDate = null;
            }
            this.isOpen = false;
        }
    }

    onFocusHandler() {
        if (!this.isOpen) {
            this.isOpen = true;
        }
    }

    onBlurHandler() {
        if (this.isOpen) {
            if (this.isValidDateInput) {
                this.inputFieldDate = null;
            }
        }
    }

    updateDatePickerInputHandler(d) {
        if (this.type === 'single') {
            if (d.selectedDay.date) {
                this.inputFieldDate = d.selectedDay.date.toLocaleDateString();
                this.selectedDay = d.selectedDay;
                this.selectedDayChange.emit(this.selectedDay);
            }
        } else {
            if (d.selectedFirstDay.date) {
                this.selectedRangeFirst = d.selectedFirstDay;
                this.selectedRangeLast = d.selectedLastDay;
                this.selectedRangeFirstChange.emit(this.selectedRangeFirst);
                this.selectedRangeLastChange.emit(this.selectedRangeLast);
                this.inputFieldDate =
                    d.selectedFirstDay.date.toLocaleDateString() + ' - ' + d.selectedLastDay.date.toLocaleDateString();
            }
        }
    }

    isInvalidDateInputHandler(e) {
        this.isValidDateInput = e;
    }

    getInputValue(e) {
        this.dateFromDatePicker = e;
    }

    @HostListener('document:keydown.escape', [])
    onEscapeKeydownHandler() {
        this.closeCalendar();
    }

    @HostListener('document:click', ['$event.path'])
    public onGlobalClick(targetElementPath: Array<any>) {
        let elementRefInPath = targetElementPath.find(e => e === this.eRef.nativeElement);
        if (!elementRefInPath) {
            this.closeCalendar();
        }
    }

    ngOnInit() {}

    constructor(private eRef: ElementRef) {}
}
