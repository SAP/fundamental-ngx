import { Component } from '@angular/core';

@Component({
    selector: 'app-datetime-program-example',
    templateUrl: './datetime-program-example.component.html'
})
export class DatetimeProgramExampleComponent {
    date = new Date();

    decrementMonth(): void {
        this.date = new Date(this.date.getTime() - 86400000);
    }
}
