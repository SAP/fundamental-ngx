import { Component } from '@angular/core';

@Component({
    selector: 'fd-time-programmatically-example',
    templateUrl: './time-programmatically-example.component.html'
})
export class TimeProgrammaticallyExampleComponent {
    timeObject = { hour: 12, minute: 0, second: 0 };

    change(): void {
        this.timeObject.hour = 11;
        this.timeObject = {...this.timeObject};
    }
}
