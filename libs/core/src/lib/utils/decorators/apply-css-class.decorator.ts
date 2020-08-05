import { ELEMENT_REF_EXCEPTION } from '../interfaces/has-element-ref.interface';
import { uuidv4 } from '../functions/uuidv4-generator';

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
    descriptor.value = function (): string[] {
        if (!this.elementRef) {
            throw ELEMENT_REF_EXCEPTION;
        }

        const newComponentClassList: string[] = sanitize(originalMethod.apply(this));
        const elementRef = this.elementRef.apply(this);

        if (elementRef) {
            if (!elementRef.nativeElement._classMap) {
                elementRef.nativeElement._classMap = {};
            }

            if (!this._uuidv4) {
                this._uuidv4 = uuidv4();
                elementRef.nativeElement._classMap[this._uuidv4] = [newComponentClassList];
            }

            const allClassList = [...elementRef.nativeElement.classList];
            const previousComponentClassList = elementRef.nativeElement._classMap[this._uuidv4] || [];
            const newClassList = updateComponentClassList(allClassList, previousComponentClassList, newComponentClassList);

            elementRef.nativeElement._classMap[this._uuidv4] = newComponentClassList;
            (elementRef.nativeElement as HTMLElement).className = newClassList.join(' ');
        }

        return newComponentClassList;
    };
}

/** Removes falsy elements from string array */
function sanitize(array: string[]): string [] {
    return array.filter(Boolean)
}

/** Returns an array1[index] of first array1 and array2 shared element */
function firstCommonElementIndex(array1: string[], array2): number {
    const index = array2.findIndex(element => array1.indexOf(element) !== -1);
    return index === -1 ? 0 : index;
}

/** Replaces previous set of component classes with new set of component classes */
function updateComponentClassList(allClasses: string[],  previousComponentClassList, newComponentClassList: string[]): string[] {
    const index = firstCommonElementIndex(allClasses, previousComponentClassList);
    const externalClasses = allClasses.filter(element => !previousComponentClassList.includes(element));
    externalClasses.splice(index, 0, ...newComponentClassList);

    return externalClasses;
}
