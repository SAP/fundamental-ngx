import { Component, Input, Output, EventEmitter } from '@angular/core';

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

    @Input() type: string;

    @Output() addOnButtonClicked: EventEmitter<any> = new EventEmitter<any>();

    @Output() timeInputChanged: EventEmitter<any> = new EventEmitter<any>();

    buttonClicked($event) {
        this.addOnButtonClicked.emit($event);
    }

    inputChanged() {
        if (this.type === 'time') {
            this.timeInputChanged.emit(this.inputText);
        }
    }
}
