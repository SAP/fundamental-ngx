import { Injectable, NgZone } from '@angular/core';
import { TimelineNodeComponent } from '../components/timeline-node/timeline-node.component';
import { Subject } from 'rxjs';
import { StrategyOptions, TimeLinePositionStrategy } from '../types';
import { BaseStrategy } from './position-strategies/base-strategy';
import { PositionStrategyFactory } from './position-strategies/position-strategy-factory';

@Injectable()
export class TimelinePositionControlService {

    private _unsortedItems = new Set<TimelineNodeComponent>();
    private _nodeItems: TimelineNodeComponent[] = [];
    private readonly _destroyed = new Subject<void>();
    private _positionStrategy: BaseStrategy;

    constructor(
        private _ngZone: NgZone
    ) {
    }

    calculatePositions(): void {
        this._positionStrategy.calculatePosition(this._nodeItems);
    }

    setStrategy(strategy: TimeLinePositionStrategy, options: Partial<StrategyOptions> = {}): void {
        this._positionStrategy = PositionStrategyFactory.getStrategy(strategy, options);
    }

    registerNode(node: TimelineNodeComponent): void {
        this._unsortedItems.add(node);
        this._nodeItems.push(node);
    }

    removeNode(node: TimelineNodeComponent): void {
        this._unsortedItems.delete(node);
        this._nodeItems = this._nodeItems.filter(item => item !== node);
    }

    moveNode(previousIndex: number, currentIndex: number): void {

    }

    switchRtlMode(isRtl: boolean): void {
        this._positionStrategy.switchRtlMode(isRtl);
    }

    destroy(): void {
        this._unsortedItems.clear();
        this._destroyed.next();
        this._destroyed.complete();
    }
}
