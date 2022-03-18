import { AfterViewInit, Directive, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { BaseWebComponentInputWrapper } from './base-web-component-input-wrapper';

/**
 * Abstract class used by color-related input components.
 */
@Directive()
export abstract class BaseColorInput extends BaseWebComponentInputWrapper implements AfterViewInit, OnDestroy {
    /**
     * selects the default color of the component
     */
    @Input()
    defaultColor?: string;

    /**
     * Defines whether the user can choose the default color from a button.
     */
    @Input()
    showDefaultColor = false;

    /**
     Defines whether the user can choose a custom color from a component
     */
    @Input()
    showMoreColors = false;

    /**
     * Defines whether the user can see the last used colors in the bottom of the component
     * */
    @Input()
    showRecentColors = false;

    /** Event emitted when the state of the isOpen property changes. */
    @Output()
    readonly itemClick = new EventEmitter<Event>();

    // eslint-disable-next-line @angular-eslint/no-input-rename
    @Input('color')
    get value(): string {
        return this._value;
    }
    set value(colorValue: string) {
        this._value = colorValue;
        this.onChange(colorValue);
        this.onTouched();
    }

    /** @hidden */
    colorChange(event: any): void {
        this.value = event.detail.color;
        this.itemClick.emit(event);
    }
}
