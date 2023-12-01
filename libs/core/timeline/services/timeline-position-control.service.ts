import { Injectable } from '@angular/core';
import { TimelineNodeComponentInterface } from '../components/timeline-node/timeline-node-component.interface';
import { TimeLinePositionStrategy } from '../types';
import { BaseStrategy } from './position-strategies/base-strategy';
import { PositionStrategyFactory } from './position-strategies/position-strategy-factory';

@Injectable()
export class TimelinePositionControlService {
    /* List of TimelineNodeComponent */
    /** @hidden */
    private _nodeItems: TimelineNodeComponentInterface[] = [];

    /* Current position strategy. It depends on axis and layout */
    /** @hidden */
    private _positionStrategy: BaseStrategy;

    /** Calculate styles for timeline nodes */
    calculatePositions(): void {
        this._positionStrategy.calculateStyles(this._nodeItems);
    }

    /** Set strategy for current axis and layout */
    setStrategy(strategy: TimeLinePositionStrategy): void {
        this._positionStrategy = PositionStrategyFactory.getStrategy(strategy);
    }

    /** Register TimelineNodeComponent */
    registerNode(node: TimelineNodeComponentInterface): void {
        this._nodeItems.push(node);
    }

    /** Remove TimelineNodeComponent */
    removeNode(node: TimelineNodeComponentInterface): void {
        this._nodeItems = this._nodeItems.filter((item) => item !== node);
    }
}
