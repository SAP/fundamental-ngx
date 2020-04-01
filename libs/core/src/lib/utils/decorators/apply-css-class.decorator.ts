import { ELEMENT_REF_EXCEPTION } from '../public_api';

function uuidv4(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        // tslint:disable-next-line: no-bitwise
        const r = (Math.random() * 16) | 0,
            // tslint:disable-next-line: no-bitwise
            v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}

function buildClassFromMap(nativeElement: { _classMap: any }): string {
    return Object.keys(nativeElement._classMap)
        .map((key) => nativeElement._classMap[key])
        .reduce((acc, value) => (acc += value), '');
}

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

            (elementRef.nativeElement as HTMLElement).className = buildClassFromMap(elementRef.nativeElement);
        }

        return _class;
    };
}
