import { ElementRef } from '@angular/core';
import { Observable } from 'rxjs';
import { HasElementRef } from '../../interfaces/has-element-ref.interface';

export abstract class SelectableItemToken<ElementType extends Element = HTMLElement, TValue = ElementType>
    implements HasElementRef<ElementType>
{
    abstract value: TValue;
    abstract fnSelectableItem?: boolean;

    abstract elementRef(): ElementRef<ElementType>;

    abstract setSelected(isSelected: boolean): void;

    abstract getSelected(): boolean;

    abstract clicked: Observable<MouseEvent | KeyboardEvent>;
}
