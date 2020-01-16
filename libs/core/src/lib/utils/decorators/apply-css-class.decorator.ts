import { ELEMENT_REF_EXCEPTION } from '../public_api';

/**
 * Method decorator to apply css class to a component through native element
 * decorator will store original method in variable and wrap it with custom one
 * component has to implement CssClassBuilder interface
 * more info abour method decorator: https://www.typescriptlang.org/docs/handbook/decorators.html#method-decorators
 * @param target a component
 * @param propertyKey name of the method
 * @param descriptor method
 */
export function applyCssClass(target: any, propertyKey: string, descriptor: PropertyDescriptor): void {
    const originalMethod = descriptor.value;
    descriptor.value = function(): string {
        if (!this.elementRef) {
            throw ELEMENT_REF_EXCEPTION;
        }

        const _class = originalMethod.apply(this);
        const elementRef = this.elementRef.apply(this);

        if (elementRef) {
            (elementRef.nativeElement as HTMLElement).className = `${_class} ${this.class ? this.class : ''}`;
        }

        return _class;
    };
}
