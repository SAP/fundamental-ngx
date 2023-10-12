import { DestroyRef, inject } from '@angular/core';
import { ɵSharedStylesHost } from '@angular/platform-browser';

/**
 * Injects styles into the DOM and removes them when the component is destroyed.
 * This is useful for the directive that needs to inject styles into the DOM.
 * @param styles
 */
export const useStyles = (styles: string | string[]): void => {
    const stylesArr = Array.isArray(styles) ? styles : [styles];
    const sharedStylesHost = inject(ɵSharedStylesHost);
    const destroyRef = inject(DestroyRef);
    sharedStylesHost.addStyles(stylesArr);
    destroyRef.onDestroy(() => sharedStylesHost.removeStyles(stylesArr));
};
