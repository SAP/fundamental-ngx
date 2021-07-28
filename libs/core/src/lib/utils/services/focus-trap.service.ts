import { Injectable } from '@angular/core';
import { createFocusTrap, FocusTrap, Options } from 'focus-trap';
import { uuidv4 } from '../functions/uuidv4-generator';

@Injectable({
    providedIn: 'root'
})
export class FocusTrapService {

    private _focusTrapInstances: Map<any, FocusTrap> = new Map();

    constructor() { }

    /**
     * Creates focus trap instance for defined element
     * @param element Container for which to create focus trap
     * @param userOptions Focus-trap specific configuration
     * @returns {string} Unique ID of focus trap instance
     */
    createFocusTrap(element: string | HTMLElement | SVGElement | (string | HTMLElement | SVGElement)[],
                    userOptions?: Options): string {

        const uid = uuidv4();

        const trap = createFocusTrap(element, userOptions);

        this._focusTrapInstances.set(uid, trap);

        this.activateFocusTrap(uid);

        return uid;
    }

    /**
     * Activates focus trap for defined ID
     * @param id Unique ID of focus trap instance
     */
    activateFocusTrap(id: string): void {
        const trap = this._focusTrapInstances.get(id);

        trap?.activate();
    }

    /**
     * Deactivates focus trap for defined ID
     * @param id Unique ID of focus trap instance
     */
    deactivateFocusTrap(id: string): void {
        const trap = this._focusTrapInstances.get(id);

        trap?.deactivate();

        this._focusTrapInstances.delete(id);
    }

    /**
     * Pauses current focus trap.
     */
    pauseCurrentFocusTrap(): void {

        if (this._focusTrapInstances.size === 0) {
            return;
        }

        const trapItem = this._getLastTrapedItem();

        trapItem?.pause();
    }

    /**
     * Unpauses current focus trap.
     */
    unpauseCurrentFocusTrap(): void {

        if (this._focusTrapInstances.size === 0) {
            return;
        }

        const trapItem = this._getLastTrapedItem();

        trapItem?.unpause();
    }

    /** @hidden */
    private _getLastTrapedItem(): FocusTrap {
        return Array.from(this._focusTrapInstances).pop()[1];
    }
}
