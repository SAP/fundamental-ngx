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
import { IconComponent } from '@fundamental-ngx/core/icon';
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
    },
    standalone: true,
    imports: [IconComponent]
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

    /** @ignore */
    constructor(
        public el: ElementRef,
        private _timelinePositionControl: TimelinePositionControlService
    ) {}

    /** @ignore */
    ngOnInit(): void {
        this._timelinePositionControl.registerNode(this);
    }

    /** @ignore */
    ngOnDestroy(): void {
        this._timelinePositionControl.removeNode(this);
    }
}
