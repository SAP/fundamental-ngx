import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    Output,
    ViewChild,
    ViewEncapsulation,
    inject
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CvaControl, CvaDirective, FD_FORM_FIELD_CONTROL } from '@fundamental-ngx/cdk/forms';
import { Nullable } from '@fundamental-ngx/cdk/utils';
import { ContentDensityObserver, contentDensityObserverProviders } from '@fundamental-ngx/core/content-density';
import { FormItemControl, registerFormItemControl } from '@fundamental-ngx/core/form';
import { IconComponent } from '@fundamental-ngx/core/icon';
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
    styleUrl: './switch.component.scss',
    providers: [
        CvaControl,
        { provide: FD_FORM_FIELD_CONTROL, useExisting: SwitchComponent, multi: true },
        registerFormItemControl(SwitchComponent),
        contentDensityObserverProviders()
    ],
    host: {
        class: 'fd-form__item fd-form__item--check fd-switch-custom',
        '[attr.id]': 'id',
        '(focusout)': '_cva.onTouched()'
    },
    hostDirectives: [
        {
            directive: CvaDirective,
            inputs: ['state', 'stateMessage', 'disabled', 'name', 'readonly', 'ariaLabelledBy', 'ariaLabel']
        }
    ],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [FormsModule, FdTranslatePipe, IconComponent]
})
export class SwitchComponent implements OnInit, OnDestroy, FormItemControl {
    /** @hidden */
    @ViewChild('switchInput')
    inputElement: ElementRef<HTMLInputElement>;

    /** Optional text for the active state of the switch. */
    @Input()
    activeText = '';

    /** Optional text for the inactive state of the switch. */
    @Input()
    inactiveText = '';

    /** Id for the switch component. If omitted, a unique one is generated. */
    @Input()
    id = `fd-switch-${switchUniqueId++}`;

    /** If it is mandatory field */
    @Input()
    required = false;

    /** Whether the switch is checked. */
    @Input()
    set checked(value: boolean) {
        this._cva.value = value;
    }
    get checked(): boolean {
        return this._cva.value;
    }

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
    readonly _cva = inject<CvaDirective<boolean>>(CvaDirective);

    /** @hidden */
    private _subscriptions = new Subscription();

    /** @hidden */
    private readonly _cvaControl = inject(CvaControl);

    /** @hidden */
    constructor(readonly _contentDensityObserver: ContentDensityObserver) {
        // Set initial value.
        this._cva.value = false;
    }

    /** @hidden */
    ngOnInit(): void {
        this._cvaControl.listenToChanges();
    }

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
        this._cva.setValue(value);
        this.checkedChange.emit(value);
        setTimeout(() => {
            // add the no-animate class after the transition duration, 100ms
            this._switchLabelWrapperEl.nativeElement.classList.add('fd-switch-no-animate');
        }, 100);
    }
    get isChecked(): boolean {
        return this._cva.value;
    }
}
