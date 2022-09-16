import { BaseStrategy } from './base-strategy';
import { TimelineNodeComponentInterface } from '../../components/timeline-node/timeline-node-component.interface';

export class VerticalSingleSideStrategy extends BaseStrategy {
    /** Calculate styles for timeline nodes */
    calculateStyles(nodes: TimelineNodeComponentInterface[]): void {
        this._setStylesForSingleList(nodes, 'vertical');
    }
}
