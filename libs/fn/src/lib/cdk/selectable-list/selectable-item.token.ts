import { Observable } from 'rxjs';
import { HasElementRef } from '../has-element-ref';

export abstract class SelectableItemToken<ValueType = any> extends HasElementRef {
    abstract value: ValueType;
    abstract fnSelectableItem?: boolean;

    abstract setSelected(isSelected: boolean): void;

    abstract getSelected(): boolean;

    abstract clicked: Observable<MouseEvent | KeyboardEvent>;
}
