import { A, CONTROL, DOWN_ARROW, ENTER, ESCAPE, SPACE, TAB, UP_ARROW } from '@angular/cdk/keycodes';
import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    Inject,
    InjectionToken,
    Injector,
    OnInit,
    ViewContainerRef,
    ViewEncapsulation
} from '@angular/core';
import {
    DataSourceDirective,
    DataSourceParser,
    FD_DATA_SOURCE_TRANSFORMER,
    isDataSource,
    MatchingBy
} from '@fundamental-ngx/cdk/data-source';
import { CvaDirective } from '@fundamental-ngx/cdk/forms';
import {
    AutoCompleteEvent,
    DestroyedService,
    DynamicComponentService,
    FocusEscapeDirection,
    KeyUtil,
    resizeObservable
} from '@fundamental-ngx/cdk/utils';

import equal from 'fast-deep-equal';
import { isObservable, skip, startWith, Subscription, timer } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { contentDensityObserverProviders } from '@fundamental-ngx/core/content-density';

import { SelectableOptionItem, OptionItem } from '@fundamental-ngx/cdk/forms';
import { BaseMultiCombobox } from './base-multi-combobox.class';
import { MobileMultiComboboxComponent } from './mobile/mobile-multi-combobox.component';
import { MobileMultiComboboxModule } from './mobile/mobile-multi-combobox.module';

import { MULTI_COMBOBOX_COMPONENT } from './multi-combobox.interface';
import {
    ArrayMultiComboBoxDataSource,
    FdMultiComboboxAcceptableDataSource,
    FdMultiComboBoxDataSource,
    ObservableMultiComboBoxDataSource
} from './data-source/multi-combobox-data-source';

import { flattenGroups, getSelectItemByInputValue, getTokenIndexByIdlOrValue } from './helpers';

export const FD_MAP_LIMIT = new InjectionToken<number>('Map limit≥', { factory: () => 12 });

export class MultiComboboxDataSourceParser<T> implements DataSourceParser<T, FdMultiComboBoxDataSource<T>> {
    /**
     * Transforms plain array or observable into DataSource class.
     * @param source
     */
    parse(source: FdMultiComboboxAcceptableDataSource<T>): FdMultiComboBoxDataSource<T> | undefined {
        if (isDataSource(source)) {
            return source as FdMultiComboBoxDataSource<T>;
        }

        if (Array.isArray(source)) {
            return new ArrayMultiComboBoxDataSource<T>(source);
        }

        if (isObservable(source)) {
            return new ObservableMultiComboBoxDataSource<T>(source);
        }

        return undefined;
    }
}

@Component({
    selector: 'fd-multi-combobox',
    templateUrl: './multi-combobox.component.html',
    styleUrls: ['./multi-combobox.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    hostDirectives: [
        {
            directive: CvaDirective,
            // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
            inputs: ['id', 'placeholder', 'state', 'stateMessage', 'disabled', 'readonly', 'name']
        },
        {
            directive: DataSourceDirective,
            // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
            inputs: ['dataSource'],
            // eslint-disable-next-line @angular-eslint/no-outputs-metadata-property
            outputs: ['dataChanged']
        }
    ],
    providers: [
        contentDensityObserverProviders(),
        {
            provide: FD_DATA_SOURCE_TRANSFORMER,
            useClass: MultiComboboxDataSourceParser
        },
        {
            provide: MULTI_COMBOBOX_COMPONENT,
            useExisting: MultiComboboxComponent
        }
    ]
})
export class MultiComboboxComponent<T = any> extends BaseMultiCombobox<T> implements AfterViewInit, OnInit {
    /** @hidden */
    private _dataSourceChanged = false;

    /** @hidden */
    constructor(
        public readonly dataSourceDirective: DataSourceDirective<T, FdMultiComboBoxDataSource<T>>,
        private readonly _injector: Injector,
        private readonly _viewContainerRef: ViewContainerRef,
        private readonly _destroyed$: DestroyedService,
        readonly _dynamicComponentService: DynamicComponentService,
        @Inject(FD_MAP_LIMIT) private readonly _mapLimit: number
    ) {
        super();

        this.contentDensityObserver.subscribe();
    }

    /** @hidden */
    ngOnInit(): void {
        super.ngOnInit();
        this._openDataStream();
    }

    /** @hidden */
    async ngAfterViewInit(): Promise<void> {
        if (this.mobile) {
            await this._setUpMobileMode();
        }

        this._assignCustomTemplates();

        this._initWindowResize();

        this._tokenizer._showOverflowPopover = false;
    }

    /** @hidden */
    _toggleSelection(item: SelectableOptionItem): void {
        const idx = getTokenIndexByIdlOrValue(item, this._selectedSuggestions);
        if (idx === -1) {
            this._selectedSuggestions.push(item);
        } else {
            this._selectedSuggestions.splice(idx, 1);
        }

        item.selected = !item.selected;

        this._propagateChange();

        if (!this._selectedSuggestions.length) {
            this._focusToSearchField();
        }

        this._cd.detectChanges();
    }

    /** @hidden */
    _onOptionCheckboxClicked(event: MouseEvent, index: number): void {
        event.stopPropagation();
        this._onListElementClicked(event, index);
    }

    /** @hidden */
    _onCompleteTerm(event: AutoCompleteEvent): void {
        if (event.forceClose) {
            this._toggleSelectionByInputText(event.term);
            this.close();
        }
    }

    /** @hidden */
    private _toggleSelectionByInputText(text = this.inputText): void {
        const item = getSelectItemByInputValue<T>(this._fullFlatSuggestions, text);
        if (item) {
            this._toggleSelection(item);
            this.inputText = '';
        }
    }

    /**
     * @hidden
     * Method that selects all possible options.
     * *select* attribute – if *true* select all, if *false* unselect all
     * */
    private _handleSelectAllItems(select: boolean): void {
        this._flatSuggestions.forEach((item) => (item.selected = select));
        this._selectedSuggestions = select ? [...this._flatSuggestions] : [];
        this._rangeSelector.reset();

        this._propagateChange();
    }

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
        const optionItem = this._suggestions.find((s) => s.value === token.value);
        if (optionItem) {
            this._toggleSelection(optionItem);
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
            this._showList(false);
            this.inputText = '';
        }
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

    /** @hidden */
    _onItemKeyDownHandler(event: KeyboardEvent, index: number): void {
        if (KeyUtil.isKeyCode(event, ESCAPE)) {
            this._focusToSearchField();
            this.close();
        } else if (event.shiftKey && KeyUtil.isKeyCode(event, TAB)) {
            event.preventDefault();
            this.listComponent?.setItemActive(index - 1);
        } else if (KeyUtil.isKeyCode(event, TAB)) {
            event.preventDefault();
            this.listComponent?.setItemActive(index + 1);
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
    dialogDismiss(backup: SelectableOptionItem[]): void {
        this._selectedSuggestions = [...backup];
        this.inputText = '';
        this._showList(false);
        this.selectedShown$.next(false);
    }

    /**
     * @hidden
     * Handle dialog approval, closes popover and propagates data changes.
     */
    dialogApprove(): void {
        this.inputText = '';
        this._showList(false);
        this._propagateChange(true);
    }

    /** @hidden */
    _popoverOpenChangeHandle(isOpen: boolean): void {
        this.isOpen = isOpen;
        this._rangeSelector.reset();
    }

    /** Opens the select popover body. */
    open(): void {
        this.isOpen = true;
        this.isOpenChange.emit(this.isOpen);
        this._cd.markForCheck();
    }

    /** Closes the select popover body. */
    close(): void {
        this._rangeSelector.reset();
        this.selectedShown$.next(false);
        this.inputText = '';
        this._focusToSearchField();

        this.isOpen = false;
        this.isOpenChange.emit(this.isOpen);
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

        this._showList(!isOpen);

        if (this.isOpen && this.listComponent) {
            this.listComponent.setItemActive(0);
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
        } else if (KeyUtil.isKeyCode(event, ESCAPE)) {
            event.stopPropagation();

            this._showList(false);
        } else if (!KeyUtil.isKeyCode(event, [...this._nonOpeningKeys, CONTROL])) {
            this._showList(true);
            const acceptedKeys = !KeyUtil.isKeyType(event, 'alphabetical') && !KeyUtil.isKeyType(event, 'numeric');
            if (this.isEmptyValue && acceptedKeys) {
                this.listComponent?.setItemActive(0);
            }
        }
    }

    /**
     * @hidden
     * Method passed to list component.
     */
    _handleListFocusEscape(direction: FocusEscapeDirection): void {
        if (direction === 'up') {
            this.searchInputElement?.elmRef?.nativeElement.focus();
        }
    }

    /**
     * @hidden
     * applying range selection. Note, that this function will be invoked after combobox item's value has been changed
     */
    private _onListElementClicked(event: MouseEvent, index: number): void {
        // value has been changed at this point, so it can be safely used
        const selectionState = this._suggestions[index].selected;
        this._rangeSelector.onRangeElementToggled(index, event);
        const toRemoveSet = new Set();
        this._rangeSelector.applyValueToEachInRange((idx) => {
            const current = this._suggestions[idx];
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
        // selected items should be displayed in the same order as options
        const valueIndexes = new Map<any, number>(this._suggestions.map((s, i) => [s.value, i]));
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        this._selectedSuggestions.sort((a, b) => valueIndexes.get(a.value)! - valueIndexes.get(b.value)!);
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

        await this._dynamicComponentService.createDynamicModule(
            { listTemplate: this.listTemplate, controlTemplate: this.mobileControlTemplate },
            MobileMultiComboboxModule,
            MobileMultiComboboxComponent,
            this._viewContainerRef,
            injector
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

    /**
     * @hidden
     * Prepares the data stream and subscribes to it.
     */
    private _openDataStream(): void {
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
            this.dataSourceDirective.dataSourceProvider?.onDataRequested().subscribe(this.onDataRequested)
        );
        this._dsSubscription.add(
            this.dataSourceDirective.dataSourceProvider?.onDataReceived().subscribe(this.onDataReceived)
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
    private _parseDataSourceValue(data: T[]): void {
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
    private _convertDataSourceSuggestions(data: T[]): void {
        this._suggestions = this._convertToOptionItems(data).map((optionItem) => {
            const selectedElement = this._selectedSuggestions.find((selectedItem) => selectedItem.id === optionItem.id);
            if (selectedElement) {
                optionItem.selected = selectedElement.selected;
            }
            return optionItem;
        });
    }

    /** @hidden */
    private _processingEmptyData(): void {
        this.inputText = this._previousInputText;

        this._setInvalidEntry();

        if (this._timerSub$) {
            this._timerSub$.unsubscribe();
        }

        this._timerSub$ = timer(this.invalidEntryDisplayTime).subscribe(() => this._unsetInvalidEntry());

        this._cd.detectChanges();
    }

    /** @hidden */
    private _initWindowResize(): void {
        this._getOptionsListWidth();

        if (!this.autoResize) {
            return;
        }

        resizeObservable(this._inputGroup.nativeElement)
            .pipe(debounceTime(30), takeUntil(this._destroyed$))
            .subscribe(() => this._getOptionsListWidth());
    }

    /** @hidden */
    private _getOptionsListWidth(): void {
        const body = document.body;
        const rect = this._inputGroup.nativeElement.getBoundingClientRect();
        const scrollBarWidth = body.offsetWidth - body.clientWidth;
        this.maxWidth = this.autoResize ? window.innerWidth - scrollBarWidth - rect.left : this.minWidth;
        this.minWidth = rect.width - 2;
        this._cd.detectChanges();
    }
}
