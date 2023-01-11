import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChild,
    ElementRef,
    EventEmitter,
    forwardRef,
    Input,
    isDevMode,
    OnDestroy,
    Output,
    TemplateRef,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { filter, fromEvent, map, merge, Observable, Subject, takeUntil, debounceTime } from 'rxjs';

import { Nullable } from '@fundamental-ngx/cdk/utils';
import { FormItemControl, registerFormItemControl } from '@fundamental-ngx/core/form';

import { InputGroupAddOnDirective, InputGroupInputDirective } from './input-group-directives';
import { InputGroupPlacement } from './types';
import { FormStates } from '@fundamental-ngx/cdk/forms';

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
        },
        registerFormItemControl(InputGroupComponent)
    ],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '(focusout)': '_focusOut($event)'
    }
})
export class InputGroupComponent implements ControlValueAccessor, AfterViewInit, OnDestroy, FormItemControl {
    /** @deprecated Input template, use fd-input-group-input directive instead. */
    @Input()
    set inputTemplate(value: TemplateRef<any>) {
        if (isDevMode()) {
            console.warn('"inputTemplate" is deprecated. Use "fd-input-group-input" directive instead');
        }

        this._inputTemplate = value;
    }

    get inputTemplate(): TemplateRef<any> {
        return this._inputTemplate;
    }

    /**
     * The placement of the add-on.
     * Options include *before* and *after*
     */
    @Input()
    placement: InputGroupPlacement = 'after';

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

    /** @deprecated renamed to "ariaLabelledBy" */
    @Input()
    set ariaLabelledby(value: Nullable<string>) {
        if (isDevMode()) {
            console.warn('"ariaLabelledby" is deprecated. Use "ariaLabelledBy" instead');
        }
        this.ariaLabelledBy = value;
    }

    /** the associated ids for the input aria-labelledby field */
    @Input()
    ariaLabelledBy: Nullable<string>;

    /** Event emitted when the add-on button is clicked. */
    @Output()
    addOnButtonClicked = new EventEmitter<Event>();

    /**
     * Event emitted when the native clear button is clicked, or when native search is executed.
     * Works only for native search for input[type="search"]
     */
    @Output()
    search = new EventEmitter<Event>();

    /** @hidden */
    @ContentChild(InputGroupInputDirective)
    inputElement: InputGroupInputDirective;

    /** @hidden */
    @ViewChild(InputGroupInputDirective)
    localInputElement: InputGroupInputDirective;

    /** @hidden */
    @ContentChild(InputGroupAddOnDirective)
    addOnElement: InputGroupAddOnDirective;

    /** @hidden */
    _inputTextValue: string;

    /** @hidden */
    _inputId = `fd-input-group-input-id-${addOnInputRandomId++}`;

    /** @hidden */
    _addOnNonButtonId = `fd-input-group-non-button-id-${addOnNonButtonRandomId++}`;

    /** @hidden */
    _addOnButtonId = `fd-input-group-button-id-${addOnButtonRandomId++}`;

    /** @hidden */
    _inputFocused$: Observable<boolean>;

    /**
     * Whether the input group is in the shellbar. Only for internal use by combobox component.
     * @hidden
     */
    inShellbar = false;

    /** @hidden */
    private _inputTemplate: TemplateRef<any>;

    /** An RxJS Subject that will kill the stream upon component’s destruction (for unsubscribing)  */
    private readonly _onDestroy$: Subject<void> = new Subject<void>();

    /** @hidden */
    onChange: any = () => {};

    /** @hidden */
    onTouched: any = () => {};

    /** Value of the text input. */
    set inputText(value) {
        this._inputTextValue = value;

        this.onChange(value);
    }
    get inputText(): string {
        return this._inputTextValue;
    }

    /** @hidden
     *  Calculate the correct ids for input aria-labelledby
     */
    get _inputAriaLabelledBy(): string {
        let ariaLabelledByIds = this.ariaLabelledBy ? this.ariaLabelledBy + ' ' : '';

        if (!this.button) {
            ariaLabelledByIds += this._addOnNonButtonId;
        }

        return ariaLabelledByIds;
    }

    /** @hidden */
    constructor(private readonly _elementRef: ElementRef, private readonly _changeDetectorRef: ChangeDetectorRef) {}

    /** @hidden */
    get elementRef(): ElementRef<HTMLElement> {
        return this._elementRef;
    }

    /** @hidden */
    ngAfterViewInit(): void {
        this._listenInputFocus();
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._onDestroy$.next();
        this._onDestroy$.complete();
    }

    /** @hidden */
    writeValue(value: any): void {
        this._inputTextValue = value;

        this._changeDetectorRef.markForCheck();
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

        this._changeDetectorRef.detectChanges();
    }

    /** @hidden */
    setInShellbar(value: boolean): void {
        this.inShellbar = value;

        this._changeDetectorRef.detectChanges();
    }

    /** @hidden */
    _buttonClicked(event: Event): void {
        this.addOnButtonClicked.emit(event);
    }

    /** @hidden */
    _onSearchEvent(event: Event): void {
        this.search.emit(event);
    }

    /** @hidden */
    _preventFocus(event: MouseEvent): void {
        if (!this.buttonFocusable) {
            event.preventDefault();
        }
    }

    /** @hidden */
    private _listenInputFocus(): void {
        const inputElement =
            this.inputElement?.elementRef()?.nativeElement || this.localInputElement?.elementRef()?.nativeElement;

        if (!inputElement) {
            return;
        }

        this._inputFocused$ = merge(
            fromEvent(inputElement, 'focusin').pipe(map(() => true)),
            fromEvent(inputElement, 'focusout').pipe(map(() => false))
        ).pipe(
            // debounceTime is needed in order to filter subsequent focus-blur events, that happen simultaneously
            debounceTime(10),
            filter(() => this.showFocus),
            takeUntil(this._onDestroy$)
        );

        this._changeDetectorRef.markForCheck();
    }

    /** @hidden */
    private _focusOut(event: FocusEvent): void {
        if (!this._elementRef.nativeElement.contains(event.relatedTarget)) {
            this.onTouched();
        }
    }
}
