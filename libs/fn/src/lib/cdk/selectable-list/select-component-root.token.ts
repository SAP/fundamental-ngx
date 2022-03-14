import { Observable } from 'rxjs';

export abstract class SelectComponentRootToken<ValueType = any> {
    abstract selected?: ValueType | ValueType[];
    abstract selectedChange: Observable<ValueType | ValueType[]>;
    abstract multiple?: boolean;
    abstract toggle?: boolean;
    abstract onChange: (value: ValueType | ValueType[]) => void;
}
