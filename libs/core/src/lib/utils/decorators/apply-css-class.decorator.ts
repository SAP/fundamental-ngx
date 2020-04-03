import { ELEMENT_REF_EXCEPTION, getStringFromHashMap, uuidv4 } from '../public_api';

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
    descriptor.value = function (): string {
        if (!this.elementRef) {
            throw ELEMENT_REF_EXCEPTION;
        }

        const _class = originalMethod.apply(this);
        const elementRef = this.elementRef.apply(this);

        if (elementRef) {
            if (!elementRef.nativeElement._classMap) {
                elementRef.nativeElement._classMap = {};
            }

            if (!this._uuidv4) {
                this._uuidv4 = uuidv4();
            }

            elementRef.nativeElement._classMap[this._uuidv4] = `${_class} ${this.class ? this.class : ''}`;

            (elementRef.nativeElement as HTMLElement).className = getStringFromHashMap<string>(
                elementRef.nativeElement._classMap
            );
        }

        return _class;
    };
}
