import { Component, Directive, OnChanges, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'fd-input-group',
    host: {
        class: ''
    },
    templateUrl: './input-group.component.html'
})
export class InputGroupComponent {
    @Input() placement: string;

    @Input() inline: boolean;

    @Input() placeholder: string;

    @Input() addOnText: string;

    @Input() glyph: string;

    @Input() inputText: string;

    @Input() button: boolean;

    @Input() disabled: boolean;

    @Output() addOnButtonClicked: EventEmitter<any> = new EventEmitter<any>();

    buttonClicked($event) {
        this.addOnButtonClicked.emit($event);
    }
}

@Component({
    selector: 'fd-input-group-number',
    host: {
        class: ''
    },
    templateUrl: './input-group-number.component.html'
})
export class InputGroupNumber {
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

@Component({
    selector: 'fd-input-group-search',
    host: {
        class: ''
    },
    templateUrl: './input-group-search.component.html'
})
export class InputGroupSearch {
    @Input() disabled: boolean;

    @Input() inputText: string;

    @Input() placeholder;

    getInput() {
        return this.inputText;
    }
}
