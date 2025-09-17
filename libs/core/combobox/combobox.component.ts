import {
    BACKSPACE,
    CONTROL,
    DOWN_ARROW,
    ENTER,
    ESCAPE,
    LEFT_ARROW,
    RIGHT_ARROW,
    SHIFT,
    SPACE,
    TAB,
    UP_ARROW
} from '@angular/cdk/keycodes';
import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChild,
    ContentChildren,
    ElementRef,
    EventEmitter,
    Injector,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    Output,
    QueryList,
    SimpleChanges,
    TemplateRef,
    ViewChild,
    ViewContainerRef,
    ViewEncapsulation,
    forwardRef
} from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subscription } from 'rxjs';

import {
    AutoCompleteEvent,
    DynamicComponentService,
    FocusEscapeDirection,
    FocusTrapService,
    KeyUtil,
    Nullable,
    TruncatedTitleDirective
} from '@fundamental-ngx/cdk/utils';
import { FormItemControl, registerFormItemControl } from '@fundamental-ngx/core/form';
import { MenuKeyboardService } from '@fundamental-ngx/core/menu';
import { MobileModeConfig } from '@fundamental-ngx/core/mobile-mode';
import { PopoverComponent } from '@fundamental-ngx/core/popover';
import { PopoverFillMode } from '@fundamental-ngx/core/shared';

import { Overlay, RepositionScrollStrategy } from '@angular/cdk/overlay';
import { NgTemplateOutlet } from '@angular/common';
import { FormStates, SingleDropdownValueControl } from '@fundamental-ngx/cdk/forms';
import { AutoCompleteDirective, DisplayFnPipe, SearchHighlightPipe } from '@fundamental-ngx/cdk/utils';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import {
    ContentDensityModule,
    ContentDensityObserver,
    contentDensityObserverProviders
} from '@fundamental-ngx/core/content-density';
import { FD_DEFAULT_ICON_FONT_FAMILY, IconComponent, IconFont } from '@fundamental-ngx/core/icon';
import { InputGroupComponent, InputGroupInputDirective } from '@fundamental-ngx/core/input-group';
import {
    FD_LIST_MESSAGE_DIRECTIVE,
    ListComponent,
    ListGroupHeaderDirective,
    ListItemComponent,
    ListMessageDirective,
    ListTitleDirective
} from '@fundamental-ngx/core/list';
import { PopoverBodyComponent, PopoverControlComponent } from '@fundamental-ngx/core/popover';
import { FdTranslatePipe } from '@fundamental-ngx/i18n';
import { ComboboxItem } from './combobox-item';
import { ComboboxItemDirective } from './combobox-item.directive';
import { ComboboxMobileComponent } from './combobox-mobile/combobox-mobile.component';
import { COMBOBOX_COMPONENT, ComboboxInterface, ComboboxItemDirectiveContext } from './combobox.interface';
import { GroupFunction, ListGroupPipe } from './list-group.pipe';
import { FD_COMBOBOX_COMPONENT } from './tokens';

let comboboxUniqueId = 0;

/**
 * Allows users to filter through results and select a value.
 *
 * Supports Angular Forms.
 * ```html
 * <fd-combobox
 *      [(ngModel)]="searchTerm"
 *      [dropdownValues]="dropdownValues"
 *      placeholder="Type some text...">
 * </fd-combobox>
 * ```
 */
@Component({
    selector: 'fd-combobox',
    templateUrl: './combobox.component.html',
    styleUrl: './combobox.component.scss',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ComboboxComponent),
            multi: true
        },
        registerFormItemControl(ComboboxComponent),
        MenuKeyboardService,
        DynamicComponentService,
        contentDensityObserverProviders(),
        {
            provide: FD_COMBOBOX_COMPONENT,
            useExisting: ComboboxComponent
        }
    ],
    host: {
        '[class.fd-combobox-custom-class]': 'true',
        '[class.fd-combobox-input]': 'true',
        '[class.fd-combobox-custom-class--mobile]': 'mobile',
        '[style.width]': 'width'
    },
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        NgTemplateOutlet,
        PopoverComponent,
        PopoverControlComponent,
        PopoverBodyComponent,
        ListComponent,
        ListItemComponent,
        ListTitleDirective,
        ListGroupHeaderDirective,
        InputGroupComponent,
        InputGroupInputDirective,
        FormsModule,
        AutoCompleteDirective,
        ButtonComponent,
        IconComponent,
        ContentDensityModule,
        DisplayFnPipe,
        SearchHighlightPipe,
        FdTranslatePipe,
        ListGroupPipe,
        TruncatedTitleDirective
    ]
})
export class ComboboxComponent<T = any>
    implements
        ComboboxInterface,
        SingleDropdownValueControl,
        ControlValueAccessor,
        OnInit,
        OnChanges,
        AfterViewInit,
        OnDestroy,
        FormItemControl
{
    /** Id for the Combobox. */
    @Input()
    comboboxId = `fd-combobox-${comboboxUniqueId++}`;

    /** Id attribute for input element inside Combobox component */
    @Input()
    inputId = '';

    /** Aria-label for Combobox. */
    @Input()
    ariaLabel: Nullable<string>;

    /** Aria-Labelledby for element describing Combobox. */
    @Input()
    ariaLabelledBy: Nullable<string>;

    /** If it is mandatory field */
    @Input()
    required = false;

    /** Values to be filtered in the search input. */
    @Input()
    dropdownValues: T[] = [];

    /** Filter function. Accepts an array of objects and a search term as arguments
     * and returns a string. See search input examples for details. */
    @Input()
    filterFn = this._defaultFilter;

    /** Whether the search input is disabled. **/
    @Input()
    disabled: boolean;

    /** Placeholder of the search input. **/
    @Input()
    placeholder: string;

    /**
     * Whether the Combobox is a Search Field
     */
    @Input()
    isSearch = false;

    /** Icon to display in the right-side button. */
    @Input()
    glyph = 'navigation-down-arrow';

    /** Glyph font family */
    @Input()
    glyphFont: IconFont = FD_DEFAULT_ICON_FONT_FAMILY;

    /**
     * Whether to show the clear search term button
     */
    @Input()
    showClearButton = false;

    /**
     *  The trigger events that will open/close the options popover.
     *  Accepts any [HTML DOM Events](https://www.w3schools.com/jsref/dom_obj_event.asp).
     */
    @Input()
    triggers: string[] = [];

    /** Whether the combobox should close, when a click is performed outside its boundaries. True by default */
    @Input()
    closeOnOutsideClick = true;

    /**
     * Whether the combobox should open, when any key is pressed in input (except Escape, Space, Enter). True by default
     */
    @Input()
    openOnKeyboardEvent = true;

    /**
     *  The state of the form control - applies css classes.
     *  Can be `success`, `error`, `warning`, `information` or blank for default.
     */
    @Input()
    state?: FormStates;

    /**
     * The template with which to display the individual listed items.
     * Use it by passing an ng-template with implicit content. See examples for more info.
     */
    @Input()
    itemTemplate: TemplateRef<ComboboxItemDirectiveContext<T>>;

    /**
     * Function used to handle grouping of items.
     */
    @Input()
    groupFn: Nullable<GroupFunction>;

    /** Max height of the popover. Any overflowing elements will be accessible through scrolling. */
    @Input()
    maxHeight = '50vh';

    /** Max width of the dropdown in pixels. Default is 640px (40rem). */
    @Input()
    dropDownMaxWidthPx = 640;

    /**
     * Whether the dropdown should have max width.
     * Set to true if you want the dropdown to take the width of the control.
     * Default is false */
    @Input()
    noDropDownMaxWidth = false;

    /** Custom width of the control. */
    @Input()
    width: Nullable<string>;

    /** Search function to execute when the Enter key is pressed on the main input. */
    @Input()
    searchFn: () => void;

    /** Whether the matching string should be highlighted during filtration. */
    @Input()
    highlighting = true;

    /** Whether the popover should close when a user selects a result. */
    @Input()
    closeOnSelect = true;

    /** Whether the input field should be populated with the result picked by the user. */
    @Input()
    fillOnSelect = true;

    /** Whether the autocomplete should be enabled; Enabled by default */
    @Input()
    autoComplete = true;

    /**
     * Preset options for the Select body width, whatever is chosen, the body has a 600px limit.
     * * `at-least` will apply a minimum width to the body equivalent to the width of the control. - Default
     * * `equal` will apply a width to the body equivalent to the width of the control.
     * * 'fit-content' will apply width needed to properly display items inside, independent of control.
     */
    @Input()
    fillControlMode: PopoverFillMode = 'at-least';

    /** Defines if combobox should behave same as dropdown. When it's enabled writing inside text input won't
     * trigger onChange function, until it matches one of displayed dropdown values. Also communicating with combobox
     * can be achieved only by objects with same type as dropdownValue */
    @Input()
    communicateByObject = false;

    /** Display function. Accepts an object of the same type as the
     * items passed to dropdownValues as argument, and outputs a string.
     * An arrow function can be used to access the *this* keyword in the calling component.
     * See search input examples for details. */
    @Input()
    displayFn = this._defaultDisplay;

    /**
     * Whether AddOn Button should be focusable
     * @default false
     */
    @Input()
    buttonFocusable = false;

    /**
     * Whether clear button should be focusable.
     * @default true
     */
    @Input()
    clearButtonFocusable = true;

    /** Whether the combobox is readonly. */
    @Input()
    readOnly = false;

    /** Whether the combobox should be built on mobile mode */
    @Input()
    mobile = false;

    /** Multi Input Mobile Configuration, it's applied only, when mobile is enabled */
    @Input()
    mobileConfig: MobileModeConfig;

    /** Whether to display the addon button. */
    @Input()
    showDropdownButton = true;

    /**
     * Whether to return results where the input matches the entire string. By default, only results that start
     * with the input search term will be returned.
     */
    @Input()
    includes = false;

    /**
     * The tooltip for the multi-input icon.
     */
    @Input()
    title: string;

    /** Whether list item options should be rendered as byline. */
    @Input()
    byline = false;

    /**
     * Action to perform when user shifts focus from the dropdown.
     * - `close` will close the dropdown preserving previously selected value.
     * - `closeAndSelect` will close the dropdown and select last focused dropdown item.
     */
    @Input()
    tabOutStrategy: 'close' | 'closeAndSelect' = 'closeAndSelect';

    /** Event emitted when an item is clicked. Use *$event* to retrieve it. */
    @Output()
    readonly itemClicked: EventEmitter<ComboboxItem> = new EventEmitter<ComboboxItem>();

    /** Event emitted, when the combobox's popover body is opened or closed */
    @Output()
    readonly openChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    /** Event emitted when the input text changes. */
    @Output()
    inputTextChange: EventEmitter<string> = new EventEmitter<string>();

    /** @hidden */
    @ViewChild(ListComponent)
    listComponent: ListComponent;

    /** @hidden */
    @ViewChild('searchInputElement')
    searchInputElement: ElementRef<HTMLInputElement>;

    /** @hidden */
    @ViewChild(PopoverComponent)
    popoverComponent: PopoverComponent;

    /** @hidden */
    @ViewChild(InputGroupComponent)
    inputGroup: InputGroupComponent;

    /** @hidden */
    @ContentChildren(FD_LIST_MESSAGE_DIRECTIVE)
    listMessages: QueryList<ListMessageDirective>;

    /** @hidden */
    @ViewChild('controlTemplate')
    controlTemplate: TemplateRef<HTMLElement>;

    /** @hidden */
    @ViewChild('listTemplate')
    listTemplate: TemplateRef<HTMLElement>;

    /** @hidden */
    @ContentChild(ComboboxItemDirective)
    private readonly _comboboxItemRenderer: ComboboxItemDirective;

    /** Whether the matching string should be highlighted after combobox value is selected. */
    filterHighlight = true;

    /** Keys, that won't trigger the popover's open state, when dispatched on search input */
    readonly nonOpeningKeys: number[] = [
        ESCAPE,
        ENTER,
        LEFT_ARROW,
        RIGHT_ARROW,
        DOWN_ARROW,
        UP_ARROW,
        CONTROL,
        TAB,
        SHIFT
    ];

    /** @hidden */
    readonly _repositionScrollStrategy: RepositionScrollStrategy;

    /** @hidden */
    readonly _defaultFontFamily = FD_DEFAULT_ICON_FONT_FAMILY;

    /** Whether the combobox is opened. */
    open = false;

    /**
     * Whether or not the input coup is in the shellbar. Only for internal use by combobox component
     * @hidden
     */
    inShellbar = false;

    /** @hidden */
    displayedValues: any[] = [];

    /** @hidden */
    inputTextValue = '';

    /** @hidden */
    clearInputBtnFocused = false;

    /** @hidden */
    get _customRenderer(): Nullable<TemplateRef<ComboboxItemDirectiveContext<T>>> {
        return this._comboboxItemRenderer?.templateRef || this.itemTemplate;
    }

    /** @hidden */
    private _subscriptions = new Subscription();

    /** @hidden */
    private _value: any;

    /** @hidden */
    constructor(
        private readonly _overlay: Overlay,
        private readonly _cdRef: ChangeDetectorRef,
        private readonly _injector: Injector,
        private readonly _viewContainerRef: ViewContainerRef,
        private readonly _dynamicComponentService: DynamicComponentService,
        private readonly _focusTrapService: FocusTrapService,
        readonly _contentDensityObserver: ContentDensityObserver
    ) {
        this._repositionScrollStrategy = this._overlay.scrollStrategies.reposition({ autoClose: true });
    }

    /** @hidden */
    onChange: (value: any) => void = () => {};

    /** @hidden */
    onTouched = (): void => {};

    /** @hidden */
    ngOnInit(): void {
        if (this.readOnly) {
            this.showDropdownButton = false;
        }
        this._refreshDisplayedValues();
    }

    /** @hidden */
    ngOnChanges(changes: SimpleChanges): void {
        if (this.dropdownValues && (changes.dropdownValues || changes.searchTerm)) {
            this._refreshDisplayedValues();
        }
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._subscriptions.unsubscribe();
    }

    /** @hidden */
    ngAfterViewInit(): void {
        this._addShellbarClass();

        if (this.mobile) {
            this._setUpMobileMode();
        }
    }

    /** @hidden */
    onInputKeydownHandler(event: KeyboardEvent | string): void {
        if (this.readOnly) {
            return;
        }

        if (typeof event === 'string') {
            if (event === 'fromPaste') {
                this.isOpenChangeHandle(true);
            }
        } else {
            if (KeyUtil.isKeyCode(event, TAB) && this.open) {
                this._close();
                return;
            }

            if (KeyUtil.isKeyCode(event, ENTER)) {
                if (this.searchFn) {
                    this.searchFn();
                }
            } else if (KeyUtil.isKeyCode(event, DOWN_ARROW)) {
                if (event.altKey) {
                    this._resetDisplayedValues();
                    this.isOpenChangeHandle(true);
                }
                if (this.open && this.listComponent) {
                    this.listComponent.setItemActive(0);
                } else if (!this.open) {
                    this._chooseOtherItem(1);
                }
                event.preventDefault();
            } else if (KeyUtil.isKeyCode(event, UP_ARROW)) {
                this._chooseOtherItem(-1);
                event.preventDefault();
            } else if (
                this.openOnKeyboardEvent &&
                !event.ctrlKey &&
                !event.altKey &&
                !KeyUtil.isKeyCode(event, this.nonOpeningKeys)
            ) {
                this.isOpenChangeHandle(true);
                if (this.isEmptyValue && KeyUtil.isKeyType(event, 'control') && !KeyUtil.isKeyCode(event, BACKSPACE)) {
                    this.listComponent.setItemActive(0);
                }
            }
        }
    }

    /** @hidden */
    onItemKeyDownHandler(event: KeyboardEvent, value: any): void {
        if (KeyUtil.isKeyCode(event, ENTER) || KeyUtil.isKeyCode(event, SPACE)) {
            event.preventDefault();
            this.onMenuClickHandler(value);
        }
    }

    /** @hidden */
    onMenuClickHandler(value: any): void {
        if (value || value === 0) {
            const index: number = this.dropdownValues.findIndex((_value) => _value === value);
            this._handleClickActions(value);
            this.filterHighlight = false;
            this.itemClicked.emit({ item: value, index });
        }
    }

    /** Handle dialog dismissing, closes popover and sets backup data. */
    dialogDismiss(term: any): void {
        this.inputText = this.displayFn(term);
        this.setValue(term);
        this.isOpenChangeHandle(false);
    }

    /** Handle dialog approval, closes popover and propagates data changes. */
    dialogApprove(): void {
        this._propagateChange();
        this.isOpenChangeHandle(false);
    }

    /** If true value empty */
    get isEmptyValue(): boolean {
        return !this.inputText || this.inputText?.trim().length === 0;
    }

    /** Input text of the input. */
    set inputText(value: string) {
        this.inputTextValue = value;
        if (!this.communicateByObject) {
            this._value = value;
        }
        this.inputTextChange.emit(value);
        if (!this.mobile) {
            this._propagateChange();
        }
    }
    get inputText(): string {
        return this.inputTextValue;
    }

    /** Get the glyph value based on whether the combobox is used as a search field or not. */
    get glyphValue(): string {
        return this.isSearch ? 'search' : this.glyph;
    }

    /** @hidden */
    _handleClearSearchTerm(): void {
        this.inputTextValue = '';
        this.inputTextChange.emit('');
        this.displayedValues = this.dropdownValues || [];
        this.searchInputElement.nativeElement.focus();
        if (!this.mobile) {
            this._propagateChange();
        }
        this._cdRef.detectChanges();
    }

    /** @hidden */
    writeValue(value: any): void {
        this.inputTextValue = this.displayFn(value);
        this.setValue(value);
        this._cdRef.markForCheck();
    }

    /** @hidden */
    registerOnChange(fn: (value: any) => void): void {
        this.onChange = fn;
    }

    /** @hidden */
    registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    /** Method passed to list component */
    handleListFocusEscape(direction: FocusEscapeDirection): void {
        if (direction === 'up') {
            this.searchInputElement.nativeElement.focus();
        }
    }

    /** @hidden */
    handleSearchTermChange(): void {
        this.displayedValues = this.filterFn(this.dropdownValues, this.inputText);
        this.popoverComponent?.refreshPosition();
    }

    /** @hidden */
    onPrimaryButtonClick(): void {
        // Prevent primary button click behaviour on mobiles
        if (this.mobile) {
            return;
        }

        if (this.searchFn) {
            this.searchFn();
        }
        this._resetDisplayedValues();
        this.isOpenChangeHandle(!this.open);
        this.searchInputElement.nativeElement.focus();
        this.filterHighlight = false;
        if (this.open) {
            this.searchInputElement?.nativeElement.focus();
        }
    }

    /** @hidden */
    isOpenChangeHandle(isOpen: boolean): void {
        /** Reset displayed values on every mobile open */
        if (this.mobile && !this.open) {
            this._resetDisplayedValues();
        }
        if (this.open !== isOpen) {
            this.open = isOpen;
            this.openChange.emit(isOpen);

            /** Allow combobox up and down arrows to work properly when combobox is inside a dialog with a trapped focus */
            if (this.open) {
                this._focusTrapService.pauseCurrentFocusTrap();
            } else {
                this._focusTrapService.unpauseCurrentFocusTrap();
            }
        }

        if (!this.open && !this.mobile) {
            this.handleBlur();
            this.searchInputElement.nativeElement.focus({ preventScroll: true });
        }

        this._cdRef.detectChanges();
    }

    /** @hidden */
    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
        this._cdRef.detectChanges();
    }

    /** Method that handles complete event from auto complete directive, setting the new value, and closing popover */
    handleAutoComplete(event: AutoCompleteEvent): void {
        if (this.inputText !== event.term) {
            this.inputText = event.term;
            this.handleSearchTermChange();
        }
        if (event.forceClose && this.inputText) {
            this.isOpenChangeHandle(false);
        }
    }

    /** @hidden */
    handleBlur(): void {
        if (!this.open) {
            this.onTouched();
            this.handleAutoComplete({
                term: this.searchInputElement.nativeElement.value,
                forceClose: false
            });
        }
    }

    /** @hidden */
    clearInputBtnFocus(): void {
        this.clearInputBtnFocused = true;
    }

    /** @hidden */
    clearInputBtnBlur(): void {
        this.clearInputBtnFocused = false;
    }

    /** Current select value */
    getValue(): any {
        return this._value;
    }

    /** @hidden */
    _close(): void {
        this.inputText = this._value ? this.inputText : '';
        if (this.tabOutStrategy === 'closeAndSelect') {
            const focusedItem = this.listComponent.getActiveItem();
            if (focusedItem && !this.inputText) {
                this._handleClickActions(focusedItem.value);
                return;
            }
        }
        this.isOpenChangeHandle(false);
        this.searchInputElement.nativeElement.focus();
    }

    /** @hidden */
    isSelected(term: any): boolean {
        const termValue = this.communicateByObject ? term : this.displayFn(term);
        return this.getValue() === termValue;
    }

    /** Method that picks other value moved from current one by offset, called only when combobox is closed */
    private _chooseOtherItem(offset: number): void {
        const activeValue: any = this._getOptionObjectByDisplayedValue(this.inputTextValue)[0];
        const index: number = this.dropdownValues.findIndex((value) => value === activeValue);
        if (this.dropdownValues[index + offset]) {
            this.onMenuClickHandler(this.dropdownValues[index + offset]);
        }
    }

    /** Method that reset filtering for displayed values. It overrides displayed values by all possible dropdown values */
    private _resetDisplayedValues(): void {
        this.displayedValues = this.dropdownValues || [];
    }

    /** @hidden */
    private _addShellbarClass(): void {
        if (this.inShellbar) {
            this.searchInputElement.nativeElement.classList.add('fd-shellbar__input-group-input');
            if (this.inputGroup) {
                this.inputGroup.setInShellbar(true);
            }
        }
    }

    /** @hidden */
    private _defaultDisplay(str: any): string {
        return `${str}`;
    }

    /** @hidden */
    private _defaultFilter(contentArray: any[], searchTerm: any): any[] {
        this.filterHighlight = true;
        if (typeof searchTerm === 'string') {
            const searchLower = searchTerm.toLocaleLowerCase();
            return contentArray.filter((item) => {
                if (item) {
                    const term = this.displayFn(item).toLocaleLowerCase();
                    return this.includes ? term.includes(searchLower) : term.startsWith(searchLower);
                }
            });
        } else if (typeof searchTerm === 'object') {
            return contentArray.filter((item) => item === searchTerm);
        }
        return contentArray || [];
    }

    /** @hidden */
    private _handleClickActions(term: any): void {
        if (this.closeOnSelect) {
            this.isOpenChangeHandle(false);
        }
        if (this.fillOnSelect) {
            this.setValue(term);
            this.inputText = this.displayFn(term);
            this.searchInputElement.nativeElement.value = this.inputText;
            this._cdRef.detectChanges();

            if (this.mobile) {
                this._propagateChange();
            }
        }
        this.handleSearchTermChange();
    }

    /** @hidden */
    private _getOptionObjectByDisplayedValue(displayValue: string): any {
        return this.dropdownValues.filter((value) => this.displayFn(value) === displayValue);
    }

    /** @hidden */
    private _refreshDisplayedValues(): void {
        if (this.inputText) {
            this.displayedValues = this.filterFn(this.dropdownValues, this.inputText);
        } else {
            this.displayedValues = this.dropdownValues || [];
        }
    }

    /** @hidden */
    private _propagateChange(): void {
        if (this.communicateByObject) {
            const values = this._getOptionObjectByDisplayedValue(this.inputText);
            // Do not set new value if theres multiple items that have same label.
            if (values.length === 1 && this.displayFn(values[0]) !== this.displayFn(this.getValue())) {
                this.setValue(values[0]);
            } else if (values.length === 0) {
                this.setValue(this.inputText);
            }
            const thisValue = this.getValue();
            if (typeof thisValue === 'object') {
                this.onChange(thisValue);
            }
        } else {
            this.onChange(this.inputText);
        }
    }

    /** @hidden */
    private setValue(value: any): void {
        if (this.communicateByObject) {
            this._value = value;
        } else {
            this._value = this.displayFn(value);
        }
    }

    /** @hidden */
    private _setUpMobileMode(): void {
        const injector = Injector.create({
            providers: [{ provide: COMBOBOX_COMPONENT, useValue: this }],
            parent: this._injector
        });

        this._dynamicComponentService.createDynamicComponent(
            { listTemplate: this.listTemplate, controlTemplate: this.controlTemplate },
            ComboboxMobileComponent,
            {
                containerRef: this._viewContainerRef
            },
            {
                injector
            }
        );
    }
}
