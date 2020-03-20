import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    forwardRef,
    Input,
    Output,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

let switchUniqueId: number = 0;

/**
 * The Switch component is used to activate or deactivate an element.
 * It uses a visual metaphor to inform the user of the state of the switch.
 */
@Component({
    selector: 'fd-switch',
    templateUrl: './switch.component.html',
    styleUrls: ['./switch.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => SwitchComponent),
            multi: true
        }
    ],
    host: {
        class: 'fd-form__item fd-form__item--check fd-switch-custom',
        '[attr.id]': 'id',
    },
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SwitchComponent implements ControlValueAccessor {
    /** @hidden */
    @ViewChild('switchInput')
    inputElement: ElementRef<HTMLInputElement>;

    /** If the switch should have text in it or not. */
    @Input()
    optionalText: boolean = false;

    /** Whether the switch is disabled. */
    @Input()
    disabled: boolean = false;

    /** Id for the switch component. If omitted, a unique one is generated. */
    @Input()
    id: string = 'fd-switch-' + switchUniqueId++;

    /** Whether the switch is checked. */
    @Input()
    checked: boolean = false;

    /** Whether the switch is semantic */
    @Input()
    semantic: boolean = false;

    /** Whether the switch is compact */
    @Input()
    compact: boolean = false;

    /** aria-label attribute of the inner input element. */
    @Input()
    ariaLabel: string = null;

    /** aria-labelledby attribute of the inner input element. */
    @Input()
    ariaLabelledby: string = null;


    /**
     * Event fired when the state of the switch changes.
     * *$event* can be used to retrieve the new state of the switch.
     */
    @Output()
    readonly checkedChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    /** @hidden */
    onChange: any = () => { };

    /** @hidden */
    onTouched: any = () => { };

    constructor(private changeDetectorRef: ChangeDetectorRef) { }

    /** Set focus on the input element. */
    public focus(): void {
        this.inputElement.nativeElement.focus();
    }

    /** Get the id of the inner input element of the switch. */
    get innerInputId(): string {
        return `${this.id}-input`;
    }

    /** Get the isChecked property of the switch. */
    get isChecked(): boolean {
        return this.checked;
    }

    /** Set the isChecked property of the switch. */
    set isChecked(value) {
        this.checked = value;
        this.onChange(value);
        this.onTouched();
        this.checkedChange.emit(value);
    }

    /**
     * @hidden
     * @param value Sets the value of the *checked* property of the switch.
     */
    writeValue(value: any): void {
        this.checked = value;
        this.changeDetectorRef.detectChanges();
    }

    /**
     * @hidden
     * @param fn User defined function that handles the *onChange* event of the switch.
     */
    registerOnChange(fn): void {
        this.onChange = fn;
    }

    /**
     * @hidden
     * @param fn User defined function that handles the *onTouch* event of the switch.
     */
    registerOnTouched(fn): void {
        this.onTouched = fn;
    }

    /**
     * @hidden
     * @param isDisabled Sets the value of the *disabled* property of the switch.
     */
    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
        this.changeDetectorRef.detectChanges();
    }

}
