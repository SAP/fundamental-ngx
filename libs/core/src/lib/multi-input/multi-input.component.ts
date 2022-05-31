import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    forwardRef,
    Injector,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    Optional,
    Output,
    SimpleChanges,
    TemplateRef,
    ViewChild,
    ViewContainerRef,
    ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DOWN_ARROW, TAB, SPACE, ENTER, UP_ARROW, ESCAPE } from '@angular/cdk/keycodes';
import { SelectionModel } from '@angular/cdk/collections';
import { BehaviorSubject, combineLatest, Observable, Subscription } from 'rxjs';
import { map, startWith, distinctUntilChanged, first } from 'rxjs/operators';

import { PopoverComponent } from '@fundamental-ngx/core/popover';
import { MenuKeyboardService } from '@fundamental-ngx/core/menu';
import { FormStates, PopoverFillMode, Nullable } from '@fundamental-ngx/core/shared';
import { MobileModeConfig } from '@fundamental-ngx/core/mobile-mode';
import { TokenizerComponent } from '@fundamental-ngx/core/token';
import { registerFormItemControl, FormItemControl } from '@fundamental-ngx/core/form';
import { ListComponent } from '@fundamental-ngx/core/list';
import {
    ContentDensityService,
    CssClassBuilder,
    DynamicComponentService,
    RtlService,
    applyCssClass,
    FocusEscapeDirection,
    KeyUtil,
    FocusTrapService,
    uuidv4,
    RangeSelector
} from '@fundamental-ngx/core/utils';

import { MultiInputMobileComponent } from './multi-input-mobile/multi-input-mobile.component';
import { MultiInputMobileModule } from './multi-input-mobile/multi-input-mobile.module';
import { MULTI_INPUT_COMPONENT, MultiInputInterface } from './multi-input.interface';

/**
 * Input field with multiple selection enabled. Should be used when a user can select between a
 * limited number of pre-defined options with a filter-enabled context.
 *
 * Supports Angular Forms.
 */
@Component({
    selector: 'fd-multi-input',
    templateUrl: './multi-input.component.html',
    styleUrls: ['./multi-input.component.scss'],
    host: {
        '(blur)': 'onTouched()'
    },
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => MultiInputComponent),
            multi: true
        },
        MenuKeyboardService,
        registerFormItemControl(MultiInputComponent)
    ],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MultiInputComponent
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

    /** Whether the input is in compact mode. */
    @Input()
    compact?: boolean;

    /** If it is mandatory field */
    @Input()
    required = false;

    /** Whether to use cozy visuals but compact collapsing behavior. */
    @Input()
    compactCollapse = false;

    /** Max height of the popover. Any overflowing elements will be accessible through scrolling. */
    @Input()
    maxHeight = '300px';

    /** Icon of the button on the right of the input field. */
    @Input()
    glyph = 'value-help';

    /** Values to be displayed in the unfiltered dropdown. */
    @Input()
    dropdownValues: any[] = [];

    /** Search term, or more specifically the value of the inner input field. */
    @Input()
    get searchTerm(): string {
        return this._searchTermCtrl.value;
    }
    set searchTerm(value: string) {
        this._searchTermCtrl.setValue(value);
    }

    /** Id attribute for input element inside MultiInput component */
    @Input()
    inputId = '';

    /** Whether the search term should be highlighted in results. */
    @Input()
    highlight = true;

    /** Selected dropdown items. */
    @Input()
    get selected(): any[] {
        return this._selectionModel.selected;
    }
    set selected(values: any[]) {
        this._selectionModel.clear();
        values?.forEach((item) => this._selectionModel.select(item));
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
    filterFn = this._defaultFilter;

    /**
     * Value function. Accepts an object of the same type as the
     * items passed to dropdownValues as argument, and outputs any property, that should be used as value.
     * An arrow function can be used to access the *this* keyword in the calling component.
     * See multi input examples for details.
     */
    @Input()
    valueFn = this._defaultValueFn;

    /**
     * Display function. Accepts an object of the same type as the
     * items passed to dropdownValues as argument, and outputs a string.
     * An arrow function can be used to access the *this* keyword in the calling component.
     * See multi input examples for details.
     */
    @Input()
    displayFn = this._defaultDisplay;

    /**
     * Parse function. Used for submitting new tokens. Accepts a string by default.
     * An arrow function can be used to access the *this* keyword in the calling component.
     * See multi input examples for details.
     */
    @Input()
    newTokenParseFn: (searchTerm: string) => any = this._defaultParse;

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

    /** Max width of multi input body in PX */
    @Input()
    bodyMaxWidth: Nullable<number>;

    /** Multi Input Mobile Configuration, it's applied only, when mobile is enabled */
    @Input()
    mobileConfig: MobileModeConfig = { hasCloseButton: true, approveButtonText: 'Select' };

    /**
     * Whether or not to return results where the input matches the entire string. By default, only results that start
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

    /** Whether the autocomplete should be enabled; Enabled by default */
    @Input()
    autoComplete = true;

    /** Event emitted when the search term changes. Use *$event* to access the new term. */
    @Output()
    readonly searchTermChange: EventEmitter<string> = new EventEmitter<string>();

    /** Event emitted when the selected items change. Use *$event* to access the new selected array. */
    @Output()
    readonly selectedChange: EventEmitter<any[]> = new EventEmitter<any[]>();

    /** Whether multi input popover body should be opened */
    @Input()
    open = false;

    /** Whether or not to display the addon button. */
    @Input()
    displayAddonButton = true;

    /** Event emitted, when the multi input's popover body is opened or closed */
    @Output()
    readonly openChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    /** Event emitted, when the multi input's all item checked or not */
    @Output()
    readonly allItemsSelectedChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    /** @hidden */
    @ViewChild(PopoverComponent)
    popoverRef: PopoverComponent;

    /** @hidden */
    @ViewChild('control', { read: TemplateRef })
    controlTemplate: TemplateRef<any>;

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
    readonly optionItems$ = new BehaviorSubject<OptionItem[]>([]);

    /** @hidden */
    readonly _searchTermCtrl = new FormControl('');

    /** @hidden */
    readonly _selectionModel = new SelectionModel<any>(true);

    /** @hidden */
    readonly _viewModel$: Observable<ViewModel> = this._getViewModel();

    /** @hidden */
    _dir: string;

    /** @hidden */
    private _subscriptions = new Subscription();

    /** @hidden */
    private readonly _rangeSelector = new RangeSelector();

    /** @hidden */
    onChange: (value: any) => void = () => {};

    /** @hidden */
    onTouched = (): void => {};

    /** @hidden */
    constructor(
        private readonly _elementRef: ElementRef,
        private readonly _changeDetRef: ChangeDetectorRef,
        private readonly _dynamicComponentService: DynamicComponentService,
        private readonly _injector: Injector,
        private readonly _viewContainerRef: ViewContainerRef,
        @Optional() private readonly _rtlService: RtlService,
        @Optional() private readonly _contentDensityService: ContentDensityService,
        @Optional() private readonly _focusTrapService: FocusTrapService
    ) {}

    /** @hidden */
    ngOnInit(): void {
        if (this.compact === undefined && this._contentDensityService) {
            this._subscriptions.add(
                this._contentDensityService._isCompactDensity.subscribe((isCompact) => {
                    this.compact = isCompact;
                    this.buildComponentCssClass();
                    this._changeDetRef.markForCheck();
                })
            );
        }

        this.buildComponentCssClass();

        this._subscriptions.add(
            this._rtlService?.rtl.subscribe((isRtl) => {
                this._dir = isRtl ? 'rtl' : 'ltr';
                this.buildComponentCssClass();
            })
        );

        if (!this.inputId) {
            this.inputId = uuidv4();
        }

        this._subscriptions.add(
            this._searchTermCtrl.valueChanges.pipe(distinctUntilChanged()).subscribe((searchTerm) => {
                this.searchTermChange.emit(searchTerm);
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

    @applyCssClass
    /** CssClassBuilder interface implementation
     * function must return single string
     * function is responsible for order which css classes are applied
     */
    buildComponentCssClass(): string[] {
        // TODO: this icon flip may be addressed in styles in the future
        if (this.glyph === 'value-help' && this._dir === 'rtl') {
            const icon = this.elementRef().nativeElement.querySelector('.sap-icon--value-help');
            if (icon) {
                icon.style.transform = 'scaleX(-1)';
            }
        }

        return ['fd-multi-input', 'fd-multi-input-custom', this.class];
    }

    /** @hidden */
    elementRef(): ElementRef<any> {
        return this._elementRef;
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
            this._elementRef.nativeElement.style.pointerEvents = 'none';
        } else {
            this._elementRef.nativeElement.style.pointerEvents = 'auto';
        }

        this._changeDetRef.detectChanges();
    }

    /** @hidden */
    writeValue(selected: any[]): void {
        this.selected = selected;

        this._changeDetRef.markForCheck();
    }

    /** Method passed to list component */
    handleListFocusEscape(direction: FocusEscapeDirection): void {
        if (direction === 'up') {
            this.searchInputElement.nativeElement.focus();
        }
    }

    /** @hidden */
    openChangeHandle(open: boolean): void {
        if (this.disabled) {
            return;
        }

        if (!open && this.open && !this.mobile) {
            this.searchInputElement.nativeElement.focus();
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
        } else {
            this.disableParentFocusTrap();
        }

        this.tokenizer.removeSelectedTokens();

        this._changeDetRef.detectChanges();
    }

    /** Method that selects all possible options. */
    selectAllItems(selectAll: boolean): void {
        if (selectAll) {
            this.selected = this.optionItems$.getValue().map((c) => c.value);
        } else {
            this.selected = [];
        }
        // On Mobile mode changes are propagated only on approve.
        this._propagateChange();
    }

    /** @hidden */
    _onCheckboxKeyup(value: any, event: KeyboardEvent, index: number): void {
        if (KeyUtil.isKeyCode(event, [SPACE, ENTER])) {
            this._onCheckboxClick(value, event, index);
        }
    }

    /** @hidden */
    async _onCheckboxClick(
        value: any,
        event: MouseEvent | KeyboardEvent,
        index: number,
        isListItem = false
    ): Promise<void> {
        const toggledSelection = !this._selectionModel.isSelected(value);
        this._rangeSelector.onRangeElementToggled(index, event);
        const sub = this._viewModel$.pipe(first()).subscribe((vm) => {
            this._rangeSelector.applyValueToEachInRange((idx) =>
                this._handleSelect(toggledSelection, vm.displayedOptions[idx].value, false)
            );
        });
        this._subscriptions.add(sub);
        if (isListItem) {
            this.openChangeHandle(false);
        } else {
            // stop propagation on the checkbox so event doesn't reach the list item
            event.stopPropagation();
        }
    }

    /** @hidden */
    _onTokenClick(value: any, resetSearch: boolean, event?: MouseEvent): void {
        event?.preventDefault(); // prevent this function from being called twice when checkbox updates
        this._handleSelect(false, value, resetSearch);
    }

    /** @hidden */
    _handleSelect(checked: any, value: any, resetSearch = true): void {
        const previousLength = this._selectionModel.selected.length;
        if (checked) {
            this._selectionModel.select(value);
        } else {
            this._selectionModel.deselect(value);
        }

        // Handle popover placement update
        if (this._shouldPopoverBeUpdated(previousLength, this._selectionModel.selected.length)) {
            this.popoverRef.refreshPosition();
        }
        if (resetSearch) {
            this._resetSearchTerm();
            this.searchInputElement.nativeElement.focus();
        }

        // On Mobile mode changes are propagated only on approve.
        this._propagateChange();
    }

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
        } else if (KeyUtil.isKeyCode(event, ESCAPE)) {
            this.openChangeHandle(false);
        } else if (KeyUtil.isKeyCode(event, TAB) && this.open) {
            if (this.listComponent) {
                this.listComponent.setItemActive(0);
                event.preventDefault();
            }
        } else if (KeyUtil.isKeyType(event, 'alphabetical') || KeyUtil.isKeyType(event, 'numeric')) {
            if (!this.open) {
                this.openChangeHandle(true);
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
        if (!isExist && this.allowNewTokens && this.newTokenValidateFn(this._searchTermCtrl.value)) {
            const newToken = this.newTokenParseFn(this._searchTermCtrl.value);
            this._addNewTokenToDropDownValues(newToken);
            this._handleSelect(true, newToken);
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
        this.openChangeHandle(true);
    }

    /** @hidden */
    _addOnButtonClicked(): void {
        this.openChangeHandle(!this.open);
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
    private _addNewTokenToDropDownValues(newToken): void {
        this.dropdownValues.push(newToken);
        const newOption = this._getOptionItem(newToken);
        this.optionItems$.next([...this.optionItems$.value, newOption]);
    }

    /** @hidden */
    private _selectFirstFiltered(searchTerm: string): boolean {
        const filtered = this.filterFn(this.dropdownValues, searchTerm);
        if (Array.isArray(filtered) && filtered.length > 0 && this.autoComplete) {
            const optionItem = this._getOptionItem(filtered[0]);
            this._handleSelect(true, optionItem.value);
            this._searchTermCtrl.setValue('');
            this.open = false;
            return true;
        }
        return false;
    }

    /** @hidden */
    private _defaultFilter(contentArray: any[], searchTerm: string = ''): any[] {
        const searchLower = searchTerm.toLocaleLowerCase();
        return contentArray.filter((item) => {
            if (item) {
                const displayedValue = this.displayFn(item);
                const term = typeof displayedValue === 'string' ? displayedValue.toLocaleLowerCase() : '';

                return this.includes ? term.includes(searchLower) : term.startsWith(searchLower);
            }
        });
    }

    /** @hidden */
    private _defaultValueFn(value: any): any {
        return value;
    }

    /** @hidden */
    private _defaultDisplay(str: any): string {
        return str;
    }

    /** @hidden */
    private _defaultParse(str: any): string {
        return str;
    }

    /** @hidden */
    private _defaultTokenValidate(str: string): boolean {
        return !!str;
    }

    /** @hidden */
    private _popoverOpenHandle(open: boolean): void {
        this.open = open;
        this.onTouched();
    }

    /** @hidden */
    private _propagateChange(emitInMobile?: boolean): void {
        if (!this.mobile || emitInMobile) {
            const selected = [...this._selectionModel.selected];
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

        await this._dynamicComponentService.createDynamicModule(
            {
                listTemplate: this.listTemplate,
                controlTemplate: this.controlTemplate
            },
            MultiInputMobileModule,
            MultiInputMobileComponent,
            this._viewContainerRef,
            injector
        );
    }

    /** @hidden */
    private _resetSearchTerm(): void {
        this._searchTermCtrl.setValue('');
        this._changeDetRef.detectChanges();
    }

    /** @hidden */
    private _getOptionItem(item: any): OptionItem {
        const { label, value } = this._getValueAndLabel(item);
        return {
            item,
            label,
            value,
            isSelected: false
        };
    }

    /** @hidden */
    private _getValueAndLabel(itemOrValue: any, optionItems: OptionItem[] = []): OptionItemBase {
        if (optionItems.length > 0) {
            itemOrValue = optionItems.find((c) => c.value === itemOrValue)?.item ?? itemOrValue;
        }
        const defaultDisplay = typeof itemOrValue === 'object' ? itemOrValue[Object.keys(itemOrValue)[0]] : itemOrValue;
        const value = this.valueFn(itemOrValue) ?? defaultDisplay;
        const label = this.displayFn(itemOrValue) ?? defaultDisplay;
        return { label, value };
    }

    /** @hidden */
    private _getViewModel(): Observable<ViewModel> {
        return combineLatest([
            this._searchTermCtrl.valueChanges.pipe(startWith(this._searchTermCtrl.value)),
            this._selectionModel.changed.pipe(startWith(null)),
            this.optionItems$
        ]).pipe(
            map(([, , optionItems]) => {
                const selected = this.selected.map((c) => this._getValueAndLabel(c, optionItems));
                // not using "searchTerm" value from combineLatest as it will be wrong for late subscribers, if any
                const searchTerm = this._searchTermCtrl.value;
                const filtered = this.filterFn(
                    optionItems.map((c) => c.item),
                    searchTerm
                );
                const displayedOptions = (Array.isArray(filtered) ? filtered : []).map((item) =>
                    this._getOptionItem(item)
                );
                displayedOptions.forEach((c) => (c.isSelected = selected.findIndex((d) => d.value === c.value) > -1));
                return { selectedOptions: selected, displayedOptions };
            })
        );
    }
}

interface OptionItem<T = any> extends OptionItemBase {
    item: T;
    isSelected: boolean;
}
interface OptionItemBase {
    label: string;
    value: any;
}

interface ViewModel {
    selectedOptions: OptionItemBase[];
    displayedOptions: OptionItem[];
}
