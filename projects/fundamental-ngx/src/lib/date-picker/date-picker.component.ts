import { Component, Input, OnInit, HostListener, ElementRef } from '@angular/core';
import { CalendarType } from '../calendar/calendar.component';

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
            if (d.selectedDay.id !== 0) {
                this.inputFieldDate = d.selectedDay.date.toLocaleDateString();
            }
        } else {
            if (d.selectedFirstDay.id !== 0) {
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
