import {
    Component,
    Input,
    Output,
    EventEmitter,
    forwardRef,
    ViewEncapsulation,
    ContentChild,
    TemplateRef,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    ElementRef,
    OnDestroy,
    OnInit,
    Optional,
    Inject,
    ViewChild
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DOCUMENT } from '@angular/common';
import { fromEvent, Subject, Subscription } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

import { FormStates, Nullable } from '@fundamental-ngx/core/shared';
import { ContentDensityService } from '@fundamental-ngx/core/utils';

import { InputGroupAddOnDirective, InputGroupInputDirective } from './input-group-directives';
import { InputGroupPlacement } from './types';

let addOnNonButtonRandomId = 0;
let addOnButtonRandomId = 0;
let addOnInputRandomId = 0;

/**
 * The component that represents an input group.
 * The input group includes form inputs with add-ons that allow the user to better understand the information being entered.
 *
 * ```html
 * <fd-input-group placement="after" addOnText="$" placeholder="Amount">
 * </fd-input-group>
 * ```
 */
@Component({
    selector: 'fd-input-group',
    templateUrl: './input-group.component.html',
    styleUrls: ['./input-group.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => InputGroupComponent),
            multi: true
        }
    ],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputGroupComponent implements ControlValueAccessor, OnInit, OnDestroy {
    /** Input template */
    @Input()
    inputTemplate: TemplateRef<any>;

    /**
     * The placement of the add-on.
     * Options include *before* and *after*
     */
    @Input()
    placement: InputGroupPlacement = 'after';

    /** Whether the input group is in compact mode. */
    @Input()
    compact?: boolean;

    /** If it is mandatory field */
    @Input()
    required = false;

    /** Whether the input group is inline. */
    @Input()
    inline = false;

    /** Placeholder for the input group. */
    @Input()
    placeholder: string;

    /** The text for the add-on. */
    @Input()
    addOnText: string;

    /** Whether AddOn Button should be focusable */
    @Input()
    buttonFocusable = true;

    /** The type of the input, used in Input Group. By default value is set to 'text' */
    @Input()
    type = 'text';

    /** The icon value for the add-on. */
    @Input()
    glyph: Nullable<string>;

    /** Whether the icon add-on or the text add-on is a button. */
    @Input()
    button: boolean;

    /** Whether the input group is disabled. */
    @Input()
    disabled: boolean;

    /** Whether the input group is readonly. */
    @Input()
    readonly: boolean;

    /**
     *  The state of the form control - applies css classes.
     *  Can be `success`, `error`, `warning`, `information` or blank for default.
     */
    @Input()
    state: Nullable<FormStates>;

    /**
     * Whether the input group is a popover control
     */
    @Input()
    isControl = false;

    /**
     * Whether should show focus outline
     */
    @Input()
    showFocus = true;

    /** @hidden */
    @Input()
    isExpanded = false;

    /** Label applied to button with glyph element. */
    @Input()
    glyphAriaLabel: Nullable<string>;

    /** The tooltip for the input group icon. */
    @Input()
    iconTitle: Nullable<string>;

    /** the associated ids for the input aria-labelledby field */
    @Input()
    ariaLabelledby: Nullable<string>;

    /** Event emitted when the add-on button is clicked. */
    @Output()
    addOnButtonClicked: EventEmitter<Event> = new EventEmitter<Event>();

    /**
     * Event emitted when the native clear button is clicked, or when native search is executed.
     * Works only for native search for input[type="search"]
     */
    @Output()
    search: EventEmitter<Event> = new EventEmitter<Event>();

    /** @hidden Focus state */
    get isFocused(): boolean {
        return this._isFocused;
    }

    /** @hidden */
    get _isButtonFocused(): boolean {
        return this._document?.activeElement === this._button?.nativeElement;
    }

    /** @hidden */
    private _isFocused = false;

    /** An RxJS Subject that will kill the stream upon component’s destruction (for unsubscribing)  */
    private readonly _onDestroy$: Subject<void> = new Subject<void>();

    @ContentChild(InputGroupInputDirective)
    inputElement: InputGroupInputDirective;

    /** @hidden */
    @ContentChild(InputGroupAddOnDirective)
    addOnElement: InputGroupAddOnDirective;

    /** @hidden */
    @ViewChild('button', { read: ElementRef })
    readonly _button: ElementRef<any>;

    /** @hidden */
    constructor(
        private readonly elementRef: ElementRef,
        private readonly changeDetectorRef: ChangeDetectorRef,
        @Optional() private readonly _contentDensityService: ContentDensityService,
        @Inject(DOCUMENT) private readonly _document: Document
    ) {}

    /** @hidden */
    inputTextValue: string;

    /** @hidden */
    _inputId = `fd-input-group-input-id-${addOnInputRandomId++}`;

    /** @hidden */
    _addOnNonButtonId = `fd-input-group-non-button-id-${addOnNonButtonRandomId++}`;

    /** @hidden */
    _addOnButtonId = `fd-input-group-button-id-${addOnButtonRandomId++}`;

    /**
     * Whether or not the input coup is in the shellbar. Only for internal use by combobox component
     * @hidden
     */
    inShellbar = false;

    /** @hidden */
    private _subscriptions = new Subscription();

    /** @hidden */
    onChange: any = () => {};

    /** @hidden */
    onTouched: any = () => {};

    /** Get the value of the text input. */
    get inputText(): string {
        return this.inputTextValue;
    }

    /** Set the value of the text input. */
    set inputText(value) {
        this.inputTextValue = value;
        this.onChange(value);
        this.onTouched();
    }

    /** @hidden */
    ngOnInit(): void {
        this._listenElementEvents();
        if (this.compact === undefined && this._contentDensityService) {
            this._subscriptions.add(
                this._contentDensityService._isCompactDensity.subscribe((isCompact) => {
                    this.compact = isCompact;
                    this.changeDetectorRef.markForCheck();
                })
            );
        }
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._subscriptions.unsubscribe();
        this._onDestroy$.next();
        this._onDestroy$.complete();
    }

    /** @hidden */
    writeValue(value: any): void {
        this.inputTextValue = value;
        this.changeDetectorRef.markForCheck();
    }

    /** @hidden */
    registerOnChange(fn): void {
        this.onChange = fn;
    }

    /** @hidden */
    registerOnTouched(fn): void {
        this.onTouched = fn;
    }

    /** @hidden */
    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
        this.changeDetectorRef.detectChanges();
    }

    /** @hidden */
    setInShellbar(value: boolean): void {
        this.inShellbar = value;
        this.changeDetectorRef.detectChanges();
    }

    /** @hidden */
    buttonClicked($event: MouseEvent): void {
        this.addOnButtonClicked.emit($event);
    }

    /** @hidden */
    onSearchEvent(event: Event): void {
        this.search.emit(event);
    }

    /** @hidden */
    preventFocus(event: MouseEvent): void {
        if (!this.buttonFocusable) {
            event.preventDefault();
        }
    }

    /** @hidden
     * calculate the correct ids for input aria-labelledby
     */
    _getAriaLabelledbyIdsForInput(): string {
        let ariaLabelledByIds = this.ariaLabelledby ? this.ariaLabelledby + ' ' : '';
        if (!this.button) {
            ariaLabelledByIds += this._addOnNonButtonId;
        }

        return ariaLabelledByIds;
    }

    /** @hidden */
    private _listenElementEvents(): void {
        fromEvent(this.elementRef.nativeElement, 'focus', { capture: true })
            .pipe(
                tap(() => {
                    this._isFocused = true;
                    this.changeDetectorRef.markForCheck();
                }),
                takeUntil(this._onDestroy$)
            )
            .subscribe();

        fromEvent(this.elementRef.nativeElement, 'blur', { capture: true })
            .pipe(
                tap(() => {
                    this._isFocused = false;
                    this.changeDetectorRef.markForCheck();
                }),
                takeUntil(this._onDestroy$)
            )
            .subscribe();
    }
}
