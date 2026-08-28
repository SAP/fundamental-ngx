import { effect } from '@angular/core';

/**
 * Run `fn` whenever `source.locale` changes, skipping the first
 * (initialization) read. Must be called in an injection context.
 *
 * @param source Any object exposing a `locale` signal (e.g. a `DatetimeAdapter`).
 * @param fn Recompute callback invoked on every locale change after the first.
 */
export function onLocaleChange(source: { locale: () => unknown }, fn: () => void): void {
    let initiated = false;
    effect(() => {
        source.locale();
        if (!initiated) {
            initiated = true;
            return;
        }
        fn();
    });
}
