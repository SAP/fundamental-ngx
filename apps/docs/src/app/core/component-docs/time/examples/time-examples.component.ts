import { Component, Input } from '@angular/core';

@Component({
    selector: 'fd-time-example',
    templateUrl: './time-example.component.html'
})
export class TimeExampleComponent {

    @Input()
    timeObject = { hour: 14, minute: 3, second: 2 };

}

@Component({
    selector: 'fd-time-12-example',
    templateUrl: './time-12-example.component.html'
})
export class Time12ExampleComponent {

    timeMeridianObject = { hour: 9, minute: 0, second: 0 };
}

@Component({
    selector: 'fd-time-no-spinners-example',
    templateUrl: './time-no-spinners-example.component.html'
})
export class TimeNoSpinnersExampleComponent {

    timeNoSpinnersObject = { hour: 12, minute: 0, second: 0 };

}

@Component({
    selector: 'fd-time-no-seconds-example',
    templateUrl: './time-no-seconds-example.component.html'
})
export class TimeNoSecondsExampleComponent {

    timeNoSecondsObject = { hour: 12, minute: 0, second: null };

}

@Component({
    selector: 'fd-time-only-hours-example',
    templateUrl: './time-only-hours-example.component.html'
})
export class TimeOnlyHoursExampleComponent {

    onlyHoursTime = { hour: 12, minute: null, second: null };

}

@Component({
    selector: 'fd-time-disabled-example',
    templateUrl: './time-disabled-example.component.html'
})
export class TimeDisabledExampleComponent {

    timeObject = { hour: 12, minute: 0, second: 0 };

}
