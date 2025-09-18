import { A, CONTROL, DOWN_ARROW, ENTER, ESCAPE, SPACE, UP_ARROW } from '@angular/cdk/keycodes';
import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ContentChildren,
    ElementRef,
    EventEmitter,
    InjectionToken,
    Injector,
    Input,
    OnInit,
    Output,
    QueryList,
    TemplateRef,
    ViewChild,
    ViewChildren,
    ViewContainerRef,
    ViewEncapsulation,
    inject
} from '@angular/core';
import { DataSourceDirective, FD_DATA_SOURCE_TRANSFORMER, MatchingStrategy } from '@fundamental-ngx/cdk/data-source';
import { CvaControl, CvaDirective, OptionItem, SelectItem, SelectableOptionItem } from '@fundamental-ngx/cdk/forms';
import {
    AutoCompleteDirective,
    AutoCompleteEvent,
    ContentDensity,
    DynamicComponentService,
    FocusEscapeDirection,
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
    ListComponentInterface,
    ListGroupHeaderDirective,
    ListItemComponent,
    ListSecondaryDirective,
    ListTitleDirective
} from '@fundamental-ngx/core/list';
import { MobileModeConfig } from '@fundamental-ngx/core/mobile-mode';
import { PopoverFillMode } from '@fundamental-ngx/core/shared';

import { contentDensityObserverProviders } from '@fundamental-ngx/core/content-density';
import { TokenComponent, TokenizerComponent } from '@fundamental-ngx/core/token';
import equal from 'fast-deep-equal';
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
     * Show select all checkbox
     */
    @Input()
    showSelectAll = false;

    /** Provides selected items. */
    @Input()
    set selectedItems(value: T[]) {
        this._selectedItems = coerceArraySafe(value);
    }
    get selectedItems(): T[] {
        return this._selectedItems;
    }
    /** Provides maximum height for the optionPanel. */
    @Input()
    maxHeight = '250px';

    /**
     * Whether AddOn Button should be focusable
     * @default false
     */
    @Input()
    buttonFocusable = false;

    /** Whether the autocomplete should be enabled; Enabled by default. */
    @Input()
    autoComplete = true;

    /** Whether list item options should be rendered as byline. */
    @Input()
    byline = false;

    /**
     * Max width of multi combobox dropdown body.
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

        return this._elementRef.nativeElement.getBoundingClientRect().width;
    }

    /**
     * TODO: Name of the entity for which DataProvider will be loaded. You can either pass list of
     * items or use this entityClass and internally we should be able to do lookup to some registry
     * and retrieve the best matching DataProvider that is set on application level
     */
    @Input()
    entityClass: string;

    /** Whether the multi-combobox should be built on mobile mode. */
    @Input()
    mobile = false;

    /** Multi Combobox Mobile Configuration, it's applied only, when mobile is enabled. */
    @Input()
    mobileConfig: MobileModeConfig;

    /** Tells the multi-combobox if we need to group items. */
    @Input()
    group = false;

    /** A field name to use to group data by (support dotted notation). */
    @Input()
    groupKey: string;

    /** The field to show data in secondary column. */
    @Input()
    secondaryKey: string;

    /** Show the second column (applicable for two columns layout). */
    @Input()
    showSecondaryText = false;

    /** Horizontally align text inside the second column (applicable for two columns layout). */
    @Input()
    secondaryTextAlignment: 'left' | 'right' = 'right';

    /** Turns on/off Adjustable Width feature. */
    @Input()
    autoResize = true;

    /** Whether to open the dropdown when the addon button is clicked. */
    @Input()
    openDropdownOnAddOnClicked = true;

    /** Value of the multi combobox */
    @Input()
    set value(value: T[]) {
        this.setValue(value, true);
    }

    get value(): T[] {
        return this._cva.value;
    }
    /**
     * Preset options for the Select body width, whatever is chosen, the body has a 600px limit.
     * * `at-least` will apply a minimum width to the body equivalent to the width of the control. - Default
     * * `equal` will apply a width to the body equivalent to the width of the control.
     * * 'fit-content' will apply width needed to properly display items inside, independent of control.
     */
    @Input()
    fillControlMode: PopoverFillMode = 'at-least';

    /** Sets title attribute to addon button. */
    @Input()
    addonIconTitle: string;

    /**
     * @deprecated Use the i18n module to modify the translation for this string.
     * Sets invalid entry message.
     * */
    @Input()
    invalidEntryMessage: Nullable<string>;

    /** Turns limitless mode, ON or OFF */
    @Input()
    limitless: boolean;

    /**
     * Used in filters and any kind of comparators when we work with objects and this identify
     * unique field name based on which we are going to do the job
     */
    @Input()
    lookupKey: string;

    /**
     * When we deal with unknown object we can use `displayKey` to retrieve value from specific
     * property of the object to act as display value.
     *
     * @See ComboBox, Select, RadioGroup, CheckBox Group
     */
    @Input()
    displayKey: string;

    /**
     * List of values, it can be of type SelectItem, string or any object.
     * Generic object type is among the list of types,
     * because we allow to get labels and values using `displayKey` and `lookupKey` inputs accordingly.
     */
    @Input()
    list: Array<SelectItem | string | object>;

    /** Time in ms for how long message of invalid entry should be displayed. */
    @Input()
    invalidEntryDisplayTime = 3000;

    /**
     * String matching strategy for typeahead list.
     * Available options: 'starts with per term', 'starts with', 'contains'
     * Default: 'starts with per term' */
    @Input()
    matchingStrategy = MatchingStrategy.STARTS_WITH_PER_TERM;

    /** Event emitted when item is selected. */
    @Output()
    selectionChange = new EventEmitter<MultiComboboxSelectionChangeEvent>();

    /** @hidden Emits event when the menu is opened/closed. */
    @Output()
    isOpenChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    /** Emits event when the addon button is clicked. */
    @Output()
    addOnButtonClicked: EventEmitter<Event> = new EventEmitter<Event>();

    /** Event emitted when data loading is started. */
    @Output()
    dataRequested = new EventEmitter<boolean>();

    /** Event emitted when data loading is finished. */
    @Output()
    dataReceived = new EventEmitter<boolean>();

    /** @hidden */
    @ViewChild('searchInputElement', { read: ElementRef })
    readonly searchInputElement: Nullable<ElementRef<HTMLInputElement>>;

    /** @hidden */
    @ViewChild(FD_LIST_COMPONENT)
    private readonly listComponent: ListComponentInterface;

    /** @hidden */
    @ContentChildren(TemplateDirective)
    private readonly customTemplates: QueryList<TemplateDirective>;

    /** @hidden */
    @ViewChild('mobileControlTemplate')
    private readonly mobileControlTemplate: TemplateRef<any>;

    /** @hidden */
    @ViewChild('listTemplate')
    private readonly listTemplate: TemplateRef<any>;

    /** @hidden */
    @ViewChild(TokenizerComponent)
    private readonly _tokenizer: TokenizerComponent;

    /** @hidden */
    @ViewChild('inputGroup', { read: ElementRef })
    private readonly _inputGroup: ElementRef<HTMLElement>;

    /** @hidden */
    @ViewChildren('item', { read: ElementRef })
    private readonly items: QueryList<ElementRef>;

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

    /** @hidden */
    _contentDensity: ContentDensity = this._multiComboboxConfig?.contentDensity ?? 'cozy';

    /** Set the input text of the input. */
    set inputText(value: string) {
        this._inputTextValue = value;

        this._cva.onTouched();
    }

    /** Get the input text of the input. */
    get inputText(): string {
        return this._inputTextValue || '';
    }

    /** Is empty search field. */
    get isEmptyValue(): boolean {
        return this.inputText.trim().length === 0;
    }

    /** @hidden */
    get isGroup(): boolean {
        return !!(this.group && this.groupKey);
    }

    /** Whether the Multi Input is opened. */
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
     * Need for opening mobile version
     */
    openChange = new Subject<boolean>();

    /** @hidden */
    private _selectedItems: T[] = [];

    /** @hidden */
    private readonly _lang$ = inject(FD_LANGUAGE);

    /** @hidden */
    private _translationResolver = new TranslationResolver();

    /** @hidden */
    constructor(
        private readonly _elementRef: ElementRef,
        private readonly _injector: Injector,
        private readonly _viewContainerRef: ViewContainerRef,
        private readonly _dynamicComponentService: DynamicComponentService
    ) {
        super();

        this.contentDensityObserver.subscribe();
    }

    /** @hidden */
    ngOnInit(): void {
        this.cvaControl.listenToChanges();
        this._openDataStream(this.matchingStrategy);

        this._lang$.pipe(takeUntilDestroyed(this._destroyRef)).subscribe((lang: FdLanguage) => {
            this.invalidEntryMessage = this._translationResolver.resolve(
                lang,
                'platformMultiCombobox.invalidEntryError'
            );
        });
    }

    /** @hidden */
    async ngAfterViewInit(): Promise<void> {
        if (this.mobile) {
            await this._setUpMobileMode();
        }

        this._assignCustomTemplates();

        this._initWindowResize();
    }

    /** @hidden */
    _toggleSelection(item: SelectableOptionItem, fromTokenCloseClick = false): void {
        const idx = getTokenIndexByIdlOrValue(item, this._selectedSuggestions);
        if (idx === -1) {
            this._selectedSuggestions.push(item);
        } else {
            this._selectedSuggestions.splice(idx, 1);
        }

        item.selected = !item.selected;

        this._propagateChange(fromTokenCloseClick);

        if (!this._selectedSuggestions.length) {
            this._focusToSearchField();
        }

        this._cd.detectChanges();
    }

    /** @hidden */
    _onOptionCheckboxClicked(event: MouseEvent, index: number): void {
        event.stopPropagation();
        this._onListElementClicked(event, index);
        this.inputText = '';
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
        this._flatSuggestions.forEach((item) => (item.selected = select));
        this._onEveryItem(this._suggestions, (item) => (item.selected = select));
        this._selectedSuggestions = select ? [...this._flatSuggestions] : [];
        this._rangeSelector.reset();
        this.inputText = '';

        this._propagateChange();
    };

    /** @hidden */
    _navigateByTokens(event: KeyboardEvent): void {
        if (KeyUtil.isKeyCode(event, [DOWN_ARROW, UP_ARROW]) && this.isOpen) {
            this.listComponent.items?.first.focus();
        }
    }

    /** @hidden */
    _removeToken(token: SelectableOptionItem, event?: MouseEvent): void {
        if (event) {
            event.preventDefault();
        }
        const optionItem = this._flatSuggestions.find((s) => s.value === token.value);
        if (optionItem) {
            this._toggleSelection(optionItem, true);
            this._rangeSelector.reset();
        }
    }

    /** @hidden */
    _moreClicked(): void {
        this._suggestions = this.isGroup
            ? this._convertObjectsToGroupOptionItems(this._selectedSuggestions.map(({ value }) => value))
            : this._suggestions.filter((value) =>
                  this._selectedSuggestions.some((item) => equal(item.value, value.value))
              );

        this._showList(true);
        this.selectedShown$.next(true);
        this._cd.markForCheck();
    }

    /** @hidden */
    _onBlur(event: FocusEvent): void {
        const target = event.relatedTarget as HTMLElement;
        if (target) {
            const isList = !!target.closest('.fd-multi-combobox__list-container');
            if (isList) {
                return;
            }
            if (
                this._suggestions?.length === 1 &&
                this._suggestions[0].label === this.inputText &&
                !this._suggestions[0].selected
            ) {
                this._toggleSelection(this._suggestions[0]);
            }
            this._showList(false);
            this.inputText = '';
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
            if (!this.mobile) {
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
        this._selectedSuggestions = [...backup];
        this.inputText = '';
        this._showList(false);
        this.selectedShown$.next(false);
    }

    /**
     * @hidden
     * Handle dialog approval, closes popover and propagates data changes.
     */
    _dialogApprove(): void {
        this.inputText = '';
        this._showList(false);
        this._propagateChange(true);
    }

    /** @hidden */
    _popoverOpenChangeHandle(isOpen: boolean): void {
        this.isOpen = isOpen;
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
        this.selectedShown$.next(false);
        this.inputText = '';

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
    _searchTermChanged(text: string = this.inputText): void {
        const map = new Map();
        map.set('query', text);

        if (!this.limitless) {
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

        if (this.openDropdownOnAddOnClicked) {
            this._showList(!isOpen);
        } else if (this.isOpen) {
            this._showList(false);
        }

        if (this.isOpen) {
            this.searchInputElement?.nativeElement.focus();
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

            if (this.isOpen && this.listComponent) {
                this.listComponent.setItemActive(0);
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
                        this.listComponent?.setItemActive(0);
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
        if (!this.mobile) {
            this._onPrimaryButtonClick(this.isOpen);
        }
    }

    /** @hidden */
    _setLimitless(limitless: boolean): void {
        this.limitless = limitless;
    }

    /** @hidden */
    _getMapLimit(): number {
        return this.limitless ? (this.dataSourceDirective.dataSource as any[]).length : this._mapLimit;
    }

    /** @hidden */
    _getGroupItemIds(groupIndex: number): string {
        if (!this.items?.length) {
            return '';
        }

        const groupItemIds = this.items
            .filter((el) => {
                const idWithGroup = el.nativeElement.getAttribute('id-with-group-index');
                const groupIdx = idWithGroup.split('-')[idWithGroup.split('-').length - 1];
                return groupIdx === String(groupIndex);
            })
            .map((el) => el.nativeElement.getAttribute('id'));

        return groupItemIds?.join(' ');
    }

    /**
     * @hidden
     * Iterate over every item and perform callback
     */
    private _onEveryItem(items: SelectableOptionItem[], callback: (item: SelectableOptionItem) => void): void {
        items.forEach((item) => {
            callback(item);
            if (item.children && item.children.length > 0) {
                this._onEveryItem(item.children, callback);
            }
        });
    }

    /** @hidden */
    private _toggleSelectionByInputText(text = this.inputText): void {
        const item = getSelectItemByInputValue<T>(this._fullFlatSuggestions, text);
        if (item) {
            this._toggleSelection(item);
            this.inputText = '';
        }

        this._searchTermChanged();
    }

    /**
     * @hidden
     * Method to set input text as item label.
     */
    private _setInputTextFromOptionItem(item: OptionItem): void {
        this.inputText = item.label;

        if (this.mobile) {
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
        const selectionState = this._flatSuggestions[index].selected;
        this._rangeSelector.onRangeElementToggled(index, event);
        const toRemoveSet = new Set();
        this._rangeSelector.applyValueToEachInRange((idx) => {
            const current = this._flatSuggestions[idx];
            if (current.selected !== selectionState) {
                if (current.selected) {
                    // removing from "_selectedSuggestions" list
                    toRemoveSet.add(current.value);
                } else {
                    // adding current item to "_selectedSuggestions"
                    this._selectedSuggestions.push(current);
                }
                current.selected = selectionState;
            }
        });
        this._selectedSuggestions = this._selectedSuggestions.filter((s) => !toRemoveSet.has(s.value));
        this._propagateChange();

        this._tokenizer.onResize();

        this._tokenizer.tokenizerInnerEl.nativeElement.scrollLeft =
            this._tokenizer.tokenizerInnerEl.nativeElement.scrollWidth;
    }

    /** @hidden */
    private _propagateChange(emitInMobile?: boolean): void {
        if (!this.mobile || emitInMobile) {
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
            { listTemplate: this.listTemplate, controlTemplate: this.mobileControlTemplate },
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
        if (this._selectedSuggestions?.length === this._flatSuggestions.length) {
            this.inputText = '';
            return;
        }

        const activeValue = getSelectItemByInputValue<T>(this._fullFlatSuggestions, this.inputText);
        const index = this._flatSuggestions.findIndex((value) => value === activeValue);
        const position = !this.inputText && offset === -1 ? this._flatSuggestions.length - 1 : index + offset;
        const item = this._flatSuggestions[position];

        if (item) {
            this._setInputTextFromOptionItem(item);
        }

        const selectedIndex = this._selectedSuggestions.findIndex((value) => value.label === item?.label);
        if (selectedIndex !== -1) {
            this._chooseOtherItem(offset);
        }
    }

    /** @hidden */
    private _initWindowResize(): void {
        this._getOptionsListWidth();

        if (!this.autoResize) {
            return;
        }

        resizeObservable(this._inputGroup.nativeElement)
            .pipe(debounceTime(30), takeUntilDestroyed(this._destroyRef))
            .subscribe(() => this._getOptionsListWidth());
    }

    /** @hidden */
    private _getOptionsListWidth(): void {
        const body = document.body;
        const rect = this._inputGroup.nativeElement.getBoundingClientRect();
        const scrollBarWidth = body.offsetWidth - body.clientWidth;
        this.maxWidth = this.autoResize ? window.innerWidth - scrollBarWidth - rect.left : this.minWidth;
        this._cd.detectChanges();
    }

    /**
     * @hidden
     * Assign custom templates
     */
    private _assignCustomTemplates(): void {
        this.customTemplates.forEach((template) => {
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
