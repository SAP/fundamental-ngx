import { ELEMENT_REF_EXCEPTION } from '../public_api';

export function applyCssClass(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value
    descriptor.value = function (): string {
        if (!this.elementRef) { throw ELEMENT_REF_EXCEPTION; }

        const _class = originalMethod.apply(this);

        (this.elementRef().nativeElement as HTMLElement).classList.value = `${_class} ${this.class}`

        return _class;
    }
}
