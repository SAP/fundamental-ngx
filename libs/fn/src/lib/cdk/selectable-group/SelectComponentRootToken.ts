export abstract class SelectComponentRootToken<ValueType = any> {
    abstract multiple: boolean;
    abstract toggle: boolean;
    abstract disabled: boolean;
    abstract onChange: (value: ValueType) => void;
}
