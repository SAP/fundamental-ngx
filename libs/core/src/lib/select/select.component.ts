import {
    AfterContentInit,
    AfterViewInit,
    Attribute,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChildren,
    ElementRef,
    EventEmitter,
    HostListener,
    Injector,
    Input,
    isDevMode,
    OnChanges,
    OnDestroy,
    OnInit,
    Optional,
    Output,
    QueryList,
    Self,
    SimpleChanges,
    TemplateRef,
    ViewChild,
    ViewContainerRef,
    ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { CdkConnectedOverlay } from '@angular/cdk/overlay';
import { SelectionModel } from '@angular/cdk/collections';
import { defer, merge, Observable, Subject, Subscription } from 'rxjs';
import { startWith, switchMap, takeUntil } from 'rxjs/operators';

import { PopoverFillMode } from '@fundamental-ngx/core/shared';
import { DynamicComponentService, KeyUtil, ModuleDeprecation, Nullable, RtlService } from '@fundamental-ngx/cdk/utils';
import { MobileModeConfig } from '@fundamental-ngx/core/mobile-mode';
import { FormItemControl, registerFormItemControl } from '@fundamental-ngx/core/form';

import { SELECT_COMPONENT, SelectInterface } from './select.interface';
import { SelectKeyManagerService } from './select-key-manager.service';
import { FdOptionSelectionChange, OptionComponent } from './option/option.component';
import { SelectMobileComponent } from './select-mobile/select-mobile.component';
import { SelectMobileModule } from './select-mobile/select-mobile.module';
import { ContentDensityObserver, contentDensityObserverProviders } from '@fundamental-ngx/core/content-density';
import { ESCAPE } from '@angular/cdk/keycodes';
import { FormStates } from '@fundamental-ngx/cdk/forms';

let selectUniqueId = 0;

/** @deprecated use `import { FormStates } from "@fundamental-ngx/cdk/forms"` instead */
export type SelectControlState = FormStates;

const SELECT_HEADER_IDENTIFIER = '.fd-list__group-header';

export const SELECT_PANEL_MAX_HEIGHT = 250;

/** The height of the select items in `rem` units. */
export const SELECT_ITEM_HEIGHT_EM = 4;

/**
 * Select component intended to mimic
 * the behaviour of the native select element.
 */
@Component({
    selector: 'fd-select',
    templateUrl: './select.component.html',
    styleUrls: ['./select.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'fd-select',
        '[class.fd-select--inline]': 'inline',
        '[class.fd-select--compact]': '_contentDensityObserver.isCompact',
        // @deprecated leaving class fd-select-custom-class for backwards compatibility
        '[class.fd-select-custom-class]': 'inline',
        // @deprecated leaving class fd-select-custom-class--mobile for backwards compatibility
        '[class.fd-select-custom-class--mobile]': 'mobile'
    },
    providers: [
        {
            provide: SELECT_COMPONENT,
            useExisting: SelectComponent
        },
        registerFormItemControl(SelectComponent),
        SelectKeyManagerService,
        contentDensityObserverProviders()
    ]
})
export class SelectComponent
    implements
        ControlValueAccessor,
        SelectInterface,
        OnInit,
        AfterViewInit,
        AfterContentInit,
        OnChanges,
        OnDestroy,
        FormItemControl
{
    /** Id of the control. */
    @Input()
    controlId = `fd-select-${selectUniqueId++}`;

    /** Holds the control state of select */
    @Input()
    state: Nullable<FormStates>;

    /** Whether the select component should be displayed in mobile mode. */
    @Input()
    mobile = false;

    /** Holds the message with respect to state */
    @Input()
    stateMessage: Nullable<string>;

    /** Whether the select component is disabled. */
    @Input()
    disabled = false;

    /** If it is mandatory field */
    @Input()
    required = false;

    /** Whether the select component is readonly. */
    @Input()
    readonly = false;

    /** Placeholder for the select. Appears in the triggerbox if no option is selected. */
    @Input()
    placeholder: string;

    /** Value of the select control. */
    @Input()
    set value(newValue: any) {
        if (newValue !== this._internalValue) {
            this.writeValue(newValue);
            this._internalValue = newValue;
        }
    }
    get value(): any {
        return this._internalValue;
    }

    /** @deprecated
     * it is handled internally by controlTemplate != null|undefined is
     * Equal as extendedBodyTemplate as true.
     * Whether option components contain more than basic text. */
    @Input()
    extendedBodyTemplate = false;

    /** Max height of the popover. Any overflowing elements will be accessible through scrolling. */
    @Input()
    maxHeight: string;

    /** Glyph to add icon in the select component. */
    @Input()
    glyph = 'slim-arrow-down';

    /** Whether close the popover on outside click. */
    @Input()
    closeOnOutsideClick = true;

    /**
     * Preset options for the Select body width, whatever is chosen, the body has a 600px limit.
     * * `at-least` will apply a minimum width to the body equivalent to the width of the control. - Default
     * * `equal` will apply a width to the body equivalent to the width of the control.
     * * 'fit-content' will apply width needed to properly display items inside, independent of control.
     */
    @Input()
    fillControlMode: PopoverFillMode = 'at-least';

    /** Custom template used to build control body. */
    @Input()
    controlTemplate: TemplateRef<any>;

    /** The element to which the popover should be appended. */
    @Input()
    appendTo: ElementRef;

    /**
     * If the option should be unselected and value changed to undefined, when the current value is
     * not presented in option array. Switching it off can be handy, when there is some delay between providing
     * possible options and chosen value.
     */
    @Input()
    unselectMissingOption = true;

    /** Time to wait in milliseconds after the last keydown before focusing or selecting option based on alphanumeric keys. */
    @Input()
    typeaheadDebounceInterval = 250;

    /** Binds to control aria-labelledBy attribute */
    @Input()
    ariaLabelledBy: Nullable<string>;

    /** Sets control aria-label attribute value */
    @Input()
    ariaLabel: Nullable<string>;

    /** Select Input Mobile Configuration */
    @Input()
    mobileConfig: MobileModeConfig = { hasCloseButton: true };

    /** Should select be inlined. */
    @Input()
    inline = true;

    /** Event emitted when the popover open state changes. */
    @Output()
    readonly isOpenChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    /** Event emitted when the selected value of the select changes. */
    @Output()
    readonly valueChange = new EventEmitter<any>();

    /** @hidden */
    @ContentChildren(OptionComponent, { descendants: true })
    _options: QueryList<OptionComponent>;

    /** @hidden */
    @ViewChild('selectControl')
    _controlElementRef: ElementRef<HTMLDivElement>;

    /** Reference to element containing list of options */
    @ViewChild('selectOptionsListTemplate')
    selectOptionsListTemplate: TemplateRef<any>;

    /** @hidden
     * Reference to root element for the mobile mode dialog */
    @ViewChild('dialogContainer')
    _dialogContainerElementRef: ElementRef;

    /**
     * Overlay pane containing the options.
     * @hidden
     */
    @ViewChild(CdkConnectedOverlay)
    _overlayDir: CdkConnectedOverlay;

    /** @hidden
     * Referent to the option;s container
     */
    @ViewChild('optionPanel', { read: ElementRef })
    _optionPanel: ElementRef;

    /** Whether popover is opened
     * @hidden
     */
    _isOpen = false;

    /** @hidden */
    _tabIndex: number;

    /** @hidden */
    _liveAnnouncer: LiveAnnouncer;

    /** @hidden */
    _internalValue: any;

    /** @hidden */
    _calculatedMaxHeight: number;

    /** @hidden */
    _rtl = false;

    /** @hidden */
    _selectionModel: SelectionModel<OptionComponent>;

    /** @hidden It can be used to further add css classes to the select */
    _selectClass = '';

    /** @hidden It can be used to further add css classes to input of the select */
    _inputClass = '';

    /** @hidden It can be used to further add css classes to button of the select */
    _buttonClass = '';

    /** @hidden It can be used to further add css classes to addon element of the select */
    _addOnClass = '';

    /**
     * @hidden
     * Triggers when component is destroyed
     */
    readonly _destroy = new Subject<void>();

    /**
     * @hidden
     * Combined stream of all of the child options' change events.
     */
    readonly _optionSelectionChanges: Observable<FdOptionSelectionChange> = defer(() => {
        const _options = this._options;

        return _options?.changes.pipe(
            startWith(_options),
            switchMap(() => merge(..._options.map((option) => option.selectionChange)))
        );
    });

    /** @hidden */
    private _controlElemFontSize = 0;

    /** @hidden */
    private _focused = false;

    /**
     * @hidden
     * Stored calculated maxHeight from Option Panel
     */
    private _maxHeight: number;

    /** @hidden */
    private _subscriptions: Subscription = new Subscription();

    /** @hidden */
    @HostListener('window:resize')
    _resizeScrollHandler(): void {
        this._updateCalculatedHeight();
    }

    /** @hidden */
    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
        this._tabIndex = this.disabled ? -1 : 0;
    }

    /** Selected option. */
    get selected(): OptionComponent {
        return this._selectionModel.selected[0];
    }

    /** Retrieves selected value if any. */
    get triggerValue(): string {
        const emptyValue = ' ';
        if (this._selectionModel.isEmpty()) {
            return this.placeholder || emptyValue;
        }
        return this.selected.viewValue || this.placeholder || emptyValue;
    }

    /** equal to close
     * Tells the OptionList if it's closable by simply selecting the item either with CLICK | SPACE | ENTER.
     * When we are in mobile mode (mobile=true) and have we have enabled confirmation buttons then we
     * dont close option list. We close only after we hit confirm button.
     */
    get canClose(): boolean {
        return !(this.mobile && this.mobileConfig.approveButtonText);
    }

    /** Whether control can be interacted with */
    get isInteractive(): boolean {
        return !(this.readonly || this.disabled);
    }

    /**
     * Check if we can emit a value. They are 3 different paths where we can emit value:
     *  - We are not in mobile mode [mobile]=false
     *  - We are in mobile mode [mobile]=true and mobile dialog as just close X button to dismiss it
     *  - We are in mobile mode [mobile]=true and mobile dialog has ApproveButton available and
     *  dialog is closed. (meaning we already clicked this button)
     */
    get canEmitValueChange(): boolean {
        return (
            !this.mobile ||
            (this.mobile &&
                // Approve + Cancel
                !!this.mobileConfig.approveButtonText &&
                !this._isOpen) ||
            // CloseButton. Emits when you click on the option item
            (!!this.mobileConfig.hasCloseButton && !!this.mobileConfig.approveButtonText === false)
        );
    }

    /** @hidden */
    _compareWith = (o1: any, o2: any): boolean => o1 === o2;

    /** Function to compare the option values with the selected values. */
    @Input()
    set compareWith(fn: (o1: any, o2: any) => boolean) {
        if (typeof fn !== 'function') {
            throw Error('compareWith` must be a function.');
        }
        this._compareWith = fn;
        if (this._selectionModel) {
            // A different comparator means the selection could change.
            this._initializeSelection();
        }
    }
    get compareWith(): (o1: any, o2: any) => boolean {
        return this._compareWith;
    }

    /** @hidden */
    get focused(): boolean {
        return this._focused || this._isOpen;
    }

    /** @hidden */
    get calculatedMaxHeight(): number {
        return this._maxHeight || this._calculatedMaxHeight;
    }

    /** @hidden */
    constructor(
        @Attribute('tabindex') _tabIndex: string,
        @Optional() private readonly _rtlService: RtlService,
        private readonly _keyManagerService: SelectKeyManagerService,
        private readonly _changeDetectorRef: ChangeDetectorRef,
        private readonly _viewContainerRef: ViewContainerRef,
        @Optional() private readonly _dynamicComponentService: DynamicComponentService,
        @Optional() @Self() private readonly ngControl: NgControl,
        @Optional() private readonly _injector: Injector,
        readonly _contentDensityObserver: ContentDensityObserver
    ) {
        if (this.ngControl) {
            this.ngControl.valueAccessor = this;
        }
        this._tabIndex = parseInt(_tabIndex, 10) || 0;
    }

    /** @hidden */
    ngOnInit(): void {
        this.ariaLabel = this.ariaLabel || this.placeholder;

        this._initializeCommonBehavior();
    }

    /** @hidden */
    ngAfterViewInit(): void {
        this._keyManagerService._initKeyManager();
        this._setupMobileMode();
    }

    /** @hidden */
    ngAfterContentInit(): void {
        this._registerEventsAfterContentInit();
    }

    /** @hidden */
    ngOnChanges(changes: SimpleChanges): void {
        if (changes['typeaheadDebounceInterval'] && this._keyManagerService._keyManager) {
            this._keyManagerService._keyManager.withTypeAhead(this.typeaheadDebounceInterval);
        } else if (changes['disabled']) {
            this._tabIndex = this.disabled ? -1 : 0;
        }
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._subscriptions.unsubscribe();
        this._cleanupCommonBehavior();
    }

    /** @hidden */
    onChange: (value: any) => void = () => {};

    /** @hidden */
    onTouched = (): void => {};

    /** Toggles the open state of the select. */
    @HostListener('click')
    toggle(): void {
        this._isOpen ? this.close() : this.open();
    }

    /** Opens the select popover body. */
    open(): void {
        if (this.disabled || this.readonly || !this._options || !this._getItemCount() || this._isOpen) {
            return;
        }
        this._isOpen = true;

        this._controlElemFontSize = parseInt(
            getComputedStyle(this._controlElementRef.nativeElement).fontSize || '0',
            10
        );

        this._keyManagerService._keyManager.withHorizontalOrientation(null);
        this._highlightCorrectOption();
        this._changeDetectorRef.markForCheck();

        this.isOpenChange.emit(true);
    }

    /** @hidden */
    close(forceClose: boolean = false): void {
        if (this._isOpen && (forceClose || this.close)) {
            this._isOpen = false;
            this._keyManagerService._keyManager.withHorizontalOrientation(this._isRtl() ? 'rtl' : 'ltr');
            this._changeDetectorRef.markForCheck();
            this.onTouched();

            this.isOpenChange.emit(false);
        }
    }

    /** Focuses select control. */
    focus(): void {
        (this._controlElementRef?.nativeElement as HTMLElement).focus();
    }

    /** Blurs select control. */
    blur(): void {
        (this._controlElementRef?.nativeElement as HTMLElement).blur();
    }

    /** @hidden */
    registerOnChange(fn: (value: any) => void): void {
        this.onChange = fn;
    }

    /** @hidden */
    registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    /** @hidden from ControlValue Accessor */
    writeValue(value: any): void {
        if (this._options) {
            this._setSelectionByValue(value);
        }
    }

    /** @hidden */
    _setSelectionByValue(value: any | any[]): void {
        this._selectionModel.clear();
        const correspondingOption = this._selectValue(value);

        // Shift focus to the active item. Note that we shouldn't do this in multiple
        // mode, because we don't know what option the user interacted with last.
        if (correspondingOption) {
            this._keyManagerService._keyManager.setActiveItem(correspondingOption);
        } else if (!this._isOpen) {
            // Otherwise reset the highlighted option. Note that we only want to do this while
            // closed, because doing it while open can shift the user's focus unnecessarily.
            this._keyManagerService._keyManager.setActiveItem(-1);
        }

        this._changeDetectorRef.markForCheck();
    }

    /** @hidden */
    _selectValue(value: any): OptionComponent | undefined {
        const correspondingOption = this._options.find((option: OptionComponent) => {
            try {
                // Treat null as a special reset value.
                return option.value != null && this._compareWith(option.value, value);
            } catch (error) {
                if (isDevMode()) {
                    // Notify developers of errors in their comparator.
                    console.warn(error);
                }
                return false;
            }
        });

        if (correspondingOption) {
            this._selectionModel.select(correspondingOption);
        }

        return correspondingOption;
    }

    /** @hidden */
    _popoverOpenChangeHandle(isOpen: boolean): void {
        isOpen ? this.open() : this.close();
    }

    /** @hidden Returns _keyManagerService. */
    _getKeyService(): SelectKeyManagerService {
        return this._keyManagerService;
    }

    /** @hidden */
    _setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
        this._changeDetectorRef.markForCheck();

        this._tabIndex = -1;
    }

    /** @hidden */
    _highlightCorrectOption(): void {
        if (this._keyManagerService._keyManager && this._selectionModel.isEmpty()) {
            this._keyManagerService._keyManager.setFirstItemActive();
        } else if (this._keyManagerService._keyManager && !this._selectionModel.isEmpty()) {
            this._keyManagerService._keyManager.setActiveItem(this.selected);
        }
    }

    /** @hidden */
    _cleanupCommonBehavior(): void {
        this._destroy.next();
        this._destroy.complete();
    }

    /** @hidden */
    _initializeSelection(): void {
        // Defer setting the value in order to avoid the "Expression
        // has changed after it was checked" errors from Angular.
        Promise.resolve().then(() => {
            this._setSelectionByValue(this.ngControl ? this.ngControl.value : this._internalValue);
        });
    }

    /**
     * Expose expose outside of this mixin to give component ability
     * to update caluclatedMaxHeight if needed
     * @hidden
     */
    _updateCalculatedHeight(): void {
        this._calculatedMaxHeight = window.innerHeight * 0.45;
    }

    /** @hidden */
    _getOptionScrollPosition(optionIndex: number, itemHeight: number, currentScrollPosition: number): number {
        const optionHeight = this._options.get(optionIndex)?._getHtmlElement().offsetHeight || itemHeight;
        const optionOffset = optionIndex * optionHeight;
        if (optionOffset < currentScrollPosition) {
            return optionOffset;
        }

        if (optionOffset + optionHeight > currentScrollPosition + SELECT_PANEL_MAX_HEIGHT) {
            return Math.max(0, optionOffset - SELECT_PANEL_MAX_HEIGHT + optionHeight);
        }
        return currentScrollPosition;
    }

    /** @hidden */
    _getItemHeight(): number {
        // also include border with default value 1.
        return this._controlElemFontSize * SELECT_ITEM_HEIGHT_EM + 1;
    }

    /** @hidden */
    _initializeCommonBehavior(): void {
        this._selectionModel = new SelectionModel<OptionComponent>(false);
        this._keyManagerService._component = this;

        this._updateCalculatedHeight();
    }

    /** @hidden */
    _isRtl(): boolean {
        if (this._rtlService) {
            this._subscriptions.add(
                this._rtlService.rtl.subscribe((rtl) => {
                    this._rtl = rtl;
                })
            );
        }
        return this._rtl === true ? true : false;
    }

    /** @hidden */
    _registerEventsAfterContentInit(): void {
        this._selectionModel.changed.pipe(takeUntil(this._destroy)).subscribe((event) => {
            event.added.forEach((option) => option._select());
            event.removed.forEach((option) => option._deselect());
        });

        this._options.changes.pipe(startWith(null), takeUntil(this._destroy)).subscribe(() => {
            this._resetOptions();
            this._initializeSelection();
        });
    }

    /** @hidden */
    @HostListener('keydown', ['$event'])
    _handleKeydown(event: KeyboardEvent): void {
        if (!this.disabled && !this.readonly) {
            this._isOpen
                ? this._keyManagerService._handleOpenKeydown(event)
                : this._keyManagerService._handleClosedKeydown(event);
        }
        if (KeyUtil.isKeyCode(event, ESCAPE)) {
            this._controlElementRef.nativeElement.focus();
        }
    }

    /** @hidden */
    _getAriaActiveDescendant(): string | null {
        if (this._isOpen && this._keyManagerService._keyManager && this._keyManagerService._keyManager.activeItem) {
            return this._keyManagerService._keyManager.activeItem.id;
        }
        return null;
    }

    /** @hidden */
    _onFocus(): void {
        if (!this.disabled) {
            this._focused = true;
            this._changeDetectorRef.markForCheck();
        }
    }

    /** @hidden */
    _onBlur(): void {
        this._focused = false;

        if (!this.disabled && !this._isOpen) {
            this.onTouched();
            this._changeDetectorRef.markForCheck();
        }
    }

    /** @hidden */
    private _resetOptions(): void {
        const changedOrDestroyed = merge(this._options.changes, this._destroy);

        this._optionSelectionChanges.pipe(takeUntil(changedOrDestroyed)).subscribe((event) => {
            this._onSelect(event.source, event.isUserInput);

            if (event.isUserInput && this._isOpen) {
                this.close();
            }
        });

        // Listen to changes in the internal state of the _options and react accordingly.
        // Handles cases like the labels of the selected _options changing.
        merge(...this._options.map((option) => option._stateChanges))
            .pipe(takeUntil(changedOrDestroyed))
            .subscribe(() => {
                this._changeDetectorRef.markForCheck();
            });
    }

    /**
     * @hidden
     * Invoked when an option is clicked.
     */
    private _onSelect(option: OptionComponent, isUserInput: boolean): void {
        const wasSelected = this._selectionModel.isSelected(option);
        if ((option.value === null || option.value === undefined) && this.unselectMissingOption) {
            option._deselect();
            this._selectionModel.clear();
            this._emitSelectChange(option.value);
        } else {
            if (wasSelected !== option.selected) {
                option.selected ? this._selectionModel.select(option) : this._selectionModel.deselect(option);
            }
            if (isUserInput) {
                this._keyManagerService._keyManager.setActiveItem(option);
            }
        }

        if (wasSelected !== this._selectionModel.isSelected(option) || this.mobile) {
            this._emitSelectChange();
        }
    }

    /** @hidden */
    private _emitSelectChange(defaultVal?: any): void {
        if (this.canEmitValueChange) {
            this._internalValue =
                this._selectionModel.selected && this._selectionModel.selected.length !== 0
                    ? (this.selected as OptionComponent).value
                    : defaultVal;
            this.valueChange.emit(this._internalValue);
            this.onChange(this._internalValue);
            this._changeDetectorRef.markForCheck();
        }
    }

    /** @hidden */
    private _getItemCount(): number {
        if (this._optionPanel && this._headerElements().length > 0) {
            return this._options.length + this._headerElements().length;
        }
        return this._options.length;
    }

    /** @hidden */
    private _headerElements(): NodeListOf<Element> {
        return this._optionPanel?.nativeElement.querySelectorAll(SELECT_HEADER_IDENTIFIER);
    }

    /** @hidden */
    private async _setupMobileMode(): Promise<void> {
        if (!this.mobile) {
            return;
        }

        const injector = Injector.create({
            providers: [{ provide: SELECT_COMPONENT, useValue: this }],
            parent: this._injector
        });

        await this._dynamicComponentService.createDynamicModule(
            this.selectOptionsListTemplate,
            SelectMobileModule,
            SelectMobileComponent,
            this._viewContainerRef,
            injector
        );
    }
}

export class DeprecatedSelectCSSClasses implements ModuleDeprecation {
    /** @hidden */
    message = `Select CSS classes fd-select--compact, fd-select--compact--mobile, fd-popover-custom-select-body, fd-popover-custom-list are deprecated`;

    /** @hidden */
    alternative = {
        name: 'Inspect the elements of the Select component to see the new classes',
        link: ['/core', 'select']
    };
}
