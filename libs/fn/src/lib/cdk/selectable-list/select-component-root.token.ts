import { BooleanInput } from '@angular/cdk/coercion';
import { Observable } from 'rxjs';

export type SelectableListValueType<T> = T extends any[] ? Array<any> : any;

export abstract class SelectComponentRootToken<T = any> {
    abstract selected?: SelectableListValueType<T>;
    abstract selectedChange: Observable<SelectableListValueType<T>>;
    abstract multiple?: BooleanInput;
    abstract toggle?: BooleanInput;
    abstract onChange: (value: SelectableListValueType<T>) => void;
}
