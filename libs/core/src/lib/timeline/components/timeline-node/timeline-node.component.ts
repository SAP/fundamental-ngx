import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { TimelineNodePosition } from '../../types';

@Component({
  selector: 'fd-timeline-node',
  templateUrl: './timeline-node.component.html',
  host: {
    'class': 'fd-timeline__node-wrapper'
  }
})
export class TimelineNodeComponent implements OnInit, OnDestroy {

  /* Glyph of the current timeline node.*/
  @Input()
  glyph: string;

  _position: TimelineNodePosition;

  // constructor(
  //     private _timelineNodeOutletDir: TimelineNodeOutletDirective
  // ) {
  // }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

  setPosition(position: TimelineNodePosition): any {
    this._position = position;
  }

}
