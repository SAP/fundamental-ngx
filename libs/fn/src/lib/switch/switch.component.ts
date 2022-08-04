import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    forwardRef,
    Input,
    OnDestroy,
    OnInit,
    Optional,
    Output,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ContentDensityService } from '@fundamental-ngx/core/utils';
import { Nullable } from '@fundamental-ngx/core/shared';

let switchUniqueId = 0;

/**
 * The Switch component is used to activate or deactivate an element.
 * It uses a visual metaphor to inform the user of the state of the switch.
 */
@Component({
    selector: 'fn-switch',
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
        class: 'fn-form__item fn-form__item--check fn-switch-custom',
        '[attr.id]': 'id'
    },
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SwitchComponent implements ControlValueAccessor, OnInit, OnDestroy {
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
    id = `fn-switch-${switchUniqueId++}`;

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

    /** Whether the switch is compact */
    @Input()
    compact: Nullable<boolean>;

    /** aria-label attribute of the inner input element. */
    @Input()
    ariaLabel: Nullable<string>;

    /** aria-labelledby attribute of the inner input element. */
    @Input()
    ariaLabelledby: Nullable<string>;

    /**
     * @deprecated use i18n capabilities instead
     * Semantic Label Accept set for Accessibility
     */
    @Input()
    semanticAcceptLabel: string;

    /**
     * @deprecated use i18n capabilities instead
     * Semantic Label Decline set for Accessibility
     */
    @Input()
    semanticDeclineLabel: string;

    /**
     * Event fired when the state of the switch changes.
     * *$event* can be used to retrieve the new state of the switch.
     */
    @Output()
    readonly checkedChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    /** @hidden */
    private _subscriptions = new Subscription();

    /** @hidden */
    onChange: (value: boolean) => void = () => {};

    /** @hidden */
    onTouched = (): void => {};

    constructor(
        private readonly _changeDetectorRef: ChangeDetectorRef,
        @Optional() private _contentDensityService: ContentDensityService
    ) {}

    /** @hidden */
    ngOnInit(): void {
        if (this.compact === undefined && this._contentDensityService) {
            this._subscriptions.add(
                this._contentDensityService._isCompactDensity.subscribe((isCompact) => {
                    this.compact = isCompact;
                    this._changeDetectorRef.markForCheck();
                })
            );
        }
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
