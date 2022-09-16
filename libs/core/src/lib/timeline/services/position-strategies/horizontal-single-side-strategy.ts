import { BaseStrategy } from './base-strategy';
import { TimelineNodeComponentInterface } from '../../components/timeline-node/timeline-node-component.interface';

export class HorizontalSingleSideStrategy extends BaseStrategy {
    /** Calculate styles for timeline nodes */
    calculateStyles(nodes: TimelineNodeComponentInterface[]): any {
        this._setStylesForSingleList(nodes, 'horizontal');
    }
}
