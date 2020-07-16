import { Component } from '@angular/core';

@Component({
    selector: 'fd-time-no-spinners-example',
    templateUrl: './time-no-spinners-example.component.html'
})
export class TimeNoSpinnersExampleComponent {
    time = { hour: 9, minute: 0, second: 0 };
}
