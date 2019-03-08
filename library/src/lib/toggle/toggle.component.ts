import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { HashService } from '../utils/hash.service';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'fd-toggle',
    templateUrl: './toggle.component.html',
    styleUrls: ['./toggle.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ToggleComponent),
            multi: true
        }
    ],
    host: {
        class: 'fd-form__item fd-form__item--check'
    }
})
export class ToggleComponent implements OnInit, ControlValueAccessor {

    @Input()
    size: string;

    @Input()
    disabled: boolean = false;

    @Input()
    id: string;

    @Input()
    checked: boolean = false;

    @Output()
    checkedChange = new EventEmitter<boolean>();

    onChange: any = () => {};
    onTouched: any = () => {};

    get isChecked() {
        return this.checked;
    }

    set isChecked(value) {
        this.checked = value;
        this.onChange(value);
        this.onTouched();
        this.checkedChange.emit(value);
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

    constructor(private hasher: HashService) {
    }

    ngOnInit() {
        if (!this.id) {
            this.id = this.hasher.hash();
        }

        if (this.size && this.size !== 'xs' && this.size !== 's' && this.size !== 'l') {
            this.size = null;
        }
    }

}
