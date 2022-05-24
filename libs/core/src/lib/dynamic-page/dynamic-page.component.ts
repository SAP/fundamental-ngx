import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChild,
    ContentChildren,
    ElementRef,
    HostBinding,
    Input,
    OnDestroy,
    Optional,
    QueryList,
    Renderer2,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { resizeObservable } from '@fundamental-ngx/core/utils';
import { DYNAMIC_PAGE_CLASS_NAME, DynamicPageBackgroundType, DynamicPageResponsiveSize } from './constants';
import { DynamicPageContentComponent } from './dynamic-page-content/dynamic-page-content.component';
import { DynamicPageSubheaderComponent } from './dynamic-page-header/subheader/dynamic-page-subheader.component';
import { DynamicPageHeaderComponent } from './dynamic-page-header/header/dynamic-page-header.component';
import { DynamicPageFooterComponent } from './dynamic-page-footer/dynamic-page-footer.component';
import { DynamicPageWrapperDirective } from './dynamic-page-wrapper.directive';
import { DynamicPageService } from './dynamic-page.service';
import { addClassNameToElement, dynamicPageWidthToSize } from './utils';
import { TabListComponent } from '@fundamental-ngx/core/tabs';
import { Nullable } from '@fundamental-ngx/core/shared';
import { FlexibleColumnLayoutComponent } from '@fundamental-ngx/core/flexible-column-layout';

import { asyncScheduler, fromEvent, Observable, startWith, Subject } from 'rxjs';
import { debounceTime, delay, map, observeOn, takeUntil } from 'rxjs/operators';

@Component({
    selector: 'fd-dynamic-page',
    templateUrl: './dynamic-page.component.html',
    styleUrls: ['./dynamic-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [DynamicPageService]
})
export class DynamicPageComponent implements AfterViewInit, OnDestroy {
    /** Page role  */
    @Input()
    @HostBinding('attr.role')
    role = 'region';

    /** aria label for the page */
    @Input()
    ariaLabel: Nullable<string>;

    /**
     * sets background for content to `list`, `transparent`, or `solid` background color.
     * Default is `solid`.
     */
    @Input()
    background: DynamicPageBackgroundType = 'solid';

    /** Whether DynamicPage should have responsive sides spacing changing with Page window width.
     * max-width: 599px                         - small
     * min-width: 600px and max-width: 1023px   - medium
     * min-width: 1024px and max-width: 1439px  - large
     * min-width: 1440px                        - extra large
     */
    @Input()
    autoResponsive = true;

    /**
     * sets size which in turn adds corresponding padding for the size type.
     * size can be `small`, `medium`, `large`, or `extra-large`.
     */
    @Input()
    set size(size: DynamicPageResponsiveSize) {
        this._size = size;
        this._propagateSizeToChildren();
    }

    get size(): DynamicPageResponsiveSize {
        return this._size;
    }

    _size: DynamicPageResponsiveSize = 'extra-large';

    /** Offset in PX
     * Should be added, when there is something else at the bottom and dynamic page is not expanded to bottom's corners
     */
    @Input()
    offset = 0;

    /**
     * Whether dynamic page should be expanded in whole page.
     */
    @Input()
    expandContent = true;

    /** @hidden reference to header component  */
    @ContentChild(DynamicPageSubheaderComponent)
    _pageSubheaderComponent: DynamicPageSubheaderComponent;

    /** @hidden reference to title component  */
    @ContentChild(DynamicPageHeaderComponent)
    _headerComponent: DynamicPageHeaderComponent;

    /** @hidden reference to content component  */
    @ContentChildren(DynamicPageContentComponent, { descendants: true })
    _contentComponent: QueryList<DynamicPageContentComponent>;

    /** @hidden reference to footer component  */
    @ContentChild(DynamicPageFooterComponent)
    _footerComponent: DynamicPageContentComponent;

    /** @hidden reference to tab component */
    @ContentChild(TabListComponent)
    _tabComponent: TabListComponent;

    /** @hidden */
    @ViewChild('dynamicPageElement')
    _dynamicPageElement: ElementRef;

    /** @hidden */
    _headerCollapsible = true;

    /** @hidden **/
    private readonly _onDestroy$: Subject<void> = new Subject<void>();

    /** @hidden */
    constructor(
        protected _cd: ChangeDetectorRef,
        private _elementRef: ElementRef<HTMLElement>,
        private _renderer: Renderer2,
        private _dynamicPageService: DynamicPageService,
        @Optional() private _columnLayout: FlexibleColumnLayoutComponent,
        @Optional() private _dynamicPageWrapper: DynamicPageWrapperDirective
    ) {}

    /** @hidden */
    ngAfterViewInit(): void {
        this._sizeChangeHandle();
        this._removeShadowWhenTabComponent();
        this._listenOnResize();
        this._listenOnCollapse();
        this._propagatePropertiesToChildren();
        this._setContentFooterSpacer();

        if (this._pageSubheaderComponent?.collapsible) {
            this._addScrollListeners();
        }

        if (this._columnLayout && this.autoResponsive) {
            this._listenToLayoutChange();
        }

        setTimeout(() => this._setContainerPositions());

        this._cd.detectChanges();
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._onDestroy$.next();
        this._onDestroy$.complete();
    }

    /** toggle the visibility of the header on click of title area. */
    toggleCollapse(): void {
        if (this._headerCollapsible) {
            this._dynamicPageService.toggleCollapsed();
        }
    }

    /**
     * Triggers recheck for spacing and sizing of elements inside DynamicPage.
     */
    refreshSize(): void {
        this._setContainerPositions();
        this._sizeChangeHandle();
    }

    /** Set the positions of the tabs and content with respect to the window */
    private _setContainerPositions(): void {
        this._setDynamicPageHeight();
    }

    /** @hidden */
    private _propagatePropertiesToChildren(): void {
        this._headerCollapsible = this._pageSubheaderComponent?.collapsible;
        this._propagateSizeToChildren();
    }

    /** @hidden
     * Functionality handling column layout changes,
     * - recalculate height of content element
     * - recheck size depending on width of DynamicPage
     */
    private _listenToLayoutChange(): void {
        this._columnLayout.layoutChange.pipe(takeUntil(this._onDestroy$), delay(1500)).subscribe(() => {
            this.refreshSize();
            this._sizeChangeHandle();
        });
    }

    /** @hidden */
    private _propagateSizeToChildren(): void {
        if (this._headerComponent) {
            this._headerComponent.size = this.size;
        }
        this._setContainerPositions();
    }

    /** @hidden */
    private _listenOnCollapse(): void {
        this._dynamicPageService.subheaderVisibilityChange
            .pipe(takeUntil(this._onDestroy$))
            .subscribe(() => this._setContainerPositions());
    }

    /** @hidden */
    private _getCalculatedFullHeight(element: HTMLElement): string | null {
        if (!element) {
            return null;
        }
        const distanceFromTop = element.getBoundingClientRect().top;
        return 'calc(100vh - ' + (distanceFromTop + this.offset) + 'px)';
    }

    /** @hidden */
    private _sizeChangeHandle(): void {
        if (!this._elementRef || !this.autoResponsive) {
            return;
        }
        const dynamicPageWidth = this._elementRef.nativeElement.getBoundingClientRect().width;
        this._dynamicPageService.pixelsSizeChanged.next(dynamicPageWidth);
        const size = dynamicPageWidthToSize(dynamicPageWidth);

        if (size !== this.size) {
            this.size = size;
            this._cd.detectChanges();
        }
    }

    /** @hidden */
    private _addScrollListeners(): void {
        const tabElement = this._tabComponent?.contentContainer?.nativeElement;
        if (tabElement) {
            this._listenOnScroll(tabElement);
            return;
        }

        const contentElement = this._contentComponent.first?.elementRef?.nativeElement;
        if (contentElement) {
            this._listenOnScroll(contentElement);
        }
    }

    /** @hidden */
    private _listenOnScroll(element: HTMLElement): void {
        fromEvent(element, 'scroll')
            .pipe(debounceTime(10), takeUntil(this._onDestroy$))
            .subscribe(() => {
                const collapse =
                    !this._dynamicPageService.pinned.value &&
                    (element.scrollTop > 0 || element.scrollHeight <= element.clientHeight);
                this._dynamicPageService.collapsed.next(collapse);
            });
    }

    /** @hidden Listen for window resize and adjust tab and content positions accordingly */
    private _listenOnResize(): void {
        const listener = this._dynamicPageWrapper ? this._listenToWrapperResize() : this._listenToWindowResize();

        listener.pipe(debounceTime(100), takeUntil(this._onDestroy$)).subscribe(() => {
            this._setContainerPositions();
            this._sizeChangeHandle();
        });
    }

    /** @hidden */
    private _listenToWrapperResize(): Observable<ResizeObserverEntry[]> {
        return resizeObservable(this._dynamicPageWrapper.elementRef.nativeElement);
    }

    /** @hidden */
    private _listenToWindowResize(): Observable<ResizeObserverEntry[]> {
        return fromEvent(window, 'resize').pipe(map(() => []));
    }

    /** @hidden
     * set top position of DynamicPage on scrolling
     */
    private _setDynamicPageHeight(): void {
        if (!this._dynamicPageElement || !this.expandContent) {
            return;
        }
        const element = this._dynamicPageElement.nativeElement;
        this._renderer.setStyle(element, 'height', this._getCalculatedFullHeight(element));
    }

    /** @hidden */
    private _removeShadowWhenTabComponent(): void {
        if (!this._pageSubheaderComponent?.collapsible || !this._tabComponent) {
            return;
        }

        const pinCollapseShadowElement = this._pageSubheaderComponent?.pinCollapseContainer;

        if (pinCollapseShadowElement) {
            addClassNameToElement(
                this._renderer,
                pinCollapseShadowElement.nativeElement,
                DYNAMIC_PAGE_CLASS_NAME.dynamicPageCollapsibleHeaderPinCollapseNoShadow
            );
        }
    }

    /** @hidden */
    private _setContentFooterSpacer(): void {
        this._contentComponent.changes
            .pipe(startWith(this._contentComponent.toArray()), observeOn(asyncScheduler), takeUntil(this._onDestroy$))
            .subscribe((components) => {
                components.forEach((content, index) => {
                    /** show spacer when:
                     * a) footer + no tabs = only last
                     * b) footer + tabs, not stacked = all
                     * c) footer + tabs, stacked = only last
                     */
                    content._toggleSpacer(
                        this._footerComponent && (!this._tabComponent?.stackContent || index === components.length - 1)
                    );
                });
            });
    }
}
