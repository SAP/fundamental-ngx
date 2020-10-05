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
    OnInit,
    QueryList,
    Renderer2,
    ViewChild,
    ViewChildren,
    ViewEncapsulation
} from '@angular/core';
import { Subscription } from 'rxjs';
import { startWith } from 'rxjs/operators';

import { BaseComponent } from '../base';
import { BACKGROUND_TYPE, CLASS_NAME, RESPONSIVE_SIZE } from './constants';
import { DynamicPageContentComponent } from './dynamic-page-content/dynamic-page-content.component';
import { DynamicPageTabbedContentComponent } from './dynamic-page-content/dynamic-page-tabbed-content.component';
import { DynamicPageHeaderComponent } from './dynamic-page-header/header/dynamic-page-header.component';
import { DynamicPageTitleComponent } from './dynamic-page-header/title/dynamic-page-title.component';
import { DynamicPageConfig } from './dynamic-page.config';
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
export class DynamicPageComponent extends BaseComponent implements OnInit, AfterContentInit, AfterViewInit, OnDestroy {
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
    background: BACKGROUND_TYPE = 'solid';

    /**
     * sets size which in turn adds corresponding padding for the size type.
     * size can be `small`, `medium`, `large`, or `extra-large`.
     */
    @Input()
    size: RESPONSIVE_SIZE = 'extra-large';

    /** Reference to tab content children to add styles */
    @ViewChildren('tabContent')
    tabContent: QueryList<ElementRef<HTMLElement>>;

    /** reference to header component  */
    @ContentChild(DynamicPageHeaderComponent)
    headerComponent: DynamicPageHeaderComponent;

    /** reference to title component  */
    @ContentChild(DynamicPageTitleComponent)
    titleComponent: DynamicPageTitleComponent;

    /** reference to content component  */
    @ViewChild(DynamicPageContentComponent)
    userContent: DynamicPageContentComponent;

    /** reference to content component  */
    @ContentChild(DynamicPageContentComponent)
    childcontent: DynamicPageContentComponent;

    /** reference to internal tabbed component  */
    @ViewChild(DynamicPageTabbedContentComponent)
    childTabContent: DynamicPageTabbedContentComponent;

    /** reference to content component to filter tabs */
    @ContentChildren(DynamicPageContentComponent, { descendants: true })
    tabbedContent: QueryList<DynamicPageContentComponent>;

    /** Reference to the CdkScrollable instance that wraps the scrollable content. */
    get scrollable(): CdkScrollable {
        return this.userContent || this.childcontent;
    }
    /**
     * track whether the header was toggled or not
     */
    toggledVal = false;

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
     * @hidden
     * subscription for when toggle header is called
     */
    private _toggleSubscription: Subscription;

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
        protected _dynamicPageConfig: DynamicPageConfig,
        private scrollDispatcher: ScrollDispatcher,
        private zone: NgZone
    ) {
        super(_cd);
        this._toggleSubscription = this._dynamicPageService.$toggle.subscribe((val) => {
            this.toggledVal = val;
        });
    }

    /** @hidden */
    ngOnInit(): void {
        this._addClassNameToHostElement(CLASS_NAME.dynamicPage);
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
        this._listenToChildrenQueryListChanges();

        this._subscriptions.add(
            this.tabbedContent.changes.subscribe(() => {
                this._listenToChildrenQueryListChanges();
                this._setTabStyles();
            })
        );
        if (this.headerComponent?.collapsible) {
            this.snapOnScroll();
        }
        this._cd.detectChanges();
    }

    /**@hidden */
    ngOnDestroy(): void {
        this.scrollDispatcher.deregister(this.scrollable);
        this._toggleSubscription.unsubscribe();
        this._scrollSubscription.unsubscribe();
        this._subscriptions.unsubscribe();
    }

    /**
     * Snap the header to expand or collapse based on scrolling. Uses CDKScrollable.
     */
    snapOnScroll(): void {
        if (!this.scrollDispatcher.scrollContainers.has(this.scrollable)) {
            this.scrollDispatcher.register(this.scrollable);
            const scrollContainers = this.scrollDispatcher.getAncestorScrollContainers(this.scrollable.getElementRef());
            scrollContainers.forEach((element) => {
                if (element !== this.scrollable) {
                    this.scrollDispatcher.deregister(element);
                }
            });
            this._scrollSubscription = this.scrollDispatcher.scrolled(10).subscribe((cdk: CdkScrollable) => {
                this.zone.run(() => {
                    const scrollPosition = cdk.measureScrollOffset('top');
                    if (scrollPosition > 0) {
                        this._dynamicPageService.collapseHeader();
                    } else {
                        this._dynamicPageService.expandHeader();
                    }
                });
            });
        }
    }

    /**
     * toggle the visibility of the header on click of title area.
     */
    toggleCollapse(): any {
        this._dynamicPageService.toggleHeader(!this.toggledVal);
    }

    /**
     * get reference to this element
     */
    elementRef(): ElementRef<HTMLElement> {
        return this._elementRef;
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
            if (this.background && this.childTabContent) {
                // prropagate the background attribute to the tabbed content component
                this.childTabContent.background = this.background;
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
    _setTabsSize(sizeType: RESPONSIVE_SIZE, element: Element): any {
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

        // reset arrays
        this.tabs = [];
        if (content) {
            content.forEach((contentItem) => {
                if (!contentItem.tabLabel) {
                    this.isTabbed = false;
                } else {
                    this.isTabbed = true;
                    this.tabs.push(contentItem);
                }
            });
        }
    }

    /**@hidden */
    private _addClassNameToHostElement(className: string): void {
        addClassNameToElement(this._renderer, this._elementRef.nativeElement, className);
    }

    /**@hidden */
    private _addClassNameToCustomElement(element: Element, className: string): void {
        addClassNameToElement(this._renderer, element, className);
    }
}
