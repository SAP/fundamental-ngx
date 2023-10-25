import { AsyncPipe, NgIf } from '@angular/common';
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnDestroy,
    Output,
    ViewChild,
    ViewEncapsulation,
    forwardRef
} from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Nullable } from '@fundamental-ngx/cdk/utils';
import { ContentDensityObserver, contentDensityObserverProviders } from '@fundamental-ngx/core/content-density';
import { FormItemControl, registerFormItemControl } from '@fundamental-ngx/core/form';
import { FdTranslatePipe } from '@fundamental-ngx/i18n';
import { Subscription } from 'rxjs';

let switchUniqueId = 0;

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
        },
        registerFormItemControl(SwitchComponent),
        contentDensityObserverProviders()
    ],
    host: {
        class: 'fd-form__item fd-form__item--check fd-switch-custom',
        '[attr.id]': 'id',
        '(focusout)': 'onTouched()'
    },
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [NgIf, FormsModule, AsyncPipe, FdTranslatePipe]
})
export class SwitchComponent implements ControlValueAccessor, OnDestroy, FormItemControl {
    /** @hidden */
    @ViewChild('switchInput')
    inputElement: ElementRef<HTMLInputElement>;

    /** Optional text for the active state of the switch. */
    @Input()
    activeText = '';

    /** Optional text for the inactive state of the switch. */
    @Input()
    inactiveText = '';

    /** Whether the switch is disabled. */
    @Input()
    disabled = false;

    /** Id for the switch component. If omitted, a unique one is generated. */
    @Input()
    id = `fd-switch-${switchUniqueId++}`;

    /** Sets input name attribute. */
    @Input()
    name: string;

    /** If it is mandatory field */
    @Input()
    required = false;

    /** Whether the switch is checked. */
    @Input()
    checked = false;

    /** Whether the switch is semantic */
    @Input()
    semantic = false;

    /** aria-label attribute of the inner input element. */
    @Input()
    ariaLabel: Nullable<string>;

    /** aria-labelledby attribute of the inner input element. */
    @Input()
    ariaLabelledBy: Nullable<string>;

    /**
     * Event fired when the state of the switch changes.
     * *$event* can be used to retrieve the new state of the switch.
     */
    @Output()
    readonly checkedChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    /** @hidden */
    @ViewChild('switchEl', { read: ElementRef })
    _switchLabelWrapperEl: ElementRef;

    /** @hidden */
    private _subscriptions = new Subscription();

    /** @hidden */
    constructor(
        private readonly _changeDetectorRef: ChangeDetectorRef,
        readonly _contentDensityObserver: ContentDensityObserver
    ) {}

    /** @hidden */
    onChange: (value: boolean) => void = () => {};

    /** @hidden */
    onTouched = (): void => {};

    /** @hidden */
    ngOnDestroy(): void {
        this._subscriptions.unsubscribe();
    }

    /** Set focus on the input element. */
    focus(): void {
        this.inputElement.nativeElement.focus();
    }

    /** Get the id of the inner input element of the switch. */
    get innerInputId(): string {
        return `${this.id}-input`;
    }

    /** Get the id of the semantic label element of the switch. */
    get _semanticLabelId(): string {
        return `${this.id}-semantic-label`;
    }

    /** Checked property of the switch. */
    set isChecked(value) {
        this._switchLabelWrapperEl.nativeElement.classList.remove('fd-switch-no-animate');
        this.writeValue(value);
        this.checkedChange.emit(value);
        setTimeout(() => {
            // add the no-animate class after the transition duration, 100ms
            this._switchLabelWrapperEl.nativeElement.classList.add('fd-switch-no-animate');
        }, 100);
    }
    get isChecked(): boolean {
        return this.checked;
    }

    /**
     * @hidden
     * @param value Sets the value of the *checked* property of the switch.
     */
    writeValue(value: any): void {
        this.checked = value;
        this.onChange(value);
        this._changeDetectorRef.detectChanges();
    }

    /**
     * @hidden
     * @param fn User defined function that handles the *onChange* event of the switch.
     */
    registerOnChange(fn: (value: boolean) => void): void {
        this.onChange = fn;
    }

    /**
     * @hidden
     * @param fn User defined function that handles the *onTouch* event of the switch.
     */
    registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    /**
     * @hidden
     * @param isDisabled Sets the value of the *disabled* property of the switch.
     */
    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
        this._changeDetectorRef.detectChanges();
    }
}
