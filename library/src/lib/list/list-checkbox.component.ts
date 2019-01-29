import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { HashService } from '../utils/hash.service';

@Component({
    selector: 'fd-list-checkbox',
    host: {
        class: 'fd-form__item fd-form__item--check'
    },
    templateUrl: './list-checkbox.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ListCheckboxComponent),
            multi: true
        }
    ]
})
export class ListCheckboxComponent implements OnInit, ControlValueAccessor {

    @Input()
    checked: boolean = false;

    @Input()
    disabled: boolean = false;

    @Output()
    onToggle = new EventEmitter<{id: string, value: boolean}>();

    @Output()
    onActivated = new EventEmitter<string>();

    @Input()
    id: string;

    onChange: any = () => {};
    onTouched: any = () => {};

    constructor(private hash: HashService) {}

    ngOnInit(): void {
        if (!this.id) {
            this.id = this.hash.hash();

        }
    }

    get isChecked() {
        return this.checked;
    }

    set isChecked(value) {
        this.checked = value;
        this.onChange(value);
        this.onTouched();
        this.onToggle.emit({id: this.id, value: value});

        if (this.checked) {
            this.onActivated.emit(this.id);
        }
    }

    writeValue(value: any) {
        this.checked = value;
    }

    registerOnChange(fn) {
        this.onChange = fn;
    }

    registerOnTouched(fn) {
        this.onTouched = fn;
    }

}
