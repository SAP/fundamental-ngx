import { inject, InjectionToken, isDevMode } from '@angular/core';

export interface DeprecatedSelectorModel {
    deprecated: string;
    current: string;
}

/** @hidden */
export function getDeprecatedModel(current: string, deprecated: string): DeprecatedSelectorModel {
    return {
        current,
        deprecated
    };
}

export const FD_DEPRECATED_DIRECTIVE_SELECTOR = new InjectionToken<DeprecatedSelectorModel>(
    'FdDeprecatedDirectiveSelector'
);

export abstract class DeprecatedSelector {
    /** @hidden */
    protected _selectors: DeprecatedSelectorModel | null = inject(FD_DEPRECATED_DIRECTIVE_SELECTOR, { optional: true });
    /** @hidden */
    constructor() {
        if (isDevMode() && this._selectors) {
            console.warn(
                `${this._selectors.deprecated} selector(s) are deprecated and may affect input properties. Use ${this._selectors.current} instead.`
            );
        }
    }
}
