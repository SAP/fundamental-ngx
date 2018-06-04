import { Component, Input } from '@angular/core';

@Component({
    selector: 'fd-input-group-search',
    host: {
        class: ''
    },
    templateUrl: './input-group-search.component.html'
})
export class InputGroupSearchComponent {
    @Input() disabled: boolean;

    @Input() inputText: string;

    @Input() placeholder;

    getInput() {
        return this.inputText;
    }
}
