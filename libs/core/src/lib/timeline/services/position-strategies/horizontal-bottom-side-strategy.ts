import { BaseStrategy } from './base-strategy';
import { TimelineNodePosition } from '../../types';
import { TimelineNodeComponent } from '../../components/timeline-node/timeline-node.component';

export class HorizontalBottomSideStrategy extends BaseStrategy {

    getCoords(): TimelineNodePosition {
        return undefined;
    }

    calculatePosition(nodes: TimelineNodeComponent[]): any {
        let prevEdge = 0;
        nodes.forEach(node => {
            const el = node.el.nativeElement;
            el.classList.add('fd-timeline__node-wrapper--horizontal');
            el.classList.add('fd-timeline__node-wrapper--bottom');
            el.style.width = this.horizontalNodeWidth + 'px';
            el.style.left = prevEdge + 'px';
            el.style.top =  0;


            prevEdge += 320;

            node.lastLine.nativeElement.style.flexGrow = 1;
        });
    }
}
