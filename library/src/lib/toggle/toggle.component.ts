import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { HashService } from '../utils/hash.service';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

/**
 * The Toggle component is used to activate or deactivate an element. It uses a visual metaphor to inform the user of the state of the toggle. 
 */
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

    /** @Input The size of the toggle. Can be one of the four *xs*, *s*, *l*, *error* or default. */
    @Input()
    size: string;

    /** @Input Whether the toggle is disabled. */
    @Input()
    disabled: boolean = false;

    /** @Input Id for the toggle component. If omitted, a unique one is generated. */
    @Input()
    id: string;

    /** @Input Whether the toggle is checked. */
    @Input()
    checked: boolean = false;

    /** @Output Event fired when the toggle is checked. */
    @Output()
    checkedChange = new EventEmitter<boolean>();

    /** @hidden */
    onChange: any = () => { };

    /** @hidden */
    onTouched: any = () => { };

    /** Get the isChecked property of the toggle. */
    get isChecked() {
        return this.checked;
    }

    /** Set the isChecked property of the toggle. */
    set isChecked(value) {
        this.checked = value;
        this.onChange(value);
        this.onTouched();
        this.checkedChange.emit(value);
    }

    /**
     * @param value Sets the value of the *checked* property of the toggle.
     */
    writeValue(value: any) {
        this.checked = value;
    }

    /**
     * @param fn User defined function that handles the *onChange* event of the toggle.
     */
    registerOnChange(fn) {
        this.onChange = fn;
    }

    /**
     * @param fn User defined function that handles the *onTouch* event of the toggle.
     */
    registerOnTouched(fn) {
        this.onTouched = fn;
    }

    /** @hidden */
    constructor(private hasher: HashService) {
    }

    /** @hidden */
    ngOnInit() {
        if (!this.id) {
            this.id = this.hasher.hash();
        }

        if (this.size && this.size !== 'xs' && this.size !== 's' && this.size !== 'l') {
            this.size = null;
        }
    }

}
