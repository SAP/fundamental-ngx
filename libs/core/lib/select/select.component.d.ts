import { AfterContentInit, EventEmitter, OnChanges, OnDestroy, QueryList, SimpleChanges, TemplateRef } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { OptionComponent } from './option/option.component';
import { PopperOptions } from 'popper.js';
import { PopoverFillMode } from '../popover/popover-directive/popover.directive';
/**
 * Select component intended to mimic the behaviour of the native select element.
 */
export declare class SelectComponent implements OnChanges, AfterContentInit, OnDestroy, ControlValueAccessor {
    /** @hidden */
    fdDropdownClass: boolean;
    /** @hidden */
    options: QueryList<OptionComponent>;
    /** Whether the select component is disabled. */
    disabled: boolean;
    /** Placeholder for the select. Appears in the triggerbox if no option is selected. */
    placeholder: string;
    /** Open state of the select. */
    isOpen: boolean;
    /** Current value of the selected option. */
    value: any;
    /** Whether the select is in compact mode. */
    compact: boolean;
    /** Max height of the popover. Any overflowing elements will be accessible through scrolling. */
    maxHeight: string;
    /** Popper.js options of the popover. */
    popperOptions: PopperOptions;
    /**
     * Preset options for the popover body width.
     * * `at-least` will apply a minimum width to the body equivalent to the width of the control.
     * * `equal` will apply a width to the body equivalent to the width of the control.
     * * Leave blank for no effect.
     */
    fillControlMode: PopoverFillMode;
    /** Template with which to display the trigger box. */
    triggerTemplate: TemplateRef<any>;
    /** The element to which the popover should be appended. */
    appendTo: HTMLElement | 'body';
    /** Event emitted when the popover open state changes. */
    readonly isOpenChange: EventEmitter<boolean>;
    /** Event emitted when the selected value of the select changes. */
    readonly valueChange: EventEmitter<any>;
    /** @hidden */
    calculatedMaxHeight: number;
    /** Current selected option component reference. */
    private selected;
    /** Subject triggered when the component is destroyed. */
    private readonly destroy$;
    /** Observable triggered when an option has its selectedChange event fire. */
    private readonly optionsStatusChanges;
    /** @hidden */
    onChange: Function;
    /** @hidden */
    onTouched: Function;
    /** @hidden */
    isOpenChangeHandle(isOpen: boolean): void;
    /** @hidden */
    ngOnChanges(changes: SimpleChanges): void;
    /** @hidden */
    ngAfterContentInit(): void;
    /** @hidden */
    ngOnDestroy(): void;
    /** Toggles the open state of the select. */
    toggle(): void;
    /** Opens the select popover body. */
    open(): void;
    /** Closes the select popover body. */
    close(): void;
    /** @hidden */
    registerOnChange(fn: any): void;
    /** @hidden */
    registerOnTouched(fn: any): void;
    /** @hidden */
    setDisabledState(isDisabled: boolean): void;
    /** @hidden */
    writeValue(value: any): void;
    /** Returns the current trigger value if there is a selected option. Otherwise, returns the placeholder. */
    readonly triggerValue: string;
    /** @hidden */
    keydownHandler(event: KeyboardEvent): void;
    /** @hidden */
    resizeScrollHandler(): void;
    /**
     * Selects an option by option component reference. Preferred method of selection.
     * @param option The option component to search for.
     * @param fireEvents Whether to fire change events.
     */
    private selectOption;
    /**
     * Selects an option by value. If two components have the same value, the first one found is selected.
     * Recommend using selectOption generally.
     * @param value Value to search for.
     * @param fireEvents Whether to fire change events.
     */
    private selectValue;
    /**
     * Updates the value parameter with optional events.
     * @param fireEvents If true, function fires valueChange, onChange and onTouched events.
     */
    private updateValue;
    /**
     * Function used to reset the options state.
     */
    private resetOptions;
    /** Selection initialization when a change occurs in options. */
    private initSelection;
    /**
     * Function that tests whether the tested option is currently selected.
     * @param option Option to test against the selected option.
     */
    private isOptionActive;
    /** Method that focuses the next option in the list, or the first one if the last one is currently focused. */
    private incrementFocused;
    /** Method that focuses the previous option in the list, or the last one if the last one is currently focused. */
    private decrementFocused;
    /**
     * Method used to handle cases where a user removes the currently active option.
     * The timeout is required because this can happen after the view has been checked.
     */
    private unselectOptions;
}
