import { TemplatePortal } from '@angular/cdk/portal';
import { ViewportRuler } from '@angular/cdk/scrolling';
import { DOCUMENT } from '@angular/common';
import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Inject,
    Input,
    OnDestroy,
    OnInit,
    Optional,
    Output,
    TemplateRef,
    ViewChild,
    ViewContainerRef,
    ViewEncapsulation
} from '@angular/core';
import { Nullable } from '@fundamental-ngx/cdk/utils';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { PANE_AUTO_SIZE } from '../constants';

let paneUniqueId = 0;

/** @dynamic */
@Component({
    selector: 'fd-splitter-split-pane',
    templateUrl: './splitter-split-pane.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true
})
export class SplitterSplitPaneComponent implements OnInit, AfterViewInit, OnDestroy {
    /** Size (height in vertical orientation, width in horizontal orientation) of the pane. */
    @Input()
    set size(size: string) {
        this._size = size;
        this._actualSize = this._size;
    }

    get size(): string {
        return this._size;
    }

    /** Id of the split pane. Generated if not provided. */
    @Input()
    id = `fd-splitter-split-pane-${paneUniqueId++}`;

    /** Required browser's window width in pixels when the panel will be shown. */
    @Input()
    requiredParentWidth: number;

    /** Whether pane is reachable using pagination bar when is off-canvas. */
    @Input()
    demandPane = true;

    /** Event emitted when the pane appears on/disappears out of canvas. */
    @Output()
    readonly toggleOnCanvas = new EventEmitter<boolean>();

    /** @ignore */
    @ViewChild(TemplateRef, { static: true })
    _templateRef: TemplateRef<any>;

    /** @ignore */
    _actualSize = PANE_AUTO_SIZE;

    /** @ignore */
    private _size = PANE_AUTO_SIZE;

    /** @ignore */
    private _contentPortal: TemplatePortal | null = null;

    /** @ignore */
    private _isOnCanvas = true;

    /** @ignore */
    private _unsubscribe$ = new Subject<void>();

    /** Returns if the pane is on canvas. */
    get isOnCanvas(): boolean {
        return this._isOnCanvas;
    }

    /** @ignore */
    get _content(): TemplatePortal | null {
        return this._contentPortal;
    }

    /** @ignore */
    private get _window(): Nullable<Window & typeof globalThis> {
        return this._document?.defaultView;
    }

    /** @ignore */
    constructor(
        private readonly _viewContainerRef: ViewContainerRef,
        private readonly _viewportRuler: ViewportRuler,
        @Optional() @Inject(DOCUMENT) private readonly _document: Document | null
    ) {}

    /** @ignore */
    ngOnInit(): void {
        this._contentPortal = new TemplatePortal(this._templateRef, this._viewContainerRef);
    }

    /** @ignore */
    ngAfterViewInit(): void {
        this._processPaneOnCanvas();
        this._listenToResize();
    }

    /** @ignore */
    ngOnDestroy(): void {
        this._unsubscribe$.next();
        this._unsubscribe$.complete();
    }

    /** Hide pane from the canvas. */
    hideFromCanvas(): void {
        if (!this.isOnCanvas) {
            return;
        }

        this._isOnCanvas = false;

        this.toggleOnCanvas.emit(false);
    }

    /** Show pane on the canvas. */
    showOnCanvas(): void {
        if (this.isOnCanvas) {
            return;
        }

        this._isOnCanvas = true;

        this.toggleOnCanvas.emit(true);
    }

    /** @ignore */
    private _listenToResize(): void {
        if (!this._window) {
            return;
        }

        this._viewportRuler
            .change(10)
            .pipe(takeUntil(this._unsubscribe$))
            .subscribe(() => this._processPaneOnCanvas());
    }

    /** @ignore */
    private _processPaneOnCanvas(): void {
        if (!this._window) {
            return;
        }

        if (this.requiredParentWidth > this._window.innerWidth && this.isOnCanvas) {
            this.hideFromCanvas();
        }

        if (this.requiredParentWidth < this._window.innerWidth && !this.isOnCanvas) {
            this.showOnCanvas();
        }
    }
}
