import {
    AfterContentInit,
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChild,
    ContentChildren,
    DoCheck,
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
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, startWith, throttleTime } from 'rxjs/operators';

import { TabPanelComponent } from '@fundamental-ngx/core/tabs';
import { BaseComponent } from '@fundamental-ngx/platform/shared';
import { CLASS_NAME, DynamicPageBackgroundType, DynamicPageResponsiveSize } from './constants';
import { DynamicPageContentHostComponent } from './dynamic-page-content/dynamic-page-content-host.component';
import {
    DynamicPageContentComponent,
    DynamicPageTabChangeEvent
} from './dynamic-page-content/dynamic-page-content.component';
import { DynamicPageFooterComponent } from './dynamic-page-footer/dynamic-page-footer.component';
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
export class DynamicPageComponent extends BaseComponent implements AfterContentInit, AfterViewInit, DoCheck, OnDestroy {
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
     * @deprecated
     */
    @Input()
    offset = 0;

    /** reference to title component  */
    @ContentChild(DynamicPageTitleComponent)
    titleComponent: DynamicPageTitleComponent;

    /** reference to header component  */
    @ContentChild(DynamicPageHeaderComponent)
    headerComponent: DynamicPageHeaderComponent;

    /** reference to footer component  */
    @ContentChild(DynamicPageFooterComponent)
    footerComponent: DynamicPageFooterComponent;

    /** reference to content component  */
    @ContentChild(DynamicPageContentComponent)
    contentComponent: DynamicPageContentComponent;

    /** reference to content components list */
    @ContentChildren(DynamicPageContentComponent, { descendants: true })
    contentComponents: QueryList<DynamicPageContentComponent>;

    @ViewChildren(TabPanelComponent)
    dynamicPageTabs: QueryList<TabPanelComponent>;

    /** @hidden */
    @ViewChildren(DynamicPageContentHostComponent)
    _contentHostComponents: QueryList<DynamicPageContentHostComponent>;

    /**
     * @hidden
     * reference to tabbed content container
     */
    @ViewChild('tabsContainer')
    set _tabsContainer(tabsContainer: ElementRef<HTMLElement>) {
        if (!tabsContainer?.nativeElement) {
            return;
        }
        this._setTabStyles(tabsContainer.nativeElement);
    }

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

    /**
     * @hidden
     * On Scroll Content Subject
     */
    _onScrollContentSubject: Subject<Event> = new Subject();

    /**
     * @hidden
     */
    private _onScrollContent$: Observable<Event> = this._onScrollContentSubject.asObservable();

    /** @hidden */
    get _headerCollapsible(): boolean {
        return this.headerComponent?.collapsible;
    }

    /** @hidden */
    constructor(
        protected _cd: ChangeDetectorRef,
        private _elementRef: ElementRef<HTMLElement>,
        private _renderer: Renderer2,
        private _dynamicPageService: DynamicPageService
    ) {
        super(_cd);
    }

    /** @hidden */
    ngAfterContentInit(): void {
        this._inheritPageOptions();
        this._listenToContentComponentsListChanges();
    }

    /** @hidden */
    ngAfterViewInit(): void {
        if (this.headerComponent?.collapsible) {
            this._listenToContentScroll();
        }

        this._cd.detectChanges();
    }

    /** @hidden */
    ngDoCheck(): void {
        /** Used to detect changes in projected components that displayed using templates,
         * https://github.com/angular/angular/issues/44112
         */
        this._cd.markForCheck();
    }

    /**
     * Snap the header to expand or collapse based on scrolling. Uses CDKScrollable.
     */
    snapOnScroll(): void {
        // TODO: Do we really need it? Who uses it?
        this._listenToContentScroll();
    }

    /**
     * toggle the visibility of the header on click of title area.
     */
    toggleCollapse(): void {
        if (this._headerCollapsible) {
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

    /** @hidden */
    private _listenToContentScroll(): void {
        this._onScrollContent$
            .pipe(
                debounceTime(20),
                throttleTime(20),
                map((event) => (event.target as HTMLElement).scrollTop > 0),
                distinctUntilChanged()
            )
            .subscribe((collapse) => {
                if (collapse) {
                    this._dynamicPageService.collapseHeader();
                } else {
                    this._dynamicPageService.expandHeader();
                }
            });
    }

    /**
     * @hidden
     * set styles for tab labels
     */
    private _setTabStyles(tabsContainerElement: HTMLElement): void {
        const tabList: HTMLElement = tabsContainerElement.querySelector('.fd-tabs');

        if (!tabList) {
            return;
        }

        this._addClassNameToCustomElement(tabList, CLASS_NAME.dynamicPageTabs);
        this._addClassNameToCustomElement(tabList, CLASS_NAME.dynamicPageTabsAddShadow);
        this._renderer.setStyle(tabList, 'z-index', 1);

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
    private _setTabsSize(sizeType: DynamicPageResponsiveSize, element: Element): void {
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
     * handle tab changes and emit event
     */
    _handleTabChange(tabPanel: TabPanelComponent): void {
        // Emit Event
        this._emitTabChangeEvent(tabPanel);
    }

    /**
     * @hidden
     * fire tab change event
     */
    private _emitTabChangeEvent(tabPanel: TabPanelComponent): void {
        const event = new DynamicPageTabChangeEvent(this.contentComponent, tabPanel);
        this.contentComponent.tabChange.emit(event);
        this._cd.detectChanges();
    }

    /** @hidden */
    private _listenToContentComponentsListChanges(): void {
        this.contentComponents.changes.pipe(startWith(this.contentComponents)).subscribe(() => {
            this._createContentTabs();
        });
    }

    /** @hidden */
    private _createContentTabs(): void {
        const content = this.contentComponents.toArray();
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

    /** @hidden */
    private _isTabContentPresent(content: DynamicPageContentComponent[]): boolean {
        content.forEach((contentItem) => {
            if (contentItem.tabLabel) {
                this.isTabbed = true;
                return;
            }
        });
        return this.isTabbed;
    }

    /** @hidden */
    private _addClassNameToCustomElement(element: Element, className: string): void {
        addClassNameToElement(this._renderer, element, className);
    }

    /** @hidden */
    private _inheritPageOptions(): void {
        // Title
        this.titleComponent.background = this.background;
        this.titleComponent.size = this.size;
        // Header
        this.headerComponent.background = this.background;
        this.headerComponent.size = this.size;
        // Content
        this.contentComponents.forEach((contentCmp) => {
            contentCmp.background = this.background;
            contentCmp.size = this.size;
        });
    }
}
