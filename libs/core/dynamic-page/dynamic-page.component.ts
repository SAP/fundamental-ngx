import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    computed,
    ContentChild,
    ContentChildren,
    DestroyRef,
    ElementRef,
    inject,
    Inject,
    Input,
    Optional,
    QueryList,
    Renderer2,
    viewChild,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { Nullable, resizeObservable } from '@fundamental-ngx/cdk/utils';
import {
    FD_FLEXIBLE_COLUMN_LAYOUT_COMPONENT,
    FlexibleColumnLayoutComponent
} from '@fundamental-ngx/core/flexible-column-layout';
import { DYNAMIC_PAGE_CLASS_NAME, DynamicPageBackgroundType, DynamicPageResponsiveSize } from './constants';
import { DynamicPageContentComponent } from './dynamic-page-content/dynamic-page-content.component';
import { DynamicPageFooterComponent } from './dynamic-page-footer/dynamic-page-footer.component';
import { DynamicPageHeaderComponent } from './dynamic-page-header/header/dynamic-page-header.component';
import { DynamicPageSubheaderComponent } from './dynamic-page-header/subheader/dynamic-page-subheader.component';
import { DynamicPageWrapperDirective } from './dynamic-page-wrapper.directive';
import { DynamicPageService } from './dynamic-page.service';
import { addClassNameToElement, dynamicPageWidthToSize } from './utils';

import { CdkScrollable } from '@angular/cdk/overlay';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ScrollbarDirective } from '@fundamental-ngx/core/scrollbar';
import { FD_TABLIST, TabList } from '@fundamental-ngx/core/shared';
import { asyncScheduler, fromEvent, Observable, startWith } from 'rxjs';
import { debounceTime, map, observeOn } from 'rxjs/operators';
import { DynamicPage } from './dynamic-page.interface';
import { FD_DYNAMIC_PAGE } from './dynamic-page.tokens';

@Component({
    selector: 'fd-dynamic-page',
    templateUrl: './dynamic-page.component.html',
    styleUrl: './dynamic-page.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [
        DynamicPageService,
        {
            provide: FD_DYNAMIC_PAGE,
            useExisting: DynamicPageComponent
        }
    ],
    imports: [CdkScrollable, ScrollbarDirective]
})
export class DynamicPageComponent implements AfterViewInit, DynamicPage {
    /** Whether DynamicPage should snap on scroll */
    @Input() disableSnapOnScroll = false;

    /** aria label for the page */
    @Input() ariaLabel: Nullable<string>;

    /**
     * aria roledescription for the page
     * default: "Dynamic Page"
     *
     */
    @Input() ariaRoledescription = 'Dynamic Page';

    /**
     * sets background for content to `list`, `transparent`, or `solid` background color.
     * Default is `solid`.
     */
    @Input() background: DynamicPageBackgroundType = 'solid';

    /** Whether DynamicPage should have responsive sides spacing changing with Page window width.
     * max-width: 599px                         - small
     * min-width: 600px and max-width: 1023px   - medium
     * min-width: 1024px and max-width: 1439px  - large
     * min-width: 1440px                        - extra large
     */
    @Input() autoResponsive = true;

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

    /** Offset in PX
     * Should be added, when there is something else at the bottom and dynamic page is not expanded to bottom's corners
     */
    @Input() offset = 0;

    /**
     * Whether dynamic page should be expanded in whole page.
     */
    @Input() expandContent = true;

    /**
     * Whether dynamic page has position relative.
     * This is needed in cases where Dynamic Page is used in Flexible Column Layout and has a floating footer
     */
    @Input() positionRelative = false;

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
    @ContentChild(FD_TABLIST)
    _tabComponent: TabList;

    /** @hidden */
    @ViewChild('dynamicPageElement')
    _dynamicPageElement: ElementRef;

    /** @hidden */
    @ViewChild(ScrollbarDirective)
    _scrollbar: ScrollbarDirective;

    /** Whether the dynamic page is collapsed */
    collapsed = computed(() => this._dynamicPageService.collapsed());

    /** @hidden */
    _size: DynamicPageResponsiveSize = 'extra-large';

    /** @hidden */
    _headerCollapsible = true;

    /** @hidden */
    _isExpanded = computed(() => !this._dynamicPageService.collapsed());

    /** @hidden */
    private _headerButton = viewChild<ElementRef<HTMLSpanElement>>('headerButton');

    /** @hidden **/
    private readonly _destroyRef = inject(DestroyRef);

    /** @hidden */
    constructor(
        protected _cd: ChangeDetectorRef,
        private _elementRef: ElementRef<HTMLElement>,
        private _renderer: Renderer2,
        private _dynamicPageService: DynamicPageService,
        @Optional() @Inject(FD_FLEXIBLE_COLUMN_LAYOUT_COMPONENT) private _columnLayout: FlexibleColumnLayoutComponent,
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

        if (!this.disableSnapOnScroll && this._pageSubheaderComponent?.collapsible) {
            this._addScrollListeners();
        }

        if (this._columnLayout && this.autoResponsive) {
            this._listenToLayoutChange();
        }

        setTimeout(() => this._setContainerPositions());

        this._cd.detectChanges();
    }

    /** toggle the visibility of the header on click of title area. */
    toggleCollapse(): void {
        if (this._headerCollapsible) {
            this._dynamicPageService.toggleCollapsed();
            this._headerButton()?.nativeElement.focus();
        }
    }

    /**
     * Triggers recheck for spacing and sizing of elements inside DynamicPage.
     */
    refreshSize(): void {
        this._setContainerPositions();
        this._sizeChangeHandle();
    }

    /** @hidden */
    _getScrollElement(): HTMLElement | null {
        return this._tabComponent?.scrollableElement?.nativeElement || this._scrollbar?.elementRef?.nativeElement;
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
        this._columnLayout.layoutChange.pipe(debounceTime(50), takeUntilDestroyed(this._destroyRef)).subscribe(() => {
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
            .pipe(takeUntilDestroyed(this._destroyRef))
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
        this._dynamicPageService.pixelsSizeChanged.set(dynamicPageWidth);
        const size = dynamicPageWidthToSize(dynamicPageWidth);

        if (size !== this.size) {
            this.size = size;
            this._cd.detectChanges();
        }
    }

    /** @hidden */
    private _addScrollListeners(): void {
        const element = this._getScrollElement();
        if (element) {
            fromEvent(element, 'scroll')
                .pipe(debounceTime(10), takeUntilDestroyed(this._destroyRef))
                .subscribe(() => {
                    const collapse =
                        !this._dynamicPageService.pinned() &&
                        (element.scrollTop > 0 || element.scrollHeight <= element.clientHeight);
                    this._dynamicPageService.collapsed.set(collapse);
                });
        }
    }

    /** @hidden Listen for window resize and adjust tab and content positions accordingly */
    private _listenOnResize(): void {
        const listener = this._dynamicPageWrapper ? this._listenToWrapperResize() : this._listenToWindowResize();

        listener.pipe(debounceTime(100), takeUntilDestroyed(this._destroyRef)).subscribe(() => {
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
            .pipe(
                startWith(this._contentComponent.toArray()),
                observeOn(asyncScheduler),
                takeUntilDestroyed(this._destroyRef)
            )
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
