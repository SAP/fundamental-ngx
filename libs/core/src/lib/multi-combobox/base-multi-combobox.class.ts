import {
    BACKSPACE,
    CONTROL,
    DOWN_ARROW,
    ENTER,
    ESCAPE,
    LEFT_ARROW,
    RIGHT_ARROW,
    SHIFT,
    TAB,
    UP_ARROW
} from '@angular/cdk/keycodes';
import {
    ChangeDetectorRef,
    ContentChildren,
    Directive,
    ElementRef,
    EventEmitter,
    inject,
    Input,
    Output,
    QueryList,
    TemplateRef,
    ViewChild
} from '@angular/core';
import { MatchingStrategy } from '@fundamental-ngx/cdk/data-source';
import {
    CvaControl,
    CvaDirective,
    FormStates,
    isOptionItem,
    isSelectableOptionItem,
    SelectableOptionItem,
    SelectItem
} from '@fundamental-ngx/cdk/forms';
import {
    coerceArraySafe,
    ContentDensity,
    isFunction,
    isJsObject,
    isString,
    Nullable,
    RangeSelector,
    TemplateDirective
} from '@fundamental-ngx/cdk/utils';
import { ContentDensityObserver } from '@fundamental-ngx/core/content-density';
import { FormItemControl } from '@fundamental-ngx/core/form';
import { FD_LIST_COMPONENT, ListComponentInterface } from '@fundamental-ngx/core/list';
import { MobileModeConfig } from '@fundamental-ngx/core/mobile-mode';
import { PopoverFillMode } from '@fundamental-ngx/core/shared';
import { TokenizerComponent } from '@fundamental-ngx/core/token';
import equal from 'fast-deep-equal';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';
import { FdMultiComboboxAcceptableDataSource } from './data-source/multi-combobox-data-source';
import { displayValue, lookupValue, objectGet } from './helpers';
import { MultiComboboxConfig } from './multi-combobox-config';

export type TextAlignment = 'left' | 'right';

export class MultiComboboxSelectionChangeEvent {
    /**
     * Multi Combobox selection change event
     * @param source Multi Combobox component
     * @param selectedItems Selected items
     */
    constructor(
        public source: BaseMultiCombobox,
        public selectedItems: SelectableOptionItem['value'] // Contains selected items
    ) {}
}

@Directive()
export abstract class BaseMultiCombobox<T = any> {
    // Injection section
    /** @hidden */
    cvaControl: CvaControl<T> = inject(CvaControl);

    /** Control Value Accessor directive for forms support. */
    readonly _cva = inject(CvaDirective, {
        self: true
    });

    /** Multi combobox config. */
    readonly _multiComboboxConfig = inject(MultiComboboxConfig, {
        optional: true
    });

    /** Content Density Observer */
    readonly contentDensityObserver = inject(ContentDensityObserver);

    /** @Hidden */
    protected readonly _elmRef = inject(ElementRef<HTMLElement>);

    /** @hidden */
    protected readonly _cd = inject(ChangeDetectorRef);

    // Input section

    /** Provides selected items. */
    @Input()
    set selectedItems(value: T[]) {
        this._selectedItems = coerceArraySafe(value);
    }
    get selectedItems(): T[] {
        return this._selectedItems;
    }
    /** @hidden */
    private _selectedItems: T[] = [];

    /** Provides maximum height for the optionPanel. */
    @Input()
    maxHeight = '250px';

    /**
     * Whether AddOn Button should be focusable
     * @default true
     */
    @Input()
    buttonFocusable = true;

    /** Whether the autocomplete should be enabled; Enabled by default. */
    @Input()
    autoComplete = true;

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
    secondaryTextAlignment: TextAlignment = 'right';

    /** Turns on/off Adjustable Width feature. */
    @Input()
    autoResize = true;

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

    /** Sets invalid entry message. */
    @Input()
    invalidEntryMessage = 'Invalid entry';

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
    set list(value: Array<SelectItem | string | object>) {
        this._list = value;
    }
    get list(): Array<SelectItem | string | object> {
        return this._list;
    }

    /** Time in ms for how long message of invalid entry should be displayed. */
    @Input()
    invalidEntryDisplayTime = 3000;

    /** @hidden */
    private _list: Array<SelectItem | string | object>;

    /** Event emitted when item is selected. */
    @Output()
    selectionChange = new EventEmitter<MultiComboboxSelectionChangeEvent>();

    /** @hidden Emits event when the menu is opened/closed. */
    @Output()
    isOpenChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    /** Event emitted when data loading is started. */
    @Output()
    // eslint-disable-next-line @angular-eslint/no-output-on-prefix
    onDataRequested = new EventEmitter<void>();

    /** Event emitted when data loading is finished. */
    @Output()
    // eslint-disable-next-line @angular-eslint/no-output-on-prefix
    onDataReceived = new EventEmitter<void>();

    /** @hidden */
    @ViewChild(FD_LIST_COMPONENT)
    protected readonly listComponent: ListComponentInterface;

    /** @hidden */
    @ViewChild('searchInputElement')
    protected readonly searchInputElement: FormItemControl | undefined;

    /** @hidden */
    @ContentChildren(TemplateDirective)
    protected readonly customTemplates: QueryList<TemplateDirective>;

    /** @hidden */
    @ViewChild('mobileControlTemplate')
    protected readonly mobileControlTemplate: TemplateRef<any>;

    /** @hidden */
    @ViewChild('listTemplate')
    protected readonly listTemplate: TemplateRef<any>;

    /** @hidden */
    @ViewChild(TokenizerComponent)
    protected readonly _tokenizer: TokenizerComponent;

    /** @hidden */
    @ViewChild('inputGroup', { read: ElementRef })
    protected readonly _inputGroup: ElementRef<HTMLElement>;

    /**
     * @hidden
     * List of selected suggestions
     */
    _selectedSuggestions: SelectableOptionItem<T>[] = [];

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
     * List of matched suggestions
     */
    _suggestions: SelectableOptionItem[];

    /**
     * @hidden
     * Grouped suggestions mapped to array.
     */
    _flatSuggestions: SelectableOptionItem[] = [];

    /** @hidden */
    _fullFlatSuggestions: SelectableOptionItem[] = [];

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
    selectedShown$ = new BehaviorSubject(false);

    /** @hidden */
    protected _dataSource: FdMultiComboboxAcceptableDataSource<T>;

    /** @hidden */
    protected _inputTextValue: string;

    /** @hidden */
    protected _previousInputText: string;

    /** @hidden */
    protected _matchingStrategy: MatchingStrategy =
        this._multiComboboxConfig?.matchingStrategy ?? MatchingStrategy.CONTAINS;

    /** @hidden */
    protected _dsSubscription: Subscription | null = null;

    /** @hidden */
    protected _element: HTMLElement = this._elmRef.nativeElement;

    /**
     * @hidden
     * Keys, that won't trigger the popover's open state, when dispatched on search input.
     */
    protected readonly _nonOpeningKeys: number[] = [
        BACKSPACE,
        ESCAPE,
        ENTER,
        CONTROL,
        TAB,
        SHIFT,
        UP_ARROW,
        RIGHT_ARROW,
        DOWN_ARROW,
        LEFT_ARROW
    ];

    /** @hidden */
    protected _timerSub$: Subscription;

    /** @hidden */
    protected _previousState?: FormStates;

    /** @hidden */
    protected _previousStateMessage: Nullable<string>;

    /** @hidden */
    protected readonly _rangeSelector = new RangeSelector();

    /** @hidden */
    protected _displayFn = (value: any): string => displayValue(value, this.displayKey);

    /** @hidden */
    protected _secondaryFn = (value: any): string => {
        if (isOptionItem(value)) {
            return value.secondaryText ?? '';
        } else if (isJsObject(value) && this.secondaryKey) {
            const currentItem = objectGet(value, this.secondaryKey);

            return isFunction(currentItem) ? currentItem() : currentItem;
        } else {
            return value;
        }
    };

    /** @hidden */
    writeValue(value: any): void {
        this.selectedItems = coerceArraySafe(value);
        this._cva.writeValue(this.selectedItems);
        this._setSelectedSuggestions();
        this._emitChangeEvent();
    }

    /**
     * Used to change the value of a control.
     * @param value the value to be applied
     * @param emitOnChange whether to emit "onChange" event.
     * Should be "false", if the change is made programmatically (internally) by the control, "true" otherwise
     */
    setValue(value: any, emitOnChange = true): void {
        this.selectedItems = coerceArraySafe(value);
        this._cva.setValue(this.selectedItems, emitOnChange);
        this._setSelectedSuggestions();
        this._emitChangeEvent();
    }

    /**
     * @hidden
     * Method to emit change event
     */
    protected _emitChangeEvent(): void {
        const event = new MultiComboboxSelectionChangeEvent(this, this.selectedItems);

        this.selectionChange.emit(event);
    }

    /** @hidden */
    protected _setSelectedSuggestions(): void {
        this._selectedSuggestions = [];

        if (!this.selectedItems?.length) {
            return;
        }

        for (let i = 0; i <= this.selectedItems.length; i++) {
            const selectedItem = this.selectedItems[i];
            const idx = this._fullFlatSuggestions.findIndex(
                (item) => item.label === selectedItem || item.value === selectedItem
            );
            if (idx !== -1) {
                this._selectedSuggestions.push(this._fullFlatSuggestions[idx]);
                this._fullFlatSuggestions[idx].selected = true;
            }
        }

        this._cd.detectChanges();
    }

    /**
     * Convert original data to SelectableOptionItems Interface
     * @hidden
     */
    protected _convertToOptionItems(items: any[]): SelectableOptionItem<T>[] {
        const item = items[0];

        const elementTypeIsOptionItem = isSelectableOptionItem(item);
        if (elementTypeIsOptionItem) {
            return items as SelectableOptionItem[];
        }

        const elementTypeIsObject = isJsObject(item);
        if (elementTypeIsObject) {
            return this._convertObjectsToOptionItems(items);
        }

        const elementTypeIsString = isString(item);
        if (elementTypeIsString) {
            return this._convertPrimitiveToOptionItems(items);
        }

        return [];
    }

    /**
     * Convert data to SelectableOptionItems Interface
     * @hidden
     */
    protected _convertObjectsToOptionItems(items: T[]): SelectableOptionItem<T>[] {
        if (this.isGroup) {
            return this._convertObjectsToGroupOptionItems(items);
        } else if (this.showSecondaryText && this.secondaryKey) {
            return this._convertObjectsToSecondaryOptionItems(items);
        } else {
            return this._convertObjectsToDefaultOptionItems(items);
        }
    }

    /**
     * Convert object[] data to Group OptionItems Interface
     * @hidden
     */
    protected _convertObjectsToGroupOptionItems<K extends T>(items: K[]): SelectableOptionItem<T>[] {
        const group: Record<string, K[]> = {};

        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            const keyValue = item[this.groupKey];
            if (!keyValue) {
                continue;
            }

            if (!group[keyValue]) {
                group[keyValue] = [];
            }

            group[keyValue].push(item);
        }

        return Object.keys(group).map((key) => {
            const selectItem: SelectableOptionItem = {
                label: key,
                value: null,
                isGroup: true
            };

            const currentGroup = group[key];

            if (this.showSecondaryText && this.secondaryKey) {
                selectItem.children = this._convertObjectsToSecondaryOptionItems(currentGroup);
            } else {
                selectItem.children = this._convertObjectsToDefaultOptionItems(currentGroup);
            }

            return selectItem;
        });
    }

    /**
     * Convert T[] data to Secondary SelectableOptionItems<T> Interface
     * @hidden
     */
    protected _convertObjectsToSecondaryOptionItems<K extends T>(items: K[]): SelectableOptionItem<T>[] {
        const selectItems: SelectableOptionItem[] = [];

        for (let i = 0; i < items.length; i++) {
            const value = items[i];
            selectItems.push({
                label: displayValue(value, this.displayKey),
                id: lookupValue(value, this.lookupKey),
                secondaryText: objectGet(value, this.secondaryKey),
                value,
                selected: this.selectedItems?.includes(value) || false
            });
        }

        return selectItems;
    }

    /**
     * Convert Primitive data(Boolean, String, Number) to SelectableOptionItems Interface
     * @hidden
     */
    protected _convertPrimitiveToOptionItems(items: any[]): SelectableOptionItem<T>[] {
        const selectItems: SelectableOptionItem[] = [];
        for (let i = 0; i < items.length; i++) {
            const value = items[i];
            selectItems.push({
                label: value,
                id: lookupValue(value, this.lookupKey),
                value,
                selected: this.selectedItems?.includes(value) || false
            });
        }

        return selectItems;
    }

    /**
     * Convert T[] to SelectableOptionItems<T> Interface (Default)
     * @hidden
     */
    protected _convertObjectsToDefaultOptionItems(items: any[]): SelectableOptionItem<T>[] {
        const selectItems: SelectableOptionItem[] = [];

        for (let i = 0; i < items.length; i++) {
            const value = items[i];
            selectItems.push({
                label: displayValue(value, this.displayKey),
                id: lookupValue(value, this.lookupKey),
                value,
                selected: this.selectedItems?.includes(value) || false
            });
        }

        return selectItems;
    }

    /**
     * @hidden
     * Assign custom templates
     */
    protected _assignCustomTemplates(): void {
        this.customTemplates.forEach((template) => {
            switch (template.getName()) {
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

    /** @hidden */
    protected _setInvalidEntry(): void {
        if (this._previousState || this._previousStateMessage) {
            return;
        }

        this._previousState = this._cva.state;
        this._cva.state = 'error';

        this._previousStateMessage = this._cva.stateMessage;
        this._cva.stateMessage = this.invalidEntryMessage;

        this._cd.markForCheck();
    }

    /** @hidden */
    protected _unsetInvalidEntry(): void {
        this._cva.state = this._previousState;
        this._previousState = undefined;

        this._cva.stateMessage = this._previousStateMessage;
        this._previousStateMessage = undefined;

        this._cd.markForCheck();
    }

    /** @hidden */
    protected _focusToSearchField(): void {
        this.searchInputElement?.elmRef?.nativeElement.focus();
    }

    /** @hidden */
    protected _mapAndUpdateModel(): void {
        const selectedItems = this._selectedSuggestions.map(({ value }) => value);

        const shouldEmitChangeEvent = !equal(this.selectedItems, selectedItems);

        if (!shouldEmitChangeEvent) {
            return;
        }

        this.writeValue(selectedItems);

        this._cva.onChange(selectedItems);

        this._emitChangeEvent();
    }
}
