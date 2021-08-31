import { Component, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import { TimelineNodePosition } from '../../types';
import { TimelinePositionControlService } from '../../services/timeline-position-control.service';

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

  _cssClasses: string[];

  constructor(
      public el: ElementRef,
      private _timelinePositionControl: TimelinePositionControlService
  ) {
  }

  ngOnInit(): void {
    this._timelinePositionControl.registerNode(this);
  }

  ngOnDestroy(): void {
    this._timelinePositionControl.removeNode(this);
  }

  setPosition(position: TimelineNodePosition): any {
    this._position = position;
  }

  setClasses(classes: string[]): void {
    console.log(classes);
    this._cssClasses = classes;
  }

}
