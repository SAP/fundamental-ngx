import { Component, ElementRef, EventEmitter, forwardRef, Input, OnInit, Output, ViewChild } from '@angular/core';
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
        class: 'fd-form__item fd-form__item--check',
        '[id]': 'id',
    }
})
export class ToggleComponent implements OnInit, ControlValueAccessor {
    @ViewChild('input')
    inputElement: ElementRef<HTMLInputElement>;

    @Input()
    size: string;

    @Input()
    disabled: boolean = false;

    @Input()
    id: string;

    @Input()
    checked: boolean = false;

    @Input()
    ariaLabel: string = null;

    @Input()
    ariaLabelledby: string = null;

    @Output()
    readonly checkedChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    onChange: any = () => {};
    onTouched: any = () => {};

    constructor(private hasher: HashService) {}

    ngOnInit() {
        if (!this.id) {
            this.id = this.hasher.hash();
        }

        if (this.size && this.size !== 'xs' && this.size !== 's' && this.size !== 'l') {
            this.size = null;
        }
    }

    public focus(): void {
        this.inputElement.nativeElement.focus();
    }

    get innerInputId(): string {
        return `${this.id}-input`;
    }

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

    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

}
