import { HasElementRef } from '../HasElementRef';

export abstract class SelectableItemToken<ValueType = any> extends HasElementRef {
    abstract value: ValueType;
    abstract selectable?: boolean;

    abstract setSelected(isSelected: boolean): void;

    abstract getSelected(): boolean;
}
