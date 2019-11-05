import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'fd-button-group-default-example',
    templateUrl: './button-group-default-example.component.html',

})
export class ButtonGroupDefaultExampleComponent {

    icon: number = 0;
    lmr: number = 0;

    constructor() {
    }


    isSelectedIcon(x: number): string {
        return this.icon === x ? 'selected' : '';
    }

    isSelectedLMR(x: number): string {
        return this.lmr === x ? 'selected' : '';
    }

    setLocaleIcon(x: number): void {
        this.icon = x;
    }

    setLocaleLMR(x: number): void {
        this.lmr = x;
    }
}
