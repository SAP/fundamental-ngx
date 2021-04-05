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
    OnDestroy,
    QueryList,
    Renderer2,
    ViewChild,
    ViewChildren,
    ViewEncapsulation
} from '@angular/core';
import { TabPanelComponent } from '@fundamental-ngx/core';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime, startWith, throttleTime } from 'rxjs/operators';
import { BaseComponent } from '../base';
import { CLASS_NAME, DynamicPageBackgroundType, DynamicPageResponsiveSize } from './constants';
import {
    DynamicPageContentComponent,
    DynamicPageTabChangeEvent
} from './dynamic-page-content/dynamic-page-content.component';
import { DynamicPageTabbedContentComponent } from './dynamic-page-content/dynamic-page-tabbed-content.component';
import { DynamicPageHeaderComponent } from './dynamic-page-header/header/dynamic-page-header.component';
import { DynamicPageTitleComponent } from './dynamic-page-header/title/dynamic-page-title.component';
import { DynamicPageService } from './dynamic-page.service';
import { addClassNameToElement } from './utils';

@Component({
    selector: 'fdp-dynamic-page',
    templateUrl: './dynamic-page.component.html',
    styleUrls: ['./dynamic-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [DynamicPageService]
})
export class DynamicPageComponent extends BaseComponent implements AfterContentInit, AfterViewInit, OnDestroy {
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

    /**
     * sets size which in turn adds corresponding padding for the size type.
     * size can be `small`, `medium`, `large`, or `extra-large`.
     */
    @Input()
    size: DynamicPageResponsiveSize = 'extra-large';

    /**
     * user provided offset in px
     */
    @Input()
    offset = 0;

    /** reference to header component  */
    @ContentChild(DynamicPageHeaderComponent)
    headerComponent: DynamicPageHeaderComponent;

    /** reference to title component  */
    @ContentChild(DynamicPageTitleComponent)
    titleComponent: DynamicPageTitleComponent;

    /** reference to content component  */
    @ContentChild(DynamicPageContentComponent)
    contentComponent: DynamicPageContentComponent;

    /** reference to content component to filter tabs */
    @ContentChildren(DynamicPageContentComponent, { descendants: true })
    tabbedContent: QueryList<DynamicPageContentComponent>;

    /** reference to content component to filter tabs */
    @ViewChildren(DynamicPageTabbedContentComponent)
    tabContents: QueryList<DynamicPageTabbedContentComponent>;

    @ViewChildren(TabPanelComponent)
    dynamicPageTabs: QueryList<TabPanelComponent>;

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
     * tracks whether the header was toggled or not
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
    private _distanceFromTop = 0;

    /**
     * subscription for when collapse value has changed
     */
    private _collapseValSubscription: Subscription = new Subscription();

    /** @hidden */
    public headerCollapsible = true;

    /** @hidden */
    constructor(
        protected _cd: ChangeDetectorRef,
        private _elementRef: ElementRef<HTMLElement>,
        private _renderer: Renderer2,
        private _dynamicPageService: DynamicPageService
    ) {
        super(_cd);
        if (this._collapseValSubscription) {
            this._collapseValSubscription.unsubscribe();
        }
        this._collapseValSubscription = this._dynamicPageService.$collapseValue.subscribe((val) => {
            this.setContainerPositions();
        });
    }

    /** @hidden */
    ngAfterContentInit(): void {
        this._listenToTabbedContentQueryListChanges();
        if (this.background) {
            this.titleComponent.background = this.background;
            this.headerComponent.background = this.background;
            this.contentComponent.background = this.background;
        }
        if (this.size) {
            this.titleComponent.size = this.size;
            this.headerComponent.size = this.size;
            this.contentComponent.size = this.size;
        }
        this.headerCollapsible = this.headerComponent.collapsible;
    }

    /**@hidden */
    ngAfterViewInit(): void {
        this._setTabStyles();
        this._setToolbarStyles();
        this.setContainerPositions();

        this._subscriptions.add(
            this.tabbedContent.changes.subscribe(() => {
                this._setTabStyles();
            })
        );
        if (this.headerComponent?.collapsible) {
            this._listenOnScroll();
            this._listenOnResize();
        }
        this._cd.detectChanges();
    }

    /**@hidden */
    ngOnDestroy(): void {
        this._collapseValSubscription.unsubscribe();
        this._subscriptions.unsubscribe();
    }

    /**
     * Set the positions of the tabs and content with respect to the window
     */
    setContainerPositions(): void {
        this._setTabsPosition();
        this._setContainerPosition();
    }

    /**
     * Snap the header to expand or collapse based on scrolling. Uses CDKScrollable.
     */
    snapOnScroll(): void {
        this._listenOnScroll();
    }

    /**
     * toggle the visibility of the header on click of title area.
     */
    toggleCollapse(): void {
        if (this.headerCollapsible) {
            this._dynamicPageService.toggleHeader();
        }
    }

    /**
     * marks the dynamic page tab as selected when the id of the tab is passed
     */
    setSelectedTab(id: string): void {
        if (!(id && this.dynamicPageTabs)) {
            return;
        }

        this.dynamicPageTabs.forEach((element) => {
            if (element.id === id) {
                element.open(true);
            }
        });
    }

    /**
     * get reference to this element
     */
    elementRef(): ElementRef<HTMLElement> {
        return this._elementRef;
    }

    /**
     * @hidden
     * set top position of normal content on scrolling
     */
    private _setContainerPosition(): void {
        if (this.contentComponent) {
            const contentComponentElement = this.contentComponent.getElementRef().nativeElement;
            this._distanceFromTop = window.pageYOffset + contentComponentElement.getBoundingClientRect().top;
            contentComponentElement.style.height = this._getCalculatedHeight();
            this._addClassNameToCustomElement(contentComponentElement, 'content-sticker');
        }
    }

    /**@hidden */
    private _getCalculatedHeight(): string {
        return 'calc(100vh - ' + (this._distanceFromTop + this.offset) + 'px)';
    }

    /** @hidden */
    private _listenOnScroll(): void {
        if (this.contentComponent) {
            const contentComponentElement = this.contentComponent.getElementRef().nativeElement;

            this._subscriptions.add(
                fromEvent(contentComponentElement, 'scroll')
                    .pipe(debounceTime(20), throttleTime(20))
                    .subscribe(() => {
                        if (contentComponentElement.scrollTop > 0) {
                            this._dynamicPageService.collapseHeader();
                        } else {
                            this._dynamicPageService.expandHeader();
                        }
                    })
            );
        }
    }

    /** @hidden Listen for window resize and adjust tab and content positions accordingly */
    private _listenOnResize(): void {
        this._subscriptions.add(
            fromEvent(window, 'resize')
                .pipe(debounceTime(60))
                .subscribe(() => {
                    this.setContainerPositions();
                })
        );
    }

    /**
     * @hidden
     * set position for tabs and tabbed content's position relative to the tabs on scrolling
     */
    private _setTabsPosition(): void {
        if (!this.contentContainer) {
            return;
        }
        const tabList: HTMLElement = this.contentContainer.nativeElement.querySelector('.fd-tabs');
        if (!tabList) {
            return;
        }

        const tabContent = this.tabContents?.toArray();
        if (tabContent) {
            tabContent.forEach((contentItem) => {
                const element: HTMLElement = contentItem
                    .getElementRef()
                    .nativeElement.querySelector('.fd-dynamic-page__content');
                if (element) {
                    if (this._distanceFromTop === 0) {
                        this._distanceFromTop = window.pageYOffset + element.getBoundingClientRect().top;
                    }
                    element.style.height = this._getCalculatedHeight();
                }
            });
        }
    }

    /**
     * @hidden
     * set styles for tab labels
     */
    private _setTabStyles(): void {
        if (!this.contentContainer) {
            return;
        }
        const tabList: HTMLElement = this.contentContainer.nativeElement.querySelector('.fd-tabs');
        if (!tabList) {
            return;
        }

        this._addClassNameToCustomElement(tabList, CLASS_NAME.dynamicPageTabs);
        this._addClassNameToCustomElement(tabList, CLASS_NAME.dynamicPageTabsAddShadow);
        this._renderer.setStyle(tabList, 'z-index', 1);

        if (this.header) {
            this._renderer.setStyle(this.header.nativeElement, 'z-index', 2);
        }

        if (this.size) {
            this._setTabsSize(this.size, tabList);
        }

        if (!this.headerComponent?.collapsible) {
            return;
        }

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
            addClassNameToElement(this._renderer, layoutToolbarEl, CLASS_NAME.dynamicPageLayoutActions);
        }

        const actionsContainerEl = this._elementRef.nativeElement.querySelector(
            '.' + CLASS_NAME.dynamicPageActionsContainer
        );
        // set toolbar sizes
        this._setToolbarsSize(this.size, actionsContainerEl, globalToolbarEl, layoutToolbarEl);
    }

    /**
     * @hidden
     * add size classes to toolbars
     * @param sizeType
     * @param element
     */
    _setToolbarsSize(
        sizeType: DynamicPageResponsiveSize,
        actionsContainer: Element,
        globalActions: Element,
        layoutActions: Element
    ): void {
        switch (sizeType) {
            case 'small':
                if (globalActions) {
                    this._addClassNameToCustomElement(globalActions, CLASS_NAME.dynamicPageGlobalActionsToolbarSmall);
                }
                break;
            case 'medium':
                if (actionsContainer) {
                    this._addClassNameToCustomElement(actionsContainer, CLASS_NAME.dynamicPageActionsContainerMedium);
                    const globalActionsEl: HTMLElement = actionsContainer.querySelector(
                        'fdp-dynamic-page-global-actions'
                    );
                    const layoutActionsEl: HTMLElement = actionsContainer.querySelector(
                        'fdp-dynamic-page-layout-actions'
                    );
                    if (globalActionsEl) {
                        globalActionsEl.style.order = '2';
                    }
                    if (layoutActionsEl) {
                        layoutActionsEl.style.order = '1';
                    }
                }
                if (globalActions) {
                    this._addClassNameToCustomElement(globalActions, CLASS_NAME.dynamicPageGlobalActionsToolbarMedium);
                }
                if (layoutActions) {
                    this._addClassNameToCustomElement(layoutActions, CLASS_NAME.dynamicPageLayoutActionsToolbarMedium);
                }
                break;
            case 'large':
            case 'extra-large':
            default:
                break;
        }
    }

    /** @hidden
     * handle tab changes and emit event
     */
    _handleTabChange(tabPanel: TabPanelComponent): void {
        const event = new DynamicPageTabChangeEvent(this.contentComponent, tabPanel);
        this.contentComponent.tabChange.emit(event);
        this._cd.detectChanges();
    }

    /** @hidden */
    private _listenToTabbedContentQueryListChanges(): void {
        this.tabbedContent.changes.pipe(startWith(this.tabbedContent)).subscribe(() => {
            this._createContent();
        });
    }

    /** @hidden */
    private _createContent(): void {
        const content = this.tabbedContent.toArray();
        // reset array
        this.tabs = [];
        if (!this._isTabContentPresent(content)) {
            if (content.length > 1) {
                throw new Error(
                    'Cannot have more than one content section. Use `tabLabel` to have a tabbed navigation.'
                );
            }
            return;
        }

        if (content) {
            content.forEach((contentItem) => {
                if (!contentItem.tabLabel && this.isTabbed) {
                    throw new Error('At least one element is already tabbed, please provide a `tabLabel`.');
                } else {
                    this.tabs.push(contentItem);
                }
            });
        }
    }

    /**@hidden */
    private _isTabContentPresent(content: DynamicPageContentComponent[]): boolean {
        content.forEach((contentItem) => {
            if (contentItem.tabLabel) {
                this.isTabbed = true;
                return;
            }
        });
        return this.isTabbed;
    }

    /**@hidden */
    private _addClassNameToCustomElement(element: Element, className: string): void {
        addClassNameToElement(this._renderer, element, className);
    }
}
