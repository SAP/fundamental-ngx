import { Injectable } from '@angular/core';
import { createFocusTrap, FocusTrap, Options } from 'focus-trap';
import { uuidv4 } from '../functions/uuidv4-generator';

@Injectable({
    providedIn: 'root'
})
export class FocusTrapService {

    private _focusTrapInstances: Map<any, FocusTrap> = new Map();

    constructor() { }

    createFocusTrap(element: string | HTMLElement | SVGElement | (string | HTMLElement | SVGElement)[],
                    userOptions?: Options): string {

        const uid = uuidv4();

        const trap = createFocusTrap(element, userOptions);

        this._focusTrapInstances.set(uid, trap);

        this.activateFocusTrap(uid);

        return uid;
    }

    activateFocusTrap(id: string): void {
        const trap = this._focusTrapInstances.get(id);

        trap?.activate();
    }

    deactivateFocusTrap(id: string): void {
        const trap = this._focusTrapInstances.get(id);

        trap?.deactivate();

        this._focusTrapInstances.delete(id);
    }

    pauseCurrentFocusTrap(): void {

        if (this._focusTrapInstances.size === 0) {
            return;
        }

        const trapItem = this._getLastTrapedItem();

        trapItem?.pause();
    }

    unpauseCurrentFocusTrap(): void {

        if (this._focusTrapInstances.size === 0) {
            return;
        }

        const trapItem = this._getLastTrapedItem();

        trapItem?.unpause();
    }

    private _getLastTrapedItem(): FocusTrap {
        return Array.from(this._focusTrapInstances).pop()[1];
    }
}
