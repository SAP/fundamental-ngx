import { Injectable, NgZone } from '@angular/core';
import { TimelineNodeComponent } from '../components/timeline-node/timeline-node.component';
import { Subject } from 'rxjs';
import { TimeLinePositionStrategy } from '../types';
import { VerticalRightSideStrategy } from './position-strategies/vertical-right-side-strategy';
import { VerticalDoubleSidesStrategy } from './position-strategies/vertical-double-sides-strategy';
import { VerticalLeftSideStrategy } from './position-strategies/vertical-left-side-strategy';

@Injectable()
export class TimelinePositionControlService {

  private _unsortedItems = new Set<TimelineNodeComponent>();

  private _nodeItems: TimelineNodeComponent[] = [];

  private readonly _destroyed = new Subject<void>();

  // private _positionStrategy: BaseStrategy;
  private _positionStrategy: VerticalRightSideStrategy;
  // private _positionStrategy: VerticalLeftSideStrategy;
  // private _positionStrategy: VerticalDoubleSidesStrategy;

  constructor(
      private _ngZone: NgZone,
  ) { }

  calculatePositions(): void {
    this._positionStrategy.calculatePosition(this._nodeItems);
  }

  setStrategy(strategy: TimeLinePositionStrategy): void {
    // this._positionStrategy = new VerticalDoubleSidesStrategy();
    this._positionStrategy = new VerticalRightSideStrategy();
    // this._positionStrategy = new VerticalLeftSideStrategy();
    // this._positionStrategy = PositionStrategyFactory.getStrategy(strategy);
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

  destroy(): void {
    this._unsortedItems.clear();
    this._destroyed.next();
    this._destroyed.complete();
  }
}
