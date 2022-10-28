import { BaseStrategy } from './base-strategy';
import { TimeLinePositionStrategy } from '../../types';
import { VerticalDoubleSidesStrategy } from './vertical-double-sides-strategy';
import { HorizontalSingleSideStrategy } from './horizontal-single-side-strategy';
import { HorizontalDoubleSidesStrategy } from './horizontal-double-sides-strategy';
import { VerticalSingleSideStrategy } from './vertical-single-side-strategy';

export class PositionStrategyFactory {
    /** Get timeline position strategy */
    static getStrategy(strategy: TimeLinePositionStrategy): BaseStrategy {
        switch (strategy) {
            case 'vertical-right':
                return new VerticalSingleSideStrategy();
            case 'vertical-left':
                return new VerticalSingleSideStrategy();
            case 'vertical-double':
                return new VerticalDoubleSidesStrategy();
            case 'horizontal-top':
                return new HorizontalSingleSideStrategy();
            case 'horizontal-bottom':
                return new HorizontalSingleSideStrategy();
            case 'horizontal-double':
                return new HorizontalDoubleSidesStrategy();
            default:
                throw Error(`Unsupported strategy: ${strategy}`);
        }
    }
}
