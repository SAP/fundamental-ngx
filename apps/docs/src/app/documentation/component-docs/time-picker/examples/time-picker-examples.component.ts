import { Component } from '@angular/core';

@Component({
    selector: 'fd-time-picker-example',
    templateUrl: './time-picker-example.component.html'
})
export class TimePickerExampleComponent {

    timeObject = { hour: 12, minute: 0, second: 0 };

}

@Component({
    selector: 'fd-time-picker-12-example',
    templateUrl: './time-picker-12-example.component.html'
})
export class TimePicker12ExampleComponent {

    timeMeridianObject = { hour: 12, minute: 0, second: 0 };

}

@Component({
    selector: 'fd-time-picker-no-seconds-example',
    templateUrl: './time-picker-no-seconds-example.component.html'
})
export class TimePickerNoSecondsExampleComponent {

    timePickerNoSecondsObject = { hour: 12, minute: 0, second: null };

}

@Component({
    selector: 'fd-time-picker-only-hours-example',
    templateUrl: './time-picker-only-hours-example.component.html'
})
export class TimePickerOnlyHoursExampleComponent {

    timePickerOnlyHoursObject = { hour: 12, minute: null, second: null };

}

@Component({
    selector: 'fd-time-picker-disabled-example',
    templateUrl: './time-picker-disabled-example.component.html'
})
export class TimePickerDisabledExampleComponent {

    timeObject = { hour: 12, minute: 0, second: 0 };

}

@Component({
    selector: 'fd-time-picker-compact-example',
    templateUrl: './time-picker-compact-example.component.html'
})
export class TimePickerCompactExampleComponent {

    timeObject = { hour: 12, minute: 0, second: 0 };

}
@Component({
    selector: 'fd-time-picker-allow-null-example',
    templateUrl: './time-picker-allow-null-example.component.html'
})
export class TimePickerAllowNullExampleComponent {

    timeObject = { hour: 12, minute: 0, second: 0 };

}
