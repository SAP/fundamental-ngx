import { ElementRef, EventEmitter, OnInit } from '@angular/core';
/**
 * Used to represent an option of the select component.
 */
export declare class OptionComponent implements OnInit {
    private elRef;
    /** @hidden */
    fdMenuItemClass: boolean;
    /** @hidden */
    selected: boolean;
    /** Value of the option. Similar to how a native select operates. */
    value: any;
    /** Whether to disable this option specifically. */
    disabled: boolean;
    /** Override for the view value of the option. If none is provided, the text content is used. */
    viewValue: string;
    /** Emitted when the selected state changes. */
    readonly selectedChange: EventEmitter<OptionComponent>;
    /** @hidden */
    constructor(elRef: ElementRef);
    /** @hidden */
    ngOnInit(): void;
    /** Returns the view value text of the option, or the viewValue input if it exists. */
    readonly viewValueText: string;
    /** Returns the view value text of the option, or the viewValue input if it exists. */
    setSelected(value: boolean, fireEvent?: boolean): void;
    /** Focuses the element. */
    focus(): void;
    /** Returns HTMLElement representation of the component. */
    getHtmlElement(): HTMLElement;
    /** @hidden */
    selectionHandler(): void;
}
