import { Component } from '@angular/core';
import { FdDate } from '@fundamental-ngx/core';


@Component({
    selector: 'fd-calendar-programmatically-change-example',
    template: `
        <fd-calendar [calType]="'single'"
                     [(ngModel)]="date">
        </fd-calendar>
        <br/>
        <div>Selected Date: {{date.toDateString()}}</div>
        <button fd-button (click)="changeDay()">Next Day</button>
    `,
    styles: [
        `
            button {
                margin-top: 1rem;
            }
        `
    ]
})
export class CalendarProgrammaticallyChangeExampleComponent {

    date = FdDate.getToday();

    public changeDay() {
        this.date = this.date.nextDay();
    }
}
