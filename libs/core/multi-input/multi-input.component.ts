import { DOWN_ARROW, ENTER, SPACE, TAB, UP_ARROW } from '@angular/cdk/keycodes';
import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    computed,
    effect,
    ElementRef,
    EventEmitter,
    forwardRef,
    inject,
    Injector,
    Input,
    isDevMode,
    OnChanges,
    OnDestroy,
    OnInit,
    Output,
    SimpleChanges,
    TemplateRef,
    ViewChild,
    ViewContainerRef,
    ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, FormControl, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { BehaviorSubject, combineLatest, Observable, Subscription } from 'rxjs';
import { distinctUntilChanged, first, map, startWith } from 'rxjs/operators';

import {
    applyCssClass,
    AutoCompleteDirective,
    CssClassBuilder,
    DynamicComponentService,
    FocusEscapeDirection,
    FocusTrapService,
    KeyUtil,
    NestedKeyOf,
    Nullable,
    ObjectPathType,
    RangeSelector,
    RtlService,
    SearchHighlightPipe,
    TruncatedTitleDirective,
    uuidv4
} from '@fundamental-ngx/cdk/utils';
import { FormControlComponent, FormItemControl, registerFormItemControl } from '@fundamental-ngx/core/form';
import { ListComponent, ListItemComponent, ListTitleDirective } from '@fundamental-ngx/core/list';
import { MenuKeyboardService } from '@fundamental-ngx/core/menu';
import { MobileModeConfig } from '@fundamental-ngx/core/mobile-mode';
import { PopoverBodyComponent, PopoverComponent, PopoverControlComponent } from '@fundamental-ngx/core/popover';
import { PopoverFillMode } from '@fundamental-ngx/core/shared';
import { TokenComponent, TokenizerComponent } from '@fundamental-ngx/core/token';

import { AsyncPipe, NgTemplateOutlet } from '@angular/common';
import { FormStates } from '@fundamental-ngx/cdk/forms';
import { get } from '@fundamental-ngx/cdk/utils';
import { CheckboxComponent } from '@fundamental-ngx/core/checkbox';
import { ContentDensityObserver, contentDensityObserverProviders } from '@fundamental-ngx/core/content-density';
import { FD_DEFAULT_ICON_FONT_FAMILY, IconFont } from '@fundamental-ngx/core/icon';
import { InputGroupComponent, InputGroupInputDirective } from '@fundamental-ngx/core/input-group';
import { LinkComponent } from '@fundamental-ngx/core/link';
import { MultiAnnouncerDirective } from '@fundamental-ngx/core/multi-combobox';
import { FdTranslatePipe } from '@fundamental-ngx/i18n';
import { MultiInputMobileComponent } from './multi-input-mobile/multi-input-mobile.component';
import { MULTI_INPUT_COMPONENT, MultiInputInterface } from './multi-input.interface';
import { PairSelectionModel } from './pair-selection.model';

function isOptionItem<ItemType = any, ValueType = any>(
    candidate: unknown
): candidate is _OptionItem<ItemType, ValueType> {
    return isOptionItemBase<ValueType>(candidate) && 'item' in candidate && 'id' in candidate;
}

function isOptionItemBase<ValueType = any>(candidate: unknown): candidate is OptionItemBase<ValueType> {
    return typeof candidate === 'object' && candidate !== null && 'value' in candidate && 'label' in candidate;
}

/**
 * Input field with multiple selection enabled. Should be used when a user can select between a
 * limited number of pre-defined options with a filter-enabled context.
 *
 * Supports Angular Forms.
 */
@Component({
    selector: 'fd-multi-input',
    templateUrl: './multi-input.component.html',
    styleUrl: './multi-input.component.scss',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => MultiInputComponent),
            multi: true
        },
        MenuKeyboardService,
        registerFormItemControl(MultiInputComponent),
        contentDensityObserverProviders()
    ],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    host: {
        '(focusout)': '_focusOut($event)'
    },
    imports: [
        NgTemplateOutlet,
        PopoverComponent,
        PopoverControlComponent,
        FormsModule,
        PopoverBodyComponent,
        InputGroupComponent,
        InputGroupInputDirective,
        TokenComponent,
        TokenizerComponent,
        FormControlComponent,
        AutoCompleteDirective,
        ReactiveFormsModule,
        ListComponent,
        ListItemComponent,
        ListTitleDirective,
        CheckboxComponent,
        LinkComponent,
        AsyncPipe,
        SearchHighlightPipe,
        FdTranslatePipe,
        MultiAnnouncerDirective,
        TruncatedTitleDirective
    ]
})
export class MultiInputComponent<ItemType = any, ValueType = any>
    implements
        MultiInputInterface,
        ControlValueAccessor,
        CssClassBuilder,
        OnInit,
        OnChanges,
        AfterViewInit,
        OnDestroy,
        FormItemControl
{
    /** Placeholder for the input field. */
    @Input()
    placeholder = '';

    /** Whether the input is disabled. */
    @Input()
    disabled = false;

    /** If it is mandatory field */
    @Input()
    required = false;

    /** Whether to use cozy visuals but compact collapsing behavior. */
    @Input()
    compactCollapse = true;

    /** Max height of the popover. Any overflowing elements will be accessible through scrolling. */
    @Input()
    maxHeight = '300px';

    /** Icon of the button on the right of the input field. */
    @Input()
    glyph = 'value-help';

    /** Glyph font family */
    @Input()
    glyphFont: IconFont = FD_DEFAULT_ICON_FONT_FAMILY;

    /** Values to be displayed in the unfiltered dropdown. */
    @Input()
    dropdownValues: Array<ItemType | _OptionItem<ItemType, ValueType>> = [];

    /** Whether to open the dropdown when the addon button is clicked. */
    @Input()
    openDropdownOnAddOnClicked = true;

    /** Title text for the add-on icon button. */
    @Input()
    addonIconTitle: string;

    /** Search term, or more specifically the value of the inner input field. */
    @Input()
    set searchTerm(value: string) {
        this._searchTermCtrl.setValue(value);
    }
    get searchTerm(): string {
        return this._searchTermCtrl.value ?? '';
    }

    /** Id attribute for input element inside MultiInput component */
    @Input()
    inputId = '';

    /** Whether the search term should be highlighted in results. */
    @Input()
    highlight = true;

    /** Selected dropdown items. */
    @Input()
    set selected(values: ValueType[]) {
        this._selectionModel.clear();
        if (values) {
            const potentialItems = [...values];
            const options: _OptionItem<ItemType, ValueType>[] = [];
            potentialItems.forEach((value) => {
                let optionItem = this._optionItems.find((i) => i.value === value);
                if (!optionItem) {
                    optionItem = this._getOptionItem(value as unknown as ItemType);
                }
                options.push(optionItem);
            });
            this._selectionModel.select(options.map((item) => [item.id, item]));
        }
    }

    get selected(): ValueType[] {
        return this._selectionModel.selected.map((c) => c.value);
    }

    /** user's custom classes */
    @Input()
    class: string;

    /**
     * Filter function. Accepts an array and a string as arguments, and outputs an array.
     * An arrow function can be used to access the *this* keyword in the calling component.
     * See multi input examples for details.
     */
    @Input()
    filterFn: (contentArray: this['dropdownValues'], searchTerm: string) => this['dropdownValues'] =
        this._defaultFilter;

    /**
     * Value function. Accepts an object of the same type as the
     * items passed to dropdownValues as argument, and outputs any property, that should be used as value.
     * An arrow function can be used to access the *this* keyword in the calling component.
     * See multi input examples for details.
     */
    @Input()
    valueFn: (item: ItemType) => ValueType = this._defaultValueFn;

    /**
     * Display function. Accepts an object of the same type as the
     * items passed to dropdownValues as argument, and outputs a string.
     * An arrow function can be used to access the *this* keyword in the calling component.
     * See multi input examples for details.
     */
    @Input()
    displayFn: (item: ItemType) => string = this._defaultDisplay as unknown as (item: ItemType) => string;

    /**
     * Parse function. Used for submitting new tokens. Accepts a string by default.
     * An arrow function can be used to access the *this* keyword in the calling component.
     * See multi input examples for details.
     */
    @Input()
    newTokenParseFn: (searchTerm: string) => any = this._defaultParse;

    /**
     * Identifier function or path to an identifier property.
     */
    @Input()
    optionItemIdentifier: OptionItemIdentifierInput<ItemType>;

    /**
     * Validate function. Used to check if new token can be added into list.
     * Works only, when `allowNewTokens` option is enabled.
     */
    @Input()
    newTokenValidateFn = this._defaultTokenValidate;

    /** aria-label attribute binding. */
    @Input()
    ariaLabel: Nullable<string>;

    /** aria-labelledby attribute binding. */
    @Input()
    ariaLabelledBy: Nullable<string>;

    /**
     * Preset options for the Select body width, whatever is chosen, the body has a 600px limit.
     * * `at-least` will apply a minimum width to the body equivalent to the width of the control. - Default
     * * `equal` will apply a width to the body equivalent to the width of the control.
     * * 'fit-content' will apply width needed to properly display items inside, independent of control.
     */
    @Input()
    fillControlMode: PopoverFillMode = 'at-least';

    /**
     *  The state of the form control - applies css classes.
     *  Can be `success`, `error`, `warning`, `information` or blank for default.
     */
    @Input()
    state?: FormStates;

    /**
     * Whether AddOn Button should be focusable
     * @default true
     */
    @Input()
    buttonFocusable = true;

    /** Whether the multi-input allows the creation of new tokens. */
    @Input()
    allowNewTokens = false;

    /** Whether the multi-input should be built on mobile mode */
    @Input()
    mobile = false;

    /** Whether the multi-input should have show all button. */
    @Input()
    showAllButton = true;

    /**
     * Max width of multi input body.
     * `none` will not limit width of the dropdown.
     * `container` will limit width of the dropdown to the width of the multi-input itself.
     * `number` will limit width of the dropdown by provided number in pixels.
     */
    @Input()
    bodyMaxWidth: 'none' | 'container' | number = 'none';

    /** @hidden */
    get _popoverMaxWidth(): Nullable<number> {
        if (this.bodyMaxWidth === 'none') {
            return null;
        }

        if (typeof this.bodyMaxWidth === 'number') {
            return this.bodyMaxWidth;
        }

        return this.elementRef.nativeElement.getBoundingClientRect().width;
    }

    /** Multi Input Mobile Configuration, it's applied only, when mobile is enabled */
    @Input()
    mobileConfig: MobileModeConfig = { hasCloseButton: true, approveButtonText: 'Select' };

    /**
     * Whether to return results where the input matches the entire string. By default, only results that start
     * with the input search term will be returned.
     */
    @Input()
    includes = false;

    /**
     * The template with which to display the individual listed items.
     * Use it by passing an ng-template with implicit content. See examples for more info.
     */
    @Input()
    itemTemplate: TemplateRef<any>;

    /**
     * The tooltip for the multi-input icon.
     */
    @Input()
    title: string;

    /** Whether list item options should be rendered as byline. */
    @Input()
    byline = false;

    /** Whether the autocomplete should be enabled; Enabled by default */
    @Input()
    autoComplete = true;

    /** Event emitted when the search term changes. Use *$event* to access the new term. */
    @Output()
    readonly searchTermChange: EventEmitter<string> = new EventEmitter<string>();

    /** Event emitted when the selected items change. Use *$event* to access the new selected array. */
    @Output()
    readonly selectedChange: EventEmitter<ValueType[]> = new EventEmitter<ValueType[]>();

    /** Whether multi input popover body should be opened */
    @Input()
    open = false;

    /** Whether to display the addon button. */
    @Input()
    displayAddonButton = true;

    /** Aria-label for the addon button. */
    @Input()
    addOnButtonAriaLabel: Nullable<string>;

    /** Event emitted, when the multi input's popover body is opened or closed */
    @Output()
    readonly openChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    /** Emits event when the addon button is clicked. */
    @Output()
    readonly addOnButtonClicked: EventEmitter<Event> = new EventEmitter<Event>();

    /** Event emitted, when the multi input's all item checked or not */
    @Output()
    readonly allItemsSelectedChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    /** @hidden */
    @ViewChild(PopoverComponent)
    popoverRef: PopoverComponent;

    /** @hidden */
    @ViewChild('control', { read: TemplateRef })
    controlTemplate: TemplateRef<{ displayAddonButton: boolean }>;

    /** @hidden */
    @ViewChild('list', { read: TemplateRef })
    listTemplate: TemplateRef<any>;

    /** @hidden */
    @ViewChild(ListComponent)
    listComponent: ListComponent;

    /** @hidden */
    @ViewChild('searchInputElement', { read: ElementRef })
    searchInputElement: ElementRef<HTMLInputElement>;

    /** @hidden */
    @ViewChild(TokenizerComponent)
    tokenizer: TokenizerComponent;

    /** @hidden */
    get _optionItems(): _OptionItem<ItemType, ValueType>[] {
        return this.optionItems$.value;
    }
    /** @hidden */
    readonly optionItems$ = new BehaviorSubject<_OptionItem<ItemType, ValueType>[]>([]);

    /** @hidden */
    readonly _onlySelected$ = new BehaviorSubject<boolean>(false);

    /** @hidden */
    readonly _searchTermCtrl = new FormControl('');

    /** @hidden */
    readonly _selectionModel = new PairSelectionModel<OptionItemIdentifier, OptionItem<ItemType, ValueType>>();

    /** @hidden */
    readonly _viewModel$: Observable<ViewModel<ItemType, ValueType>> = this._getViewModel();

    /** typeahead matcher function */
    get typeAheadMatcher(): (item: string, searchTerm: string) => boolean {
        if (this.includes) {
            return (item: string, searchTerm: string) => item.includes(searchTerm);
        }
        return (item: string, searchTerm: string) => item.startsWith(searchTerm);
    }

    /** @hidden */
    readonly _contentDensityObserver = inject(ContentDensityObserver);

    /** @hidden */
    readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

    /** @hidden */
    private readonly _dir = computed(() => (this._rtlService?.rtl() ? 'rtl' : 'ltr'));

    /** @hidden */
    private _subscriptions = new Subscription();

    /** @hidden */
    private readonly _rangeSelector = new RangeSelector();

    /** @hidden */
    private readonly _changeDetRef = inject(ChangeDetectorRef);

    /** @hidden */
    private readonly _dynamicComponentService = inject(DynamicComponentService);

    /** @hidden */
    private readonly _injector = inject(Injector);

    /** @hidden */
    private readonly _viewContainerRef = inject(ViewContainerRef);

    /** @hidden */
    private readonly _rtlService = inject(RtlService, { optional: true });

    /** @hidden */
    private readonly _focusTrapService = inject(FocusTrapService, { optional: true });

    /** @hidden */
    constructor() {
        // React to RTL changes - rebuild CSS class when direction changes
        effect(() => {
            const dir = this._dir();
            if (dir) {
                this.buildComponentCssClass();
            }
        });
    }

    /** @hidden CssClassBuilder interface implementation
     * function must return single string
     * function is responsible for order which css classes are applied
     */
    @applyCssClass
    buildComponentCssClass(): string[] {
        // TODO: this icon flip may be addressed in styles in the future
        if (this.glyph === 'value-help' && this._dir() === 'rtl') {
            const icon = this.elementRef.nativeElement.querySelector('.sap-icon--value-help') as HTMLElement;
            if (icon) {
                icon.style.transform = 'scaleX(-1)';
            }
        }

        return ['fd-multi-input', 'fd-multi-input-custom', this.class];
    }

    /** @hidden */
    onChange: (value: any) => void = () => {};

    /** @hidden */
    onTouched = (): void => {};

    /** @hidden */
    ngOnInit(): void {
        this.buildComponentCssClass();

        if (!this.inputId) {
            this.inputId = uuidv4();
        }

        this._subscriptions.add(
            this._searchTermCtrl.valueChanges.pipe(distinctUntilChanged()).subscribe((searchTerm) => {
                this.searchTermChange.emit(searchTerm ?? '');
                // resetting existing selection state, if any
                this._rangeSelector.reset();
            })
        );
        this._subscriptions.add(
            this._getViewModel()
                .pipe(map((viewModel) => !viewModel.displayedOptions.some((c) => !c.isSelected)))
                .subscribe((allItemsSelected) => this.allItemsSelectedChange.emit(allItemsSelected))
        );
    }

    /** @hidden */
    ngOnChanges(changes: SimpleChanges): void {
        this.buildComponentCssClass();

        if (changes.dropdownValues || changes.searchTerm || changes.valueFn || changes.displayFn) {
            const optionItems = (this.dropdownValues ?? []).map((item) => this._getOptionItem(item));
            this.optionItems$.next(optionItems);
            this._changeDetRef.markForCheck();
        }

        if (changes.disabled) {
            this.disabled ? this._searchTermCtrl.disable() : this._searchTermCtrl.enable();
        }
    }

    /** @hidden */
    ngAfterViewInit(): void {
        if (this.mobile) {
            this._setUpMobileMode();
        }
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._subscriptions.unsubscribe();
    }

    /** @hidden */
    registerOnChange(fn: (selected: any[]) => void): void {
        this.onChange = fn;
    }

    /** @hidden */
    registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    /** @hidden */
    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
        if (isDisabled) {
            this.elementRef.nativeElement.style.pointerEvents = 'none';
            this.elementRef.nativeElement.tabIndex = -1; // prevent focus
        } else {
            this.elementRef.nativeElement.style.pointerEvents = 'auto';
            this.elementRef.nativeElement.tabIndex = 0; // allow focus
        }

        this._changeDetRef.detectChanges();
    }

    /** @hidden */
    writeValue(selected: ValueType[]): void {
        this.selected = selected;

        this._changeDetRef.markForCheck();
    }

    /** Method passed to list component */
    handleListFocusEscape(direction: FocusEscapeDirection): void {
        if (direction === 'up' && !this.mobile) {
            this.searchInputElement.nativeElement.focus();
        }
    }

    /** @hidden */
    openChangeHandle(open: boolean): void {
        if (this.disabled) {
            return;
        }

        if (this.open !== open) {
            this.openChange.emit(open);
        }

        this.open = open;

        if (!this.mobile) {
            this._popoverOpenHandle(open);
        }

        if (!this.open) {
            this._resetSearchTerm();
            this.enableParentFocusTrap();
            this._onlySelected$.next(false);
        } else {
            this.disableParentFocusTrap();

            this.searchInputElement?.nativeElement.focus();
        }

        this.tokenizer.tokenizerInnerEl.nativeElement.scrollLeft =
            this.tokenizer.tokenizerInnerEl.nativeElement.scrollWidth;

        this._changeDetRef.detectChanges();
    }

    /** Method that selects all possible options. */
    selectAllItems(selectAll: boolean): void {
        if (selectAll) {
            this.selected = this._optionItems.map((c) => c.value);
            this._resetSearchTerm();
        } else {
            this.selected = [];
        }
        // On Mobile mode changes are propagated only on approve.
        this._propagateChange();
    }

    /** @hidden */
    _onCheckboxKeyup(
        option: _OptionItem<ItemType, ValueType>,
        event: KeyboardEvent,
        index: number,
        isListItem = false
    ): void {
        if (KeyUtil.isKeyCode(event, [SPACE, ENTER])) {
            this._onCheckboxClick(option, event, index, isListItem);
        }
    }

    /** @hidden */
    async _onCheckboxClick(
        option: _OptionItem<ItemType, ValueType>,
        event: MouseEvent | KeyboardEvent,
        index: number,
        isListItem = false
    ): Promise<void> {
        const toggledSelection = !this._selectionModel.isSelected(option.id);
        this._rangeSelector.onRangeElementToggled(index, event);
        const sub = this._viewModel$.pipe(first()).subscribe((vm) => {
            this._rangeSelector.applyValueToEachInRange((idx) =>
                this._handleSelect(toggledSelection, vm.displayedOptions[idx], false)
            );
            this._changeDetRef.detectChanges();
        });
        this._subscriptions.add(sub);
        // stop propagation on the checkbox so event doesn't reach the list item
        event.stopPropagation();
    }

    /** @hidden */
    _onTokenCloseClick(option: _OptionItem<ItemType, ValueType>, resetSearch: boolean, event?: MouseEvent): void {
        event?.preventDefault(); // prevent this function from being called twice when checkbox updates
        this._handleSelect(false, option, resetSearch, true);
    }

    /** @hidden */
    _tokenElementClicked(event: MouseEvent): void {
        const textElement = (event.currentTarget as HTMLElement).querySelector('.fd-token__text') as HTMLElement;
        if (textElement && textElement.offsetWidth < textElement.scrollWidth && this.open === false) {
            this.openChangeHandle(true);
        }
    }

    /** @hidden */
    _handleSelect(
        checked: any,
        option: _OptionItem<ItemType, ValueType>,
        resetSearch = true,
        fromTokenCloseClick = false
    ): void {
        const previousLength = this._selectionModel.selected.length;
        option = this._getOptionItem(option);
        if (checked) {
            this._selectionModel.select(option.id, option);
        } else {
            this._selectionModel.deselect(option.id);
        }

        // Handle popover placement update
        if (this._shouldPopoverBeUpdated(previousLength, this._selectionModel.selected.length)) {
            this.popoverRef.refreshPosition();
        }
        if (resetSearch) {
            this._resetSearchTerm();
            this.searchInputElement.nativeElement.focus();
        }

        if (this._selectionModel.selected.length === 0) {
            this.searchInputElement.nativeElement.focus();
            this._changeDetRef.detectChanges();
        }

        // On Mobile mode changes are propagated only on approve.
        this._propagateChange(fromTokenCloseClick);
    }

    /** @hidden */
    _handleInputKeydown(event: KeyboardEvent): void {
        if (KeyUtil.isKeyCode(event, DOWN_ARROW) && !this.mobile) {
            if (event.altKey) {
                this.openChangeHandle(true);
            }

            if (this.listComponent) {
                this.listComponent.setItemActive(0);
                event.preventDefault();
            }
        } else if (KeyUtil.isKeyCode(event, [DOWN_ARROW, UP_ARROW, ENTER])) {
            this.openChangeHandle(true);
        } else if (KeyUtil.isKeyCode(event, TAB) && this.open) {
            this._close();
        } else if (KeyUtil.isKeyType(event, 'alphabetical') || KeyUtil.isKeyType(event, 'numeric')) {
            if (!this.open) {
                this.openChangeHandle(true);
                this.searchInputElement.nativeElement.focus();
            }
        }
    }

    /** @hidden */
    _showAllClicked(event: Event): void {
        event.preventDefault();
        event.stopPropagation();
        this._searchTermCtrl.setValue('');
        this.searchInputElement.nativeElement.focus();
    }

    /** @hidden */
    _showAllKeyDown(event: KeyboardEvent): void {
        if (KeyUtil.isKeyCode(event, [SPACE, ENTER])) {
            this._showAllClicked(event);
        }
    }

    /** @hidden */
    _onSubmit(): void {
        const searchTerm = this.searchTerm;
        if (searchTerm === '') {
            return;
        }
        const isExist = this._selectFirstFiltered(searchTerm);
        if (!isExist && this.allowNewTokens && this.newTokenValidateFn(this._searchTermCtrl.value ?? '')) {
            const newToken = this.newTokenParseFn(this._searchTermCtrl.value ?? '');
            const newOption = this._addNewTokenToDropDownValues(newToken);
            this._handleSelect(true, newOption);
            this._searchTermCtrl.setValue('');
            this.open = false;
        }
    }

    /** @hidden */
    _handleComplete({ term }): void {
        this.searchTerm = term;
    }

    /**
     * Handle dialog dismissing, closes popover and sets backup data.
     */
    dialogDismiss(selectedBackup: any[]): void {
        this.openChangeHandle(false);
        this._resetSearchTerm();
        this.selected = selectedBackup;
    }

    /**
     * Handle dialog approval, closes popover and propagates data changes.
     */
    dialogApprove(): void {
        this._propagateChange(true);
        this.openChangeHandle(false);
        this._resetSearchTerm();
    }

    /** @hidden */
    _moreClicked(): void {
        this._onlySelected$.next(true);
        this.openChangeHandle(true);
    }

    /** @hidden */
    _addOnButtonClicked(event: Event): void {
        this.addOnButtonClicked.emit(event);
        if (this.openDropdownOnAddOnClicked) {
            this.openChangeHandle(!this.open);
        } else if (this.open) {
            this.openChangeHandle(false);
        }
    }

    /** @hidden */
    disableParentFocusTrap(): void {
        this._focusTrapService?.pauseCurrentFocusTrap();
    }

    /** @hidden */
    enableParentFocusTrap(): void {
        this._focusTrapService?.unpauseCurrentFocusTrap();
    }

    /** @hidden */
    _close(): void {
        this.searchInputElement.nativeElement.focus();
        this.openChangeHandle(false);
    }

    /** @hidden */
    protected _focusOut(event: FocusEvent): void {
        if (!this.elementRef.nativeElement.contains(event.relatedTarget as Node)) {
            this.onTouched();
        }
    }

    /** @hidden */
    private _addNewTokenToDropDownValues(newToken: any): OptionItem {
        this.dropdownValues.push(newToken);
        const newOption = this._getOptionItem(newToken);
        this.optionItems$.next([...this._optionItems, newOption]);
        return newOption;
    }

    /** @hidden */
    private _selectFirstFiltered(searchTerm: string): boolean {
        const filtered = this.filterFn(this.dropdownValues, searchTerm);
        if (Array.isArray(filtered) && filtered.length > 0 && this.autoComplete) {
            const optionItem = this._getOptionItem(filtered[0]);
            this._handleSelect(true, optionItem);
            this._searchTermCtrl.setValue('');
            this.open = false;
            return true;
        }
        return false;
    }

    /** @hidden */
    private _defaultFilter(contentArray: this['dropdownValues'], searchTerm: string = ''): this['dropdownValues'] {
        const trimmedSearchTerm = searchTerm.trim().toLocaleLowerCase();
        return contentArray.filter((item) => {
            if (item) {
                const displayedValue = isOptionItem(item) ? item.label : this.displayFn(item);
                const term = displayedValue?.toLocaleLowerCase() || '';
                return this.typeAheadMatcher(term, trimmedSearchTerm);
            }
        });
    }

    /** @hidden */
    private _defaultValueFn(value: ItemType | ValueType): ValueType {
        return value as ValueType;
    }

    /** @hidden */
    private _defaultDisplay(str: ItemType): string | undefined {
        if (typeof str === 'string') {
            return str;
        }
        if (isOptionItemBase(str)) {
            return str.label;
        }
    }

    /** @hidden */
    private _defaultParse(str: string): string {
        return str;
    }

    /** @hidden */
    private _defaultTokenValidate(str: string): boolean {
        return !!str;
    }

    /** @hidden */
    private _popoverOpenHandle(open: boolean): void {
        this.open = open;
    }

    /** @hidden */
    private _propagateChange(emitInMobile?: boolean): void {
        if (!this.mobile || emitInMobile) {
            const selected = this._selectionModel.selected.map((c) => c.value);
            this.onChange(selected);
            this.selectedChange.emit(selected);
        }
    }

    /** @hidden */
    private _shouldPopoverBeUpdated(previousLength: number, currentLength: number): boolean {
        return (
            !!this.popoverRef &&
            ((previousLength === 0 && currentLength === 1) || (previousLength === 1 && currentLength === 0))
        );
    }

    /** @hidden */
    private async _setUpMobileMode(): Promise<void> {
        const injector = Injector.create({
            providers: [{ provide: MULTI_INPUT_COMPONENT, useValue: this }],
            parent: this._injector
        });

        this._dynamicComponentService.createDynamicComponent(
            {
                listTemplate: this.listTemplate,
                controlTemplate: this.controlTemplate
            },
            MultiInputMobileComponent,
            {
                containerRef: this._viewContainerRef
            },
            { injector }
        );
    }

    /** @hidden */
    private _getItemIdentifier(item: ItemType): OptionItemIdentifier {
        if (!this.optionItemIdentifier) {
            const value = this.valueFn(item);
            if (typeof value !== 'string' && typeof value !== 'number' && typeof value !== 'symbol' && isDevMode()) {
                console.warn(
                    'optionItemIdentifier is not set and valueFn does not return a string, number or symbol',
                    item
                );
            }
            return value as OptionItemIdentifier;
        }
        if (typeof this.optionItemIdentifier === 'function') {
            return this.optionItemIdentifier(item);
        }
        return get(item, this.optionItemIdentifier) as OptionItemIdentifier;
    }

    /** @hidden */
    private _resetSearchTerm(): void {
        this._searchTermCtrl.setValue('');
        this._changeDetRef.detectChanges();
    }

    /** @hidden */
    private _getOptionItem(item: ItemType | _OptionItem<ItemType, ValueType>): _OptionItem<ItemType, ValueType> {
        if (isOptionItem<ItemType, ValueType>(item)) {
            return item;
        }
        const { label, value } = this._getValueAndLabelOfItem(item);
        return {
            id: this._getItemIdentifier(item),
            item,
            label,
            value,
            isSelected: false
        };
    }

    /** @hidden */
    private _getValueAndLabelOfItem(item: ItemType): OptionItemBase<ValueType> {
        const defaultDisplay = typeof item === 'object' && item !== null ? item[Object.keys(item)[0]] : item;
        let value = this.valueFn(item) ?? defaultDisplay;
        let label = this.displayFn(item) ?? defaultDisplay;
        if (isOptionItemBase(item)) {
            if (this.valueFn === this._defaultValueFn) {
                value = item.value;
            }
            if (this.displayFn === this._defaultDisplay) {
                label = item.label;
            }
        }
        return { label, value };
    }

    /** @hidden */
    private _getViewModel(): Observable<ViewModel<ItemType, ValueType>> {
        return combineLatest([
            this._searchTermCtrl.valueChanges.pipe(startWith(this._searchTermCtrl.value)),
            this._selectionModel.selectionChanged.pipe(startWith(null)),
            this._onlySelected$,
            this.optionItems$
        ]).pipe(
            map(() => {
                // not using "searchTerm" value from combineLatest as it will be wrong for late subscribers, if any
                const searchTerm = this._searchTermCtrl.value ?? '';
                const filtered = this.filterFn(this.dropdownValues, searchTerm);
                const onlySelected = this._onlySelected$.value;
                let displayedOptions = (Array.isArray(filtered) ? filtered : []).map((item) =>
                    this._getOptionItem(item)
                );

                displayedOptions.forEach((c) => (c.isSelected = this._selectionModel.isSelected(c.id)));

                if (onlySelected) {
                    displayedOptions = displayedOptions.filter((item) => item.isSelected);
                }

                return { selectedOptions: this._selectionModel.selected, displayedOptions };
            })
        );
    }
}

interface _OptionItem<ItemType = any, ValueType = any> extends OptionItemBase<ValueType> {
    id: OptionItemIdentifier;
    item: ItemType;
    isSelected?: boolean;
}

export type OptionItemWithItemIdentifierValues<
    ItemType extends object,
    AllTheKeys extends (string | keyof ItemType)[] = NestedKeyOf<ItemType>[]
> = {
    [Key in AllTheKeys[number]]: ObjectPathType<ItemType, Key> extends OptionItemIdentifier ? Key : never;
}[AllTheKeys[number]];

export type AcceptableKeysOf<ItemType = any> = ItemType extends object
    ? OptionItemWithItemIdentifierValues<ItemType>
    : never;

export type OptionItemIdentifierInput<ItemType = any> =
    | ((item: ItemType) => OptionItemIdentifier)
    | AcceptableKeysOf<ItemType>;

export type OptionItemIdentifier = string | number | symbol;

export type OptionItem<ItemType = any, ValueType = any> = Omit<_OptionItem<ItemType, ValueType>, 'isSelected'>;

export interface OptionItemBase<ValueType = any> {
    label: string;
    value: ValueType;
}

interface ViewModel<ItemType = any, ValueType = any> {
    selectedOptions: _OptionItem<ItemType, ValueType>[];
    displayedOptions: _OptionItem<ItemType, ValueType>[];
}
