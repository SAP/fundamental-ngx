import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChild,
    DestroyRef,
    ElementRef,
    EventEmitter,
    forwardRef,
    inject,
    Input,
    Output,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ContentDensityObserver, contentDensityObserverProviders } from '@fundamental-ngx/core/content-density';
import { debounceTime, filter, fromEvent, map, merge, Observable } from 'rxjs';

import { Nullable } from '@fundamental-ngx/cdk/utils';
import { FormItemControl, registerFormItemControl } from '@fundamental-ngx/core/form';

import { AsyncPipe, NgTemplateOutlet } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormStates } from '@fundamental-ngx/cdk/forms';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { FD_DEFAULT_ICON_FONT_FAMILY, IconComponent, IconFont } from '@fundamental-ngx/core/icon';
import {
    InputGroupAddonButtonDirective,
    InputGroupAddOnDirective,
    InputGroupInputDirective
} from './input-group-directives';
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
    styleUrl: './input-group.component.scss',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => InputGroupComponent),
            multi: true
        },
        contentDensityObserverProviders(),
        registerFormItemControl(InputGroupComponent)
    ],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '(focusout)': '_focusOut($event)'
    },
    standalone: true,
    imports: [
        NgTemplateOutlet,
        InputGroupAddOnDirective,
        ButtonComponent,
        InputGroupAddonButtonDirective,
        FormsModule,
        InputGroupInputDirective,
        AsyncPipe,
        IconComponent
    ]
})
export class InputGroupComponent implements ControlValueAccessor, AfterViewInit, FormItemControl {
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

    /** The type of the input, used in Input Group. By default, value is set to 'text' */
    @Input()
    type = 'text';

    /** The icon value for the add-on. */
    @Input()
    glyph: Nullable<string>;

    /** Glyph font family */
    @Input()
    glyphFont: IconFont = FD_DEFAULT_ICON_FONT_FAMILY;

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

    /**
     * Whether the input group addon button should be aria-hidden
     * Useful in cases when the title is already applied on the
     * input group parent component
     **/
    @Input()
    addonButtonAriaHidden: Nullable<boolean>;

    /** The tooltip for the input group icon. */
    @Input()
    iconTitle: Nullable<string>;

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
    @ViewChild(InputGroupAddonButtonDirective, { static: false, read: ElementRef })
    private readonly _localButtonElement: ElementRef;

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

    /** An RxJS Subject that will kill the stream upon component’s destruction (for unsubscribing)  */
    private readonly _destroyRef = inject(DestroyRef);

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
    constructor(
        private readonly _elementRef: ElementRef,
        private readonly _changeDetectorRef: ChangeDetectorRef,
        private _contentDensityObserver: ContentDensityObserver
    ) {
        this._contentDensityObserver.subscribe();
    }

    /** @hidden */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onChange = (value: string): void => {};

    /** @hidden */
    onTouched = (): void => {};

    /** @hidden */
    get elementRef(): ElementRef<HTMLElement> {
        return this._elementRef;
    }

    /** @hidden */
    ngAfterViewInit(): void {
        this._listenInputFocus();
    }

    /** @hidden */
    writeValue(value: string): void {
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
            this.inputElement?.elementRef?.nativeElement || this.localInputElement?.elementRef?.nativeElement;

        if (!inputElement) {
            return;
        }

        const focusEvents = [
            fromEvent(inputElement, 'focusin').pipe(map(() => true)),
            fromEvent(inputElement, 'focusout').pipe(map(() => false))
        ];

        if (this._localButtonElement) {
            focusEvents.push(
                fromEvent(this._localButtonElement.nativeElement, 'mousedown').pipe(map(() => !this.buttonFocusable))
            );
        }

        this._inputFocused$ = merge(...focusEvents).pipe(
            // debounceTime is needed in order to filter subsequent focus-blur events, that happen simultaneously
            debounceTime(10),
            filter(() => this.showFocus),
            takeUntilDestroyed(this._destroyRef)
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
