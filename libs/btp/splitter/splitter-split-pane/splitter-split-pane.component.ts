import { TemplatePortal } from '@angular/cdk/portal';
import { ViewportRuler } from '@angular/cdk/scrolling';

import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    DOCUMENT,
    DestroyRef,
    EventEmitter,
    Inject,
    Input,
    OnInit,
    Optional,
    Output,
    TemplateRef,
    ViewChild,
    ViewContainerRef,
    ViewEncapsulation,
    inject
} from '@angular/core';
import { Nullable } from '@fundamental-ngx/cdk/utils';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PANE_AUTO_SIZE } from '../constants';

let paneUniqueId = 0;

/** @dynamic */
@Component({
    selector: 'fdb-splitter-split-pane',
    templateUrl: './splitter-split-pane.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true
})
export class SplitterSplitPaneComponent implements OnInit, AfterViewInit {
    /** Size (height in vertical orientation, width in horizontal orientation) of the pane. */
    @Input()
    set size(size: string) {
        this._size = size;
        if (this._actualSize !== this._size) {
            this._actualSize = this._size;
            this.sizeChange.emit();
        }
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

    /** Event emitted when the size is changed via the input property. */
    @Output()
    readonly sizeChange = new EventEmitter<void>();

    /** @hidden */
    @ViewChild(TemplateRef, { static: true })
    _templateRef: TemplateRef<any>;

    /** @hidden */
    _actualSize = PANE_AUTO_SIZE;

    /** @hidden */
    private _size = PANE_AUTO_SIZE;

    /** @hidden */
    private _contentPortal: TemplatePortal | null = null;

    /** @hidden */
    private _isOnCanvas = true;

    /** @hidden */
    private _destroyRef = inject(DestroyRef);

    /** Returns if the pane is on canvas. */
    get isOnCanvas(): boolean {
        return this._isOnCanvas;
    }

    /** @hidden */
    get _content(): TemplatePortal | null {
        return this._contentPortal;
    }

    /** @hidden */
    private get _window(): Nullable<Window & typeof globalThis> {
        return this._document?.defaultView;
    }

    /** @hidden */
    constructor(
        private readonly _viewContainerRef: ViewContainerRef,
        private readonly _viewportRuler: ViewportRuler,
        @Optional() @Inject(DOCUMENT) private readonly _document: Document | null
    ) {}

    /** @hidden */
    ngOnInit(): void {
        this._contentPortal = new TemplatePortal(this._templateRef, this._viewContainerRef);
    }

    /** @hidden */
    ngAfterViewInit(): void {
        this._processPaneOnCanvas();
        this._listenToResize();
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

    /** @hidden */
    private _listenToResize(): void {
        if (!this._window) {
            return;
        }

        this._viewportRuler
            .change(10)
            .pipe(takeUntilDestroyed(this._destroyRef))
            .subscribe(() => this._processPaneOnCanvas());
    }

    /** @hidden */
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
