import { Type, Composite, BaseValue } from '../../../domain/public_api';

// TODO: Add Constraints <T extends object, K extends object = {}>
export function instanceForType<T, K>(Type: Type<T>, fromState: K): T {
    const newState = new Type(fromState);

    return new Proxy((newState as unknown) as object, new StateHandler()) as any;
}
/**
 *  Proxy wrapper for Entity/Value Object
 */
class StateHandler<T extends object, K extends {}> implements ProxyHandler<T> {
    get(target: T, propertyKey: string, receiver?: any): any {
        // Composite.value takes precedence
        if (target instanceof Composite) {
            const value = target.value;
            // if accessed property refers to the object create new wrapper
            if (propertyKey in value && typeof value[propertyKey] === 'object') {
                return new Proxy(value[propertyKey], new StateHandler());
            }
            // Make sure composite.value contains needed property
            // otherwise redirect to the default value.
            // Need it to make working entity.getter flow
            if (propertyKey in value) {
                return Reflect.get(value, propertyKey, value);
            }
        }
        // default flow
        return Reflect.get(target, propertyKey, receiver);
    }

    set(target: T, propertyKey: string, value: any, receiver: any): boolean {
        let originalTarget: T = target;
        let isTargetComposite = false;

        if (target instanceof Composite) {
            isTargetComposite = true;
            // Composite.value takes precedence
            // replace target object with target.value
            // so assignment will actually be done on composite.value itself
            target = target.value as T;
        }
        // If value is VO then check if new value differs from the current
        if (value instanceof BaseValue) {
            let valueIsValidToAssign = true;
            if (Array.isArray(target)) {
                valueIsValidToAssign = target.every((elem) => !value.equals(elem));
            } else {
                valueIsValidToAssign = !value.equals(target[propertyKey]);
            }
            if (!valueIsValidToAssign) {
                return false;
            }
        }
        // If target is composite value and this value contains needed
        // property then make assignment on composite.value itself.
        // "propertyKey in target" check is needed to skip this step
        // and make working entity.setter flow.
        // Please note "receiver" is used as "target" intentionally
        // to make assignment to the "target" correctly
        if (isTargetComposite && propertyKey in target) {
            return Reflect.set(target, propertyKey, value, target);
        }
        // otherwise make assignment on original target
        return Reflect.set(originalTarget, propertyKey, value, receiver);
    }
}
