import { ChangeDetectionStrategy, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { TimelinePositionControlService } from '../../services/timeline-position-control.service';

@Component({
    selector: 'fd-timeline-node',
    templateUrl: './timeline-node.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        'class': 'fd-timeline__node-wrapper',
        '[class.fd-timeline__node-wrapper--icon]': '!!glyph'
    }
})
export class TimelineNodeComponent implements OnInit, OnDestroy {

    /* Glyph of the current timeline node.*/
    @Input()
    glyph: string;

    @ViewChild('lineEl')
    lineEl: ElementRef;

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
}
