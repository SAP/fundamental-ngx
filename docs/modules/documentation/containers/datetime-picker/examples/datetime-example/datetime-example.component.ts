import { Component } from '@angular/core';

@Component({
  selector: 'app-datetime-example',
  templateUrl: './datetime-example.component.html'
})
export class DatetimeExampleComponent {
    date: Date = new Date();
}
