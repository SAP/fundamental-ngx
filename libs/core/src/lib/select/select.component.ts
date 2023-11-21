import { LiveAnnouncer } from '@angular/cdk/a11y';
import { CdkConnectedOverlay, ScrollStrategy } from '@angular/cdk/overlay';
import {
    AfterContentInit,
    AfterViewInit,
    Attribute,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChildren,
    DestroyRef,
    ElementRef,
    EventEmitter,
    HostListener,
    Injector,
    Input,
    OnChanges,
    OnInit,
    Optional,
    Output,
    QueryList,
    Signal,
    SimpleChanges,
    TemplateRef,
    ViewChild,
    ViewContainerRef,
    ViewEncapsulation,
    inject,
    isDevMode,
    signal
} from '@angular/core';
import { BehaviorSubject, Observable, defer, filter, map, merge } from 'rxjs';
import { startWith, switchMap, takeUntil } from 'rxjs/operators';

import { DynamicComponentService, KeyUtil, ModuleDeprecation, Nullable, RtlService } from '@fundamental-ngx/cdk/utils';
import { FormItemControl, registerFormItemControl } from '@fundamental-ngx/core/form';
import { MobileModeConfig } from '@fundamental-ngx/core/mobile-mode';
import { PopoverFillMode } from '@fundamental-ngx/core/shared';

import { ENTER, ESCAPE, SPACE } from '@angular/cdk/keycodes';
import { NgClass, NgIf, NgTemplateOutlet } from '@angular/common';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import {
    CvaControl,
    CvaDirective,
    FormFieldAdvancedStateMessage,
    SingleDropdownValueControl
} from '@fundamental-ngx/cdk/forms';
import { ContentDensityObserver, contentDensityObserverProviders } from '@fundamental-ngx/core/content-density';
import { IconComponent } from '@fundamental-ngx/core/icon';
import { ListComponent, ListMessageDirective } from '@fundamental-ngx/core/list';
import { PopoverBodyComponent, PopoverComponent, PopoverControlComponent } from '@fundamental-ngx/core/popover';
import { FdTranslatePipe } from '@fundamental-ngx/i18n';
import { get } from 'lodash-es';
import { FdOptionSelectionChange, OptionComponent } from './option/option.component';
import { OptionsInterface } from './options.interface';
import { SelectKeyManagerService } from './select-key-manager.service';
import { SelectMobileComponent } from './select-mobile/select-mobile.component';
import { SELECT_COMPONENT, SelectInterface } from './select.interface';

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
        contentDensityObserverProviders(),
        CvaControl
    ],
    standalone: true,
    imports: [
        NgTemplateOutlet,
        PopoverComponent,
        PopoverControlComponent,
        PopoverBodyComponent,
        NgIf,
        NgClass,
        IconComponent,
        ListComponent,
        ListMessageDirective,
        FdTranslatePipe
    ],
    hostDirectives: [
        {
            directive: CvaDirective,
            // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
            inputs: [
                'id:controlId',
                'state',
                'ariaLabelledBy',
                'placeholder',
                'ariaLabel',
                'stateMessage',
                'disabled',
                'readonly',
                'name'
            ]
        }
    ]
})
export class SelectComponent<T = any>
    implements
        SingleDropdownValueControl,
        SelectInterface<T>,
        OnInit,
        AfterViewInit,
        AfterContentInit,
        OnChanges,
        FormItemControl
{
    /** Scrolling strategy to be used for popover. */
    @Input()
    scrollStrategy: ScrollStrategy;

    /** Whether the select component should be displayed in mobile mode. */
    @Input()
    mobile = false;

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
    controlTemplate: Nullable<TemplateRef<{ $implicit: string; selected: OptionsInterface<T> }>>;

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

    /** Select Input Mobile Configuration */
    @Input()
    mobileConfig: MobileModeConfig = { hasCloseButton: true };

    /** Should select be inlined. */
    @Input()
    inline = true;

    /** Additional classname for the select control element. */
    @Input()
    selectControlClass: Nullable<string>;

    /** Additional classname for the select dropdown button element. */
    @Input()
    selectDropdownButtonClass: Nullable<string>;

    /** Holds advanced message renderer with respect to state. */
    @Input()
    advancedStateMessage: Nullable<FormFieldAdvancedStateMessage>;

    /**
     * Action to perform when user shifts focus from the dropdown.
     * - `close` will close the dropdown preserving previously selected value.
     * - `closeAndSelect` will close the dropdown and select last focused dropdown item.
     */
    @Input()
    tabOutStrategy: 'close' | 'closeAndSelect' = 'close';

    /** Value of the Select */
    @Input()
    set value(v: T) {
        this._valueInput$.next(v);
    }

    /** @hidden */
    get value(): T {
        return this._cvaDirective.value?.value as T;
    }

    /** Event emitted when the popover open state changes. */
    @Output()
    readonly isOpenChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    /** Event emitted when the selected value of the select changes. */
    @Output()
    readonly valueChange: Observable<T>;

    /** @hidden */
    @ContentChildren(OptionComponent, { descendants: true })
    _options: QueryList<OptionComponent<T>>;

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

    /** @hidden */
    set ariaLabelledBy(v: Nullable<string>) {
        this._cvaDirective.ariaLabelledBy = v;
    }

    /** @hidden */
    get ariaLabelledBy(): Nullable<string> {
        return this._cvaDirective.ariaLabelledBy;
    }

    /** @hidden */
    _isOpen = false;

    /** @hidden */
    _tabIndex: number;

    /** @hidden */
    _liveAnnouncer: LiveAnnouncer;

    /** @hidden */
    _calculatedMaxHeight: number;

    /**
     * @hidden
     * Triggers when component is destroyed
     */
    _destroyRef = inject(DestroyRef);

    /** @hidden */
    _textDirection: Signal<'ltr' | 'rtl'>;

    /** @hidden */
    get _selectControlClass(): string {
        return [this._cvaDirective.state ? `is-${this._cvaDirective.state}` : '', this.selectControlClass]
            .filter((className) => !!className)
            .join(' ');
    }

    /**
     * @hidden
     * Combined stream of all the child options' change events.
     */
    readonly _optionSelectionChanges: Observable<FdOptionSelectionChange> = defer(() => {
        const _options = this._options;

        return _options?.changes.pipe(
            startWith(_options),
            switchMap(() => merge(..._options.map((option) => option.selectionChange)))
        );
    });

    /** @hidden */
    _cvaDirective: CvaDirective<OptionsInterface<T> | null> = inject(CvaDirective);

    /**
     * @hidden
     * Observable used for syncing the input value and the rendered options
     **/
    protected _valueInput$ = new BehaviorSubject<T | null>(null);

    /** @hidden */
    protected _cvaControl: CvaControl<OptionsInterface<T> | null> = inject(CvaControl);

    /** @hidden */
    private _controlElemFontSize = 0;

    /** @hidden */
    private _focused = false;

    /**
     * @hidden
     * Stored calculated maxHeight from Option Panel
     */
    private _maxHeight: number;

    /** Retrieves selected value if any. */
    get triggerValue(): string {
        const emptyValue = ' ';
        if (this.value === null) {
            return this._cvaDirective.placeholder || emptyValue;
        }
        return this._cvaDirective.value?.viewValue || this._cvaDirective.placeholder || emptyValue;
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
        return !(this._cvaDirective.readonly || this._cvaDirective.disabled);
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

    /**
     * Function to compare the option values with the selected values. */
    @Input()
    set compareWith(fn: ((o1: T, o2: T) => boolean) | string) {
        if (typeof fn === 'string') {
            this._compareWith = (o1: T, o2: T): boolean => get(o1, fn) === get(o2, fn);
        } else {
            this._compareWith = fn;
        }
        if (this.value !== null) {
            this._initializeSelection();
        }
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
        private readonly _keyManagerService: SelectKeyManagerService<T>,
        private readonly _changeDetectorRef: ChangeDetectorRef,
        private readonly _viewContainerRef: ViewContainerRef,
        @Optional() private readonly _dynamicComponentService: DynamicComponentService,
        @Optional() private readonly _injector: Injector,
        readonly _contentDensityObserver: ContentDensityObserver
    ) {
        this._tabIndex = parseInt(_tabIndex, 10) || 0;
        const rtlService = inject(RtlService, { optional: true });
        this._textDirection = rtlService
            ? toSignal(rtlService.rtl.pipe(map((isRtl) => (isRtl ? 'rtl' : 'ltr'))), { requireSync: true })
            : signal('ltr');
        this.valueChange = this._cvaDirective.valueChange.pipe(
            filter(() => this.canEmitValueChange),
            map(() => this.value)
        );
    }

    /** @hidden */
    @HostListener('window:resize')
    _resizeScrollHandler(): void {
        this._updateCalculatedHeight();
    }

    /** Toggles the open state of the select. */
    @HostListener('click')
    toggle(): void {
        this._isOpen ? this.close() : this.open();
    }

    /** @hidden */
    @HostListener('keydown', ['$event'])
    _handleKeydown(event: KeyboardEvent): void {
        if (!this._cvaDirective.disabled && !this._cvaDirective.readonly) {
            this._isOpen
                ? this._keyManagerService._handleOpenKeydown(event)
                : this._keyManagerService._handleClosedKeydown(event);
        }
        if (KeyUtil.isKeyCode(event, [ESCAPE, ENTER, SPACE])) {
            this._controlElementRef.nativeElement.focus();
        }
    }

    /** @hidden */
    _compareWith = (o1: T, o2: T): boolean => o1 === o2;

    /** @hidden */
    ngOnInit(): void {
        this._cvaControl.listenToChanges();
        this._initializeCommonBehavior();
    }

    /** @hidden */
    ngAfterViewInit(): void {
        this._keyManagerService._initKeyManager();
        this._valueInput$.pipe(takeUntilDestroyed(this._destroyRef)).subscribe((v) => {
            if (v === null || v === undefined) {
                this._cvaDirective.setValue(null);
            } else {
                this._selectValue(v);
            }
        });
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
        }
    }

    /** Opens the select popover body. */
    open(): void {
        if (
            this._cvaDirective.disabled ||
            this._cvaDirective.readonly ||
            !this._options ||
            !this._getItemCount() ||
            this._isOpen
        ) {
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

        this._controlElementRef.nativeElement.focus();

        this.isOpenChange.emit(true);
    }

    /** @hidden */
    close(forceClose = false, tabOut = false): void {
        if (this._isOpen || forceClose) {
            if (tabOut && this.tabOutStrategy === 'closeAndSelect') {
                this._keyManagerService._keyManager.activeItem?._selectViaInteraction();
            }
            this._isOpen = false;
            this._keyManagerService._keyManager.withHorizontalOrientation(this._textDirection());
            this._changeDetectorRef.markForCheck();
            this._cvaDirective.onTouched();

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
    _setSelectionByValue(value: T): void {
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
    _selectValue(value: T): OptionComponent<T> | undefined {
        const correspondingOption = this._options.find((option: OptionComponent) => {
            try {
                // Treat null as a special reset value.
                return option.value !== null && this._compareWith(option.value, value);
            } catch (error) {
                if (isDevMode()) {
                    // Notify developers of errors in their comparator.
                    console.warn(error);
                }
                return false;
            }
        });

        this._cvaDirective.setValue(correspondingOption ? correspondingOption : null);
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
    _highlightCorrectOption(): void {
        if (this._keyManagerService._keyManager && this.value === null) {
            this._keyManagerService._keyManager.setFirstItemActive();
        } else if (this._keyManagerService._keyManager && this.value !== null) {
            // this._keyManagerService._keyManager.setActiveItem(this.selected);
        }
    }

    /** @hidden */
    _initializeSelection(): void {
        // Defer setting the value in order to avoid the "Expression
        // has changed after it was checked" errors from Angular.
        Promise.resolve().then(() => {
            if (this.value !== null) {
                this._setSelectionByValue(this.value);
            }
        });
    }

    /**
     * Expose outside of this mixin to give component ability
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
        this._keyManagerService._component = this;

        this._updateCalculatedHeight();
    }

    /** @hidden */
    _registerEventsAfterContentInit(): void {
        this._cvaDirective.valueChange.pipe(takeUntilDestroyed(this._destroyRef)).subscribe(() => {
            this._options.forEach((option) =>
                this._compareWith(this.value, option.value) ? option._select() : option._deselect()
            );
        });

        this._options.changes.pipe(startWith(null), takeUntilDestroyed(this._destroyRef)).subscribe(() => {
            this._resetOptions();
            this._initializeSelection();
        });
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
        if (!this._cvaDirective.disabled) {
            this._focused = true;
            this._changeDetectorRef.markForCheck();
        }
    }

    /** @hidden */
    _onBlur(): void {
        this._focused = false;

        if (!this._cvaDirective.disabled && !this._isOpen) {
            this._cvaDirective.onTouched();
            this._changeDetectorRef.markForCheck();
        }
    }

    /** @hidden */
    private _resetOptions(): void {
        const changedOrDestroyed = <ObsType>(obs: Observable<ObsType>): Observable<ObsType> =>
            obs.pipe(takeUntilDestroyed(this._destroyRef), takeUntil(this._options.changes));

        this._optionSelectionChanges.pipe(changedOrDestroyed).subscribe((event) => {
            this._onSelect(event.source, event.isUserInput);

            if (event.isUserInput && this._isOpen) {
                this.close();
                this.focus();
            }
        });

        // Listen to changes in the internal state of the _options and react accordingly.
        // Handles cases like the labels of the selected _options changing.
        merge(...this._options.map((option) => option._stateChanges))
            .pipe(changedOrDestroyed)
            .subscribe(() => {
                this._changeDetectorRef.markForCheck();
            });
    }

    /**
     * @hidden
     * Invoked when an option is clicked.
     */
    private _onSelect(option: OptionComponent<T>, isUserInput: boolean): void {
        const wasSelected = this._compareWith(option.value, this.value);
        if ((option.value === null || option.value === undefined) && this.unselectMissingOption) {
            option._deselect();
            this._cvaDirective.setValue(null);
        } else {
            if (wasSelected !== option.selected) {
                this._cvaDirective.setValue(option.selected ? option : null);
            }
            if (isUserInput) {
                this._keyManagerService._keyManager.setActiveItem(option);
            }
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

        this._dynamicComponentService.createDynamicComponent(
            this.selectOptionsListTemplate,
            SelectMobileComponent,
            {
                containerRef: this._viewContainerRef
            },
            { injector }
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
