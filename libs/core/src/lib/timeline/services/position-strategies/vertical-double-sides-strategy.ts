import { BaseStrategy } from './base-strategy';
import { TimelineNodePosition } from '../../types';
import { TimelineNodeComponent } from '../../components/timeline-node/timeline-node.component';

export class VerticalDoubleSidesStrategy extends BaseStrategy {

    previousLeftElTop = 0;
    previousLeftElBottom = 0;
    previousRightElBottom = 0;


    constructor() {
        super();
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
            } else {
                el.style.position = 'absolute';
                el.style.left = (parentWidth / 2 - lineWidth) + 'px';
                node.setClasses(['fd-timeline__post--left']);
                el.style.top = `${this._initTopPosition()}px`;
                this.previousRightElBottom = el.offsetTop + el.offsetHeight;
            }
        });
        this.fitLine(nodes);
    }

    private _initTopPosition(): number {
        const arrowPosition = this.previousLeftElTop + this.arrowOffset;
        if (arrowPosition > this.previousRightElBottom) {
            return arrowPosition;
        } else {
            return this.previousRightElBottom;
        }
    }

    private fitLine(nodes: TimelineNodeComponent[]): void {
        let prev;
        nodes.forEach((node, index) => {
            const el = node.el.nativeElement;
            if (index % 2 === 0) {
                prev = node;
            } else {
                const height = el.offsetTop - prev.el.nativeElement.offsetTop;
                const result = height > 0 ? height : 0;
                prev.lastLine.nativeElement.style.height = result + 'px';
                prev.lastLine.nativeElement.style.opacity = '0';

                const dotPosition = el.offsetTop + this.arrowOffset;
                node.lastLine.nativeElement.style.height = prev.el.nativeElement.offsetTop + prev.el.nativeElement.offsetHeight - dotPosition + 'px';
            }
        });
    }
}
