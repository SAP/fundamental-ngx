import { Component } from '@angular/core';

@Component({
    selector: 'fd-button-group-default-example',
    templateUrl: './button-group-default-example.component.html',

})
export class ButtonGroupDefaultExampleComponent {

    icon: number = 0;
    lmr: boolean[] = [false, false, false];

    isSelectedIcon(x: number): string {
        return this.icon === x ? 'selected' : '';
    }

    isSelectedLMR(x: number): string {
        return this.lmr[x] ? 'selected' : '';
    }

    setLocaleIcon(x: number): void {
        this.icon = x;
    }

    toggleLMR(x: number): void {
        this.lmr[x] = !this.lmr[x];
    }
}
