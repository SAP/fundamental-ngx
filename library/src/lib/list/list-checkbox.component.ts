import { Component, EventEmitter, forwardRef, Input, Output, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

let listCheckboxUniqueId: number = 0;

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
        class: 'fd-form__item fd-form__item--check',
        '[attr.id]': 'id'
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
export class ListCheckboxComponent implements ControlValueAccessor {

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
    id: string = 'fd-list-checkbox-' + listCheckboxUniqueId++;

    /** @hidden */
    onChange: any = () => {};

    /** @hidden */
    onTouched: any = () => {};

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
