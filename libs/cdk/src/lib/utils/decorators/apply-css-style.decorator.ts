import { ELEMENT_REF_EXCEPTION, HasElementRef } from '../interfaces/has-element-ref.interface';
import { Hash } from '../datatypes/hash.datatype';

/**
 * Method decorator to apply css styles to a component through native element
 * decorator will store original method in variable and wrap it with custom one
 * component has to implement HasElementRef or CssStyleBuilder interface
 * more info abour method decorator: https://www.typescriptlang.org/docs/handbook/decorators.html#method-decorators
 * @param target a component
 * @param propertyKey name of the method
 * @param descriptor method
 */
export function applyCssStyle(target: any, propertyKey: string, descriptor: PropertyDescriptor): void {
    const originalMethod = descriptor.value;
    descriptor.value = function (): Hash<number | string> {
        const self = this as unknown as HasElementRef;
        if (!self.elementRef) {
            throw ELEMENT_REF_EXCEPTION;
        }

        const _styles: Hash<number | string> = originalMethod.apply(this);
        if (self.elementRef()) {
            const htmlElement = self.elementRef().nativeElement as HTMLElement;
            Object.keys(_styles).forEach((key) => {
                htmlElement.style[key] = _styles[key];
            });
        }

        return _styles;
    };
}
