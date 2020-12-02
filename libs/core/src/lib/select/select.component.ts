import {
    AfterContentInit,
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChildren,
    ElementRef,
    EventEmitter,
    forwardRef,
    HostListener,
    Inject,
    Injector,
    Input,
    OnDestroy,
    OnInit,
    Optional,
    Output,
    QueryList,
    TemplateRef,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { OptionComponent } from './option/option.component';
import { fromEvent, Subject, Subscription } from 'rxjs';
import { PopperOptions } from 'popper.js';
import { PopoverFillMode } from '../popover/popover-position/popover-position';
import { KeyUtil } from '../utils/functions';
import { SelectProxy } from './select-proxy.service';
import { buffer, debounceTime, filter, map, startWith, takeUntil } from 'rxjs/operators';
import { DynamicComponentService } from '../utils/dynamic-component/dynamic-component.service';
import { SelectMobileComponent } from './select-mobile/select-mobile.component';
import { DIALOG_CONFIG, DialogConfig } from '../dialog/utils/dialog-config.class';
import { MobileModeConfig } from '../utils/interfaces/mobile-mode-config';
import { SELECT_COMPONENT, SelectInterface } from './select.interface';
import { DOWN_ARROW, ENTER, ESCAPE, SPACE, UP_ARROW } from '@angular/cdk/keycodes';

let selectUniqueId = 0;

export type SelectControlState = 'error' | 'success' | 'warning' | 'information';

export interface OptionStatusChange {
    option: OptionComponent,
    controlChange: boolean
}

/**
 * Select component intended to mimic the behaviour of the native select element.
 */
@Component({
    selector: 'fd-select',
    templateUrl: './select.component.html',
    styleUrls: ['./select.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '[class.fd-select-custom-class]': 'true',
        '[class.fd-select-custom-class--mobile]': 'mobile',
    },
    providers: [
        SelectProxy,
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => SelectComponent),
            multi: true
        }
    ]
})
export class SelectComponent implements ControlValueAccessor, SelectInterface, OnInit, AfterViewInit, AfterContentInit, OnDestroy {

    /** Id of the control. */
    @Input()
    controlId = `fd-select-${selectUniqueId++}`;

    /** Whether the select component is disabled. */
    @Input()
    state: SelectControlState = null;

    /** Whether the select component should be displayed in mobile mode. */
    @Input()
    mobile = false;

    /** Whether the select component is disabled. */
    @Input()
    stateMessage: string;

    /** Whether the select component is disabled. */
    @Input()
    disabled = false;

    /** Whether the select component is readonly. */
    @Input()
    readonly = false;

    /** Placeholder for the select. Appears in the triggerbox if no option is selected. */
    @Input()
    placeholder: string;

    /** Sets value of the selected option. */
    @Input('value') set value(value: any) {
        this._selectProxy.value$.next(value);
    }

    /** Current value of the selected option. */
    get value(): any {
        return this._selectProxy.value$.value;
    }

    /** Whether the select is in compact mode. */
    @Input()
    compact = false;

    /** Whether option components contain more than basic text. */
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

    /** Popper.js options of the popover. */
    @Input()
    popperOptions: PopperOptions = {
        placement: 'bottom-start',
        modifiers: {
            preventOverflow: {
                enabled: true,
                escapeWithReference: true,
                boundariesElement: 'scrollParent'
            }
        }
    };

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
    ariaLabelledBy: string = null;

    /** Sets control aria-label attribute value */
    @Input()
    ariaLabel: string = null;

    /** Select Input Mobile Configuration */
    @Input()
    mobileConfig: MobileModeConfig = {hasCloseButton: true};

    /** Event emitted when the popover open state changes. */
    @Output()
    readonly isOpenChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    /** Event emitted when the selected value of the select changes. */
    @Output()
    readonly valueChange: EventEmitter<any> = new EventEmitter<any>();

    /** @hidden */
    @ContentChildren(OptionComponent, {descendants: true})
    options: QueryList<OptionComponent>;

    /** @hidden */
    @ViewChild('selectControl')
    controlElementRef: ElementRef;

    /** Reference to element containing list of options */
    @ViewChild('selectOptionsListTemplate')
    selectOptionsListTemplate: TemplateRef<any>;

    /** @hidden */
    calculatedMaxHeight: number;

    /** Current selected option component reference. */
    selected: OptionComponent;

    /** Text value displayed in select control */
    selectViewValue: string;

    /** Whether popover is opened */
    isOpen = false;

    /** @hidden Cashed options as as Array */
    private _options: OptionComponent[];

    /** @hidden */
    private _subscriptions: Subscription = new Subscription();

    /** An RxJS Subject that will kill the current data stream (for unsubscribing)  */
    private readonly _refresh$ = new Subject<void>();

    /** @hidden */
    onChange: Function = () => {};

    /** @hidden */
    onTouched: Function = () => {};

    /** @hidden */
    @HostListener('keydown', ['$event'])
    keydownHandler(event: KeyboardEvent): void {
        if (KeyUtil.isKeyCode(event, UP_ARROW)) {
            if (this.isInteractive) {
                this._interactWithOptions('previous');
            }
            event.preventDefault();

        } else if (KeyUtil.isKeyCode(event, DOWN_ARROW)) {
            if (this.isInteractive) {
                this._interactWithOptions('next');
            }
            event.preventDefault();

        } else if (KeyUtil.isKeyCode(event, ESCAPE)) {
            if (this.isInteractive) {
                this.close();
            }
            event.preventDefault();

        } else if (KeyUtil.isKeyCode(event, [SPACE, ENTER])) {
            if (this.isInteractive) {
                this.toggle();
            }
            event.preventDefault();
        }
    }

    /** @hidden */
    @HostListener('window:resize')
    resizeScrollHandler(): void {
        this.calculatedMaxHeight = this.mobile ? null : window.innerHeight * 0.45;
    }

    constructor(
        private _elementRef: ElementRef,
        private _selectProxy: SelectProxy,
        private _changeDetectorRef: ChangeDetectorRef,
        @Optional() private _dynamicComponentService: DynamicComponentService,
        @Optional() @Inject(DIALOG_CONFIG) public dialogConfig: DialogConfig
    ) { }

    /** @hidden */
    ngOnInit(): void {
        this._listenOnSelectedOption();
        this._listenOptionFiltering();
    }

    /** @hidden */
    ngAfterContentInit(): void {
        this.resizeScrollHandler();
        this._listenOnOptionChanges();
        this._listenOnOptionKeydown();
        this._setSelectViewValue();
    }

    /** @hidden */
    ngAfterViewInit(): void {
        this._listenOnControlTouched();
        this._setOptionsArray();
        this._setOptionsProperties();
        this._setupMobileMode();
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._subscriptions.unsubscribe();
    }

    /** Whether control can be interacted with */
    get isInteractive(): boolean {
        return !(this.readonly || this.disabled);
    }

    get isCancelableMobileSelect(): boolean {
        return this.mobile && !!this.mobileConfig.approveButtonText
    }

    /** @hidden */
    popoverOpenChangeHandle(isOpen: boolean): void {
        isOpen ? this.open() : this.close();
    }

    /** Toggles the open state of the select. */
    toggle(): void {
        this.isOpen ? this.close() : this.open();
    }

    /** Opens the select popover body. */
    open(): void {
        if (this.isInteractive) {
            this.isOpen = true;
            this.isOpenChange.emit(this.isOpen);
            this._focusOption('onOpen');
            this._changeDetectorRef.markForCheck();
        }
    }

    /** Closes the select popover body. */
    close(): void {
        this.isOpen = false;
        this.isOpenChange.emit(this.isOpen);
        this.focus();
        this._changeDetectorRef.markForCheck();
    }

    /** Focuses select control. */
    focus(): void {
        if (this.controlElementRef) {
            (this.controlElementRef.nativeElement as HTMLElement).focus();
        }
    }

    /** @hidden */
    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    /** @hidden */
    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    /** @hidden */
    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
        this._changeDetectorRef.markForCheck();
    }

    /** @hidden */
    writeValue(value: any): void {
        this._selectProxy.value$.next(value);
    }

    /** @hidden */
    setSelectedOption({option, controlChange}: OptionStatusChange, forceMobileSelect?: boolean): void {
        this.selected = option;
        this._setSelectViewValue();

        if (controlChange) {
            this._updateValue(option.value, !forceMobileSelect && this.isCancelableMobileSelect);
            if (!this.isCancelableMobileSelect) {
                this.close();
            }
        }
        this._changeDetectorRef.markForCheck();
    }

    /** @hidden */
    private _listenOnOptionChanges(): void {
        this._subscriptions.add(
            this.options.changes
                .subscribe(_ => {
                    this._setOptionsArray();
                    this._setOptionsProperties();
                    this._setSelectedOption();
                    this._listenOnOptionKeydown();
                    this._setSelectViewValue();
                    setTimeout(() => {
                        if (this.selected === undefined && this.unselectMissingOption) {
                            this._updateValue(undefined);
                            this._changeDetectorRef.markForCheck();
                        }
                    });
                })
        )
    }

    /** @hidden */
    private _listenOnOptionKeydown(): void {
        this._refresh$.next();

        this.options.forEach(option => {
            this._subscriptions.add(
                option.selectionEvent.pipe(
                    takeUntil(this._refresh$),
                    filter(event => !!event)
                ).subscribe(event => this.keydownHandler(event))
            )
        })
    }

    private _listenOnControlTouched(): void {
        this._subscriptions.add(
            fromEvent(this.controlElementRef.nativeElement, 'blur').subscribe(_ => this.onTouched())
        )
    }

    /** @hidden */
    private _setSelectedOption(): void {
        this.selected = this._options.find(option => option.selected);
    }

    /** @hidden */
    private _updateValue(value: any, silent?: boolean): void {
        this._selectProxy.value$.next(value);
        if (!silent) {
            this.valueChange.emit(value);
            this.onChange(value);
        }
    }

    /** @hidden Function used to setup new listener reacting on option select events.*/
    private _listenOnSelectedOption(): void {
        this._subscriptions.add(
            this._selectProxy.optionStateChange$.asObservable()
                .subscribe((change: OptionStatusChange) => this.setSelectedOption(change))
        );
    }

    /** @hidden Listen on alphabetical or numerical keys and interact with options */
    private _listenOptionFiltering(): void {
        const source = fromEvent(this._elementRef.nativeElement, 'keydown').pipe(
            filter(_ => this.isInteractive),
            filter((event: KeyboardEvent) => KeyUtil.isKeyType(event, 'numeric') || KeyUtil.isKeyType(event, 'alphabetical'))
        );
        const trigger = source.pipe(debounceTime(this.typeaheadDebounceInterval));

        this._subscriptions.add(
            source.pipe(
                map(event => event.key),
                buffer(trigger),
                map(keys => keys.join(''))
            ).subscribe(query => this._searchOption(query))
        );
    }

    /** @hidden Search for options by query */
    private _searchOption(query: string): void {
        const validOptions = this._options.filter(options => options.viewValueText.toLowerCase().startsWith(query));

        if (!validOptions.length) {
            return;
        }

        if (this.isOpen) {
            const focusedOptionIndex = this._focusedOptionIndex(validOptions, document.activeElement);
            if (focusedOptionIndex !== -1) {
                validOptions[(focusedOptionIndex + 1) % validOptions.length].focus();
            } else {
                validOptions[0].focus();
            }
        } else {
            const selectedOptionIndex = validOptions.indexOf(this.selected);
            if (selectedOptionIndex !== -1) {
                this.setSelectedOption({
                    option: validOptions[(selectedOptionIndex + 1) % validOptions.length],
                    controlChange: true
                });
            } else {
                this.setSelectedOption({option: validOptions[0], controlChange: true});
            }
        }
    }

    /** @hidden */
    private _interactWithOptions(action: 'previous' | 'next'): void {
        if (!this._options.length) {
            return;
        }

        if (this.isOpen) {
            this._focusOption(action);
        } else {
            this._selectOption(action);
        }
    }

    /** @hidden Method used to focus options
     * @param action
     * 'onOpen'     - focus currently selected or first
     * 'next'       - focus next element
     * 'previous'   - focus previous element
     * */
    private _focusOption(action: 'onOpen' | 'next' | 'previous'): void {
        let activeIndex: number;
        const focusAsync = (option: OptionComponent) => setTimeout(() => option.focus(), 10);

        switch (action) {
            case 'onOpen':
                focusAsync(this.selected || this._options[0]);
                break;
            case 'next':
                activeIndex = this._focusedOptionIndex(this._options, document.activeElement);
                if (activeIndex < this._options.length - 1) {
                    this._options[++activeIndex].focus();
                }
                break;
            case 'previous':
                activeIndex = this._focusedOptionIndex(this._options, document.activeElement);
                if (activeIndex > 0) {
                    this._options[--activeIndex].focus();
                }
                break;
        }
    }

    /** @hidden Method used to select next/previous options
     * @param action
     * 'next'       - select next element
     * 'previous'   - select previous element
     * */
    private _selectOption(action: 'next' | 'previous'): void {
        let activeIndex = this._options.indexOf(this.selected);

        switch (action) {
            case 'next':
                if (activeIndex < this._options.length - 1) {
                    this.setSelectedOption({option: this._options[++activeIndex], controlChange: true});
                }
                break;
            case 'previous':
                if (activeIndex > 0) {
                    this.setSelectedOption({option: this._options[--activeIndex], controlChange: true});
                }
                break;
        }
    }

    /** @hidden */
    private _setOptionsArray(): void {
        this._options = this.options.toArray();
    }

    /** @hidden */
    private _setOptionsProperties(): void {
        this._options.forEach(option => option.setExtendedTemplate(this.extendedBodyTemplate));
    }

    /** @hidden */
    private _focusedOptionIndex(options: OptionComponent[], activeOption: Element): number {
        return options.map(option => option.getHtmlElement())
            .indexOf(activeOption as HTMLElement);
    }

    /** @hidden Sets new select control text */
    private _setSelectViewValue(): void {
        this.selectViewValue = this.selected ? this.selected.viewValueText : this.placeholder;
    }

    private _setupMobileMode(): void {
        if (this.mobile) {
            this._dynamicComponentService.createDynamicComponent(
                this.selectOptionsListTemplate,
                SelectMobileComponent,
                {container: this._elementRef.nativeElement},
                {injector: Injector.create({providers: [{provide: SELECT_COMPONENT, useValue: this}]})}
            )
        }
    }
}
