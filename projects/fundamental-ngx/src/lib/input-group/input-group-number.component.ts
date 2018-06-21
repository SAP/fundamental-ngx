import { Component, Input } from '@angular/core';

@Component({
    selector: 'fd-input-group-number',
    host: {
        class: ''
    },
    templateUrl: './input-group-number.component.html'
})
export class InputGroupNumberComponent {
    @Input() disabled: boolean;

    @Input() inputText: number;

    @Input() placeholder: string;

    getInput() {
        return this.inputText;
    }

    stepUpClicked() {
        this.inputText++;
    }

    stepDownClicked() {
        this.inputText--;
    }
}
