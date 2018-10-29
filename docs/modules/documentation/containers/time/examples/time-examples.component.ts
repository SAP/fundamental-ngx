import { Component } from '@angular/core';

@Component({
    selector: 'fd-time-example',
    templateUrl: './time-example.component.html'
})
export class TimeExampleComponent {

    timeObject = { hour: 12, minute: 0, second: 0 };

}

@Component({
    selector: 'fd-time-12-example',
    templateUrl: './time-12-example.component.html'
})
export class Time12ExampleComponent {

    timeMeridianObject = { hour: 12, minute: 0, second: 0 };

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
    selector: 'fd-time-disabled-example',
    templateUrl: './time-disabled-example.component.html'
})
export class TimeDisabledExampleComponent {

    timeObject = { hour: 12, minute: 0, second: 0 };

}
