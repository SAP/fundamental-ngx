import 'reflect-metadata';

export const ENTITY = Symbol('ENTITY');
export const REST_RESOURCE = Symbol('RESTResource');

export interface EntityConfig {
    // plural?: string;
    name: string;
    domain: string
}

export interface ResourceConfig {

}

// export function Entity(config?: EntityConfig): (target) => void {
//     return (target): void => {
//         if (config) {
//             Reflect.defineMetadata(ENTITY, config, target);
//         }
//     };
// }

// export function RESTResource(config?: ResourceConfig): (target) => void {
//     return (target): void => {
//         if (config) {
//             Reflect.defineMetadata(REST_RESOURCE, config, target);
//         }
//     };
// }

export function Entity(config: any) {
    return (target) => {
        if (!target[ENTITY]) {
            target[ENTITY] = {};
        }

        target[ENTITY].metadata = config;

        return target;
    };
}

export function RESTResource(config: any) {
    return (target) => {
        if (!target[REST_RESOURCE]) {
            target[REST_RESOURCE] = {};
        }

        target[REST_RESOURCE].metadata = config;

        return target;
    };
}
