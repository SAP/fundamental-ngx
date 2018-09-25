import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'fd-input-group-search',
    host: {
        class: ''
    },
    templateUrl: './input-group-search.component.html'
})
export class InputGroupSearchComponent {
    @Input() disabled: boolean;

    inputTextValue: string;

    @Output()
    inputTextChange = new EventEmitter();

    @Input()
    get inputText() {
        return this.inputTextValue;
    }

    set inputText(value) {
        this.inputTextValue = value;
        this.inputTextChange.emit(this.inputTextValue);
    }

    @Input() placeholder;
}
