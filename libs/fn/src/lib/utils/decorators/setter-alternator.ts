export function alternateSetter<
    T extends { [key in P]: O } = any,
    P extends string | symbol = string | symbol,
    I = any,
    O = any
>(mutator: (value: I, self: T) => O): PropertyDecorator {
    return function (target: T, propertyKey: P) {
        const _key = Symbol();
        target[_key] = target[propertyKey];
        Object.defineProperty(target, propertyKey, {
            get() {
                return this[_key];
            },
            set(v: I) {
                this[_key] = mutator.call(this, v, this);
            }
        });
    };
}
