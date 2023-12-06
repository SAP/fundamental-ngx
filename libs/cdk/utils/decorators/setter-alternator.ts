/**
 * Function, which generates decorator. Passed mutator will be called during value set
 */
export function alternateSetter(mutator: (value: any, self: Record<string | symbol, any>) => any): PropertyDecorator {
    return function (targetObj: Record<string | symbol, any>, propertyKey: string | symbol) {
        const _key = Symbol();
        targetObj[_key] = targetObj[propertyKey];
        Object.defineProperty(targetObj, propertyKey, {
            get() {
                return this[_key];
            },
            set(v: any) {
                this[_key] = mutator.call(this, v, this);
            }
        });
    };
}
