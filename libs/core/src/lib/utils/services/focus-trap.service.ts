import { Injectable, Type } from '@angular/core';
import { createFocusTrap, FocusTrap, Options } from 'focus-trap';

@Injectable({
    providedIn: 'root'
})
export class FocusTrapService {

    private _focusTrapInstances: Map<any, FocusTrap> = new Map();

    constructor() { }

    createFocusTrap(component: any,
                       element: string | HTMLElement | SVGElement | (string | HTMLElement | SVGElement)[],
                       userOptions?: Options): FocusTrap {
        const trap = createFocusTrap(element, userOptions);

        this.deactivateFocusTrap(component);

        this._focusTrapInstances.set(component, trap);

        this.activateFocusTrap(component);

        return trap;
    }

    activateFocusTrap(component: any): void {
        const trap = this._focusTrapInstances.get(component);

        trap?.activate();
    }

    deactivateFocusTrap(component: any): void {
        const trap = this._focusTrapInstances.get(component);

        trap?.deactivate();

        this._focusTrapInstances.delete(component);
    }

    pauseCurrentFocusTrap(): void {

    }
}
