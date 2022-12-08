import { Component } from '@angular/core';

@Component({
    selector: 'fd-progress-indicator-default',
    templateUrl: './progress-indicator-default.component.html'
})
export class ProgressIndicatorDefaultComponent {
    customUnitValueNow = 80;
    customUnitValueMax = 100;
    customUnits = 'MB';

    getLabel(): string {
        return this.customUnitValueNow + ' of ' + this.customUnitValueMax + ' ' + this.customUnits;
    }
}
