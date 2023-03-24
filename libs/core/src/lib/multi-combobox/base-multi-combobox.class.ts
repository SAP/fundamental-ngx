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
import { ChangeDetectorRef, Directive, ElementRef, EventEmitter, inject } from '@angular/core';
import { DataSourceDirective, MatchingBy, MatchingStrategy } from '@fundamental-ngx/cdk/data-source';
import {
    CvaControl,
    CvaDirective,
    FormStates,
    isOptionItem,
    isSelectableOptionItem,
    SelectableOptionItem
} from '@fundamental-ngx/cdk/forms';
import {
    coerceArraySafe,
    DestroyedService,
    isFunction,
    isJsObject,
    isString,
    Nullable,
    RangeSelector
} from '@fundamental-ngx/cdk/utils';
import { ContentDensityObserver } from '@fundamental-ngx/core/content-density';
import equal from 'fast-deep-equal';
import { BehaviorSubject, skip, startWith, Subscription, takeUntil, timer } from 'rxjs';
import {
    FdMultiComboboxAcceptableDataSource,
    FdMultiComboBoxDataSource
} from './data-source/multi-combobox-data-source';
import { displayValue, flattenGroups, lookupValue, objectGet } from './helpers';
import { MultiComboboxSelectionChangeEvent } from './models/selection-change.event';
import { MultiComboboxConfig } from './multi-combobox-config';
import { FD_MAP_LIMIT } from './multi-combobox.component';

export type TextAlignment = 'left' | 'right';

@Directive()
export abstract class BaseMultiCombobox<T = any> {
    // Injection section
    /** @hidden */
    readonly cvaControl: CvaControl<T> = inject(CvaControl);

    /** @hidden */
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

    /** @Hidden */
    protected readonly _elmRef = inject(ElementRef<HTMLElement>);

    /** @hidden */
    protected readonly _cd = inject(ChangeDetectorRef);

    /** @hidden */
    protected readonly _mapLimit = inject(FD_MAP_LIMIT);

    /** @Hidden */
    protected readonly _destroyed$ = inject(DestroyedService);

    /**
     * @hidden
     * List of selected suggestions
     */
    _selectedSuggestions: SelectableOptionItem<T>[] = [];

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

    abstract selectedItems: T[];
    abstract group: boolean;
    abstract groupKey: string;
    abstract displayKey: string;
    abstract secondaryKey: string;
    abstract showSecondaryText: boolean;
    abstract lookupKey: string;
    abstract invalidEntryMessage: string;
    abstract invalidEntryDisplayTime: number;
    abstract limitless: boolean;
    abstract isGroup: boolean;
    abstract inputText: string;

    abstract searchInputElement: Nullable<ElementRef<HTMLInputElement>>;

    abstract selectionChange: EventEmitter<MultiComboboxSelectionChangeEvent>;
    abstract dataReceived: EventEmitter<void>;
    abstract dataRequested: EventEmitter<void>;

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
    private _dataSourceChanged = false;

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
        this.searchInputElement?.nativeElement.focus();
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

    /**
     * @hidden
     * Prepares the data stream and subscribes to it.
     */
    protected _openDataStream(): void {
        const dataSourceProvider = this.dataSourceDirective.dataSourceProvider;

        if (!dataSourceProvider) {
            throw new Error(`[dataSource] source did not match an array, Observable, or DataSource`);
        }

        dataSourceProvider.limitless = this.limitless;

        dataSourceProvider.dataProvider.setLookupKey(this.lookupKey);
        const matchingBy: MatchingBy = {
            firstBy: this._displayFn
        };

        if (this.secondaryKey) {
            matchingBy.secondaryBy = this._secondaryFn;
        }

        dataSourceProvider.dataProvider.setMatchingBy(matchingBy);
        dataSourceProvider.dataProvider.setMatchingStrategy(this._matchingStrategy);

        // initial data fetch
        const map = new Map();
        map.set('query', '*');

        if (!this.limitless) {
            map.set('limit', this._mapLimit);
        }

        dataSourceProvider.match(map);

        this._dsSubscription = new Subscription();

        this._dsSubscription.add(
            this.dataSourceDirective.dataSourceProvider?.dataRequested.subscribe(this.dataRequested)
        );
        this._dsSubscription.add(
            this.dataSourceDirective.dataSourceProvider?.dataReceived.subscribe(this.dataReceived)
        );

        this.dataSourceDirective.dataSourceChanged.pipe(startWith(true), takeUntil(this._destroyed$)).subscribe(() => {
            this._dataSourceChanged = true;
        });

        this.dataSourceDirective.dataChanged$.pipe(skip(0), takeUntil(this._destroyed$)).subscribe((data) => {
            if (data.length === 0) {
                this._processingEmptyData();
                return;
            }

            this._previousInputText = this.inputText;

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

        const selectedSuggestionsLength = this._selectedSuggestions.length;
        if (selectedSuggestionsLength > 0) {
            for (let i = 0; i < selectedSuggestionsLength; i++) {
                const selectedSuggestion = this._selectedSuggestions[i];
                const idx = this._suggestions.findIndex((item) => equal(item.value, selectedSuggestion.value));

                if (idx !== -1) {
                    this._suggestions[idx].selected = true;
                }
            }
        }

        if (this._dataSourceChanged) {
            this._flatSuggestions = this.isGroup ? flattenGroups(this._suggestions) : this._suggestions;
            this._fullFlatSuggestions = this._flatSuggestions;

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
        this._suggestions = this._convertToOptionItems(data).map((optionItem) => {
            const selectedElement = this._selectedSuggestions.find((selectedItem) => selectedItem.id === optionItem.id);
            if (selectedElement) {
                optionItem.selected = selectedElement.selected;
            }
            return optionItem;
        });
    }

    /** @hidden */
    protected _processingEmptyData(): void {
        this.inputText = this._previousInputText;

        this._setInvalidEntry();

        if (this._timerSub$) {
            this._timerSub$.unsubscribe();
        }

        this._timerSub$ = timer(this.invalidEntryDisplayTime).subscribe(() => this._unsetInvalidEntry());

        this._cd.detectChanges();
    }
}
