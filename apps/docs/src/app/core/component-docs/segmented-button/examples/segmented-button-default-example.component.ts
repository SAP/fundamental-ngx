import { Component } from '@angular/core';

@Component({
    selector: 'fd-segmented-button-default-example',
    templateUrl: './segmented-button-default-example.component.html',

})
export class SegmentedButtonDefaultExampleComponent {

    icon: number = 0;
    lmr: boolean[] = [false, false, false];

    isSelectedIcon(x: number): string {
        return this.icon === x ? 'is-selected' : '';
    }

    isSelectedLMR(x: number): string {
        return this.lmr[x] ? 'is-selected' : '';
    }

    setLocaleIcon(x: number): void {
        this.icon = x;
    }

    toggleLMR(x: number): void {
        this.lmr[x] = !this.lmr[x];
    }
}
