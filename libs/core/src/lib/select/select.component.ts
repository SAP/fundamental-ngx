import {
    AfterContentInit,
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
    Optional,
    Output,
    QueryList,
    TemplateRef,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { OptionComponent } from './option/option.component';
import { BehaviorSubject, Subscription } from 'rxjs';
import { PopperOptions } from 'popper.js';
import { PopoverFillMode } from '../popover/popover-directive/popover.directive';
import { RtlService } from '../utils/public_api';

let selectUniqueId: number = 0;

export type SelectControlState = 'error' | 'success' | 'warning' | 'information';

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
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => SelectComponent),
            multi: true
        }
    ],
    host: {
        role: 'listbox'
    }
})
export class SelectComponent implements AfterContentInit, OnDestroy, ControlValueAccessor {

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

    /** Current value of the selected option. */
    @Input('value') set value(value: any) {
        this.value$.next(value);
    }

    value$: BehaviorSubject<any> = new BehaviorSubject<any>(undefined);

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
    controlTemplateRef: ElementRef;

    /** @hidden */
    calculatedMaxHeight: number;

    /** @hidden */
    controlId: string = `select-list-${selectUniqueId++}`;

    /** Current selected option component reference. */
    selected: OptionComponent;

    /** Subject triggered when the component is destroyed. */
    private _subscriptions: Subscription = new Subscription();

    /** @hidden */
    onChange: Function = () => {};

    /** @hidden */
    onTouched: Function = () => {};

    /** @hidden */
    @HostListener('keydown', ['$event'])
    keydownHandler(event: KeyboardEvent): void {
        switch (event.code || event.keyCode) {
            case 'ArrowUp':
            case 38: {
                event.preventDefault();
                this._focusOption('previous');
                break;
            }
            case 'ArrowDown':
            case 40: {
                event.preventDefault();
                this._focusOption('next');
                break;
            }
            case 'Space':
            case 32: {
                event.preventDefault();
                this.toggle();
                break;
            }
        }
    }

    /** @hidden */
    @HostListener('window:resize')
    resizeScrollHandler(): void {
        this.calculatedMaxHeight = window.innerHeight * 0.45;
    }

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        @Optional() private _rtlService: RtlService
    ) { }

    /** @hidden */
    ngAfterContentInit(): void {
        this._listenOnOptionChanges();
        this._setSelectedOption();
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._subscriptions.unsubscribe();
    }

    /** Returns the current trigger value if there is a selected option. Otherwise, returns the placeholder. */
    get selectValue(): string {
        return this.selected ? this.selected.viewValueText : this.placeholder;
    }

    /** @hidden */
    isOpenChangeHandle(isOpen: boolean): void {
        this.isOpen = isOpen;
        this.isOpenChange.emit(isOpen);
        this.resizeScrollHandler();
    }

    /** Toggles the open state of the select. */
    toggle(): void {
        if (!this.disabled) {
            this.isOpen ? this.close() : this.open();
        }
    }

    /** Opens the select popover body. */
    open(): void {
        if (!this.disabled && !this.isOpen) {
            this.onTouched();
            this.isOpen = true;
            this.isOpenChange.emit(this.isOpen);
            this._focusOption('onOpen');
        }
    }

    /** Closes the select popover body. */
    close(): void {
        if (!this.disabled && this.isOpen) {
            this.isOpen = false;
            this.isOpenChange.emit(this.isOpen);
            this.focus();
        }
    }

    /** Focuses select control. */
    focus(): void {
        if (this.controlTemplateRef) {
            (this.controlTemplateRef.nativeElement as HTMLElement).focus();
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
        this.value$.next(value);
    }

    setSelectedOption(option: OptionComponent, controlChange: boolean) {
        this.selected = option;

        if (controlChange) {
            this._updateValue(option.value);
            this.close();
        }
        this._changeDetectorRef.detectChanges();
    }


    /** Method used to focus options
     * @param action
     * 'onOpen'     - focus currently selected or first
     * 'next'       - focus next element
     * 'previous'   - focus previous element
     * */
    private _focusOption(action: 'onOpen' | 'next' | 'previous'): void {
        let activeIndex: number;
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
                activeIndex = findActiveIndex(this.options.toArray(), document.activeElement);
                if (activeIndex < this.options.length - 1) {
                    this.options.toArray()[++activeIndex].focus();
                }
                break;
            case 'previous':
                activeIndex = findActiveIndex(this.options.toArray(), document.activeElement);
                if (activeIndex > 0) {
                    this.options.toArray()[--activeIndex].focus();
                }
                break;
        }
    }

    private _listenOnOptionChanges(): void {
        this._subscriptions.add(
            this.options.changes
                .subscribe(_ => {
                    this._setSelectedOption();
                    setTimeout(() => {
                        if (this.selected === undefined && this.unselectMissingOption) {
                            this._updateValue(undefined)
                        }
                    });
                })
        )
    }

    private _setSelectedOption(): void {
        this.selected = this.options.find(option => option.selected)
    }

    private _updateValue(value: any): void {
        this.value$.next(value);
        this.valueChange.emit(value);
        this.onChange(value);
    }
}
