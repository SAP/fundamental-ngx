import { Hash, ELEMENT_REF_EXCEPTION } from '../public_api';

export function applyCssStyle(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value
    console.log(descriptor);
    descriptor.value = function (): Hash {
        if (!this.elementRef) { throw ELEMENT_REF_EXCEPTION; }

        const _styles: Hash = originalMethod.apply(this);

        Object.keys(_styles).forEach(key => {
            (this.elementRef().nativeElement as HTMLElement).style[key] = _styles[key];
        });

        return _styles;
    }
}
