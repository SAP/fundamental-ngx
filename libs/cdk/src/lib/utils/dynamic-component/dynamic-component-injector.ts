import { Injector } from '@angular/core';

export class DynamicComponentInjector implements Injector {
    /** @hidden */
    constructor(private _parentInjector: Injector, private _additionalTokens: WeakMap<any, any>) {}

    /**
     *
     * @param token
     * @param notFoundValue
     */
    get(token: any, notFoundValue?: any): void {
        const value = this._additionalTokens.get(token);

        if (value) {
            return value;
        }

        return this._parentInjector.get<any>(token, notFoundValue);
    }
}
