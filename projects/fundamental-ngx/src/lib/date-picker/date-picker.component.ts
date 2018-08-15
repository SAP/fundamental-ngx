import { Component, Input, OnInit, HostListener } from '@angular/core';
import { DatePickerType } from '../calendar/calendar.component';


@Component({
    selector: 'fd-date-picker',
    templateUrl: './date-picker.component.html',
    styleUrls: ['./date-picker.component.scss']
})
export class DatePickerComponent implements OnInit {

    @Input() type: DatePickerType = 'single';
    inputFieldDate = null;
    isValidDateInput: boolean = false;
    isOpen: boolean = false;
    dateFromDatePicker: string = '';

    openCalendar(e) {
        this.isOpen = !this.isOpen;
        this.getInputValue(e);
        if(this.isValidDateInput) {
            this.inputFieldDate = null;
        }
    }

    closeCalendar() {
        if(this.isOpen) {
            if(this.isValidDateInput) {
                this.inputFieldDate = null;
            }
            this.isOpen = false;
        }
    }

    updateDatePickerInputHandler(d) {
        if (this.type === 'single') {
            if (d.selectedDay.id !== 0) {  
                this.inputFieldDate = d.selectedDay.date.toLocaleDateString();
            }
        } else {
            if (d.selectedFirstDay.id !== 0) {
                this.inputFieldDate = d.selectedFirstDay.date.toLocaleDateString() + ' - ' + d.selectedLastDay.date.toLocaleDateString();
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

    ngOnInit() { 
    }

    constructor() { }

}