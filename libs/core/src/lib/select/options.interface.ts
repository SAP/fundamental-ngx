import { Highlightable } from '@angular/cdk/a11y';

export interface OptionsInterface<ValueType = any> extends Highlightable {
    value: ValueType;
    active: boolean;
    viewValue: string;
    id: string;
    _selectViaInteraction(): void;
}
