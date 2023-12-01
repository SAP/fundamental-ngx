import { TimelineNodeComponentInterface } from '../../components/timeline-node/timeline-node-component.interface';
import { BaseStrategy } from './base-strategy';

export class HorizontalSingleSideStrategy extends BaseStrategy {
    /** Calculate styles for timeline nodes */
    calculateStyles(nodes: TimelineNodeComponentInterface[]): any {
        this._setStylesForSingleList(nodes, 'horizontal');
    }
}
