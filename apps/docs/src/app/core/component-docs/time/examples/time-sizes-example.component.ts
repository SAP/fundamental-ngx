import { Component } from '@angular/core';

@Component({
    selector: 'fd-time-sizes-example',
    templateUrl: './time-sizes-example.component.html'
})
export class TimeSizesExampleComponent {
    timeCompactObject = { hour: 9, minute: 0, second: 0 };
    timeTabletObject = { hour: 9, minute: 0, second: 0 };
}
