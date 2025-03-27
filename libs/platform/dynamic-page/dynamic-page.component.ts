import {
    AfterContentInit,
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    computed,
    ContentChild,
    ContentChildren,
    DestroyRef,
    DoCheck,
    ElementRef,
    EventEmitter,
    HostBinding,
    inject,
    input,
    Input,
    OnDestroy,
    Optional,
    Output,
    QueryList,
    Signal,
    signal,
    ViewChild,
    ViewChildren,
    ViewEncapsulation
} from '@angular/core';
import { startWith } from 'rxjs/operators';

import { NgTemplateOutlet } from '@angular/common';
import { HasElementRef } from '@fundamental-ngx/cdk/utils';
import {
    DynamicPageComponent as CoreDynamicPageComponent,
    DynamicPageContentComponent as CoreDynamicPageContentComponent,
    DynamicPageFooterComponent as CoreDynamicPageFooterComponent,
    DynamicPageHeaderComponent as CoreDynamicPageHeaderComponent,
    DynamicPage,
    DynamicPageBreadcrumbComponent,
    DynamicPageGlobalActionsComponent,
    DynamicPageHeaderSubtitleDirective,
    DynamicPageHeaderTitleDirective,
    DynamicPageLayoutActionsComponent,
    DynamicPageSubheaderComponent,
    DynamicPageTitleContentComponent,
    FD_DYNAMIC_PAGE,
    patchHeaderI18nTexts
} from '@fundamental-ngx/core/dynamic-page';
import { FacetComponent } from '@fundamental-ngx/core/facets';
import { FD_TABLIST, HeadingLevel, TabList } from '@fundamental-ngx/core/shared';
import { FD_LANGUAGE } from '@fundamental-ngx/i18n';
import { IconTabBarComponent, IconTabBarItem, IconTabBarTabComponent } from '@fundamental-ngx/platform/icon-tab-bar';
import { BaseComponent } from '@fundamental-ngx/platform/shared';
import { DynamicPageBackgroundType, DynamicPageResponsiveSize } from './constants';
import { DynamicPageContentHostComponent } from './dynamic-page-content/dynamic-page-content-host.component';
import { DynamicPageContentComponent } from './dynamic-page-content/dynamic-page-content.component';
import { DynamicPageFooterComponent } from './dynamic-page-footer/dynamic-page-footer.component';
import { DynamicPageHeaderComponent } from './dynamic-page-header/header/dynamic-page-header.component';
import { DynamicPageTitleComponent } from './dynamic-page-header/title/dynamic-page-title.component';
import { DynamicPageConfig } from './dynamic-page.config';
import { FDP_DYNAMIC_PAGE } from './dynamic-page.tokens';
import { PlatformDynamicPage } from './platform-dynamic-page.interface';

/** Dynamic Page tab change event */
export class DynamicPageTabChangeEvent {
    /**
     * Dynamic Page tab change event
     * @param source Dynamic Page component
     * @param payload Tab component
     */
    constructor(
        public source: DynamicPageContentComponent,
        public payload: IconTabBarItem
    ) {}
}

@Component({
    selector: 'fdp-dynamic-page',
    templateUrl: './dynamic-page.component.html',
    styleUrl: './dynamic-page.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [
        {
            provide: FD_LANGUAGE,
            useFactory: patchHeaderI18nTexts,
            deps: [[new Optional(), DynamicPageConfig]]
        },
        {
            provide: FDP_DYNAMIC_PAGE,
            useExisting: DynamicPageComponent
        }
    ],
    imports: [
        CoreDynamicPageComponent,
        CoreDynamicPageHeaderComponent,
        NgTemplateOutlet,
        DynamicPageHeaderSubtitleDirective,
        DynamicPageHeaderTitleDirective,
        DynamicPageTitleContentComponent,
        FacetComponent,
        DynamicPageGlobalActionsComponent,
        DynamicPageLayoutActionsComponent,
        DynamicPageSubheaderComponent,
        IconTabBarComponent,
        IconTabBarTabComponent,
        CoreDynamicPageFooterComponent,
        CoreDynamicPageContentComponent,
        DynamicPageBreadcrumbComponent
    ]
})
export class DynamicPageComponent
    extends BaseComponent
    implements AfterContentInit, AfterViewInit, DoCheck, OnDestroy, PlatformDynamicPage, HasElementRef
{
    /** Whether DynamicPage should snap on scroll */
    @Input()
    disableSnapOnScroll = false;
    /** Page role  */
    @Input()
    @HostBinding('attr.role')
    role = 'region';

    /** Whether or not tabs should be stacked. */
    @Input()
    stackContent = false;

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
     * provided offset in px
     * Should be added, when there is something else at the bottom and dynamic page is not expanded to bottom's corners
     */
    @Input()
    offset = 0;

    /** Whether DynamicPage should have responsive sides spacing changing with Page window width.
     * max-width: 599px                         - small
     * min-width: 600px and max-width: 1023px   - medium
     * min-width: 1024px and max-width: 1439px  - large
     * min-width: 1440px                        - extra large
     */
    @Input()
    autoResponsive = true;

    /**
     * Whether dynamic page should be expanded in whole page.
     */
    @Input()
    expandContent = true;

    /**
     * Tab Change event
     */
    @Output()
    tabChange = new EventEmitter<DynamicPageTabChangeEvent>();

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

    /** @hidden */
    @ViewChild(FD_DYNAMIC_PAGE)
    _dynamicPageComponent: DynamicPage;

    /** @hidden */
    @ViewChild(FD_TABLIST)
    _tabListComponent: TabList;

    /** Reference to tab items components */
    @ViewChildren(IconTabBarTabComponent)
    dynamicPageTabs: QueryList<IconTabBarTabComponent>;

    /** @hidden */
    @ViewChildren(DynamicPageContentHostComponent)
    _contentHostComponents: QueryList<DynamicPageContentHostComponent>;

    /** Whether Dynamic page is collapsed */
    collapsed: Signal<boolean> = signal(false);

    /**
     * @hidden
     * whether tabbed content is present in this page
     */
    _isTabbed = false;

    /**
     * @hidden
     * holds the tab content
     */
    _tabs: DynamicPageContentComponent[] = [];

    /**
     * Heading level of the dynamic page header title.
     */
    headingLevel = input<HeadingLevel>(2);

    /** @hidden */
    _headingLevel = computed(() => Number.parseInt(`${this.headingLevel}`.replace(/\D/g, ''), 10));

    /** @hidden */
    readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

    /** @hidden */
    protected _destroyRef = inject(DestroyRef);

    /** toggle the visibility of the header on click of title area. */
    toggleCollapse(): void {
        this._dynamicPageComponent.toggleCollapse();
    }

    /** Triggers recheck for spacing and sizing of elements inside DynamicPage. */
    refreshSize(): void {
        this._dynamicPageComponent.refreshSize();
    }

    /** @hidden */
    ngAfterContentInit(): void {
        this._listenToContentComponentsListChanges();
    }

    /** @hidden */
    ngAfterViewInit(): void {
        this.detectChanges();

        this._tabListComponent?.headerContainer?.nativeElement.classList.add('fd-dynamic-page__tabs');
        this.collapsed = this._dynamicPageComponent.collapsed;
    }

    /** @hidden */
    ngDoCheck(): void {
        /** Used to detect changes in projected components that displayed using templates,
         * https://github.com/angular/angular/issues/44112
         */
        this.markForCheck();
    }

    /**
     * marks the dynamic page tab as selected when the id of the tab is passed
     */
    setSelectedTab(id: string): void {
        this._tabListComponent.selectTab(id);
    }

    /** @hidden */
    _onSelectedTabChange(event: IconTabBarItem): void {
        const content = this.contentComponents.find((contentComponent) => contentComponent.id === event.id);

        content && this.tabChange.emit(new DynamicPageTabChangeEvent(content, event));
    }

    /** @hidden */
    private _listenToContentComponentsListChanges(): void {
        this.contentComponents.changes.pipe(startWith(this.contentComponents)).subscribe(() => {
            this._createContentTabs();
        });
    }

    /** @hidden */
    private _createContentTabs(): void {
        const contentComponents = this.contentComponents.toArray();

        // reset array
        this._tabs = [];

        if (!this._isTabContentPresent(contentComponents)) {
            if (contentComponents.length > 1) {
                throw new Error(
                    'Cannot have more than one content section. Use `tabLabel` to have a tabbed navigation.'
                );
            }

            return;
        }

        if (contentComponents) {
            contentComponents.forEach((contentItem) => {
                if (!contentItem.tabLabel && this._isTabbed) {
                    throw new Error('At least one element is already tabbed, please provide a `tabLabel`.');
                } else {
                    this._tabs.push(contentItem);
                }
            });
        }
    }

    /** @hidden */
    private _isTabContentPresent(contentComponents: DynamicPageContentComponent[]): boolean {
        contentComponents.forEach((contentComponent) => {
            if (contentComponent.tabLabel) {
                this._isTabbed = true;
                return;
            }
        });

        return this._isTabbed;
    }
}
