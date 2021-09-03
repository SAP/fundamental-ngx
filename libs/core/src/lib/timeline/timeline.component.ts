import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChildren,
    Input,
    IterableChangeRecord,
    IterableDiffer,
    IterableDiffers,
    OnChanges,
    OnDestroy,
    OnInit, Optional,
    QueryList,
    SimpleChanges,
    TrackByFunction,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { Subject } from 'rxjs';

import { TimelineNodeOutletDirective } from './directives/timeline-node-outlet.directive';
import { TimelineNodeDefDirective, TimelineNodeOutletContext } from './directives/timeline-node-def.directive';
import { TimelinePositionControlService } from './services/timeline-position-control.service';
import { TimelineAxis, TimeLinePositionStrategy, TimelineSidePosition } from './types';
import { RtlService } from '@fundamental-ngx/core/utils';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'fd-timeline',
    template: `
        <ng-container fdTimelineNodeOutlet></ng-container>`,
    styleUrls: ['./timeline.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [TimelinePositionControlService],
    host: {
        role: 'timeline',
        'arial-label': 'timeline'
    }
})
export class TimelineComponent<T> implements OnInit, OnDestroy, OnChanges, AfterViewInit {


    /**
     * Data array to render
     */
    @Input()
    dataSource: T[] = [];

    /**
     * Tracking function that will be used to check the differences in data changes.
     */
    @Input()
    trackBy: TrackByFunction<T>;

    /**
     * Axis for layout
     */
    @Input()
    axis: TimelineAxis = 'horizontal';

    /**
     * Axis for layout
     */
    @Input()
    layout: TimelineSidePosition = 'top';

    /* Outlets within the timeline template where the dataNodes will be inserted. */
    /** @hidden */
    @ViewChild(TimelineNodeOutletDirective, { static: true })
    private _nodeOutlet: TimelineNodeOutletDirective;

    /** The timeline node template for the timeline */
    /** @hidden */
    @ContentChildren(TimelineNodeDefDirective, { descendants: true })
    private _nodeDefs: QueryList<TimelineNodeDefDirective<T>>;

    /** Differ used to find the changes in the data provided by the data source. */
    private _dataDiffer: IterableDiffer<T>;

    private _isRtl: boolean = null;

    /** @hidden */
    private readonly _onDestroy = new Subject<void>();

    /** @hidden */
    constructor(
        private _differs: IterableDiffers,
        private _cd: ChangeDetectorRef,
        private _timelinePositionControlService: TimelinePositionControlService,
        @Optional() private _rtlService: RtlService,
    ) {
    }

    /** @hidden */
    ngOnInit(): void {
        this._dataDiffer = this._differs.find([]).create(this.trackBy);

        this._rtlService?.rtl
            .pipe(takeUntil(this._onDestroy))
            .subscribe(rtl => {
                if (this._isRtl !== null) {
                    this._timelinePositionControlService.switchRtlMode(rtl);
                }
                this._isRtl = rtl;
            })
    }

    /** @hidden */
    ngOnChanges(changes: SimpleChanges): void {
        if ('axis' in changes || 'layout' in changes) {
            this._setPositionStrategy();
        }
        if ('dataSource' in changes && !changes['dataSource'].firstChange) {
            const value = changes['dataSource'].currentValue;
            this.switchDataSource(value);
        }
    }

    /** @hidden */
    ngAfterViewInit(): void {
        this._setPositionStrategy();
        this.switchDataSource(this.dataSource);
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._nodeOutlet.viewContainer.clear();
        this._onDestroy.next();
        this._onDestroy.complete();
    }

    /**
     * Update state by new data source
     * If the data source is null, interpret this by clearing the node outlet.
     */
    /** @hidden */
    private switchDataSource(data: T[]): void {
        if (!data) {
            this._nodeOutlet.viewContainer.clear();
            return;
        }
        if (this._nodeDefs) {
            this._renderNodeChanges(this.dataSource);
        }
    }

    /** Check for changes made in the data and render each change (node added/removed/moved). */
    /** @hidden */
    private _renderNodeChanges(data: T[]): void {
        const changes = this._dataDiffer.diff(data);
        if (!changes) {
            return;
        }
        changes.forEachOperation((item: IterableChangeRecord<T>,
                                  adjustedPreviousIndex: number | null,
                                  currentIndex: number | null) => {
            if (item.previousIndex === null) {
                this._insertNode(this.dataSource[currentIndex], currentIndex);
            } else if (currentIndex === null) {
                this._nodeOutlet.viewContainer.remove(adjustedPreviousIndex);
            } else {
                const view = this._nodeOutlet.viewContainer.get(adjustedPreviousIndex);
                this._nodeOutlet.viewContainer.move(view, currentIndex);
            }
        });

        this._cd.detectChanges();
        this._timelinePositionControlService.calculatePositions();
        this._cd.detectChanges();
    }

    private _setPositionStrategy(): void {
        this._timelinePositionControlService.setStrategy(`${this.axis}-${this.layout}` as TimeLinePositionStrategy,
            {
                isRtl: this._isRtl,
            });
    }

    /**
     * Create the embedded view for the data node template and place it in the correct index location
     * within the data node view container.
     */
    /** @hidden */
    private _insertNode(nodeData: T, index: number): void {
        const node = this._getNodeDef(index);

        // Node context that will be provided to created embedded view
        const context = new TimelineNodeOutletContext<T>(nodeData);

        this._nodeOutlet.viewContainer.createEmbeddedView(node.template, context, index);
    }

    /**
     * Finds the matching node definition that should be used for this node data. If there is only
     * one node definition, it is returned.
     */
    /** @hidden */
    private _getNodeDef(i: number): TimelineNodeDefDirective<T> {
        if (this._nodeDefs.length === 1) {
            return this._nodeDefs.first;
        }
        return this._nodeDefs[i];
    }
}
