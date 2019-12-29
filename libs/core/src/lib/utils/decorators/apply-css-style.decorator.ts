import { Hash } from '../css-style-builder.interface';

export function applyCssStyle(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value
    console.log(descriptor);
    descriptor.value = function (): Hash {
        const _styles: Hash = originalMethod.apply(this);
        if (this.elementRef) {
            Object.keys(_styles).forEach(key => {
                (this.elementRef().nativeElement as HTMLElement).style[key] = _styles[key];
            });
        };
        return _styles;
    }
}
