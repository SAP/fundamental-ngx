import { ElementRef } from '@angular/core';

export abstract class SelectableItemToken<ValueType = any> {
    abstract value: ValueType;

    abstract setSelected(isSelected: boolean): void;

    abstract getSelected(): boolean;

    abstract setDisabled(isDisabled: boolean): void;

    abstract getDisabled(): boolean;

    abstract elementRef(): ElementRef<HTMLElement>;
}
