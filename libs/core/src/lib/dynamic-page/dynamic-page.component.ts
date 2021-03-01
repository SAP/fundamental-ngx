import {
    AfterContentInit,
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChild,
    ElementRef,
    HostBinding,
    Input,
    OnDestroy,
    Optional,
    Renderer2,
    ViewEncapsulation
} from '@angular/core';
import { CLASS_NAME, DynamicPageBackgroundType, DynamicPageResponsiveSize } from './constants';
import {
    DynamicPageContentComponent
} from './dynamic-page-content/dynamic-page-content.component';
import { DynamicPageSubheaderComponent } from './dynamic-page-header/subheader/dynamic-page-subheader.component';
import { DynamicPageHeaderComponent } from './dynamic-page-header/header/dynamic-page-header.component';
import { DynamicPageService } from './dynamic-page.service';
import { addClassNameToElement, dynamicPageWidthToSize } from './utils';
import { TabListComponent } from '../tabs/tab-list.component';
import { FlexibleColumnLayoutComponent } from '../flexible-column-layout/flexible-column-layout.component';

import { fromEvent, Subject } from 'rxjs';
import { debounceTime, delay, takeUntil } from 'rxjs/operators';

@Component({
    selector: 'fd-dynamic-page',
    templateUrl: './dynamic-page.component.html',
    styleUrls: ['./dynamic-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [DynamicPageService]
})
export class DynamicPageComponent implements AfterContentInit, AfterViewInit, OnDestroy {
    /** Page role  */
    @Input()
    @HostBinding('attr.role')
    role = 'region';

    /** aria label for the page */
    @Input()
    ariaLabel: string;

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

    /** @hidden reference to header component  */
    @ContentChild(DynamicPageSubheaderComponent)
    _pageSubheaderComponent: DynamicPageSubheaderComponent;

    /** @hidden reference to title component  */
    @ContentChild(DynamicPageHeaderComponent)
    _headerComponent: DynamicPageHeaderComponent;

    /** @hidden reference to content component  */
    @ContentChild(DynamicPageContentComponent)
    _contentComponent: DynamicPageContentComponent;

    /** @hidden reference to tab component */
    @ContentChild(TabListComponent)
    _tabComponent: TabListComponent;

    /** @hidden **/
    private readonly _onDestroy$: Subject<void> = new Subject<void>();

    /** @hidden */
    _headerCollapsible = true;

    /** @hidden */
    constructor(
        protected _cd: ChangeDetectorRef,
        private _elementRef: ElementRef<HTMLElement>,
        private _renderer: Renderer2,
        private _dynamicPageService: DynamicPageService,
        @Optional() private _columnLayout: FlexibleColumnLayoutComponent
    ) {}

    /** @hidden */
    ngAfterContentInit(): void {
        this._listenOnCollapse();
        this._propagatePropertiesToChildren();
        if (this._columnLayout && this.autoResponsive) {
            this._listenToLayoutChange();
        }
    }

    /**@hidden */
    ngAfterViewInit(): void {
        this._setContainerPositions();
        this._sizeChangeHandle();
        this._removeShadowWhenTabComponent();
        this._listenOnResize();
        if (this._pageSubheaderComponent?.collapsible) {
            this._addScrollListeners();
        }
    }

    /**@hidden */
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
        if (this._tabComponent) {
            this._setTabsPosition();
        } else {
            this._setContainerPosition();
        }
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
        this._columnLayout.layoutChange
            .pipe(
                takeUntil(this._onDestroy$),
                delay(1500)
            )
            .subscribe(_ => {
                this.refreshSize();
                this._sizeChangeHandle();
            })
        ;
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
            .pipe(
                takeUntil(this._onDestroy$)
            )
            .subscribe(_ => this._setContainerPositions())
        ;
    }

    /**@hidden */
    private _getCalculatedFullHeight(element: HTMLElement): string {
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
        }

        const contentElement = this._contentComponent?.elementRef?.nativeElement;
        if (contentElement) {
            this._listenOnScroll(contentElement);
        }
    }

    /** @hidden */
    private _listenOnScroll(element: HTMLElement): void {
        fromEvent(element, 'scroll')
            .pipe(debounceTime(10), takeUntil(this._onDestroy$))
            .subscribe(_ => {
                const collapse = !this._dynamicPageService.pinned.value && element.scrollTop > 0;
                this._dynamicPageService.collapsed.next(collapse);
            })
        ;
    }


    /** @hidden Listen for window resize and adjust tab and content positions accordingly */
    private _listenOnResize(): void {
        fromEvent(window, 'resize')
            .pipe(
                debounceTime(100),
                takeUntil(this._onDestroy$)
            ).subscribe(_ => {
                this._setContainerPositions();
                this._sizeChangeHandle();
            });
    }

    /**
     * @hidden
     * set top position of normal content on scrolling
     */
    private _setContainerPosition(): void {
        if (this._contentComponent) {
            const contentComponentElement = this._contentComponent.elementRef.nativeElement;
            this._renderer.setStyle(
                contentComponentElement,
                'height',
                this._getCalculatedFullHeight(contentComponentElement)
            );
        }
    }

    /**
     * @hidden
     * set position for tabs and tabbed content's position relative to the tabs on scrolling
     */
    private _setTabsPosition(): void {
        if (!this._tabComponent || !this._tabComponent.contentContainer) {
            return;
        }
        const element = this._tabComponent.contentContainer.nativeElement;
        this._renderer.setStyle(
            element,
            'height',
            this._getCalculatedFullHeight(element)
        );
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
                CLASS_NAME.dynamicPageCollapsibleHeaderPinCollapseNoShadow
            );
        }
    }
}
