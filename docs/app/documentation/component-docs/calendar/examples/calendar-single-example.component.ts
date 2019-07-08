import { Component } from '@angular/core';
import { FdDate } from '../../../../../../library/src/lib/calendar/calendar2/models/fd-date';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'fd-calendar-single-example',
    template: `
        <fd-calendar [calType]="'single'"
                     [(ngModel)]="selectedDay"
                     [blockFunction]="myBlockFunction"
                     [startingDayOfWeek]="4"
                     [disableFunction]="myDisableFunction">
        </fd-calendar>
        
        <fd-calendar2
            [disableFunction]="myDisableFunction2"
            [calType]="'single'"
            [(selectedDate)]="selectedDay2"
        ></fd-calendar2>

        <form [formGroup]="customForm">
            <fd-calendar2 formControlName="date"></fd-calendar2>
        </form>

        Touched: {{customForm.controls.date.touched}}<br/>
        Dirty: {{customForm.controls.date.dirty}}<br/>

        Selected Date: {{ customForm.controls.date?.value?.date?.toDate() ? customForm.controls.date.value.date.toDate().toDateString() : 'null' }}
        
        <form [formGroup]="customForm">
            <fd-calendar2 formControlName="dateRange" [calType]="'range'"></fd-calendar2>
        </form>

        Touched: {{customForm.controls.dateRange.touched}}<br/>
        Dirty: {{customForm.controls.dateRange.dirty}}<br/>

        Selected Date start: {{ customForm.controls.dateRange?.value?.start?.toDate() ? customForm.controls.dateRange.value.start.toDate().toDateString() : 'null' }}
        <br/>
        Selected Date end: {{ customForm.controls.dateRange?.value?.end?.toDate() ? customForm.controls.dateRange.value.end.toDate().toDateString() : 'null' }}
        <br/>
        
        <fd-calendar2
            [stringDate]="str"
        ></fd-calendar2>
        <input [(ngModel)]="str" type="text">
        <button fd-button>Get Date</button>
        
        
        <button fd-button (click)="disableWednesday()">Disable Wednesday</button>
        <br/><br/>
        <div>Selected Date: {{selectedDay.date.toDateString()}}</div>
        <div>Selected Date: {{selectedDay2.toDate().toDateString()}}</div>`
})
export class CalendarSingleExampleComponent {
    selectedDay = {
        date: new Date()
    };
    customForm = new FormGroup({
        date: new FormControl({ date: FdDate.getToday() }),
        dateRange: new FormControl({ start: null, end: null })
    });

    str

    selectedDay2: FdDate = new FdDate(2018, 10, 30);

    myDisableFunction = function(d: Date): boolean {
        const day = d.getDay();
        return day === 6 || day === 0;
    };

    myDisableFunction2 = function(d: FdDate): boolean {
        const day = d.toDate().getDay();
        return day === 6 || day === 0;
    };

    // Block days before/after any day
    myBlockFunction = function(d: Date): boolean {
        const firstDay = new Date(2018, 7, 25);
        const lastDay = new Date(2018, 7, 30);
        return d.getTime() > firstDay.getTime() && d.getTime() < lastDay.getTime();
    };

    disableWednesday() {
        this.myDisableFunction = function(d: Date): boolean {
            const day = d.getDay();
            return day === 3;
        };
        this.myDisableFunction2 = function(d: FdDate) {
            const day = d.toDate().getDay();
            return day === 3;
        }
    }
}
