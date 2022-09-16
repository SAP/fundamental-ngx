import { Component } from '@angular/core';

@Component({
    selector: 'fd-progress-indicator-state',
    templateUrl: './progress-indicator-state.component.html'
})
export class ProgressIndicatorStateComponent {
    customUnitValueNow = 45;
    customUnitValueMax = 100;
    customUnits = 'MB';

    getLabel(): string {
        return this.customUnitValueNow + ' of ' + this.customUnitValueMax + ' ' + this.customUnits;
    }
}
