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
    ViewChildren,
    ViewEncapsulation
} from '@angular/core';
import { startWith } from 'rxjs/operators';

import { TabPanelComponent } from '@fundamental-ngx/core/tabs';
import { BaseComponent } from '@fundamental-ngx/platform/shared';
import { DynamicPageBackgroundType, DynamicPageResponsiveSize } from './constants';
import { DynamicPageContentHostComponent } from './dynamic-page-content/dynamic-page-content-host.component';
import { DynamicPageContentComponent } from './dynamic-page-content/dynamic-page-content.component';
import { DynamicPageFooterComponent } from './dynamic-page-footer/dynamic-page-footer.component';
import { DynamicPageHeaderComponent } from './dynamic-page-header/header/dynamic-page-header.component';
import { DynamicPageTitleComponent } from './dynamic-page-header/title/dynamic-page-title.component';
import { DynamicPageService } from './dynamic-page.service';

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
     * whether tabbed content is present in this page
     */
    isTabbed = false;

    /**
     * @hidden
     * holds the tab content
     */
    tabs: DynamicPageContentComponent[] = [];

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
        this._listenToContentComponentsListChanges();
    }

    /** @hidden */
    ngAfterViewInit(): void {
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
}
