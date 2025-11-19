export * from './types';

import { OutputEmitterRef } from '@angular/core';

type OutputKeys<T> = {
    [K in keyof T]: T[K] extends OutputEmitterRef<any> ? K : never;
}[keyof T];

export type UI5WrapperCustomEvent<T, N extends OutputKeys<T>> = T[N] extends OutputEmitterRef<infer E> ? E : never;
