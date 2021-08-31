import { BaseStrategy } from './base-strategy';
import { TimelineNodePosition } from '../../types';
import { TimelineNodeComponent } from '../../components/timeline-node/timeline-node.component';

export class VerticalDoubleSidesStrategy extends BaseStrategy {

    getCoords(): TimelineNodePosition {
        return undefined;
    }

    calculatePosition(nodes: TimelineNodeComponent[]): void {
        const lineWidth = 24;
        const parentWidth = nodes[0].el.nativeElement.parentElement.offsetWidth;
        let previousHeight;
        nodes.forEach((node, index) => {
            const el = node.el.nativeElement;
            el.style.width = (parentWidth / 2 - lineWidth / 2) + 'px';
            if (index % 2 === 0) {
                previousHeight = el.offsetTop + el.offsetHeight;
                node.setClasses(['fd-timeline__post--right']);
            } else {
                el.style.position = 'absolute';
                el.style.top = `${previousHeight}px`;
                node.setClasses(['fd-timeline__post--left']);
            }
        });
    }
}
