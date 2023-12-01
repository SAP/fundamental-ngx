import { inject, InjectionToken, isDevMode, ValueProvider } from '@angular/core';

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

/** @hidden */
export function deprecatedModelProvider(current: string, deprecated: string): ValueProvider {
    return {
        provide: FD_DEPRECATED_DIRECTIVE_SELECTOR,
        useValue: getDeprecatedModel(current, deprecated)
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
            console.warn(this._messageGenerator(this._selectors.deprecated, this._selectors.current));
        }
    }

    /** @hidden */
    protected _messageGenerator(deprecated: string, current: string): string {
        const segments = [`${deprecated} selector(s) are deprecated and may affect input properties`];
        if (current) {
            segments.push(`Use ${current} instead.`);
        }
        return segments.join('. ');
    }
}
