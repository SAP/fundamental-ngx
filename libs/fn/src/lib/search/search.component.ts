import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    forwardRef,
    HostBinding,
    Input,
    OnDestroy,
    Output,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Nullable } from '@fundamental-ngx/core/shared';
import { Subscription } from 'rxjs';

let searchUniqueId = 0;

/**
 * The Search component is used to activate or deactivate an element.
 * It uses a visual metaphor to inform the user of the state of the search.
 */
@Component({
    selector: 'fn-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => SearchComponent),
            multi: true
        }
    ],
    host: {
        class: 'fn-search',
        '[attr.id]': 'id'
    },
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent implements ControlValueAccessor, OnDestroy {
    /** @hidden */
    @ViewChild('searchInput')
    inputElement: ElementRef<HTMLInputElement>;

    /** Value for input placeholder */
    @Input()
    placeholder = '';

    /** Return the value in the text box */
    @Input()
    get value(): string {
        return this._getValue();
    }

    set value(value: string) {
        this._setValue(value);
    }

    /** Whether the search is disabled. */
    @Input()
    @HostBinding('class.is-disabled')
    disabled = false;

    /** Id for the search component. If omitted, a unique one is generated. */
    @Input()
    id = `fn-search-${searchUniqueId++}`;

    /** Sets input name attribute. */
    @Input()
    name: string;

    /** aria-label attribute of the inner input element. */
    @Input()
    ariaLabel: Nullable<string>;

    /** aria-labelledby attribute of the inner input element. */
    @Input()
    ariaLabelledby: Nullable<string>;

    /**
     * Event fired when the state of the search changes.
     * *$event* can be used to retrieve the new state of the search.
     */
    @Output()
    readonly search: EventEmitter<string> = new EventEmitter<string>();

    /** @hidden */
    private _subscriptions = new Subscription();

    /** @hidden */
    private _value = '';

    /** @hidden */
    onChange: (value: any) => void = () => {};

    /** @hidden */
    onTouched = (): void => {};

    /** @hidden */
    constructor(private readonly _changeDetectorRef: ChangeDetectorRef) {}

    /** @hidden */
    ngOnDestroy(): void {
        this._subscriptions.unsubscribe();
    }

    /** Get the id of the inner input element of the search. */
    get innerInputId(): string {
        return `${this.id}-input`;
    }

    /**
     * @hidden
     * @param value Sets the value of the *checked* property of the search.
     */
    writeValue(value: any): void {
        this._value = value;
        this.onChange(value);
        this._changeDetectorRef.markForCheck();
    }

    /**
     * @hidden
     * @param fn User defined function that handles the *onChange* event of the search.
     */
    registerOnChange(fn: (value: any) => void): void {
        this.onChange = fn;
    }

    /**
     * @hidden
     * @param fn User defined function that handles the *onTouch* event of the search.
     */
    registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    /** @hidden */
    private _setValue(value: any): void {
        if (value !== this._value) {
            this.writeValue(value);
            this._changeDetectorRef.markForCheck();
        }
    }

    /** @hidden */
    private _getValue(): any {
        return this._value;
    }
}
