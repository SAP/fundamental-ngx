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
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    Output,
    QueryList,
    SimpleChanges,
    TemplateRef,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { OptionComponent } from './option/option.component';
import { Subscription } from 'rxjs';
import { PopperOptions } from 'popper.js';
import { PopoverFillMode } from '../popover/popover-directive/popover.directive';
import focusTrap, { FocusTrap } from 'focus-trap';
import { isKey } from '../utils/functions/is-key';
import { SelectProxy } from './select-proxy.service';

let selectUniqueId: number = 0;

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
    providers: [
        SelectProxy,
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => SelectComponent),
            multi: true
        }
    ]
})
export class SelectComponent implements OnInit, OnChanges, AfterViewInit, AfterContentInit, OnDestroy, ControlValueAccessor {

    /** Id of the control. */
    @Input()
    controlId: string = `fd-select-${selectUniqueId++}`;

    /** Whether the select component is disabled. */
    @Input()
    state: SelectControlState = null;

    /** Whether the select component should be displayed in mobile mode. */
    @Input()
    mobile: boolean = false;

    /** Whether the select component is disabled. */
    @Input()
    stateMessage: string;

    /** Whether the select component is disabled. */
    @Input()
    disabled: boolean = false;

    /** Whether the select component is readonly. */
    @Input()
    readonly: boolean = false;

    /** Placeholder for the select. Appears in the triggerbox if no option is selected. */
    @Input()
    placeholder: string;

    /** Open state of the select. */
    @Input()
    isOpen: boolean = false;

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
    compact: boolean = false;

    /** Max height of the popover. Any overflowing elements will be accessible through scrolling. */
    @Input()
    maxHeight: string;

    /** Glyph to add icon in the select component. */
    @Input()
    glyph: string = 'slim-arrow-down';

    /** Whether close the popover on outside click. */
    @Input()
    closeOnOutsideClick: boolean = true;

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
     * Preset options for the popover body width.
     * * `at-least` will apply a minimum width to the body equivalent to the width of the control.
     * * `equal` will apply a width to the body equivalent to the width of the control.
     * * Leave blank for no effect.
     */
    @Input()
    fillControlMode: PopoverFillMode = 'at-least';

    /** Custom template used to build control body. */
    @Input()
    controlTemplate: TemplateRef<any>;

    /** The element to which the popover should be appended. */
    @Input()
    appendTo: HTMLElement | 'body';

    /**
     * If the option should be unselected and value changed to undefined, when the current value is
     * not presented in option array. Switching it off can be handy, when there is some delay between providing
     * possible options and chosen value.
     */
    @Input()
    unselectMissingOption: boolean = true;

    /** If user wants to disable clicking when the content has not yet loaded and apply the three dots. */
    @Input()
    loading: boolean = false;

    /** Binds to control aria-labelledby attribute */
    @Input()
    labelledby: string;

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

    /** Reference to root element for the mobile mode dialog */
    @ViewChild('dialogContainer')
    dialogContainerElementRef: ElementRef;

    /** Reference to element containing list of options */
    @ViewChild('selectOptionsListTemplate')
    selectOptionsListTemplate: TemplateRef<any>;

    /** @hidden */
    calculatedMaxHeight: number;

    /** Current selected option component reference. */
    selected: OptionComponent;

    /** @hidden */
    private _focusTrap: FocusTrap;

    /** @hidden */
    private _subscriptions: Subscription = new Subscription();

    /** @hidden */
    onChange: Function = () => {};

    /** @hidden */
    onTouched: Function = () => {};

    /** @hidden */
    @HostListener('keydown', ['$event'])
    keydownHandler(event: KeyboardEvent): void {
        if (isKey(event, 'ArrowUp')) {
            if (this.isInteractive) {
                this._focusOption('previous');
            }
            event.preventDefault();

        } else if (isKey(event, 'ArrowDown')) {
            if (this.isInteractive) {
                this._focusOption('next');
            }
            event.preventDefault();

        } else if (isKey(event, 'Escape')) {
            if (this.isInteractive) {
                this.close();
            }
            event.preventDefault();

        } else if (isKey(event, ' ') || isKey(event, 'Enter')) {
            if (this.isInteractive) {
                this.toggle();
            }
            event.preventDefault();
        }
    }

    /** @hidden */
    @HostListener('window:resize')
    resizeScrollHandler(): void {
        this.calculatedMaxHeight = window.innerHeight * 0.45;
    }

    constructor(
        private _elementRef: ElementRef,
        private _selectProxy: SelectProxy,
        private _changeDetectorRef: ChangeDetectorRef
    ) { }

    /** @hidden */
    ngOnInit(): void {
        this._setupFocusTrap();
        this._setOptionsSelectionListener();
    }

    /** @hidden */
    ngOnChanges(changes: SimpleChanges): void {
        if (changes['isOpen'] && !changes['isOpen'].firstChange) {
            this.isOpen ? this.open() : this.close();
        }
    }

    /** @hidden */
    ngAfterContentInit(): void {
        this._listenOnOptionChanges();
    }

    /** @hidden */
    ngAfterViewInit(): void {
        this._checkInitialOpenState();
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._subscriptions.unsubscribe();
    }

    /** Returns the current trigger value if there is a selected option. Otherwise, returns the placeholder. */
    get selectViewValue(): string {
        return this.selected ? this.selected.viewValueText : this.placeholder;
    }

    /** Whether control can be interacted with */
    get isInteractive(): boolean {
        return !(this.readonly || this.loading || this.disabled);
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
            this.onTouched();
            this.isOpen = true;
            this.isOpenChange.emit(this.isOpen);
            this._focusTrap.activate();
            this._focusOption('onOpen');
        }
    }

    /** Closes the select popover body. */
    close(): void {
        this.isOpen = false;
        this.isOpenChange.emit(this.isOpen);
        this._focusTrap.deactivate();
        this.focus();
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
        this._changeDetectorRef.detectChanges();
    }

    /** @hidden */
    writeValue(value: any): void {
        this._selectProxy.value$.next(value);
    }

    /** @hidden */
    setSelectedOption({option, controlChange}: OptionStatusChange): void {
        this.selected = option;

        if (controlChange) {
            this._updateValue(option.value);
            this.close();
        }
        this._changeDetectorRef.markForCheck();
    }


    /** Method used to focus options
     * @param action
     * 'onOpen'     - focus currently selected or first
     * 'next'       - focus next element
     * 'previous'   - focus previous element
     * */
    private _focusOption(action: 'onOpen' | 'next' | 'previous'): void {
        let activeIndex: number;
        let optionsArray: OptionComponent[];
        const focusAsync = (option: OptionComponent) => setTimeout(() => option.focus(), 10);
        const findActiveIndex = (options: OptionComponent[], activeOption: Element): number => options
            .map(option => option.getHtmlElement())
            .indexOf(activeOption as HTMLElement);

        if (!this.options.length) {
            return;
        }

        switch (action) {
            case 'onOpen':
                focusAsync(this.selected || this.options.first);
                break;
            case 'next':
                optionsArray = this.options.toArray();
                activeIndex = findActiveIndex(optionsArray, document.activeElement);
                if (activeIndex < this.options.length - 1) {
                    optionsArray[++activeIndex].focus();
                }
                break;
            case 'previous':
                optionsArray = this.options.toArray();
                activeIndex = findActiveIndex(optionsArray, document.activeElement);
                if (activeIndex > 0) {
                    optionsArray[--activeIndex].focus();
                }
                break;
        }
    }

    /** @hidden */
    private _listenOnOptionChanges(): void {
        this._subscriptions.add(
            this.options.changes
                .subscribe(_ => {
                    this._setSelectedOption();
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
    private _setSelectedOption(): void {
        this.selected = this.options.find(option => option.selected);
    }

    /** @hidden */
    private _updateValue(value: any): void {
        this._selectProxy.value$.next(value);
        this.valueChange.emit(value);
        this.onChange(value);
    }

    /** @hidden */
    private _setupFocusTrap(): void {
        try {
            this._focusTrap = focusTrap(this._elementRef.nativeElement, {
                escapeDeactivates: false,
                clickOutsideDeactivates: true,
                returnFocusOnDeactivate: false,
                allowOutsideClick: (event: MouseEvent) => true
            });
        } catch (e) {
            console.warn('Attempted to focus trap the select, but no tabbable elements were found.', e);
        }
    }

    /** @hidden Open select if it has been initialized with [isOpen] = "true" */
    private _checkInitialOpenState(): void {
        if (this.isOpen) {
            this.open();
        }
    }

    /** Function used to setup new listener reacting on option select events.*/
    private _setOptionsSelectionListener(): void {
        this._subscriptions.add(
            this._selectProxy.optionStateChange$.asObservable()
                .subscribe((change: OptionStatusChange) => this.setSelectedOption(change))
        );
    }
}
