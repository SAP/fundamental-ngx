import {
    ALT,
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
    DestroyRef,
    Directive,
    ElementRef,
    Injector,
    InputSignal,
    ModelSignal,
    OutputEmitterRef,
    Signal,
    WritableSignal,
    afterNextRender,
    inject,
    signal,
    viewChild
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DataSourceDirective, MatchingBy, MatchingStrategy } from '@fundamental-ngx/cdk/data-source';
import {
    CvaControl,
    CvaDirective,
    FormStates,
    SelectableOptionItem,
    isOptionItem,
    isSelectableOptionItem
} from '@fundamental-ngx/cdk/forms';
import { Nullable, RangeSelector, coerceArraySafe, isFunction, isJsObject, isString } from '@fundamental-ngx/cdk/utils';
import { ContentDensityObserver } from '@fundamental-ngx/core/content-density';
import { FormControlComponent } from '@fundamental-ngx/core/form';
import { PopoverComponent } from '@fundamental-ngx/core/popover';
import equal from 'fast-deep-equal';
import { Subscription, skip, startWith, timer } from 'rxjs';
import {
    FdMultiComboBoxDataSource,
    FdMultiComboboxAcceptableDataSource
} from './data-source/multi-combobox-data-source';
import { displayValue, flattenGroups, lookupValue, objectGet } from './helpers';
import { MultiComboboxSelectionChangeEvent } from './models/selection-change.event';
import { MultiComboboxConfig } from './multi-combobox-config';
import { FD_MAP_LIMIT } from './multi-combobox.component';

export type TextAlignment = 'left' | 'right';

@Directive()
export abstract class BaseMultiCombobox<T = any> {
    /**
     * Signal containing the currently selected items in the multi-combobox.
     * This is a read-only signal that reflects the current selection state.
     * To modify selections, use the `writeValue()` or `setValue()` methods.
     */
    abstract selectedItems: Signal<T[]>;

    /**
     * Determines whether items should be grouped in the dropdown.
     * When enabled, items will be organized into groups based on the `groupKey` property.
     */
    abstract group: InputSignal<boolean>;

    /**
     * The property name used to group items when `group` is enabled.
     * This key is used to extract the grouping value from each item object.
     *
     * @example
     * ```typescript
     * // If items are: [{name: 'Apple', category: 'Fruit'}, {name: 'Carrot', category: 'Vegetable'}]
     * groupKey = 'category'; // Groups by 'Fruit' and 'Vegetable'
     * ```
     */
    abstract groupKey: InputSignal<string>;

    /**
     * The property name used to display item labels in the dropdown.
     * For primitive types (strings, numbers), this is ignored and the value itself is displayed.
     * For objects, this specifies which property to use as the display text.
     *
     * @example
     * ```typescript
     * displayKey = 'name'; // Displays item.name for each item
     * ```
     */
    abstract displayKey: InputSignal<string>;

    /**
     * The property name used to display secondary text below the main label.
     * Only displayed when `showSecondaryText` is enabled.
     */
    abstract secondaryKey: InputSignal<string>;

    /**
     * Controls whether secondary text should be displayed for each item.
     * When enabled, uses the `secondaryKey` property to extract and display secondary text.
     */
    abstract showSecondaryText: InputSignal<boolean>;

    /**
     * The property name used as a unique identifier for each item.
     * Used for item comparison, deduplication, and tracking selections.
     * If not specified, the entire object is compared.
     */
    abstract lookupKey: InputSignal<string>;

    /**
     * Signal containing the error message displayed when an invalid entry is detected.
     * Displayed temporarily when the user enters text that doesn't match any available options.
     */
    abstract invalidEntryMessage: InputSignal<string | null | undefined>;

    /**
     * Signal containing the duration (in milliseconds) to display the invalid entry message.
     * After this duration expires, the error message is automatically hidden.
     */
    abstract invalidEntryDisplayTime: Signal<number>;

    /**
     * Model signal controlling whether limitless mode is enabled.
     * In limitless mode, all available items are loaded without pagination limits.
     * Use with caution for large datasets as it may impact performance.
     */
    abstract limitless: ModelSignal<boolean>;

    /**
     * Signal indicating whether the current configuration uses grouped items.
     *
     * @remarks
     * Computed based on whether both `group` and `groupKey` are defined.
     * Used internally to determine rendering strategy.
     */
    abstract isGroup: Signal<boolean>;

    /**
     * Signal containing the current text in the search input field.
     * Updates reactively as the user types. Used for filtering and autocomplete functionality.
     */
    abstract inputText: Signal<string>;

    /**
     * Signal containing a reference to the search input element.
     */
    abstract searchInputElement: Signal<FormControlComponent | undefined>;

    /**
     * Output emitter for selection change events.
     */
    abstract selectionChange: OutputEmitterRef<MultiComboboxSelectionChangeEvent>;

    /**
     * Output emitter for data received events.
     */
    abstract dataReceived: OutputEmitterRef<boolean>;

    /**
     * Output emitter for data request events.
     */
    abstract dataRequested: OutputEmitterRef<boolean>;

    /**
     * Internal writable signal for selected items.
     * Must be implemented by subclass. Provides write access to the selection state.
     * @hidden
     */
    protected abstract _selectedItems: WritableSignal<T[]>;

    /**
     * Internal writable signal for input text.
     * Must be implemented by subclass. Provides write access to the input text.
     *
     * @hidden
     */
    protected abstract _inputText: WritableSignal<string>;

    /**
     * Protected method for internal writes to selectedItems with coercion.
     * Ensures the value is properly coerced to an array before setting.
     *
     * @param value - The new array of selected items
     * @hidden
     */
    protected abstract _setSelectedItems(value: T[]): void;

    /**
     * Protected method for setting input text with side effects.
     * Triggers `onTouched()` callback to mark the control as touched.
     *
     * @param value - The new input text value
     * @hidden
     */
    protected abstract _setInputText(value: string): void;

    /**
     * Control value accessor instance for forms integration.
     * @hidden
     */
    readonly cvaControl: CvaControl<T> = inject(CvaControl);

    /**
     * Data source directive instance for managing async data loading and filtering.
     * @hidden
     */
    readonly dataSourceDirective: DataSourceDirective<T, FdMultiComboBoxDataSource<T>> = inject(DataSourceDirective);

    /** Control Value Accessor directive for forms support. */
    readonly _cva = inject(CvaDirective<T>, {
        self: true
    });

    /** Multi combobox config. */
    readonly _multiComboboxConfig = inject(MultiComboboxConfig, {
        optional: true
    });

    /** Content Density Observer */
    readonly contentDensityObserver = inject(ContentDensityObserver);

    /**
     * Signal containing currently selected suggestion items.
     * @hidden
     */
    _selectedSuggestions = signal<SelectableOptionItem<T>[]>([]);

    /**
     * Signal containing currently matched suggestion items based on search text.
     * Updates when the user types in the search field.
     * Contains filtered options that match the current query.
     * @hidden
     */
    _suggestions = signal<SelectableOptionItem[]>([]);

    /**
     * Signal containing flattened suggestion items (groups expanded to flat list).
     * @hidden
     */
    _flatSuggestions = signal<SelectableOptionItem[]>([]);

    /**
     * Signal containing the complete flattened list of all available items.
     * @hidden
     */
    _fullFlatSuggestions = signal<SelectableOptionItem[]>([]);

    /**
     * Signal indicating whether the "show selected only" mode is active.
     * In mobile mode, toggles between showing all items and showing only selected items.
     * @hidden
     */
    selectedShown = signal(false);

    /**
     * Writable signal for overriding the invalid entry message with i18n translations.
     * @hidden
     */
    protected readonly _invalidEntryMessageOverride = signal<Nullable<string>>(null);

    /** @hidden */
    protected readonly _elmRef = inject(ElementRef<HTMLElement>);

    /** @hidden */
    protected readonly _cd = inject(ChangeDetectorRef);

    /**
     * Maximum number of items to load per page when limitless mode is disabled.
     * Controls pagination size for large datasets.
     * @hidden
     */
    protected readonly _mapLimit = inject(FD_MAP_LIMIT);

    /** @hidden */
    protected readonly _destroyRef = inject(DestroyRef);

    /** @hidden */
    protected readonly _injector = inject(Injector);

    /** @hidden */
    protected _dataSource: FdMultiComboboxAcceptableDataSource<T>;

    /**
     * Previous input text value before the last change.
     * Used for restoring the input on invalid entry or cancellation.
     * @hidden
     */
    protected _previousInputText: string;

    /**
     * Matching strategy for filtering items based on user input.
     * Determines how items are matched: starts with, contains, etc.
     * Defaults to value from config or `MatchingStrategy.CONTAINS`.
     * @hidden
     */
    protected _matchingStrategy: MatchingStrategy =
        this._multiComboboxConfig?.matchingStrategy ?? MatchingStrategy.CONTAINS;

    /**
     * Subscription for data source events.
     * @hidden
     */
    protected _dsSubscription: Subscription | null = null;

    /**
     * Reference to the host element.
     * @hidden
     */
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
        LEFT_ARROW,
        ALT
    ];

    /**
     * Timer subscription for displaying invalid entry message.
     * Auto-hides the error message after the configured duration.
     * @hidden
     */
    protected _timerSub$: Subscription;

    /**
     * Previous form state before displaying invalid entry error.
     * Stored to restore the original state after error is cleared.
     * @hidden
     */
    protected _previousState?: FormStates;

    /**
     * Previous state message before displaying invalid entry error.
     */
    protected _previousStateMessage: Nullable<string>;

    /**
     * Range selector utility for handling shift+click multi-selection.
     */
    protected readonly _rangeSelector = new RangeSelector();

    /**
     * Flag indicating whether the data source has changed.
     * Set to true when a new data source is assigned, triggering a refresh of suggestions.
     * @hidden
     */
    private _dataSourceChanged = false;

    /**
     * Signal reference to the popover component.
     * Used for controlling popover visibility and position.
     * @hidden
     */
    private readonly popover = viewChild(PopoverComponent);

    /**
     * Writes a value to the control from the forms API.
     *
     * @param value - Array of items to set as selected
     * @remarks
     * Part of the ControlValueAccessor interface. Called by Angular forms
     * when the form model changes.
     * @hidden
     */
    writeValue(value: T[]): void {
        this._setSelectedItems(coerceArraySafe(value));
        this._cva.writeValue(this.selectedItems());
        this._setSelectedSuggestions();
        this._emitChangeEvent();
    }

    /**
     * Used to change the value of a control.
     * @param value the value to be applied
     * @param emitOnChange whether to emit "onChange" event.
     * Should be "false", if the change is made programmatically (internally) by the control, "true" otherwise
     */
    setValue(value: T[], emitOnChange = true): void {
        this._setSelectedItems(coerceArraySafe(value));
        this._cva.setValue(this.selectedItems(), emitOnChange);
        this._setSelectedSuggestions();
        this._emitChangeEvent();
    }

    /** @hidden */
    protected _displayFn = (value: T): string => displayValue(value, this.displayKey());

    /** @hidden */
    protected _secondaryFn = (value: T): string => {
        if (isOptionItem(value)) {
            return value.secondaryText ?? '';
        } else if (isJsObject(value) && this.secondaryKey()) {
            const currentItem = objectGet(value, this.secondaryKey());

            return isFunction(currentItem) ? currentItem() : currentItem;
        } else {
            return value as string;
        }
    };

    /**
     * @hidden
     * Method to emit change event
     */
    protected _emitChangeEvent(): void {
        const event = new MultiComboboxSelectionChangeEvent(this, this.selectedItems());

        this.selectionChange.emit(event);

        // Wait for Angular to complete the current render cycle, then refresh popover position after selection changes
        afterNextRender(
            () => {
                this.popover()?.refreshPosition();
            },
            { injector: this._injector }
        );
    }

    /** @hidden */
    protected _setSelectedSuggestions(): void {
        this._selectedSuggestions.set([]);

        const selectedItems = this.selectedItems();
        if (!selectedItems?.length) {
            return;
        }

        const fullFlatSuggestions = this._fullFlatSuggestions();
        const selectedSuggestions: SelectableOptionItem<T>[] = [];

        // Update immutably
        const updatedSuggestions = fullFlatSuggestions.map((item) => {
            const isSelected = selectedItems.some(
                (selectedItem) => item.label === selectedItem || item.value === selectedItem
            );

            if (isSelected) {
                selectedSuggestions.push({ ...item, selected: true });
                return { ...item, selected: true };
            } else if (item.selected) {
                // Item was selected but is now deselected - must update to false
                return { ...item, selected: false };
            }

            // Item was not and is not selected - no change needed
            return item;
        });

        this._selectedSuggestions.set(selectedSuggestions);
        this._fullFlatSuggestions.set(updatedSuggestions);
    }

    /**
     * Convert original data to SelectableOptionItems Interface
     * @hidden
     */
    protected _convertToOptionItems(items: T[]): SelectableOptionItem<T>[] {
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
        if (this.isGroup()) {
            return this._convertObjectsToGroupOptionItems(items);
        } else if (this.showSecondaryText() && this.secondaryKey()) {
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
            const keyValue = item[this.groupKey()];
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

            if (this.showSecondaryText() && this.secondaryKey()) {
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
        const selectedItems = this.selectedItems();

        for (let i = 0; i < items.length; i++) {
            const value = items[i];
            selectItems.push({
                label: displayValue(value, this.displayKey()),
                id: lookupValue(value, this.lookupKey()),
                secondaryText: objectGet(value, this.secondaryKey()),
                value,
                selected: selectedItems.includes(value) || false
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
        const selectedItems = this.selectedItems();
        for (let i = 0; i < items.length; i++) {
            const value = items[i];
            selectItems.push({
                label: value,
                id: lookupValue(value, this.lookupKey()),
                value,
                selected: selectedItems.includes(value) || false
            });
        }

        return selectItems;
    }

    /**
     * Convert T[] to SelectableOptionItems<T> Interface (Default)
     * @hidden
     */
    protected _convertObjectsToDefaultOptionItems(items: T[]): SelectableOptionItem<T>[] {
        const selectItems: SelectableOptionItem[] = [];
        const selectedItems = this.selectedItems();

        for (let i = 0; i < items.length; i++) {
            const value = items[i];
            selectItems.push({
                label: displayValue(value, this.displayKey()),
                id: lookupValue(value, this.lookupKey()),
                value,
                selected: selectedItems.includes(value) || false
            });
        }

        return selectItems;
    }

    /** @hidden */
    protected _setInvalidEntry(): void {
        if (this._previousState || this._previousStateMessage) {
            return;
        }

        this._previousState = this._cva.state;
        this._cva.state = 'error';

        this._previousStateMessage = this._cva.stateMessage;
        this._cva.stateMessage = this.invalidEntryMessage() ?? this._invalidEntryMessageOverride() ?? null;

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
        this.searchInputElement()?.elementRef.nativeElement.focus();
    }

    /** @hidden */
    protected _mapAndUpdateModel(): void {
        const selectedItems = this._selectedSuggestions().map(({ value }) => value);

        const shouldEmitChangeEvent = !equal(this.selectedItems(), selectedItems);

        if (!shouldEmitChangeEvent) {
            return;
        }

        this.writeValue(selectedItems);

        this._cva.onChange(selectedItems);

        this._emitChangeEvent();
    }

    /**
     * @hidden
     * Prepares the data stream and subscribes to it.
     */
    protected _openDataStream(matchingStrategy: MatchingStrategy): void {
        const dataSourceProvider = this.dataSourceDirective.dataSourceProvider;

        if (!dataSourceProvider) {
            throw new Error(`[dataSource] source did not match an array, Observable, or DataSource`);
        }

        dataSourceProvider.limitless = this.limitless();

        dataSourceProvider.dataProvider.setLookupKey(this.lookupKey());
        const matchingBy: MatchingBy = {
            firstBy: this._displayFn
        };

        if (this.secondaryKey()) {
            matchingBy.secondaryBy = this._secondaryFn;
        }

        dataSourceProvider.dataProvider.setMatchingBy(matchingBy);
        dataSourceProvider.dataProvider.setMatchingStrategy(matchingStrategy);

        // initial data fetch
        const map = new Map();
        map.set('query', '*');

        if (!this.limitless()) {
            map.set('limit', this._mapLimit);
        } else {
            dataSourceProvider.dataProvider['defaultLimit'] = Number.MAX_SAFE_INTEGER;
        }

        dataSourceProvider.match(map);

        this._dsSubscription = new Subscription();

        this._dsSubscription.add(
            this.dataSourceDirective.dataSourceProvider?.dataRequested.subscribe((value) =>
                this.dataRequested.emit(value)
            )
        );
        this._dsSubscription.add(
            this.dataSourceDirective.dataSourceProvider?.dataReceived.subscribe((value) =>
                this.dataReceived.emit(value)
            )
        );

        this.dataSourceDirective.dataSourceChanged
            .pipe(startWith(true), takeUntilDestroyed(this._destroyRef))
            .subscribe(() => {
                this._dataSourceChanged = true;
            });

        this.dataSourceDirective.dataChanged$.pipe(skip(0), takeUntilDestroyed(this._destroyRef)).subscribe((data) => {
            if (data.length === 0) {
                this._processingEmptyData();
                return;
            }

            this._previousInputText = this.inputText();

            this._parseDataSourceValue(data);

            this._cva.stateChanges.next('initDataSource.open().');

            this._cd.markForCheck();
        });
    }

    /**
     * Parses the data from the data stream and updates the model if needed.
     * @param data array of objects from the data stream.
     */
    protected _parseDataSourceValue(data: T[]): void {
        this._convertDataSourceSuggestions(data);

        const selectedSuggestions = this._selectedSuggestions();

        if (selectedSuggestions.length > 0) {
            this._suggestions.update((suggestions) =>
                suggestions.map((suggestion) => {
                    const isSelected = selectedSuggestions.some((item) => equal(item.value, suggestion.value));
                    return isSelected ? { ...suggestion, selected: true } : suggestion;
                })
            );
        }

        if (this._dataSourceChanged) {
            const currentSuggestions = this._suggestions();
            this._flatSuggestions.set(this.isGroup() ? flattenGroups(currentSuggestions) : currentSuggestions);
            this._fullFlatSuggestions.set(this._flatSuggestions());

            this._setSelectedSuggestions();

            this._mapAndUpdateModel();

            this._dataSourceChanged = false;
        }
    }

    /**
     * Transforms plain array into `SelectableOptionItem<T>`
     * @param data
     */
    protected _convertDataSourceSuggestions(data: T[]): void {
        const selectedSuggestions = this._selectedSuggestions();
        this._suggestions.set(
            this._convertToOptionItems(data).map((optionItem) => {
                const selectedElement = selectedSuggestions.find((selectedItem) => selectedItem.id === optionItem.id);
                if (selectedElement) {
                    return { ...optionItem, selected: selectedElement.selected };
                }
                return optionItem;
            })
        );
    }

    /** @hidden */
    protected _processingEmptyData(): void {
        if (this._cva.disabled) {
            return;
        }

        if (this._cva.controlInvalid && this._cva.ngControl?.hasError) {
            this._setInvalidEntry();

            if (this._timerSub$) {
                this._timerSub$.unsubscribe();
            }
        }
        this._setInputText(this._previousInputText);

        this._timerSub$ = timer(this.invalidEntryDisplayTime()).subscribe(() => this._unsetInvalidEntry());

        this._cd.detectChanges();
    }
}
