import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'fd-multi-input',
    templateUrl: './multi-input.component.html',
    styleUrls: ['./multi-input.component.scss'],
    host: {
        '(blur)': 'onTouched()'
    },
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => MultiInputComponent),
            multi: true
        }
    ]
})
export class MultiInputComponent implements OnInit, ControlValueAccessor {

    @Input()
    placeholder: string = '';

    @Input()
    disabled: boolean = false;

    @Input()
    compact: boolean = false;

    @Input()
    glyph: string = 'navigation-down-arrow';

    @Input()
    dropdownValues: string[] = [];

    @Input()
    searchTerm: string;

    @Output()
    searchTermChange: EventEmitter<string> = new EventEmitter<string>();

    isOpen = false;

    tokens = [];

    onChange: Function = () => {};
    onTouched: Function = () => {};

    constructor() {
    }

    ngOnInit() {
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    writeValue(obj: any): void {
    }

}
