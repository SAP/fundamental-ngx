import { ELEMENT_REF_EXCEPTION } from '../interfaces/has-element-ref.interface';
import { uuidv4 } from '../functions/uuidv4-generator';
import { CssClassBuilder } from '../interfaces/css-class-builder.interface';

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
        const self = this as unknown as CssClassBuilder & { _uuidv4?: string };
        if (!self.elementRef) {
            throw ELEMENT_REF_EXCEPTION;
        }

        const classListToApply: string[] = sanitize(originalMethod.apply(this));

        const elementRef = self.elementRef.apply(this);

        const nativeElement: HTMLElement & { _classMap?: any } = elementRef?.nativeElement;

        if (nativeElement) {
            if (!nativeElement._classMap) {
                nativeElement._classMap = {};
            }

            if (!self._uuidv4) {
                self._uuidv4 = uuidv4();
            }

            const currentClassList = Array.from(nativeElement.classList);

            const previousClassListToApply = nativeElement._classMap[self._uuidv4] || [];

            const newClassList = createComponentClassList(currentClassList, previousClassListToApply, classListToApply);

            nativeElement.className = newClassList.join(' ');

            nativeElement._classMap[self._uuidv4] = classListToApply;
        }

        return classListToApply;
    };
}

/** Filter list to unique items */
function unique(value: unknown, index: number, list: unknown[]): boolean {
    return list.indexOf(value) === index;
}

/** Splits merged classes, removes falsy elements and leaves only unique items */
function sanitize(array: string[]): string[] {
    return array
        .filter(Boolean)
        .reduce((classList: string[], cssClass: string) => [...classList, ...cssClass.split(/\s+/)], [])
        .filter(unique);
}

function firstCommonElementIndex(array1: string[], array2: string[]): number {
    return array1.findIndex((element) => array2.indexOf(element) !== -1);
}

/** Create set of component classes based on previous set and new set */
function createComponentClassList(
    allClasses: string[],
    previousComponentClassList: string[],
    newComponentClassList: string[]
): string[] {
    allClasses = allClasses.slice();
    let index = firstCommonElementIndex(allClasses, previousComponentClassList);
    index = index === -1 ? 0 : index;
    allClasses.splice(index, previousComponentClassList.length, ...newComponentClassList);

    return allClasses;
}
