import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'fd-input-group',
    templateUrl: './input-group.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => InputGroupComponent),
            multi: true
        }
    ]
})
export class InputGroupComponent implements ControlValueAccessor {
    @Input()
    placement: string;

    @Input()
    compact: boolean = false;

    @Input()
    inline: boolean;

    @Input()
    placeholder: string;

    @Input()
    addOnText: string;

    @Input()
    glyph: string;

    @Input()
    button: boolean;

    @Input()
    disabled: boolean;

    @Output()
    addOnButtonClicked: EventEmitter<any> = new EventEmitter<any>();

    inputTextValue: string;

    onChange: any = () => {};
    onTouched: any = () => {};

    get inputText() {
        return this.inputTextValue;
    }

    set inputText(value) {
        this.inputTextValue = value;
        this.onChange(value);
        this.onTouched();
    }

    writeValue(value: any) {
        this.inputTextValue = value;
    }

    registerOnChange(fn) {
        this.onChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouched = fn;
    }

    buttonClicked($event) {
        this.addOnButtonClicked.emit($event);
    }
}
