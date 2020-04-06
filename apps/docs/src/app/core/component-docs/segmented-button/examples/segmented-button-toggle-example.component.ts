import { Component } from '@angular/core';

@Component({
    selector: 'fd-segmented-button-toggle-example',
    templateUrl: './segmented-button-toggle-example.component.html',

})
export class SegmentedButtonToggleExampleComponent {

    lmr: boolean[] = [false, false, false];

    isSelectedLMR(x: number): string {
        return this.lmr[x] ? 'is-selected' : '';
    }

    toggleLMR(x: number): void {
        this.lmr[x] = !this.lmr[x];
    }
}
