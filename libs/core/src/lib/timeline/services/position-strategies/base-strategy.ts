import { TimelineNodeComponent } from '../../components/timeline-node/timeline-node.component';

export abstract class BaseStrategy {

    arrowOffset = 30;
    horizontalNodeWidth = 320;

    protected _isRtl = false;

    constructor(options) {
        this._isRtl = options.isRtl;
        // this.arrowOffset = this._convertRemToPixels(1.8);
    }

    // ToDO: add memorizing pattern
    static convertRemToPixels(rem: number = 1): number {
        return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
    }

    switchRtlMode(isRtl: boolean): void {
        this._isRtl = isRtl;
    }

    calculatePosition(nodes: TimelineNodeComponent[]): any {}
}
