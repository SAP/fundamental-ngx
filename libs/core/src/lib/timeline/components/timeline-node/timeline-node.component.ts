import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    Input,
    OnDestroy,
    OnInit,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { TimelinePositionControlService } from '../../services/timeline-position-control.service';
import { TimelineNodeComponentInterface } from './timeline-node-component.interface';

@Component({
    selector: 'fd-timeline-node',
    templateUrl: './timeline-node.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'fd-timeline__node-wrapper',
        '[class.fd-timeline__node-wrapper--icon]': '!!glyph'
    }
})
export class TimelineNodeComponent implements TimelineNodeComponentInterface, OnInit, OnDestroy {
    /** Glyph of the current timeline node.*/
    @Input()
    glyph: string;

    /** Aria label for the current timeline node. */
    @Input()
    ariaLabel = 'timelineitem';

    /** Reference to the line of timeline node*/
    @ViewChild('lineEl')
    lineEl: ElementRef;

    /** @hidden */
    constructor(public el: ElementRef, private _timelinePositionControl: TimelinePositionControlService) {}

    /** @hidden */
    ngOnInit(): void {
        this._timelinePositionControl.registerNode(this);
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._timelinePositionControl.removeNode(this);
    }
}
