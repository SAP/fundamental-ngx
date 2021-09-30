import { BaseStrategy } from './base-strategy';
import { TimelineNodeComponent } from '../../components/timeline-node/timeline-node.component';

export class VerticalSingleSideStrategy extends BaseStrategy {

    /** Calculate styles for timeline nodes */
    calculateStyles(nodes: TimelineNodeComponent[]): void {
        this._setStylesForSingleList(nodes, 'vertical');
    }
}
