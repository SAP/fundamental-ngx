import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'fd-button-group-switch-example',
    templateUrl: './button-group-switch-example.component.html',

})
export class ButtonGroupSwitchExampleComponent {

    lmr: boolean[] = [false, false, false];

    constructor() {
    }

    isSelectedLMR(x: number): string {
        return this.lmr[x] ? 'selected' : '';
    }

    switchLMR(x: number): void {
        this.lmr[x] = !this.lmr[x];
    }
}
