import { CdkScrollable, ScrollDispatcher } from '@angular/cdk/overlay';
import {
    AfterContentInit,
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChild,
    ContentChildren,
    ElementRef,
    HostBinding,
    Input,
    NgZone,
    OnDestroy,
    QueryList,
    Renderer2,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { Subscription } from 'rxjs';
import { startWith } from 'rxjs/operators';

import { BaseComponent } from '../base';
import { DynamicPageBackgroundType, CLASS_NAME, DynamicPageResponsiveSize } from './constants';
import { DynamicPageContentComponent } from './dynamic-page-content/dynamic-page-content.component';
import { DynamicPageHeaderComponent } from './dynamic-page-header/header/dynamic-page-header.component';
import { DynamicPageTitleComponent } from './dynamic-page-header/title/dynamic-page-title.component';
import { DynamicPageService } from './dynamic-page.service';
import { addClassNameToElement } from './utils';

let dynamicPageId = 0;
@Component({
    selector: 'fdp-dynamic-page',
    templateUrl: './dynamic-page.component.html',
    styleUrls: ['./dynamic-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [DynamicPageService]
})
export class DynamicPageComponent extends BaseComponent implements AfterContentInit, AfterViewInit, OnDestroy {
    /** Dynamic Page ID with default value  */
    @Input()
    @HostBinding('attr.id')
    id = 'fdp-dynamic-page-id-' + dynamicPageId++;

    /** Page role  */
    @Input()
    @HostBinding('attr.role')
    role = 'region';

    /** aria label for the page */
    @Input()
    ariaLabel: string;

    /**
     * sets background for content to List, Transparent or Solid background color.
     * Default is `solid`.
     */
    @Input()
    background: DynamicPageBackgroundType = 'solid';

    /**
     * sets size which in turn adds corresponding padding for the size type.
     * size can be `small`, `medium`, `large`, or `extra-large`.
     */
    @Input()
    size: DynamicPageResponsiveSize = 'extra-large';

    /** reference to header component  */
    @ContentChild(DynamicPageHeaderComponent)
    headerComponent: DynamicPageHeaderComponent;

    /** reference to title component  */
    @ContentChild(DynamicPageTitleComponent)
    titleComponent: DynamicPageTitleComponent;

    /** reference to content component  */
    @ContentChild(DynamicPageContentComponent)
    childcontent: DynamicPageContentComponent;

    /** reference to content component to filter tabs */
    @ContentChildren(DynamicPageContentComponent, { descendants: true })
    tabbedContent: QueryList<DynamicPageContentComponent>;

    /**
     * @hidden
     * reference to header container
     */
    @ViewChild('header')
    header: ElementRef<HTMLElement>;

    /**
     * @hidden
     * reference to tabbed content container
     */
    @ViewChild('contentContainer')
    contentContainer: ElementRef<HTMLElement>;

    /**
     * track whether the header was toggled or not
     */
    isHeaderCollapsed = false;

    /**
     * @hidden
     * whether tabbed content is present in this page
     */
    isTabbed = false;

    /**
     * @hidden
     * holds the tab content
     */
    tabs: DynamicPageContentComponent[] = [];

    /** @hidden */
    private _subscriptions: Subscription = new Subscription();

    /**
     * subscription for when collapse value has changed
     */
    private _collapseValSubscription: Subscription;

    /**
     * @hidden
     * subscription for when content is scrolled
     */
    private _scrollSubscription: Subscription;

    /** @hidden */
    constructor(
        protected _cd: ChangeDetectorRef,
        private _elementRef: ElementRef<HTMLElement>,
        private _renderer: Renderer2,
        private _dynamicPageService: DynamicPageService,
        private scrollDispatcher: ScrollDispatcher,
        private zone: NgZone
    ) {
        super(_cd);
        this._collapseValSubscription = this._dynamicPageService.$collapseValue.subscribe((val) => {
            this._setTabsPosition();
            this._setContainerPosition();
            this._setTabContainerPosition();
            this._resetTabContainerTopPosition();
        });
    }

    /** @hidden */
    ngAfterContentInit(): void {
        this._listenToChildrenQueryListChanges();
        if (this.background) {
            this.titleComponent.background = this.background;
            this.headerComponent.background = this.background;
            this.childcontent.background = this.background;
        }
        if (this.size) {
            this.titleComponent.size = this.size;
            this.headerComponent.size = this.size;
            this.childcontent.size = this.size;
        }
    }

    /**@hidden */
    ngAfterViewInit(): void {
        this._setTabStyles();
        this._setToolbarStyles();
        this._setTabContainerPosition();
        this._setContainerPosition();

        this._subscriptions.add(
            this.tabbedContent.changes.subscribe(() => {
                this._setTabStyles();
                this._setTabContainerPosition();
            })
        );
        if (this.headerComponent?.collapsible) {
            this.snapOnScroll();
        }
        this._cd.detectChanges();
    }

    /**@hidden */
    ngOnDestroy(): void {
        this._collapseValSubscription.unsubscribe();
        this._scrollSubscription.unsubscribe();
        this._subscriptions.unsubscribe();
    }

    /**
     * Snap the header to expand or collapse based on scrolling. Uses CDKScrollable.
     */
    snapOnScroll(): void {
        this._scrollSubscription = this.scrollDispatcher.scrolled(10).subscribe((cdk: CdkScrollable) => {
            this.zone.run(() => {
                const scrollPosition = cdk.measureScrollOffset('top');
                this.header.nativeElement.style.position = 'fixed';
                this._setTabContainerPosition();

                // set tabs to sticky if present
                this._setTabsPosition();
                if (scrollPosition > 0) {
                    this._dynamicPageService.collapseHeader();
                } else {
                    this._dynamicPageService.expandHeader();
                    this._setTabContainerPosition();
                    this._setTabsPosition();
                    this._resetTabContainerTopPosition();
                }
            });
        });
    }

    /**
     * toggle the visibility of the header on click of title area.
     */
    toggleCollapse(): void {
        this._dynamicPageService.toggleHeader();
    }

    /**
     * get reference to this element
     */
    elementRef(): ElementRef<HTMLElement> {
        return this._elementRef;
    }

    private _setContainerPosition(): void {
        if (this.childcontent) {
            this.childcontent.getElementRef().nativeElement.style.top = this.header.nativeElement.offsetHeight + 'px';
            this.childcontent.getElementRef().nativeElement.style.position = 'relative';
        }
    }

    private _setTabsPosition(): void {
        const tabList: HTMLElement = this._elementRef.nativeElement.querySelector('.fd-tabs');
        if (tabList) {
            tabList.style.top = this.header.nativeElement.offsetHeight + 'px';
            tabList.style.position = 'fixed';
            tabList.style.left = '0';
            tabList.style.right = '0';
        }
    }
    private _setTabContainerPosition(): void {
        if (this.contentContainer) {
            this.contentContainer.nativeElement.style.top = this.header.nativeElement.offsetHeight + 'px';
        }
    }

    private _resetTabContainerTopPosition(): void {
        const tabList: HTMLElement = this._elementRef.nativeElement.querySelector('.fd-tabs');
        if (tabList) {
            this.tabs.forEach((element) => {
                element.contentTop = tabList.offsetHeight + 'px';
            });
        }
    }

    /**
     * @hidden
     * set styles for tab labels
     */
    private _setTabStyles(): void {
        const tabList = this._elementRef.nativeElement.querySelector('.fd-tabs');
        if (tabList) {
            this._addClassNameToCustomElement(tabList, CLASS_NAME.dynamicPageTabs);
            this._addClassNameToCustomElement(tabList, CLASS_NAME.dynamicPageTabsAddShadow);
            if (this.size) {
                this._setTabsSize(this.size, tabList);
            }
            if (this.headerComponent?.collapsible) {
                const pinCollapseShadowElement = this._elementRef.nativeElement.querySelector(
                    '.fd-dynamic-page__collapsible-header-visibility-container'
                );
                if (pinCollapseShadowElement) {
                    this._addClassNameToCustomElement(
                        pinCollapseShadowElement,
                        CLASS_NAME.dynamicPageCollapsibleHeaderPinCollapseNoShadow
                    );
                }
            }
        }
    }

    /**
     * @hidden
     * add size classes to tabs
     * @param sizeType
     * @param element
     */
    _setTabsSize(sizeType: DynamicPageResponsiveSize, element: Element): void {
        switch (sizeType) {
            case 'small':
                this._addClassNameToCustomElement(element, CLASS_NAME.dynamicPageTabsSmall);
                break;
            case 'medium':
                this._addClassNameToCustomElement(element, CLASS_NAME.dynamicPageTabsMedium);

                break;
            case 'large':
                this._addClassNameToCustomElement(element, CLASS_NAME.dynamicPageTabsLarge);
                break;
            case 'extra-large':
            default:
                this._addClassNameToCustomElement(element, CLASS_NAME.dynamicPageTabsExtraLarge);
                break;
        }
    }

    /**
     * @hidden
     * add classes to projected toolbars
     */
    private _setToolbarStyles(): void {
        // adds global actions classes to its toolbar
        const globalToolbarEl = this._elementRef.nativeElement.querySelector(
            'fdp-dynamic-page-global-actions .fd-toolbar'
        );
        if (globalToolbarEl) {
            addClassNameToElement(this._renderer, globalToolbarEl, CLASS_NAME.dynamicPageGlobalActions);
        }

        const layoutToolbarEl = this._elementRef.nativeElement.querySelector(
            'fdp-dynamic-page-layout-actions .fd-toolbar'
        );
        if (layoutToolbarEl) {
            addClassNameToElement(this._renderer, layoutToolbarEl, CLASS_NAME.dynamicPageGlobalActions);
            addClassNameToElement(this._renderer, layoutToolbarEl, CLASS_NAME.dynamicPageLayoutActions);
        }
    }

    /** @hidden */
    private _listenToChildrenQueryListChanges(): void {
        this.tabbedContent.changes.pipe(startWith(this.tabbedContent)).subscribe(() => {
            this._createContent();
        });
    }

    /** @hidden */
    private _createContent(): void {
        const content = this.tabbedContent.toArray();
        // reset array
        this.tabs = [];
        if (content) {
            content.forEach((contentItem) => {
                if (!contentItem.tabLabel) {
                    if (this.isTabbed) {
                        throw new Error('At least one element is already tabbed, please provide a `tabLabel`');
                    }
                    this.isTabbed = false;
                } else {
                    this.isTabbed = true;
                    this.tabs.push(contentItem);
                }
            });
        }
    }

    /**@hidden */
    private _addClassNameToCustomElement(element: Element, className: string): void {
        addClassNameToElement(this._renderer, element, className);
    }
}
