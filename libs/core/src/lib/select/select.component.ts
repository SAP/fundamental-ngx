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
    OnDestroy,
    OnInit,
    Output,
    QueryList,
    TemplateRef,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { OptionComponent } from './option/option.component';
import { fromEvent, Subscription } from 'rxjs';
import { PopperOptions } from 'popper.js';
import { PopoverFillMode } from '../popover/popover-directive/popover.directive';
import focusTrap, { FocusTrap } from 'focus-trap';
import { KeyUtil } from '../utils/functions/key-util';
import { SelectProxy } from './select-proxy.service';
import { buffer, debounceTime, filter, map } from 'rxjs/operators';

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
export class SelectComponent implements OnInit, AfterViewInit, AfterContentInit, OnDestroy, ControlValueAccessor {

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

    /** Time to wait in milliseconds after the last keydown before focusing or selecting option based on alphanumeric keys. */
    @Input()
    typeaheadDebounceInterval: number = 250;

    /** Binds to control aria-labelledBy attribute */
    @Input()
    ariaLabelledBy: string = null;

    /** Sets control aria-label attribute value */
    @Input()
    ariaLabel: string = null;

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

    /** Text value displayed in select control */
    selectViewValue: string;

    /** Whether popover is opened */
    isOpen: boolean = false;

    /** @hidden Cashed options as as Array */
    private _options: OptionComponent[];

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
        if (KeyUtil.isKey(event, 'ArrowUp')) {
            if (this.isInteractive) {
                this._interactWithOptions('previous');
            }
            event.preventDefault();

        } else if (KeyUtil.isKey(event, 'ArrowDown')) {
            if (this.isInteractive) {
                this._interactWithOptions('next');
            }
            event.preventDefault();

        } else if (KeyUtil.isKey(event, 'Escape')) {
            if (this.isInteractive) {
                this.close();
            }
            event.preventDefault();

        } else if (KeyUtil.isKey(event, [' ', 'Enter'])) {
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
        this._listenOnSelectedOption();
        this._listenOptionFiltering();
    }

    /** @hidden */
    ngAfterContentInit(): void {
        this.resizeScrollHandler();
        this._listenOnOptionChanges();
        this._setSelectViewValue();
    }

    /** @hidden */
    ngAfterViewInit(): void {
        this._listenOnControlTouched();
        this._setOptionsArray();
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._subscriptions.unsubscribe();
    }

    /** Whether control can be interacted with */
    get isInteractive(): boolean {
        return !(this.readonly || this.disabled);
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
            this._focusTrap.activate();
            this._focusOption('onOpen');
            this._changeDetectorRef.markForCheck();
        }
    }

    /** Closes the select popover body. */
    close(): void {
        this.isOpen = false;
        this.isOpenChange.emit(this.isOpen);
        this._focusTrap.deactivate();
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
    setSelectedOption({option, controlChange}: OptionStatusChange): void {
        this.selected = option;
        this._setSelectViewValue();

        if (controlChange) {
            this._updateValue(option.value);
            this.close();
        }
        this._changeDetectorRef.markForCheck();
    }

    /** @hidden */
    private _listenOnOptionChanges(): void {
        this._subscriptions.add(
            this.options.changes
                .subscribe(_ => {
                    this._setOptionsArray();
                    this._setSelectedOption();
                    setTimeout(() => {
                        if (this.selected === undefined && this.unselectMissingOption) {
                            this._updateValue(undefined);
                            this._setSelectViewValue();
                            this._changeDetectorRef.markForCheck();
                        }
                    });
                })
        )
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
    private _focusedOptionIndex(options: OptionComponent[], activeOption: Element): number {
        return options.map(option => option.getHtmlElement())
            .indexOf(activeOption as HTMLElement);
    }

    /** @hidden Sets new select control text */
    private _setSelectViewValue(): void {
        this.selectViewValue = this.selected ? this.selected.viewValueText : this.placeholder;
    }
}
