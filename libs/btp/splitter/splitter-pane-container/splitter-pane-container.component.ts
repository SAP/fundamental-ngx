import { ViewportRuler } from '@angular/cdk/scrolling';
import {
    AfterContentInit,
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChildren,
    DestroyRef,
    ElementRef,
    EventEmitter,
    inject,
    Input,
    OnDestroy,
    Optional,
    Output,
    QueryList,
    SkipSelf,
    ViewEncapsulation
} from '@angular/core';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import { Nullable, RtlService } from '@fundamental-ngx/cdk/utils';

import { PortalModule } from '@angular/cdk/portal';
import { NgTemplateOutlet } from '@angular/common';
import { PANE_AUTO_SIZE, PANE_NONE_SIZE, RESIZER_SIZE_PX, ROOT_PAGE } from '../constants';
import { SplitterPaneResizeEvent } from '../interfaces/splitter-pane-resize-event.interface';
import { SplitterPaginationComponent } from '../splitter-pagination/splitter-pagination.component';
import { SplitterResizerComponent } from '../splitter-resizer/splitter-resizer.component';
import { SplitterSplitPaneComponent } from '../splitter-split-pane/splitter-split-pane.component';
import { SplitterComponent } from '../splitter.component';
import { NoDefaultPanePipe } from './no-default-pane.pipe';
import { FD_SPLITTER_PANE_CONTAINER } from './splitter-pane-container.token';
import {
    SplitterPaneContainerOrientation,
    SplitterPaneContainerOrientationType
} from './splitter-pane-orientation.enum';
import { SplitterPaneContainer } from './splitter-pane.container';

/** Splitter pane available types */
export type PaneType = 'translucent' | 'solid';

/** Splitter pane deprecated types */
export type DeprecatedPaneType = 'default' | 'transparent';

/** Splitter pane type input */
export type PaneTypeInput = PaneType | DeprecatedPaneType;

/**
 * Transforms pane type input to pane type
 * and logs deprecation warning if needed
 * @param paneType
 */
export function transformPaneTypeInput(paneType: PaneTypeInput): Nullable<PaneType> {
    if (paneType === 'default' || paneType === 'transparent') {
        console.warn(
            'Pane type "default" and "transparent" are deprecated. Use "null" or do not set anything at all instead if you need to have transparent pane type.'
        );
        return null;
    }
    return paneType;
}

@Component({
    selector: 'fdb-splitter-pane-container',
    templateUrl: './splitter-pane-container.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'fd-splitter__pane-container',
        '[class.fd-splitter__pane-container--horizontal]': '!_isRootContainer && _isHorizontal',
        '[class.fd-splitter__pane-container--vertical]': '_isRootContainer || _isVertical'
    },
    providers: [
        {
            provide: FD_SPLITTER_PANE_CONTAINER,
            useExisting: SplitterPaneContainerComponent
        }
    ],
    imports: [NgTemplateOutlet, SplitterPaginationComponent, PortalModule, SplitterResizerComponent, NoDefaultPanePipe]
})
export class SplitterPaneContainerComponent
    implements SplitterPaneContainer, AfterContentInit, AfterViewInit, OnDestroy
{
    /** Pane type - vertical (default) or horizontal. */
    @Input() orientation: SplitterPaneContainerOrientationType = SplitterPaneContainerOrientation.vertical;

    /**
     * Style of the resizer.
     */
    @Input({ transform: transformPaneTypeInput }) resizerType: Nullable<PaneTypeInput> = null;

    /**
     * Style of the pane
     */
    @Input({ transform: transformPaneTypeInput }) paneType: Nullable<PaneTypeInput> = null;

    /** Event emitted after container's panes has resized. */
    @Output()
    // eslint-disable-next-line @angular-eslint/no-output-native
    readonly resize = new EventEmitter<SplitterPaneResizeEvent[]>();

    /** @hidden */
    @ContentChildren(SplitterSplitPaneComponent, { descendants: true }) _panes: QueryList<SplitterSplitPaneComponent>;

    /** @hidden */
    @ContentChildren(SplitterSplitPaneComponent) _directPanes: QueryList<SplitterSplitPaneComponent>;

    /** @hidden */
    _defaultPane: Nullable<SplitterSplitPaneComponent>;

    /** @hidden */
    _pages: string[] = [];

    /** @hidden */
    _currentPage: string;

    /** @hidden */
    _destroyRef = inject(DestroyRef);

    /** @hidden */
    private _paneSizes: number[] = [];

    /** @hidden */
    private _wantedPanesSizes: number[] = [];

    /** @hidden */
    private _initialPaneSizes: number[] = [];

    /** @hidden */
    private _directPaneSubscription$ = new Subscription();

    /** @hidden */
    private _subscription$ = new Subscription();

    /** @hidden */
    get _isHorizontal(): boolean {
        return this.orientation === SplitterPaneContainerOrientation.horizontal;
    }

    /** @hidden */
    get _isVertical(): boolean {
        return this.orientation === SplitterPaneContainerOrientation.vertical;
    }

    /** @hidden */
    get _isRootContainer(): boolean {
        return !this._parentSplitterPaneContainer;
    }

    /** @hidden */
    get _panesOnCanvas(): SplitterSplitPaneComponent[] {
        return this._directPanes.filter((pane) => pane.isOnCanvas);
    }

    /** @hidden */
    get _activePanes(): SplitterSplitPaneComponent[] {
        if (this._currentPage === ROOT_PAGE) {
            return this._panesOnCanvas;
        }

        return this._panes.filter((pane) => pane.id === this._currentPage);
    }

    /** @hidden */
    private get _panesInRightOrderForResize(): SplitterSplitPaneComponent[] {
        const panes = this._directPanes.filter((pane) => pane.id !== this._defaultPane?.id);

        if (this._defaultPane) {
            panes.unshift(this._defaultPane);
        }

        return panes;
    }

    /** @hidden */
    private get _isRtl(): boolean {
        return this._rtlService?.rtl.getValue();
    }

    /** @hidden */
    constructor(
        private readonly _cdr: ChangeDetectorRef,
        private readonly _elementRef: ElementRef,
        private readonly _splitter: SplitterComponent,
        private readonly _viewportRuler: ViewportRuler,
        @Optional() private readonly _rtlService: RtlService,
        @Optional() @SkipSelf() private readonly _parentSplitterPaneContainer: SplitterPaneContainerComponent
    ) {}

    /** @hidden */
    ngAfterContentInit(): void {
        if (this._isRootContainer) {
            this._setDefaultPane();
            this._updatePages();

            this._panes.forEach((pane) => {
                this._subscription$.add(pane.toggleOnCanvas.subscribe(() => this._updatePages()));
            });
        }
    }

    /** @hidden */
    ngAfterViewInit(): void {
        this._setPanes();
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._directPaneSubscription$.unsubscribe();
        this._subscription$.unsubscribe();
    }

    /** @hidden */
    _getPaneStyles(pane: SplitterSplitPaneComponent): { [klass: string]: string } {
        const style = {
            'min-width': PANE_AUTO_SIZE,
            'max-width': PANE_NONE_SIZE,
            'min-height': PANE_AUTO_SIZE,
            'max-height': PANE_NONE_SIZE
        };

        if (this._isVertical && pane.isOnCanvas && pane._actualSize !== PANE_AUTO_SIZE) {
            style['min-width'] = pane._actualSize;
            style['max-width'] = pane._actualSize;
        }

        if (this._isHorizontal && pane.isOnCanvas && pane._actualSize !== PANE_AUTO_SIZE) {
            style['min-height'] = pane._actualSize;
            style['max-height'] = pane._actualSize;
        }

        return style;
    }

    /** @hidden */
    _startResize(): void {
        this._paneSizes = [];
        this._initialPaneSizes = [];

        this._panesInRightOrderForResize.forEach((pane) => {
            const paneSize = this._getPaneElementSizePx(pane.id);

            this._paneSizes.push(paneSize);
            this._initialPaneSizes.push(paneSize);
        });
    }

    /** @hidden */
    _endResize(): void {
        const changedPaneSizes: SplitterPaneResizeEvent[] = [];

        this._panesInRightOrderForResize.forEach((pane, index) => {
            if (this._paneSizes[index] !== this._initialPaneSizes[index]) {
                changedPaneSizes.push({
                    paneId: pane.id,
                    oldSize: this._initialPaneSizes[index] + 'px',
                    newSize: this._paneSizes[index] + 'px'
                });
            }
        });

        this.resize.emit(changedPaneSizes);

        this._resizePanesToFitInContainer(true);
    }

    /** @hidden */
    _onResize(paneId: string, diff: number): void {
        if (diff === 0) {
            return;
        }

        diff *= this._isRtl && this.orientation === SplitterPaneContainerOrientation.vertical ? -1 : 1;

        const resizedPaneIndex =
            this._panesInRightOrderForResize.findIndex((pane) => pane.id === paneId) + (diff < 0 ? 1 : 0);
        const resizedPane = this._panesInRightOrderForResize[resizedPaneIndex];

        let siblingPaneIndex = resizedPaneIndex;
        let siblingPane: SplitterSplitPaneComponent;
        let siblingPaneSize: number;

        do {
            siblingPaneIndex += diff < 0 ? -1 : 1;
            siblingPane = this._panesInRightOrderForResize[siblingPaneIndex];
            siblingPaneSize = this._paneSizes[siblingPaneIndex];

            if (!siblingPane) {
                return;
            }
        } while (!siblingPaneSize);

        const resizedPaneNewSize = this._paneSizes[resizedPaneIndex] + diff * (diff < 0 ? -1 : 1);
        const siblingPaneNewSize = this._paneSizes[siblingPaneIndex] + diff * (diff < 0 ? 1 : -1);

        /** Prevent from setting negative size */
        if (resizedPaneNewSize < 0 || siblingPaneNewSize < 0) {
            return;
        }

        this._paneSizes[resizedPaneIndex] = resizedPaneNewSize;
        this._paneSizes[siblingPaneIndex] = siblingPaneNewSize;

        resizedPane.size = this._paneSizes[resizedPaneIndex] + 'px';
        siblingPane.size = this._paneSizes[siblingPaneIndex] + 'px';

        this._cdr.markForCheck();
    }

    /** @hidden */
    _onPageChange(page: string = ROOT_PAGE): void {
        this._currentPage = page;

        this._cdr.detectChanges();
    }

    /** @hidden */
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    protected _SplitterSplitPaneComponent = (p: unknown) => p as SplitterSplitPaneComponent[];

    /** @hidden */
    private _updatePages(): void {
        this._pages = [];

        const offCanvasDemandPages = this._panes
            .filter((pane) => !pane.isOnCanvas && pane.demandPane)
            .map((pane) => pane.id);
        let newPage = ROOT_PAGE;

        if (offCanvasDemandPages.length) {
            this._pages = offCanvasDemandPages;
            newPage = offCanvasDemandPages[0];

            if (this._panesOnCanvas.length > 1) {
                this._pages.unshift(ROOT_PAGE);
                newPage = ROOT_PAGE;
            }

            if (this._panesOnCanvas.length === 1) {
                this._pages.unshift(this._panesOnCanvas[0].id);
                newPage = this._panesOnCanvas[0].id;
            }
        }

        const currentPageExist = this._pages.includes(this._currentPage);

        if (!currentPageExist) {
            /** Detaching basically works without the code but it's the edge-case */
            const isShouldDetachDefaultPane = this._currentPage === this._defaultPane?.id && newPage === ROOT_PAGE;

            if (isShouldDetachDefaultPane && this._defaultPane?._content?.isAttached) {
                this._defaultPane._content.detach();
            }

            this._onPageChange(newPage);
            return;
        }

        this._cdr.markForCheck();
    }

    /** @hidden */
    private _setPanes(): void {
        this._resizePanesToFitInContainer(true);

        const setDirectPanesSubscription = (): void => {
            this._directPaneSubscription$.unsubscribe();
            this._directPaneSubscription$ = new Subscription();

            this._directPanes.forEach((pane) => {
                this._directPaneSubscription$.add(
                    pane.toggleOnCanvas.subscribe(() => this._resizePanesToFitInContainer())
                );
            });
        };

        let prevDirectPanes = [...this._directPanes];
        const areDirectPanesSame = (panes: QueryList<SplitterSplitPaneComponent>): boolean => {
            if (panes.length !== prevDirectPanes.length) {
                return false;
            }

            return prevDirectPanes.every((prevPane) => !!panes.find((pane) => pane.id === prevPane.id));
        };

        setDirectPanesSubscription();

        this._subscription$.add(
            this._panes.changes.pipe(filter((panes) => !areDirectPanesSame(panes))).subscribe((panesList) => {
                prevDirectPanes = panesList.toArray();

                setDirectPanesSubscription();

                this._resizePanesToFitInContainer(true);
            })
        );

        this._panes.forEach((pane) => {
            this._subscription$.add(
                pane.sizeChange.subscribe(() => {
                    this._resizePanesToFitInContainer(true);
                })
            );
        });

        this._subscription$.add(this._viewportRuler.change(10).subscribe(() => this._resizePanesToFitInContainer()));
    }

    /** @hidden */
    private _setDefaultPane(): void {
        const setDefaultPane = (): void => {
            if (this._splitter.defaultPaneId) {
                this._defaultPane =
                    this._panes.find((pane) => pane.id === this._splitter.defaultPaneId) ?? this._directPanes[0];
            }

            /** Detaching basically works without the code but it's the edge-case */
            if (this._defaultPane?._content?.isAttached) {
                this._defaultPane._content.detach();
            }
        };

        setDefaultPane();

        this._subscription$.add(
            this._splitter._defaultPaneId$.subscribe(() => {
                this._cdr.detectChanges();

                setDefaultPane();

                this._resizePanesToFitInContainer(true);
                this._updatePages();
            })
        );
    }

    /** @hidden */
    private _resizePanesToFitInContainer(setInitialSize = false): void {
        if (setInitialSize) {
            this._cdr.detectChanges();
        }

        const containerSizePx = this._isHorizontal
            ? this._elementRef.nativeElement.offsetHeight
            : this._elementRef.nativeElement.offsetWidth;
        let availableSpacePx = containerSizePx - RESIZER_SIZE_PX * (this._directPanes.length - 1);

        this._directPanes.forEach((pane, index) => {
            if (!availableSpacePx) {
                pane._actualSize = '0px';
                return;
            }

            if (setInitialSize) {
                this._wantedPanesSizes[index] = this._getPaneElementSizePx(pane.id);
            }

            const paneSize = this._wantedPanesSizes[index];

            if (availableSpacePx - this._wantedPanesSizes[index] < 0) {
                pane._actualSize = availableSpacePx + 'px';
                availableSpacePx = 0;
                return;
            }

            pane._actualSize = pane.size === PANE_AUTO_SIZE ? PANE_AUTO_SIZE : paneSize + 'px';
            availableSpacePx -= paneSize;
        });

        this._cdr.detectChanges();
    }

    /** @hidden */
    private _getPaneElementSizePx(paneId: string): number {
        const paneElement = this._getPaneElement(paneId);

        if (!paneElement) {
            return 0;
        }

        return this._isHorizontal ? paneElement.offsetHeight : paneElement.offsetWidth;
    }

    /** @hidden */
    private _getPaneElement(paneId: string): HTMLElement {
        return this._elementRef.nativeElement.querySelector(`#${paneId}`);
    }
}
