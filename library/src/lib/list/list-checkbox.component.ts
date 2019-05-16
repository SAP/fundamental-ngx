import { Component, EventEmitter, forwardRef, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { HashService } from '../utils/hash.service';

/**
 * The component that represents a checkbox list.
 *
 * ```html
 * <fd-list>
 *    <li fd-list-item>
 *       <fd-list-checkbox>List item 1</fd-list-checkbox>
 *    </li>
 * </fd-list> 
 * ```
 */
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
    ],
    encapsulation: ViewEncapsulation.None
})
export class ListCheckboxComponent implements OnInit, ControlValueAccessor {

    /** Whether the list item checkbox is checked. */
    @Input()
    checked: boolean = false;

    /** Whether the list item checkbox is disabled. */
    @Input()
    disabled: boolean = false;

    /** Event fired when the state of the checkbox changes. Passes back the id and the value. */
    @Output()
    readonly onToggle: EventEmitter<{id: string, value: boolean}> = new EventEmitter<{id: string, value: boolean}>();

    /** Event fired when the checkbox becomes active. */
    @Output()
    readonly onActivated: EventEmitter<string> = new EventEmitter<string>();

    /** The id of the checkbox. */
    @Input()
    id: string;

    /** @hidden */
    onChange: any = () => {};

    /** @hidden */
    onTouched: any = () => {};

    /** @hidden */
    constructor(private hash: HashService) {}

    /** @hidden */
    ngOnInit(): void {
        if (!this.id) {
            this.id = this.hash.hash();

        }
    }

    /** Set the value of the *isChecked* property. */
    get isChecked() {
        return this.checked;
    }

    /** Set the value of the *isChecked* property. */
    set isChecked(value) {
        this.checked = value;
        this.onChange(value);
        this.onTouched();
        this.onToggle.emit({id: this.id, value: value});

        if (this.checked) {
            this.onActivated.emit(this.id);
        }
    }

    /** @hidden */
    writeValue(value: any) {
        this.checked = value;
    }

    /** @hidden */
    registerOnChange(fn) {
        this.onChange = fn;
    }

    /** @hidden */
    registerOnTouched(fn) {
        this.onTouched = fn;
    }

}
