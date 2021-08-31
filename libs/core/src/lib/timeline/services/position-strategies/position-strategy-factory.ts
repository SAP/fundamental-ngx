import { BaseStrategy } from './base-strategy';
import { TimeLinePositionStrategy } from '../../types';
import { VerticalDoubleSidesStrategy } from './vertical-double-sides-strategy';
import { HorizontalTopSideStrategy } from './horizontal-top-side-strategy';
import { HorizontalBottomSideStrategy } from './horizontal-bottom-side-strategy';
import { HorizontalDoubleSidesStrategy } from './horizontal-double-sides-strategy';
import { VerticalRightSideStrategy } from './vertical-right-side-strategy';
import { VerticalLeftSideStrategy } from './vertical-left-side-strategy';

export class PositionStrategyFactory {
    static getStrategy(strategy: TimeLinePositionStrategy): BaseStrategy {
        switch (strategy) {
            case 'vertical-top':
                return new VerticalRightSideStrategy();
            case 'vertical-bottom':
                return new VerticalLeftSideStrategy();
            case 'vertical-double':
                return new VerticalDoubleSidesStrategy();
            case 'horizontal-right':
                return new HorizontalTopSideStrategy();
            case 'horizontal-left':
                return new HorizontalBottomSideStrategy();
            case 'horizontal-double':
                return new HorizontalDoubleSidesStrategy();
        }
    }
}

