import {
    AfterContentInit, ChangeDetectionStrategy, ChangeDetectorRef,
    Component,
    ContentChildren,
    EventEmitter, forwardRef, HostBinding, HostListener,
    Input, OnChanges, OnDestroy,
    Output,
    QueryList, SimpleChanges, TemplateRef,
    ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { OptionComponent } from './option/option.component';
import { defer, merge, Observable, Subject } from 'rxjs';
import { startWith, switchMap, takeUntil } from 'rxjs/operators';
import { PopperOptions } from 'popper.js';
import { PopoverFillMode } from '../popover/popover-directive/popover.directive';

/**
 * Select component intended to mimic the behaviour of the native select element.
 */
@Component({
    selector: 'fd-select',
    templateUrl: './select.component.html',
    styleUrls: ['./select.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => SelectComponent),
            multi: true
        }
    ],
    host: {
        '[class.fd-select-custom]': 'true',
        'role': 'listbox',
    },
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectComponent implements OnChanges, AfterContentInit, OnDestroy, ControlValueAccessor {

    /** @hidden */
    @HostBinding('class.fd-dropdown')
    fdDropdownClass: boolean = true;

    /** @hidden */
    @ContentChildren(OptionComponent, { descendants: true })
    options: QueryList<OptionComponent>;

    /** Whether the select component is disabled. */
    @Input()
    disabled: boolean = false;

    /** Placeholder for the select. Appears in the triggerbox if no option is selected. */
    @Input()
    placeholder: string;

    /** Open state of the select. */
    @Input()
    isOpen: boolean = false;

    /** Current value of the selected option. */
    @Input()
    value: any;

    /** Whether the select is in compact mode. */
    @Input()
    compact: boolean = false;

    /** Max height of the popover. Any overflowing elements will be accessible through scrolling. */
    @Input()
    maxHeight: string;

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

    /** Template with which to display the trigger box. */
    @Input()
    triggerTemplate: TemplateRef<any>;

    /** The element to which the popover should be appended. */
    @Input()
    appendTo: HTMLElement | 'body';

    /** Event emitted when the popover open state changes. */
    @Output()
    readonly isOpenChange: EventEmitter<boolean>
        = new EventEmitter<boolean>();

    /** Event emitted when the selected value of the select changes. */
    @Output()
    readonly valueChange: EventEmitter<any>
        = new EventEmitter<any>();

    /** @hidden */
    calculatedMaxHeight: number;

    /** Current selected option component reference. */
    private selected: OptionComponent;

    /** Subject triggered when the component is destroyed. */
    private readonly destroy$: Subject<void> = new Subject<void>();

    /** Observable triggered when an option has its selectedChange event fire. */
    private readonly optionsStatusChanges: Observable<OptionComponent> = defer(() => {
        const options = this.options;
        if (options) {
            return options.changes.pipe(
                startWith(options),
                switchMap(() => merge(...options.map(option => option.selectedChange)))
            );
        }
    }) as Observable<OptionComponent>;

    /** @hidden */
    onChange: Function = () => {};

    /** @hidden */
    onTouched: Function = () => {};

    constructor (
        private changeDetectorRef: ChangeDetectorRef
    ) {}

    /** @hidden */
    isOpenChangeHandle(isOpen: boolean): void {
        this.isOpen = isOpen;
        this.isOpenChange.emit(isOpen);
        this.resizeScrollHandler();
    }

    /** @hidden */
    ngOnChanges(changes: SimpleChanges): void {
        if (changes.value) {
            setTimeout(() => {
                if (this.value) {
                    this.selectValue(this.value, false);
                    this.changeDetectorRef.markForCheck();
                }
            });
        }
    }

    /** @hidden */
    ngAfterContentInit(): void {

        // If the observable state changes, reset the options and initialize selection.
        this.options.changes.pipe(startWith(null), takeUntil(this.destroy$)).subscribe(() => {
            this.resetOptions();
            this.initSelection();
        });
    }

    /** @hidden */
    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    /** Toggles the open state of the select. */
    toggle(): void {
        if (this.isOpen && !this.disabled) {
            this.close();
        } else {
            this.open();
        }
    }

    /** Opens the select popover body. */
    open(): void {
        if (!this.isOpen && !this.disabled) {
            this.isOpen = true;
            this.isOpenChange.emit(this.isOpen);
        }
    }

    /** Closes the select popover body. */
    close(): void {
        if (this.isOpen && !this.disabled) {
            this.isOpen = false;
            this.isOpenChange.emit(this.isOpen);
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
        this.changeDetectorRef.detectChanges();
    }

    /** @hidden */
    writeValue(value: any): void {
        if (this.options) {
            this.selectValue(value, false);
            this.changeDetectorRef.detectChanges();
        } else {
            // Defer the selection of the value to support forms
            Promise.resolve().then(() => {
                if (this.options) {
                    this.selectValue(value, false);
                    this.changeDetectorRef.detectChanges();
                }
            });
        }
    }

    /** Returns the current trigger value if there is a selected option. Otherwise, returns the placeholder. */
    get triggerValue(): string {
        return this.selected ? this.selected.viewValueText : this.placeholder;
    }

    /** @hidden */
    @HostListener('keydown', ['$event'])
    keydownHandler(event: KeyboardEvent): void {
        switch (event.code) {
            case ('ArrowUp'): {
                event.preventDefault();
                this.decrementFocused();
                break;
            }
            case ('ArrowDown'): {
                event.preventDefault();
                this.incrementFocused();
                break;
            }
        }
    }

    /** @hidden */
    @HostListener('window:resize')
    resizeScrollHandler() {
        this.calculatedMaxHeight = window.innerHeight * 0.45;
    }

    /**
     * Selects an option by option component reference. Preferred method of selection.
     * @param option The option component to search for.
     * @param fireEvents Whether to fire change events.
     */
    private selectOption(option: OptionComponent, fireEvents: boolean = true): OptionComponent | undefined {
        if (!this.isOptionActive(option)) {
            if (this.selected) {
                this.selected.setSelected(false, false);
            }
            option.setSelected(true, false);
            this.selected = option;
            this.updateValue(fireEvents);
            this.close();
            return option;
        }
        return;
    }

    /**
     * Selects an option by value. If two components have the same value, the first one found is selected.
     * Recommend using selectOption generally.
     * @param value Value to search for.
     * @param fireEvents Whether to fire change events.
     */
    private selectValue(value: any, fireEvents: boolean = true): OptionComponent | undefined {
        const matchOption = this.options.find((option: OptionComponent) => {
            return option.value != null && option.value === value;
        });

        // If not match is found, set everything to null
        // This is mostly only for cases where a user removes an active option
        if (!matchOption) {
            this.unselectOptions();
            return;
        }

        // If match is found, select the new value
        if (matchOption && !this.isOptionActive(matchOption)) {
            if (this.selected) {
                this.selected.setSelected(false, false);
            }
            matchOption.setSelected(true, false);
            this.selected = matchOption;

            this.updateValue(fireEvents);
            this.close();
        }

        return matchOption;
    }

    /**
     * Updates the value parameter with optional events.
     * @param fireEvents If true, function fires valueChange, onChange and onTouched events.
     */
    private updateValue(fireEvents: boolean = true): void {
        this.value = this.selected.value;
        if (fireEvents) {
            this.valueChange.emit(this.value);
            this.onChange(this.value);
            this.onTouched();
        }
    }

    /**
     * Function used to reset the options state.
     */
    private resetOptions(): void {
        // Create observable that fires when the options change or the component is destroyed.
        const destroyCurrentObs = merge(this.options.changes, this.destroy$);

        // Subscribe to observable defined in component properties which fires when an option is clicked.
        // Destroy if the observable defined above triggers.
        this.optionsStatusChanges.pipe(takeUntil(destroyCurrentObs)).subscribe((instance: OptionComponent) => {
            this.selectOption(instance);
        });
    }

    /** Selection initialization when a change occurs in options. */
    private initSelection(): void {
        if (this.value) {
            this.selected = undefined;
            this.selectValue(this.value, false);
        }
    }

    /**
     * Function that tests whether the tested option is currently selected.
     * @param option Option to test against the selected option.
     */
    private isOptionActive(option: OptionComponent): boolean {
        return option && this.selected && option === this.selected;
    }

    /** Method that focuses the next option in the list, or the first one if the last one is currently focused. */
    private incrementFocused(): void {

        // Get active focused element
        const activeElement = document.activeElement;

        // Get corresponding option element to the above
        const correspondingOption = this.options.find(option => {
            return option.getHtmlElement() === activeElement;
        });

        if (correspondingOption) {
            const arrayOptions = this.options.toArray();
            const index = arrayOptions.indexOf(correspondingOption);

            // If active option is the last option, focus the first one
            // Otherwise, focus the next option.
            if (index === this.options.length - 1) {
                arrayOptions[0].focus();
            } else {
                arrayOptions[index + 1].focus();
            }
        } else if (this.options) {
            this.options.first.focus();
        }
    }

    /** Method that focuses the previous option in the list, or the last one if the last one is currently focused. */
    private decrementFocused(): void {

        // Get active focused element
        const activeElement = document.activeElement;

        // Get corresponding option element to the above
        const correspondingOption = this.options.find(option => {
            return option.getHtmlElement() === activeElement;
        });

        // If active option is the first option, focus the last one
        // Otherwise, focus the previous option.
        if (correspondingOption) {
            const arrayOptions = this.options.toArray();
            const index = arrayOptions.indexOf(correspondingOption);

            if (index === 0) {
                arrayOptions[this.options.length - 1].focus();
            } else {
                arrayOptions[index - 1].focus();
            }
        } else if (this.options) {
            this.options.first.focus();
        }
    }

    /**
     * Method used to handle cases where a user removes the currently active option.
     * The timeout is required because this can happen after the view has been checked.
     */
    private unselectOptions(): void {
        setTimeout(() => {
            if (this.selected) {
                this.selected.setSelected(false, false);
            }
            this.selected = undefined;
            this.value = undefined;
            this.valueChange.emit(undefined);
            this.onChange(undefined);
        });
    }

}
