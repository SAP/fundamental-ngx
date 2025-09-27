import { Directive, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

interface CvaComponent<ValueType = any> {
    element: Element;
    cvaValue: ValueType;
}

@Directive({
    selector: '[noop]',
    standalone: true,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => GenericControlValueAccessor),
            multi: true
        }
    ],
    host: {
        '(focusout)': 'onTouched?.()'
    }
})
class GenericControlValueAccessor<ValueType = any> implements ControlValueAccessor {
    onChange!: (val: ValueType) => void;
    onTouched!: () => void;

    host!: CvaComponent<ValueType>;

    setDisabledState = (isDisabled: boolean): void => {
        this.host.element['disabled'] = isDisabled;
    };

    registerOnChange(fn: (newVal: ValueType) => void): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    writeValue(val: ValueType): void {
        this.host.cvaValue = val;
    }
}

export { GenericControlValueAccessor };
