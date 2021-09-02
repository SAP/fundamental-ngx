import { TimelineNodePosition } from '../../types';

export abstract class BaseStrategy {

    arrowOffset = 30;

    abstract getCoords(): any;

    constructor() {
        // this.arrowOffset = this._convertRemToPixels(1.8);
    }

    // ToDO: add memorizing pattern
    private _convertRemToPixels(rem: number = 1): number {
        return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
    }
}
