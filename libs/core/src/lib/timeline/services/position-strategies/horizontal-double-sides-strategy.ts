import { BaseStrategy } from './base-strategy';
import { TimelineNodePosition } from '../../types';
import { TimelineNodeComponent } from '../../components/timeline-node/timeline-node.component';

export class HorizontalDoubleSidesStrategy extends BaseStrategy {

    getCoords(): TimelineNodePosition {
        return undefined;
    }

    calculatePosition(nodes: TimelineNodeComponent[]): any {
        let prevTopEdge = 0;
        let prevBottomEdge = 75;
        const parentHeight = nodes[0].el.nativeElement.parentElement.clientHeight;
        nodes.forEach((node, index) => {
            const el = node.el.nativeElement;
            el.classList.add('fd-timeline__node-wrapper--horizontal');
            el.style.width = this.horizontalNodeWidth + 'px';
            if (index % 2 === 0) {
                el.classList.add('fd-timeline__node-wrapper--top');
                el.style.left = prevTopEdge + 'px';
                el.style.top =  parentHeight / 2 + 12 - el.offsetHeight - 24 + 'px';
                prevTopEdge += 320;
            } else {
                el.classList.add('fd-timeline__node-wrapper--bottom');
                el.style.left = prevBottomEdge + 'px';
                prevBottomEdge += 320;
            }


            node.lastLine.nativeElement.style.flexGrow = 1;
        });
    }
}
