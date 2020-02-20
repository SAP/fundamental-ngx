import { Component } from '@angular/core';

@Component({
    selector: 'fd-button-group-toggle-example',
    templateUrl: './button-group-toggle-example.component.html',

})
export class ButtonGroupToggleExampleComponent {

    lmr: boolean[] = [false, false, false];

    isSelectedLMR(x: number): string {
        return this.lmr[x] ? 'selected' : '';
    }

    toggleLMR(x: number): void {
        this.lmr[x] = !this.lmr[x];
    }
}
