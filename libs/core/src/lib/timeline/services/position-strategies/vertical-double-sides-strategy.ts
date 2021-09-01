import { BaseStrategy } from './base-strategy';
import { TimelineNodePosition } from '../../types';
import { TimelineNodeComponent } from '../../components/timeline-node/timeline-node.component';

export class VerticalDoubleSidesStrategy extends BaseStrategy {

    previousLeftElTop = 0;
    previousLeftElBottom = 0;
    previousRightElBottom = 0;

    arrowOffset: number;

    constructor() {
        super();
        this.arrowOffset = this._convertRemToPixels();
    }

    getCoords(): TimelineNodePosition {
        return undefined;
    }

    calculatePosition(nodes: TimelineNodeComponent[]): void {
        const lineWidth = 24;
        const parentWidth = nodes[0].el.nativeElement.parentElement.clientWidth;
        const nodeWidth = (parentWidth / 2);
        nodes.forEach((node, index) => {
            const el = node.el.nativeElement;
            el.style.width = nodeWidth + 'px';
            if (index % 2 === 0) {
                this.previousLeftElTop = el.offsetTop;
                this.previousLeftElBottom = el.offsetTop + el.offsetHeight;
                el.classList.add('fd-timeline__node-wrapper--left');
                node.setClasses(['fd-timeline__post--right']);
            } else {
                el.style.position = 'absolute';
                el.style.left = (parentWidth / 2 - lineWidth) + 'px';
                node.setClasses(['fd-timeline__post--left']);
                el.style.top = `${this._initTopPosition()}px`;
                this.previousRightElBottom = el.offsetTop + el.offsetHeight;
            }
        });
    }

    private _initTopPosition(): number {
        const arrowPosition = this.previousLeftElTop + this.arrowOffset;
        if (arrowPosition > this.previousRightElBottom) {
            return arrowPosition;
        } else {
            return this.previousRightElBottom;
        }
    }

    private _convertRemToPixels(rem: number = 1): number {
        return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
    }
}
