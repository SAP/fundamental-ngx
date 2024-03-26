import { ElementRef } from '@angular/core';
import { Observable } from 'rxjs';
import { HasElementRef } from '../../interfaces/has-element-ref.interface';

export abstract class SelectableItemToken<ElementType extends Element = HTMLElement, TValue = ElementType>
    implements HasElementRef<ElementType>
{
    abstract value: TValue;
    abstract fdkSelectableItem?: boolean;

    abstract readonly elementRef: ElementRef<ElementType>;

    abstract clicked: Observable<MouseEvent | KeyboardEvent>;

    abstract setSelected(isSelected: boolean): void;

    abstract getSelected(): boolean;
}
