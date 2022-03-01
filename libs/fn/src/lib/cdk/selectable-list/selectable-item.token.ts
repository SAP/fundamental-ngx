import { Observable } from 'rxjs';
import { HasElementRef } from '../HasElementRef';
import { EventEmitter } from '@angular/core';

export abstract class SelectableItemToken<ValueType = any> extends HasElementRef {
    abstract value: ValueType;
    abstract selectable?: boolean;

    abstract setSelected(isSelected: boolean): void;

    abstract getSelected(): boolean;

    abstract clicked: Observable<void> | EventEmitter<void>;
}
