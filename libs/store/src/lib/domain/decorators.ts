import { Type } from '@angular/core';
import 'reflect-metadata';

import { EntityMetaOptions } from './entity';
import { RESTResourceMetaOptions } from './rest-resource';

export const ENTITY_KEY = Symbol('ENTITY');
export const REST_RESOURCE_KEY = Symbol('REST_Resource');

type ReturnTypeDecorator<T = any> = (target: Type<T>) => Type<T>;

const DecoratedEntityToMetaOptionsMap = new Map<Type<any>, EntityMetaOptions>();

export function Entity(config: EntityMetaOptions): ReturnTypeDecorator {
    // TODO: Add entity name uniqueness validation
    return <T>(target: Type<T>) => {
        if (!target[ENTITY_KEY]) {
            target[ENTITY_KEY] = {};
        }

        target[ENTITY_KEY].metadata = config;

        return target;
    };
}

export function RESTResource(config: RESTResourceMetaOptions): ReturnTypeDecorator {
    return <T>(target: new (...args) => T) => {
        if (!target[REST_RESOURCE_KEY]) {
            target[REST_RESOURCE_KEY] = {};
        }

        target[REST_RESOURCE_KEY].metadata = config;

        return target;
    };
}
