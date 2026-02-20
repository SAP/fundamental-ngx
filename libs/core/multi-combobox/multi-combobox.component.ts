import { A, CONTROL, DOWN_ARROW, ENTER, ESCAPE, SPACE, UP_ARROW } from '@angular/cdk/keycodes';
import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    InjectionToken,
    Injector,
    Input,
    OnInit,
    TemplateRef,
    ViewContainerRef,
    ViewEncapsulation,
    computed,
    contentChildren,
    inject,
    input,
    model,
    output,
    signal,
    viewChild,
    viewChildren
} from '@angular/core';
import { outputToObservable } from '@angular/core/rxjs-interop';
import { DataSourceDirective, FD_DATA_SOURCE_TRANSFORMER, MatchingStrategy } from '@fundamental-ngx/cdk/data-source';
import { CvaControl, CvaDirective, OptionItem, SelectItem, SelectableOptionItem } from '@fundamental-ngx/cdk/forms';
import {
    AutoCompleteDirective,
    AutoCompleteEvent,
    ContentDensity,
    DynamicComponentService,
    FocusEscapeDirection,
    FocusTrapService,
    KeyUtil,
    Nullable,
    SearchHighlightPipe,
    TemplateDirective,
    TruncatedTitleDirective,
    coerceArraySafe,
    resizeObservable
} from '@fundamental-ngx/cdk/utils';
import {
    FD_LIST_COMPONENT,
    ListComponent,
    ListGroupHeaderDirective,
    ListItemComponent,
    ListSecondaryDirective,
    ListTitleDirective
} from '@fundamental-ngx/core/list';
import { MobileModeConfig } from '@fundamental-ngx/core/mobile-mode';
import { PopoverFillMode } from '@fundamental-ngx/core/shared';

import { contentDensityObserverProviders } from '@fundamental-ngx/core/content-density';
import { TokenComponent, TokenizerComponent } from '@fundamental-ngx/core/token';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { BaseMultiCombobox } from './base-multi-combobox.class';
import { MobileMultiComboboxComponent } from './mobile/mobile-multi-combobox.component';
import { MULTI_COMBOBOX_COMPONENT } from './multi-combobox.token';

import { MultiComboboxDataSourceParser } from './data-source/multi-combobox-data-source-parser';

import { NgClass, NgTemplateOutlet } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { CheckboxComponent } from '@fundamental-ngx/core/checkbox';
import { FormControlComponent, FormInputMessageGroupComponent, FormMessageComponent } from '@fundamental-ngx/core/form';
import { InputGroupComponent, InputGroupInputDirective } from '@fundamental-ngx/core/input-group';
import { PopoverBodyComponent, PopoverComponent, PopoverControlComponent } from '@fundamental-ngx/core/popover';
import { FD_LANGUAGE, FdLanguage, FdTranslatePipe, TranslationResolver } from '@fundamental-ngx/i18n';
import { shallowEqual } from 'fast-equals';
import { getSelectItemByInputValue, getTokenIndexByIdlOrValue } from './helpers';
import { MultiComboboxSelectionChangeEvent } from './models/selection-change.event';
import { MultiAnnouncerDirective } from './multi-announcer/multi-announcer.directive';
import { SelectAllTogglerComponent } from './select-all-toggler/select-all-toggler.component';

export const FD_MAP_LIMIT = new InjectionToken<number>('Map limit≥', { factory: () => 12 });

@Component({
    selector: 'fd-multi-combobox',
    templateUrl: './multi-combobox.component.html',
    styleUrl: './multi-combobox.component.scss',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    hostDirectives: [
        {
            directive: CvaDirective,
            inputs: ['id:inputId', 'placeholder', 'state', 'stateMessage', 'disabled', 'readonly', 'name']
        },
        {
            directive: DataSourceDirective,
            inputs: ['dataSource'],
            outputs: ['dataChanged']
        }
    ],
    providers: [
        CvaControl,
        DynamicComponentService,
        contentDensityObserverProviders(),
        {
            provide: FD_DATA_SOURCE_TRANSFORMER,
            useClass: MultiComboboxDataSourceParser
        },
        {
            provide: MULTI_COMBOBOX_COMPONENT,
            useExisting: MultiComboboxComponent
        }
    ],
    imports: [
        NgTemplateOutlet,
        PopoverComponent,
        PopoverControlComponent,
        PopoverBodyComponent,
        FormInputMessageGroupComponent,
        InputGroupComponent,
        TokenizerComponent,
        TokenComponent,
        FormsModule,
        AutoCompleteDirective,
        FormControlComponent,
        InputGroupInputDirective,
        FormMessageComponent,
        ListComponent,
        SelectAllTogglerComponent,
        ListGroupHeaderDirective,
        ListTitleDirective,
        ListItemComponent,
        CheckboxComponent,
        NgClass,
        ListSecondaryDirective,
        FdTranslatePipe,
        SearchHighlightPipe,
        MultiAnnouncerDirective,
        TruncatedTitleDirective
    ]
})
export class MultiComboboxComponent<T = any> extends BaseMultiCombobox<T> implements AfterViewInit, OnInit {
    /**
     * Configuration object for mobile mode appearance and behavior.
     * Only applies when `mobile` is true.
     */
    @Input()
    mobileConfig: MobileModeConfig;

    /**
     * Sets the currently selected items.
     */
    @Input()
    set selectedItems(value: T[] | null | undefined) {
        this._setSelectedItems(coerceArraySafe(value as T | T[]));
    }

    /**
     * Read-only array of currently selected items (backward-compatible API).
     */
    get selectedItems(): T[] {
        return this._selectedItems();
    }

    /**
     * Sets or gets the currently selected value.
     */
    @Input()
    set value(value: T[]) {
        this.setValue(value, true);
    }

    /**
     * Gets the current value from the form control.
     * @returns The current array of selected items
     */
    get value(): T[] {
        return this._cva.value;
    }

    /**
     * Show select all checkbox
     * @defaultValue false
     */
    readonly showSelectAll = input(false);

    /**
     * Maximum height of the dropdown options panel.
     * @defaultValue '250px'
     */
    readonly maxHeight = input('250px');

    /**
     * Controls whether the addon button can receive keyboard focus.
     * @defaultValue false
     */
    readonly buttonFocusable = input(false);

    /**
     *  Whether the autocomplete should be enabled; Enabled by default.
     * @defaultValue true
     */
    readonly autoComplete = input(true);

    /**
     * Whether list item options should be rendered as byline.
     * @defaultValue false
     */
    readonly byline = input(false);

    /**
     * Max width of multi combobox dropdown body.
     * `none` will not limit width of the dropdown.
     * `container` will limit width of the dropdown to the width of the multi-input itself.
     * `number` will limit width of the dropdown by provided number in pixels.
     *
     * @defaultValue 'none'
     */
    readonly bodyMaxWidth = input<'none' | 'container' | number>('none');

    /**
     * Computed maximum width for the popover in pixels.
     * @hidden
     */
    get _popoverMaxWidth(): Nullable<number> {
        const bodyMaxWidth = this.bodyMaxWidth();
        if (bodyMaxWidth === 'none') {
            return null;
        }

        if (typeof bodyMaxWidth === 'number') {
            return bodyMaxWidth;
        }

        return this._elementRef.nativeElement.getBoundingClientRect().width;
    }

    /**
     * TODO: Name of the entity for which DataProvider will be loaded. You can either pass list of
     * items or use this entityClass and internally we should be able to do lookup to some registry
     * and retrieve the best matching DataProvider that is set on application level
     */
    readonly entityClass = input<string>();

    /**
     * Enables mobile-optimized rendering mode.
     * When enabled, displays the combobox in a full-screen dialog optimized for touch devices.
     * Requires `mobileConfig` for full customization.
     *
     * @defaultValue false
     */
    readonly mobile = input(false);

    /**
     * Controls whether items should be grouped in the dropdown.
     * When enabled, items are organized by the property specified in `groupKey`.
     * Groups display as headers with items nested underneath.
     *
     * @defaultValue false
     */
    group = input(false);

    /**
     * Property path for grouping items.
     * Specifies which property to use for grouping items when `group` is enabled.
     *
     * @example
     * ```typescript
     * groupKey = input('department'); // Groups by item.department
     * ```
     *
     * @defaultValue ''
     */
    groupKey = input<string>('');

    /**
     * Property path for secondary text display.
     * When `showSecondaryText` is enabled, displays this property as secondary text below the main label.
     *
     * @defaultValue ''
     */
    secondaryKey = input<string>('');

    /**
     * Controls visibility of the secondary text column.
     * When enabled, displays secondary text from the `secondaryKey` property in a two-column layout.
     *
     * @defaultValue false
     */
    showSecondaryText = input(false);

    /**
     * Horizontally align text inside the second column (applicable for two columns layout).
     *
     * @defaultValue 'right'
     */
    readonly secondaryTextAlignment = input<'left' | 'right'>('right');

    /**
     * Enables automatic width adjustment of the dropdown.
     * When enabled, the dropdown width automatically adjusts based on content.
     * Disable for fixed-width dropdowns.
     *
     * @defaultValue true
     */
    readonly autoResize = input(true);

    /**
     * Controls whether clicking the addon button opens the dropdown.
     * @defaultValue true
     */
    readonly openDropdownOnAddOnClicked = input(true);

    /**
     * Preset options for the Select body width, whatever is chosen, the body has a 600px limit.
     * * `at-least` will apply a minimum width to the body equivalent to the width of the control. - Default
     * * `equal` will apply a width to the body equivalent to the width of the control.
     * * 'fit-content' will apply width needed to properly display items inside, independent of control.
     */
    readonly fillControlMode = input<PopoverFillMode>('at-least');

    /** Sets title attribute to addon button. */
    readonly addonIconTitle = input<string>();

    /**
     * @deprecated Use the i18n module to modify the translation for this string.
     * Sets invalid entry message.
     * */
    invalidEntryMessage = input<string | null | undefined>(null);

    /** Turns limitless mode, ON or OFF */
    limitless = model<boolean>(false);

    /**
     * Used in filters and any kind of comparators when we work with objects and this identify
     * unique field name based on which we are going to do the job
     */
    lookupKey = input<string>('');

    /**
     * When we deal with unknown object we can use `displayKey` to retrieve value from specific
     * property of the object to act as display value.
     *
     * @See ComboBox, Select, RadioGroup, CheckBox Group
     */
    displayKey = input<string>('');

    /**
     * List of values, it can be of type SelectItem, string or any object.
     * Generic object type is among the list of types,
     * because we allow to get labels and values using `displayKey` and `lookupKey` inputs accordingly.
     */
    readonly list = input<Array<SelectItem | string | object>>();

    /**
     * Time in ms for how long message of invalid entry should be displayed.
     * @defaultValue 3000
     */
    invalidEntryDisplayTime = input<number>(3000);

    /**
     * String matching strategy for typeahead list.
     * Available options: 'starts with per term', 'starts with', 'contains'
     * @defaultValue MatchingStrategy.STARTS_WITH_PER_TERM
     */
    readonly matchingStrategy = input(MatchingStrategy.STARTS_WITH_PER_TERM);

    /** Event emitted when item is selected. */
    selectionChange = output<MultiComboboxSelectionChangeEvent>();

    /** @hidden Emits event when the menu is opened/closed. */
    isOpenChange = output<boolean>();

    /** Emits event when the addon button is clicked. */
    addOnButtonClicked = output<Event>();

    /** Event emitted when data loading is started. */
    dataRequested = output<boolean>();

    /** Event emitted when data loading is finished. */
    dataReceived = output<boolean>();

    /**
     * References the search input element within the template.
     * @hidden
     */
    readonly searchInputElement = viewChild<FormControlComponent>('searchInputElement');

    /**
     * @hidden
     * Custom Option item Template.
     */
    optionItemTemplate: TemplateRef<any>;

    /**
     * @hidden
     * Custom Group Header item Template.
     */
    groupItemTemplate: TemplateRef<any>;

    /**
     * @hidden
     * Custom Secondary item Template.
     */
    secondaryItemTemplate: TemplateRef<any>;

    /**
     * @hidden
     * Custom Selected option item Template.
     */
    selectedItemTemplate: TemplateRef<any>;

    /**
     * Observable version of selectionChange for template use.
     *
     * @remarks
     * Used internally for components that require an Observable instead of OutputEmitterRef until we migrate everything to signals
     * Converts the output signal to an RxJS Observable.
     *
     * @hidden
     */
    readonly selectionChange$ = outputToObservable(this.selectionChange);

    /**
     * Content density mode for the component.
     * @hidden
     */
    _contentDensity: ContentDensity = this._multiComboboxConfig?.contentDensity ?? 'cozy';

    /**
     * Computed signal for the current input text value.
     * @returns Computed signal containing the current input text
     */
    inputText = computed(() => this._inputText() || '');

    /**
     * Indicates whether the search field is empty.
     * @returns true if the search field is empty, false otherwise
     */
    get isEmptyValue(): boolean {
        return this.inputText().trim().length === 0;
    }

    /**
     * Computed signal indicating whether grouping is active.
     * @hidden
     */
    isGroup = computed(() => !!(this.group() && this.groupKey()));

    /**
     * Tracks whether the dropdown is currently open.
     */
    isOpen = false;

    /**
     * @hidden
     * Max width of list container
     */
    maxWidth: number;

    /**
     * @hidden
     * Min width of list container
     */
    minWidth: number;

    /**
     * @hidden
     * Subject for communicating dropdown open/close state to mobile mode component.
     */
    openChange = new Subject<boolean>();

    /**
     * Internal writable signal storing the array of selected items.
     *
     * @remarks
     * Provides the underlying storage for the `selectedItems` property.
     * Modified through `_setSelectedItems()` to ensure proper coercion.
     *
     * @hidden Internal writable signal for selected items
     */
    protected readonly _selectedItems = signal<T[]>([]);

    /**
     * Internal writable signal storing the current input text.
     *
     * @remarks
     * Provides the underlying storage for the `inputText` computed signal.
     * Modified through `_setInputText()` to ensure side effects (like `onTouched`) are triggered.
     *
     * @hidden Internal writable signal for input text
     */
    protected readonly _inputText = signal<string>('');

    /**
     * Reference to the list component instance.
     * @hidden
     */
    private readonly listComponent = viewChild(FD_LIST_COMPONENT);

    /**
     * Collection of custom templates provided by content projection.
     * @hidden
     */
    private readonly customTemplates = contentChildren(TemplateDirective);

    /**
     * Template reference for the mobile mode control.
     * @hidden
     */
    private readonly mobileControlTemplate = viewChild<TemplateRef<any>>('mobileControlTemplate');

    /**
     * Template reference for the dropdown list.
     * @hidden
     */
    private readonly listTemplate = viewChild<TemplateRef<any>>('listTemplate');

    /**
     * Reference to the tokenizer component instance.
     * @hidden
     */
    private readonly _tokenizer = viewChild<TokenizerComponent>(TokenizerComponent);

    /**
     * Reference to the input group element.
     * @hidden
     */
    private readonly _inputGroup = viewChild('inputGroup', { read: ElementRef });

    /**
     * @hidden
     */
    private readonly items = viewChildren('item', { read: ElementRef });

    /**
     * Observable stream of the current language configuration.
     * @hidden
     */
    private readonly _lang$ = inject(FD_LANGUAGE);

    /**
     * Helper for resolving translation keys to localized strings.
     * @hidden
     */
    private _translationResolver = new TranslationResolver();

    /** @hidden */
    constructor(
        private readonly _elementRef: ElementRef,
        private readonly _viewContainerRef: ViewContainerRef,
        private readonly _dynamicComponentService: DynamicComponentService,
        private readonly _focusTrapService: FocusTrapService
    ) {
        super();

        this.contentDensityObserver.subscribe();
    }

    /** @hidden */
    ngOnInit(): void {
        this.cvaControl.listenToChanges();
        this._openDataStream(this.matchingStrategy());

        this._lang$.pipe(takeUntilDestroyed(this._destroyRef)).subscribe((lang: FdLanguage) => {
            this._invalidEntryMessageOverride.set(
                this._translationResolver.resolve(lang, 'platformMultiCombobox.invalidEntryError')
            );
        });
    }

    /** @hidden */
    async ngAfterViewInit(): Promise<void> {
        if (this.mobile()) {
            await this._setUpMobileMode();
        }

        this._assignCustomTemplates();

        this._initWindowResize();
    }

    /** @hidden */
    _toggleSelection(item: SelectableOptionItem, fromTokenCloseClick = false): void {
        const selectedSuggestions = this._selectedSuggestions();
        const idx = getTokenIndexByIdlOrValue(item, selectedSuggestions);
        if (idx === -1) {
            this._selectedSuggestions.set([...selectedSuggestions, item]);
        } else {
            this._selectedSuggestions.set(selectedSuggestions.filter((_, i) => i !== idx));
        }

        item.selected = !item.selected;

        this._propagateChange(fromTokenCloseClick);

        if (!this._selectedSuggestions().length) {
            this._focusToSearchField();
        }

        this._cd.detectChanges();
    }

    /** @hidden */
    _onOptionCheckboxClicked(event: MouseEvent, index: number): void {
        event.stopPropagation();
        this._onListElementClicked(event, index);
        this._setInputText('');
        this._searchTermChanged('');
    }

    /** @hidden */
    _onCompleteTerm(event: AutoCompleteEvent): void {
        if (event.forceClose) {
            this._toggleSelectionByInputText(event.term);
            this.close();
        }
    }

    /**
     * @hidden
     * Method that selects all possible options.
     * *select* attribute – if *true* select all, if *false* unselect all
     * */
    _handleSelectAllItems = (select: boolean): void => {
        this._flatSuggestions.update((items) => items.map((item) => ({ ...item, selected: select })));
        this._suggestions.update((items) => this._updateSelectionRecursive(items, select));
        this._selectedSuggestions.set(select ? [...this._flatSuggestions()] : []);
        this._rangeSelector.reset();
        this._setInputText('');

        this._propagateChange();
    };

    /** @hidden */
    _navigateByTokens(event: KeyboardEvent): void {
        if (KeyUtil.isKeyCode(event, [DOWN_ARROW, UP_ARROW]) && this.isOpen) {
            this.listComponent()?.items?.first.focus();
        }
    }

    /** @hidden */
    _removeToken(token: SelectableOptionItem, event?: MouseEvent): void {
        if (event) {
            event.preventDefault();
        }
        const optionItem = this._flatSuggestions().find((s) => s.value === token.value);
        if (optionItem) {
            this._toggleSelection(optionItem, true);
            this._rangeSelector.reset();
        }
    }

    /** @hidden */
    _moreClicked(): void {
        const selectedSuggestions = this._selectedSuggestions();
        this._suggestions.set(
            this.isGroup()
                ? this._convertObjectsToGroupOptionItems(selectedSuggestions.map(({ value }) => value))
                : this._suggestions().filter((value) =>
                      selectedSuggestions.some((item) => shallowEqual(item.value, value.value))
                  )
        );

        this._showList(true);
        this.selectedShown.set(true);
        this._cd.detectChanges();
    }

    /** @hidden */
    _onBlur(event: FocusEvent): void {
        const target = event.relatedTarget as HTMLElement;
        if (target) {
            const isList = !!target.closest('.fd-multi-combobox__list-container');
            if (isList) {
                return;
            }
            const suggestions = this._suggestions();
            if (suggestions?.length === 1 && suggestions[0].label === this.inputText() && !suggestions[0].selected) {
                this._toggleSelection(suggestions[0]);
            }
            this._showList(false);
            this._setInputText('');
        }
        this._cva.onTouched();
    }

    /** @hidden */
    _onItemKeyDownHandler(event: KeyboardEvent): void {
        if (KeyUtil.isKeyCode(event, ESCAPE)) {
            this._focusToSearchField();
        } else if ((event.ctrlKey || event.metaKey) && event.shiftKey && KeyUtil.isKeyCode(event, A)) {
            event.preventDefault();
            this._handleSelectAllItems(false);
        } else if ((event.ctrlKey || event.metaKey) && KeyUtil.isKeyCode(event, A)) {
            event.preventDefault();
            this._handleSelectAllItems(true);
        } else if (KeyUtil.isKeyCode(event, ENTER)) {
            if (!this.mobile()) {
                this.close();
            }
            this._rangeSelector.reset();
        } else if (KeyUtil.isKeyCode(event, SPACE)) {
            this._rangeSelector.reset();
        }
    }

    /** @hidden */
    _onOptionClicked(event: MouseEvent, index: number): void {
        this._onListElementClicked(event, index);
        this.close();
    }

    /**
     * @hidden
     * Handle dialog dismissing, closes popover and sets backup data.
     */
    _dialogDismiss(backup: SelectableOptionItem[]): void {
        this._selectedSuggestions.set([...backup]);
        this._setInputText('');
        this._showList(false);
        this.selectedShown.set(false);
    }

    /**
     * @hidden
     * Handle dialog approval, closes popover and propagates data changes.
     */
    _dialogApprove(): void {
        this._setInputText('');
        this._showList(false);
        this._propagateChange(true);
    }

    /** @hidden */
    _popoverOpenChangeHandle(isOpen: boolean): void {
        this.isOpen = isOpen;

        /** Allow combobox up and down arrows to work properly when multi combobox is inside a dialog with a trapped focus */
        if (this.isOpen) {
            this._focusTrapService.pauseCurrentFocusTrap();
        } else {
            this._focusTrapService.unpauseCurrentFocusTrap();
        }

        this._rangeSelector.reset();
        if (!isOpen) {
            this._cva.onTouched();
        }
    }

    /** Opens the select popover body. */
    open(): void {
        this.isOpen = true;
        this.isOpenChange.emit(this.isOpen);
        this._cd.markForCheck();
    }

    /** Closes the select popover body. */
    close(): void {
        this._focusToSearchField();
        this._rangeSelector.reset();
        this.selectedShown.set(false);
        this._setInputText('');

        this.isOpen = false;
        this.isOpenChange.emit(this.isOpen);
        this._cva.onTouched();
        this._cd.markForCheck();
    }

    /** @hidden */
    _showList(isOpen: boolean): void {
        if (this.isOpen !== isOpen) {
            this.isOpen = isOpen;
            this._cva.onTouched();
            this.openChange.next(isOpen);
        }

        if (!this.isOpen) {
            this._searchTermChanged('');
        }

        this._cd.markForCheck();
    }

    /** @hidden */
    _searchTermChanged(text: string = this.inputText()): void {
        const map = new Map();
        map.set('query', text);

        if (!this.limitless()) {
            map.set('limit', this._mapLimit);
        } else {
            map.set('limit', Number.MAX_SAFE_INTEGER);
        }

        this.dataSourceDirective.dataSourceProvider?.match(map);

        if (text) {
            this.open();
        }

        this._cd.markForCheck();
    }

    /**
     * Handle Click on Button
     * @hidden
     */
    _onPrimaryButtonClick(isOpen: boolean): void {
        if (!isOpen) {
            this._searchTermChanged('');
        }

        if (this.openDropdownOnAddOnClicked()) {
            this._showList(!isOpen);
        } else if (this.isOpen) {
            this._showList(false);
        }

        if (this.isOpen) {
            this.searchInputElement()?.elementRef.nativeElement.focus();
        }
    }

    /**
     * Handle Keydown on Input
     * @hidden
     */
    _onInputKeydownHandler(event: KeyboardEvent): void {
        if (this._cva.readonly) {
            return;
        }

        if (KeyUtil.isKeyCode(event, DOWN_ARROW)) {
            event.preventDefault();

            if (event.altKey) {
                this._showList(true);
            }

            const listComponent = this.listComponent();
            if (this.isOpen && listComponent) {
                listComponent.setItemActive(0);
            } else if (!this.isOpen) {
                this._chooseOtherItem(1);
            }
        } else if (KeyUtil.isKeyCode(event, UP_ARROW)) {
            event.preventDefault();

            this._chooseOtherItem(-1);
        } else if (KeyUtil.isKeyCode(event, ENTER)) {
            this._toggleSelectionByInputText();
        } else if (!KeyUtil.isKeyCode(event, [...this._nonOpeningKeys, CONTROL])) {
            this._showList(true);
            const acceptedKeys =
                !KeyUtil.isKeyType(event, 'alphabetical') &&
                !KeyUtil.isKeyType(event, 'numeric') &&
                !KeyUtil.isKeyType(event, 'ime');
            if (acceptedKeys) {
                // SetTimeout is needed for input to receive new value.
                setTimeout(() => {
                    if (this.isEmptyValue) {
                        this.listComponent()?.setItemActive(0);
                    }
                });
            }
        }
    }

    /**
     * @hidden
     * Method passed to list component.
     */
    _handleListFocusEscape(direction: FocusEscapeDirection): void {
        if (direction === 'up') {
            this._focusToSearchField();
        }
    }

    /**
     * @hidden
     */
    _addOnClicked($event: Event): void {
        this.addOnButtonClicked.emit($event);
        if (!this.mobile()) {
            this._onPrimaryButtonClick(this.isOpen);
        }
    }

    /** @hidden */
    _setLimitless(limitless: boolean): void {
        this.limitless.set(limitless);
    }

    /** @hidden */
    _getMapLimit(): number {
        return this.limitless() ? (this.dataSourceDirective.dataSource as any[]).length : this._mapLimit;
    }

    /** @hidden */
    _getGroupItemIds(groupIndex: number): string {
        const items = this.items();
        if (!items?.length) {
            return '';
        }

        const groupItemIds = items
            .filter((el) => {
                const idWithGroup = el.nativeElement.getAttribute('id-with-group-index');
                if (!idWithGroup) {
                    return false;
                }
                const groupIdx = idWithGroup.split('-')[idWithGroup.split('-').length - 1];
                return groupIdx === String(groupIndex);
            })
            .map((el) => el.nativeElement.getAttribute('id'));

        return groupItemIds?.join(' ');
    }

    /**
     * Updates the selected items with proper array coercion.
     *
     * @param value - The new array of selected items
     *
     * @remarks
     * Ensures the value is always a valid array, even if null or undefined is provided.
     * Use this method instead of directly setting `_selectedItems`.
     *
     * @hidden Protected method for internal writes with coercion
     */
    protected _setSelectedItems(value: T[]): void {
        this._selectedItems.set(coerceArraySafe(value));
    }

    /**
     * Updates the input text and triggers form control touch event.
     *
     * @param value - The new input text value
     *
     * @remarks
     * Sets the input text and calls `onTouched()` to mark the form control as touched.
     * Ensures proper integration with Angular forms and validation.
     *
     * @hidden Protected method for setting input text with side effects
     */
    protected _setInputText(value: string): void {
        this._inputText.set(value);
        this._cva.onTouched();
    }

    /**
     * @hidden
     * Recursively update selection state for items and their children (for grouped suggestions)
     */
    private _updateSelectionRecursive(items: SelectableOptionItem[], selected: boolean): SelectableOptionItem[] {
        return items.map((item) => ({
            ...item,
            selected,
            children: item.children ? this._updateSelectionRecursive(item.children, selected) : undefined
        }));
    }

    /** @hidden */
    private _toggleSelectionByInputText(text = this.inputText()): void {
        const item = getSelectItemByInputValue<T>(this._fullFlatSuggestions(), text);
        if (item) {
            this._toggleSelection(item);
            this._setInputText('');
        }

        this._searchTermChanged();
    }

    /**
     * @hidden
     * Method to set input text as item label.
     */
    private _setInputTextFromOptionItem(item: OptionItem): void {
        this._setInputText(item.label);

        if (this.mobile()) {
            return;
        }

        this._showList(false);
    }

    /**
     * @hidden
     * applying range selection. Note, that this function will be invoked after combobox item's value has been changed
     */
    private _onListElementClicked(event: MouseEvent, index: number): void {
        // value has been changed at this point, so it can be safely used
        const flatSuggestions = this._flatSuggestions();
        const selectionState = flatSuggestions[index].selected;
        this._rangeSelector.onRangeElementToggled(index, event);

        // Collect items to add/remove from selected suggestions
        const toRemove = new Set<any>();
        const toAdd: SelectableOptionItem[] = [];
        const indicesToUpdate = new Set<number>();

        this._rangeSelector.applyValueToEachInRange((idx) => {
            const item = flatSuggestions[idx];
            if (item.selected !== selectionState) {
                indicesToUpdate.add(idx);
                // Track what will change based on OLD state before the update
                if (item.selected) {
                    // Item is currently selected, will be deselected
                    toRemove.add(item.value);
                } else {
                    // Item is currently not selected, will be selected
                    toAdd.push({ ...item, selected: selectionState });
                }
            }
        });

        // Update flat suggestions immutably
        this._flatSuggestions.update((items) =>
            items.map((item, idx) => (indicesToUpdate.has(idx) ? { ...item, selected: selectionState } : item))
        );

        // Update selected suggestions
        this._selectedSuggestions.update((selected) => [...selected.filter((s) => !toRemove.has(s.value)), ...toAdd]);

        this._propagateChange();

        const tokenizer = this._tokenizer();
        if (tokenizer !== undefined) {
            tokenizer.onResize();
            tokenizer.tokenizerInnerEl.nativeElement.scrollLeft = tokenizer.tokenizerInnerEl.nativeElement.scrollWidth;
        }
    }

    /** @hidden */
    private _propagateChange(emitInMobile?: boolean): void {
        if (!this.mobile() || emitInMobile) {
            this._mapAndUpdateModel();
        }
    }

    /** @hidden */
    private async _setUpMobileMode(): Promise<void> {
        const injector = Injector.create({
            providers: [{ provide: MULTI_COMBOBOX_COMPONENT, useValue: this }],
            parent: this._injector
        });

        this._dynamicComponentService.createDynamicComponent(
            { listTemplate: this.listTemplate(), controlTemplate: this.mobileControlTemplate() },
            MobileMultiComboboxComponent,
            {
                containerRef: this._viewContainerRef
            },
            { injector }
        );
    }

    /**
     * @hidden
     * Method that picks other value moved from current one by offset, called only when Multi Combobox is closed.
     */
    private _chooseOtherItem(offset: number): void {
        const selectedSuggestions = this._selectedSuggestions();
        const flatSuggestions = this._flatSuggestions();
        if (selectedSuggestions?.length === flatSuggestions.length) {
            this._setInputText('');
            return;
        }

        const fullFlatSuggestions = this._fullFlatSuggestions();
        const activeValue = getSelectItemByInputValue<T>(fullFlatSuggestions, this.inputText());
        const index = flatSuggestions.findIndex((value) => value === activeValue);
        const position = !this.inputText() && offset === -1 ? flatSuggestions.length - 1 : index + offset;
        const item = flatSuggestions[position];

        if (item) {
            this._setInputTextFromOptionItem(item);
        }

        const selectedIndex = selectedSuggestions.findIndex((value) => value.label === item?.label);
        if (selectedIndex !== -1) {
            this._chooseOtherItem(offset);
        }
    }

    /** @hidden */
    private _initWindowResize(): void {
        this._getOptionsListWidth();

        if (!this.autoResize()) {
            return;
        }

        resizeObservable(this._inputGroup()?.nativeElement)
            .pipe(debounceTime(30), takeUntilDestroyed(this._destroyRef))
            .subscribe(() => this._getOptionsListWidth());
    }

    /** @hidden */
    private _getOptionsListWidth(): void {
        const body = document.body;
        const rect = this._inputGroup()?.nativeElement.getBoundingClientRect();
        const scrollBarWidth = body.offsetWidth - body.clientWidth;
        this.maxWidth = this.autoResize() ? window.innerWidth - scrollBarWidth - rect.left : this.minWidth;
        this._cd.detectChanges();
    }

    /**
     * @hidden
     * Assign custom templates
     */
    private _assignCustomTemplates(): void {
        this.customTemplates().forEach((template) => {
            switch (template.name) {
                case 'optionItemTemplate':
                    this.optionItemTemplate = template.templateRef;
                    break;
                case 'groupItemTemplate':
                    this.groupItemTemplate = template.templateRef;
                    break;
                case 'secondaryItemTemplate':
                    this.secondaryItemTemplate = template.templateRef;
                    break;
                case 'selectedItemTemplate':
                    this.selectedItemTemplate = template.templateRef;
                    break;
            }
        });
    }
}
