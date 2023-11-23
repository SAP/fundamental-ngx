import { Highlightable } from '@angular/cdk/a11y';
import { HasElementRef } from '@fundamental-ngx/cdk/utils';
import { isObservable, Observable, Subject } from 'rxjs';

export interface OptionsInterface<ValueType = any> extends Highlightable, HasElementRef {
    value: ValueType;
    active: boolean;
    viewValue: string;
    id: string;
    selectionChange: Observable<FdOptionSelectionChange>;
    selected: boolean;
    _stateChanges: Subject<void>;
    _select(emitEvent?: boolean): void;
    _deselect(emitEvent?: boolean): void;
    _selectViaInteraction(): void;
}

/** Checks whether an object is a OptionsInterface. */
export function isOptionsInterface<T>(obj: any): obj is OptionsInterface<T> {
    return (
        typeof obj === 'object' &&
        obj !== null &&
        'value' in obj &&
        'active' in obj &&
        'viewValue' in obj &&
        'id' in obj &&
        'selectionChange' in obj &&
        isObservable(obj.selectionChange) &&
        'selected' in obj &&
        '_stateChanges' in obj &&
        isObservable(obj._stateChanges) &&
        '_select' in obj &&
        typeof obj._select === 'function' &&
        '_deselect' in obj &&
        typeof obj._deselect === 'function' &&
        '_selectViaInteraction' in obj &&
        typeof obj._selectViaInteraction === 'function'
    );
}

/**
 * Event object emitted by OptionComponent when
 * selected or deselected.
 */
export class FdOptionSelectionChange {
    /**
     * Reference to the OptionComponent that emitted the event.
     * @param source The option that emitted the event.
     * @param isUserInput Whether the change in the option's value was a result of a user interaction.
     */
    constructor(
        /** Reference to the option that emitted the event. */
        readonly source: OptionsInterface,
        /** Whether the change in the option's value was a result of a user action. */
        readonly isUserInput = false
    ) {}
}
