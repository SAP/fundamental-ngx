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
    NgZone,
    OnInit,
    QueryList,
    Renderer2,
    ViewChild,
    ViewEncapsulation,
    OnDestroy,
    AfterViewChecked,
    Input,
    HostBinding,
    TemplateRef,
    ViewChildren,
    HostListener
} from '@angular/core';
import { TabListComponent, KeyUtil } from '@fundamental-ngx/core';
import { startWith, debounceTime } from 'rxjs/operators';
import { BaseComponent } from '../base';
import { CLASS_NAME, DYNAMIC_PAGE_CHILD_TOKEN, BACKGROUND_TYPE, RESPONSIVE_SIZE } from './constants';
import { DynamicPageContentComponent } from './dynamic-page-content/dynamic-page-content.component';
import { DynamicPageService } from './dynamic-page.service';
import { DynamicPageHeaderComponent } from './dynamic-page-header/header/dynamic-page-header.component';
import { DynamicPageTitleComponent } from './dynamic-page-header/title/dynamic-page-title.component';
import { Subscription, fromEvent } from 'rxjs';
import { DynamicPageConfig } from './dynamic-page.config';
import { DynamicPageTabbedContentComponent } from './dynamic-page-content/dynamic-page-tabbed-content.component';

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
    @ContentChildren(DynamicPageContentComponent, { descendants: true })
    tabbedContent: QueryList<DynamicPageContentComponent>;

    toggledVal = false;

    /** Dynamic Page ID with default value  */
    @Input()
    @HostBinding('attr.id')
    id = 'fdp-dynamic-page-id-' + dynamicPageId++;

    /** Page role  */
    @Input()
    @HostBinding('attr.role')
    role = 'region';

    // _content: DynamicPageTabbedContentComponent[] = [];
    _tabs: DynamicPageContentComponent[] = [];

    isTabbed = false;

    /** @hidden */
    @ViewChild('pageWindow')
    windowElement: ElementRef;

    /** Reference to page header content */
    @ViewChildren('tabContent')
    tabContent: QueryList<ElementRef<HTMLElement>>;

    @ContentChild(DynamicPageHeaderComponent)
    headerComponent: DynamicPageHeaderComponent;

    @ContentChild(DynamicPageTitleComponent)
    titleComponent: DynamicPageTitleComponent;

    @ViewChild(DynamicPageContentComponent)
    _userContent: DynamicPageContentComponent;

    @ContentChild(DynamicPageContentComponent) childcontent: DynamicPageContentComponent;

    @ViewChild(DynamicPageTabbedContentComponent) childTabContent: DynamicPageTabbedContentComponent;

    /** Reference to the CdkScrollable instance that wraps the scrollable content. */
    get scrollable(): CdkScrollable {
        return this._userContent || this.childcontent;
    }
    // @ViewChild('dynPage')
    // childDiv: ElementRef;
    tabLabels: string[];

    // _tabListComponentElementRef: ElementRef<HTMLElement>;
    @Input()
    ariaLabel: string;

    isVisible = true;
    toggleSubscription: Subscription;

    scrollSubscription: Subscription;

    /** @hidden */
    // @ContentChild(TabListComponent)
    // tabList: TabListComponent; // for adding shadow styles

    /** @hidden */
    // @ContentChild(TabListComponent, { read: ElementRef })
    // set tabListElementRef(tabListComponentElementRef: ElementRef<HTMLElement>) {
    //     console.log('in here ******' + tabListComponentElementRef);
    //     this._tabListComponentElementRef = tabListComponentElementRef;
    //     this._setTabListElementClass(tabListComponentElementRef?.nativeElement);
    // }

    @Input()
    summaryLine: string;

    @Input()
    background: BACKGROUND_TYPE = 'solid';

    @Input()
    size: RESPONSIVE_SIZE = 'extra-large';

    /** @hidden */
    contentTemplate: TemplateRef<any>;

    /** @hidden */
    private _subscriptions: Subscription = new Subscription();

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
        this.toggleSubscription = this._dynamicPageService.$toggle.subscribe((val) => {
            console.log('subscriibied to dyn page serviicee' + val);
            this.toggledVal = val;
        });
        // this._dynamicPageService.$expand.subscribe(() => {
        //     console.log('content suubscriibed to expand');
        //     this.toggledVal = false;
        // });
        // this._dynamicPageService.$collapse.subscribe((val) => {
        //     console.log('content suubscriibed to collapse');
        //     this.toggledVal = true;
        // });
    }

    /** @hidden */
    ngOnInit(): void {
        this._addClassNameToHostElement(CLASS_NAME.dynamicPage);
        // if (this.isTabbed) {
        // this.scrollDispatcher.scrolled().subscribe((scrollable: CdkScrollable) => {
        //     if (scrollable) {
        //         console.log('Scroll occurred, from:');
        //         console.log(scrollable.getElementRef().nativeElement);
        //     }
        // });
        // }
    }

    /** @hidden */
    ngAfterContentInit(): void {
        this._listenToChildrenQueryListChanges();
        // console.log('header component height is' + this.headerComponent?.elementRef().nativeElement.offsetHeight);
        if (this.background) {
            this.titleComponent.background = this.background;
            this.headerComponent.background = this.background;
            this.childcontent.background = this.background;
            // this.childTabContent.background = this.background;
            this._addStylesToElement(this.background);
        }
        if (this.size) {
            this.titleComponent.size = this.size;
            this.headerComponent.size = this.size;
            this.childcontent.size = this.size; // todo need contentchildren for getting thiis to work on all chiildren contents
            // this.childTabContent.size = this.size;
            this._addStylesToElement(this.size);
        }
    }

    // ngAfterViewChecked(): void {
    //     console.log('ngAfterViewChecked');
    //     // if (this.headerComponent?.collapsible) {

    //     // }
    // }

    // /** @hidden */
    // private _setContentTemplate(): void {
    //     this.childrenContent.forEach((child) => {
    //         if (child.activeTab === 0) {
    //             this.contentTemplate = child.contentTemplateRef;
    //         }
    //     });
    // }

    ngAfterViewInit(): void {
        // this.childrenContent.forEach((child) => {
        //     if (child.tabLabel) {
        //         this.isTabbed = true;
        //         this._tabContent.tabLabels.push(child.tabLabel);
        //     }
        // });
        // this._addClassNameToHostElement(CLASS_NAME.dynamicPage);
        if (this.background) {
            this._addStylesToElement(this.background);
        }
        if (this.size) {
            this._addStylesToElement(this.size);
        }
        this._listenToChildrenQueryListChanges();

        this._subscriptions.add(
            this.tabbedContent.changes.subscribe(() => {
                this._listenToChildrenQueryListChanges();
                this._setTabStyles();

                //     this.childrenContent.forEach((child) => {
                //         if (child.tabLabel) {
                //             this.isTabbed = true;
                //             this._tabContent.tabLabels.push(child.tabLabel);
                //         }
                //     });
            })
        );
        if (this.headerComponent?.collapsible) {
            this.snapOnScroll();
        }

        this._setTabStyles();
        // this._setTabListElementClass(this._tabListComponentElementRef?.nativeElement);
        // if (this.background) {
        //     this._setContentBackgroundStyles(this.background);
        // }
        // if (this.size) {
        //     this._setContentSize(this.size);
        // }
        // this._listenOnWindowResize();
        this._cd.detectChanges();

        // this.scrollDispatcher.ancestorScrolled(this.childDiv).subscribe((scrollable: CdkScrollable) => {
        //     if (scrollable) {
        //         console.log('The ancestor has scrolled, from:');
        //         console.log(scrollable.getElementRef().nativeElement);
        //     }
        // });
        // if (this.isTabbed) {
        // keeping a settimeout  now, but maybe place it ini aftercontentchecked / afterviewchecked
        // Get all the information about the scrolling component registered in the ScrollDispatcher
        /*  if (this.headerComponent?.collapsible) {
            console.log('tabbed');
            this.scrollDispatcher.register(this.scrollable);
            console.log(this.scrollDispatcher.scrollContainers);
            const scrollContainers = this.scrollDispatcher.getAncestorScrollContainers(this.scrollable.getElementRef()); */
        // const scrollableElementIds = scrollContainers.map(
        // const scrollableElements = scrollContainers.map(
        //     // (scrollable) => (scrollable === this.scrollable)? scrollable.getElementRef().nativeElement.id
        //     (scrollable) => (scrollable)
        // );
        /* console.log('ancestor');
            // gettinig the iincorrect scrollable here.. what changed?
            console.log(scrollContainers);
            scrollContainers.forEach((element) => {
                if (element !== this.scrollable) {
                    console.log('deregisteerring ' + element.getElementRef().nativeElement.id);

                    this.scrollDispatcher.deregister(element);
                }
            });
            console.log(this.scrollDispatcher.scrollContainers);*/
        // this.zone.run(() => {
        //     const scroll$ = fromEvent(this.dynPage.nativeElement, 'scroll').pipe(
        //         throttleTime(10),
        //         map(() => this.dynPage.nativeElement.pageYOffset),
        //         pairwise(),
        //         map(([y1, y2]): Direction => (y2 < y1 ? Direction.Up : Direction.Down)),
        //         distinctUntilChanged(),
        //         share()
        //     );
        //     const scrollUp$ = scroll$.pipe(filter((direction) => direction === Direction.Up));
        //     const scrollDown$ = scroll$.pipe(filter((direction) => direction === Direction.Down));
        //     scrollUp$.subscribe(() => {
        //         console.log('UPPPP');
        //         this.isVisible = true;
        //         this._dynamicPageService.toggleHeader(!this.toggledVal);
        //     });
        //     scrollDown$.subscribe(() => (this.isVisible = false));
        //     console.log(scroll$);
        // });
        // this.scrollDispatcher.register(this.scrollable);
        // console.log('has?' + this.scrollDispatcher.scrollContainers.has(this.scrollable));
        // console.log(this.scrollDispatcher.getAncestorScrollContainers(this.contentDyn));
        // this.scrollDispatcher.ancestorScrolled(this.contentDyn).subscribe((cdk: CdkScrollable) => {
        //     console.log(' parent scrolleed');
        // });
        // this.scrollable.elementScrolled().subscribe((scrolled) => {
        //     this.zone.run(() => {
        //         // Your update here!
        //         console.log('scrolled' + scrolled);
        //         // improperly used, currently detecting doc scroll.
        //     });
        // });
        // issue with scrolldispatcyer itself? read mat design
        /* this.scrollDispatcher.scrolled(10).subscribe((cdk: CdkScrollable) => {
                this.zone.run(() => {
                    // Your update here!
                    console.log('scrolled');
                    console.log(cdk);

                    // improperly used, currently detecting doc scroll.
                    // console.log(
                    //     'header component now height is' + this.headerComponent?.elementRef().nativeElement.offsetHeight
                    // );

                    const scrollPosition = cdk.measureScrollOffset('top');
                    console.log(scrollPosition);
                    if (scrollPosition > 0) {
                        console.log('collapsing header');

                        // this._dynamicPageService.toggleHeader(!this.toggledVal);
                        this._dynamicPageService.collapseHeader();
                    } else {
                        // if (this.toggledVal) {
                        this._dynamicPageService.expandHeader();
                        // } else {
                        //     this._dynamicPageService.collapseHeader();
                        // }
                    }
                });
            });*/
        // fromEvent(this.dynPage.nativeElement, 'scroll')
        //     .pipe(
        //         throttleTime(10),
        //         map(() => window.pageYOffset),
        //         pairwise(),
        //         map(
        //             ([y1, y2]): Direction => {
        //                 return y2 < y1 ? Direction.Up : Direction.Down;
        //             }
        //         ),
        //         distinctUntilChanged(),
        //         share()
        //     )
        //     .subscribe((direction) => {
        //         this.isVisible = direction === Direction.Up;
        //         console.log('direction is ' + this.isVisible);
        //         this._cd.markForCheck();
        //     });
        // }
    }
    snapOnScroll(): void {
        if (!this.scrollDispatcher.scrollContainers.has(this.scrollable)) {
            this.scrollDispatcher.register(this.scrollable);
            console.log(this.scrollDispatcher.scrollContainers);
            const scrollContainers = this.scrollDispatcher.getAncestorScrollContainers(this.scrollable.getElementRef());
            // console.log('ancestor');
            // gettinig the iincorrect scrollable here.. what changed?
            // console.log(scrollContainers);
            scrollContainers.forEach((element) => {
                if (element !== this.scrollable) {
                    // console.log('deregisteerring ' + element.getElementRef().nativeElement.id);

                    this.scrollDispatcher.deregister(element);
                }
            });
            // console.log(this.scrollDispatcher.scrollContainers);
            this.scrollSubscription = this.scrollDispatcher.scrolled(10).subscribe((cdk: CdkScrollable) => {
                this.zone.run(() => {
                    // Your update here!
                    console.log('scrolled');
                    console.log(cdk);

                    // improperly used, currently detecting doc scroll.
                    // console.log(
                    //     'header component now height is' + this.headerComponent?.elementRef().nativeElement.offsetHeight
                    // );
                    // console.log(this.headerComponent?.collapsible + ' collapsiiblee?');

                    const scrollPosition = cdk.measureScrollOffset('top');
                    console.log(scrollPosition);
                    if (scrollPosition > 20) {
                        console.log('collapsing header');

                        // this._dynamicPageService.toggleHeader(!this.toggledVal);
                        this._dynamicPageService.collapseHeader();
                    } else {
                        // if (this.toggledVal) {
                        this._dynamicPageService.expandHeader();
                        // } else {
                        //     this._dynamicPageService.collapseHeader();
                        // }
                    }
                });
            });
        }
    }

    toggleCollapse(): any {
        console.log('in parent to collapse title');
        this._dynamicPageService.toggleHeader(!this.toggledVal);
        // this.headerComponent.toggleCollapse();
    }

    _setTabStyles(): void {
        const tabList = this._elementRef.nativeElement.querySelector('.fd-tabs');
        if (tabList) {
            console.log('valid tabs eelement');
            this._renderer.addClass(tabList, CLASS_NAME.dynamicPageTabs);
            this._renderer.addClass(tabList, CLASS_NAME.dynamicPageTabsAddShadow);
            if (this.size) {
                this._setTabsSize(this.size, tabList);
            }
            if (this.background) {
                console.log('changiing tab content bg here to ' + this.background);

                this.childTabContent.background = this.background;
            }
            if (this.headerComponent?.collapsible) {
                const pinCollapseShadowElement = this._elementRef.nativeElement.querySelector(
                    '.fd-dynamic-page__header-visibility-container'
                );
                if (pinCollapseShadowElement) {
                    this._renderer.addClass(pinCollapseShadowElement, CLASS_NAME.dynamicPageHeaderPinCollapseNoShadow);
                }
            }
        }
    }
    _setContentBackgroundStyles(background: BACKGROUND_TYPE): any {
        const hostElement = this._elementRef.nativeElement.querySelector('fd-dynamic-page__content');
        switch (background) {
            case 'transparent':
                this._renderer.addClass(hostElement, CLASS_NAME.dynamicPageContentTransparentBg);
                break;
            case 'list':
                this._renderer.addClass(hostElement, CLASS_NAME.dynamicPageContentListBg);
                break;
            case 'solid':
            default:
                // this._removeClassNameToHostElement(hostElement, CLASS_NAME.dynamicPageContentTransparentBg);
                // this._removeClassNameToHostElement(hostElement, CLASS_NAME.dynamicPageContentListBg);
                break;
        }
    }
    _setContentSize(sizeType: RESPONSIVE_SIZE): any {
        const hostElement = this._elementRef.nativeElement.querySelector('.fd-dynamic-page__content');
        switch (sizeType) {
            case 'small':
                this._renderer.addClass(hostElement, CLASS_NAME.dynamicPageContentAreaSmall);
                break;
            case 'medium':
                this._renderer.addClass(hostElement, CLASS_NAME.dynamicPageContentAreaMedium);
                break;
            case 'large':
                this._renderer.addClass(hostElement, CLASS_NAME.dynamicPageContentAreaLarge);
                break;
            case 'extra-large':
            default:
                this._renderer.addClass(hostElement, CLASS_NAME.dynamicPageContentAreaExtraLarge);
                break;
        }
    }
    _setTabsSize(sizeType: RESPONSIVE_SIZE, element: Element): any {
        switch (sizeType) {
            case 'small':
                this._renderer.addClass(element, CLASS_NAME.dynamicPageTabsSmall);
                break;
            case 'medium':
                this._renderer.addClass(element, CLASS_NAME.dynamicPageTabsMedium);

                break;
            case 'large':
                this._renderer.addClass(element, CLASS_NAME.dynamicPageTabsLarge);
                break;
            case 'extra-large':
            default:
                this._renderer.addClass(element, CLASS_NAME.dynamicPageTabsExtraLarge);
                break;
        }
    }

    private _addStylesToElement(property: BACKGROUND_TYPE | RESPONSIVE_SIZE): void {
        this.tabContent?.forEach((element) => {
            // this._addClassNameToElement('scroll-tab-container', element);
            // todo: also remove shadow from header here
            // this._renderer.addClass(hostElement, CLASS_NAME.dynamicPageContentAreaExtraLarge);
            // this._addClassNameToElement(CLASS_NAME.dynamicPageContentAreaExtraLarge, element);

            switch (property) {
                case 'transparent':
                    if (element) {
                        this._addClassNameToElement(CLASS_NAME.dynamicPageContentTransparentBg, element);
                    }
                    break;
                case 'list':
                    if (element) {
                        this._addClassNameToElement(CLASS_NAME.dynamicPageContentListBg, element);
                    }
                    break;
                case 'small':
                    if (element) {
                        this._addClassNameToElement(CLASS_NAME.dynamicPageContentAreaSmall, element);
                    }
                    break;
                case 'medium':
                    if (element) {
                        this._addClassNameToElement(CLASS_NAME.dynamicPageContentAreaMedium, element);
                    }
                    break;
                case 'large':
                    if (element) {
                        this._addClassNameToElement(CLASS_NAME.dynamicPageContentAreaLarge, element);
                    }
                    break;
                case 'extra-large':
                    if (element) {
                        this._addClassNameToElement(CLASS_NAME.dynamicPageContentAreaExtraLarge, element);
                    }
                    break;
            }
        });
    }

    // @HostListener('keydown', ['$event'])
    handleFocus(event: KeyboardEvent): void {
        if (KeyUtil.isKey(event, 'Tab')) {
            // open header here
            console.log(' open header ((((()))))))');
        }
    }

    /** @hidden Listen on window resize and adjust padding */
    private _listenOnWindowResize(): void {
        this._subscriptions.add(
            fromEvent(window, 'resize')
                .pipe(debounceTime(100))
                .subscribe(() => this.adjustResponsivePadding())
        );
    }
    /** @hidden Determine Dialog padding size based on Dialogs window width */
    adjustResponsivePadding(): void {
        const dialogWidth = this.windowElement.nativeElement.getBoundingClientRect().width;
        if (dialogWidth < 599) {
            this.size = 'small';
        } else if (dialogWidth < 1023) {
            this.size = 'medium';
        } else if (dialogWidth < 1439) {
            this.size = 'large';
        } else {
            this.size = 'extra-large';
        }
        this._cd.detectChanges();
    }

    /** @hidden */
    private _setTabListElementClass(tabListComponentElement: HTMLElement): void {
        if (!tabListComponentElement) {
            return;
        }
        const tabList = tabListComponentElement.querySelector('ul');
        this._renderer.addClass(tabList, CLASS_NAME.dynamicPageTabsAddShadow);
    }

    // /** @hidden */
    private _listenToChildrenQueryListChanges(): void {
        this.tabbedContent.changes.pipe(startWith(this.tabbedContent)).subscribe(() => {
            this._createContent();
        });
    }

    /** @hidden */
    private _createContent(): void {
        const content = this.tabbedContent.toArray();

        // reset arrays
        this._tabs = [];
        // this._content = [];
        console.log('in content ' + content.length);

        if (content) {
            content.forEach((contentItem, index) => {
                if (!contentItem.tabLabel) {
                    // return;
                    this.isTabbed = false;
                    // this.contentTemplate = contentItem.contentTemplate;
                    // this._content.push(contentItem);
                } else {
                    this.isTabbed = true;
                    this._tabs.push(contentItem);
                    if (contentItem.activeTab === index) {
                        console.log('active is ' + index);
                        this.contentTemplate = contentItem.contentTemplate;
                    }
                }
            });
        }

        console.log(this.contentTemplate);

        // this.tabbedContent.forEach((tabItem) => {
        //     if (tabItem.tab.expanded) { // if this tab is opened
        //         this.contentTemplate = tabItem.content.contentTemplate;
        //     }
        // });
    }
    ngOnDestroy(): void {
        this.scrollDispatcher.deregister(this.scrollable);
        this.toggleSubscription.unsubscribe();
        this.scrollSubscription.unsubscribe();
        this._subscriptions.unsubscribe();
    }

    /**@hidden */
    private _addClassNameToHostElement(className: string): void {
        this._renderer.addClass(this._elementRef.nativeElement, className);
    }
    /**@hidden */
    private _addClassNameToTabElement(className: string): void {
        this._renderer.addClass(this._elementRef.nativeElement, className);
    }
    /**@hidden */
    private _removeClassNameToHostElement(className: string): void {
        this._renderer.removeClass(this._elementRef.nativeElement, className);
    }
    private _addClassNameToElement(className: string, element: ElementRef<HTMLElement>): void {
        this._renderer.addClass(element.nativeElement, className);
    }
}

// add shadow to tabs
