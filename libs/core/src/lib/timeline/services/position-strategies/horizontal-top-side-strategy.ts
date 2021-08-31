import { BaseStrategy } from './base-strategy';
import { TimelineNodePosition } from '../../types';

export class HorizontalTopSideStrategy extends BaseStrategy {

    getCoords(): TimelineNodePosition {
        return undefined;
    }
}
