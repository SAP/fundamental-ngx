export function applyCssClass(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value
    descriptor.value = function (): string {
        const _class = originalMethod.apply(this);
        if (this.elementRef) {
            (this.elementRef().nativeElement as HTMLElement).classList.value = `${_class} ${this.class}`
        };
        return _class;
    }
}
