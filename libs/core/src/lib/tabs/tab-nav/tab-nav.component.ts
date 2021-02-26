import {
    AfterContentInit,
    ChangeDetectionStrategy,
    Component,
    ContentChildren,
    ElementRef,
    Input,
    OnDestroy,
    QueryList,
    ViewEncapsulation,
    OnChanges,
    OnInit, Optional
} from '@angular/core';
import { TabLinkDirective } from '../tab-link/tab-link.directive';
import { TabItemDirective } from '../tab-item/tab-item.directive';
import { TabsService } from '../tabs.service';
import { merge, Subject, Subscription } from 'rxjs';
import { TabModes, TabSizes } from '../tab-list.component';
import { applyCssClass, ContentDensityService, CssClassBuilder } from '../../utils/public_api';
import { filter, takeUntil } from 'rxjs/operators';

@Component({
    // tslint:disable-next-line:component-selector
    selector: '[fd-tab-nav]',
    template: `<ng-content></ng-content>`,
    providers: [TabsService],
    styleUrls: ['./tab-nav.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabNavComponent implements AfterContentInit, OnChanges, OnInit, OnDestroy, CssClassBuilder {
    /** Apply user custom styles */
    @Input()
    class: string;

    /**
     * Whether user wants to use tab component in certain mode. Modes available:
     * 'icon-only' | 'process' | 'filter'
     */
    @Input()
    mode: TabModes;

    /** Size of tab, it's mostly about adding spacing on tab container, available sizes 's' | 'm' | 'l' | 'xl' | 'xxl' */
    @Input()
    size: TabSizes = 'm';

    /** Whether user wants to use tab component in compact mode */
    @Input()
    compact: boolean = null;

    /** @hidden */
    @ContentChildren(TabLinkDirective)
    links: QueryList<TabLinkDirective>;

    /** @hidden */
    @ContentChildren(TabItemDirective)
    items: QueryList<TabItemDirective>;

    /** @hidden */
    private _subscriptions = new Subscription();

    /** An RxJS Subject that will kill the data stream upon component’s destruction (for unsubscribing)  */
    private readonly _onDestroy$: Subject<void> = new Subject<void>();

    /** An RxJS Subject that will kill the data stream upon queryList changes (for unsubscribing)  */
    private readonly _onRefresh$: Subject<void> = new Subject<void>();

    /** @hidden */
    constructor(
        private _tabsService: TabsService,
        private _elementRef: ElementRef,
        @Optional() private _contentDensityService: ContentDensityService
    ) {}

    /** @hidden */
    ngAfterContentInit(): void {
        this._refreshSubscription();
        this._listenOnTabSelect();
        this._listenOnContentQueryListChange();
    }

    /** @hidden */
    ngOnChanges(): void {
        this.buildComponentCssClass();
    }

    /** @hidden */
    ngOnInit(): void {
        if (this.compact === null && this._contentDensityService) {
            this._subscriptions.add(this._contentDensityService.contentDensity.subscribe(density => {
                this.compact = density === 'compact';
                this.buildComponentCssClass();
            }))
        }
        this.buildComponentCssClass();
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._subscriptions.unsubscribe();
        this._onDestroy$.next();
        this._onDestroy$.complete();
    }

    @applyCssClass
    /** CssClassBuilder interface implementation
     * function must return single string
     * function is responsible for order which css classes are applied
     */
    buildComponentCssClass(): string[] {
        return [
            `fd-tabs`,
            this.mode ? 'fd-tabs--' + this.mode : '',
            this.compact ? 'fd-tabs--compact' : '',
            `fd-tabs--${this.size}`,
            this.class
        ];
    }

    /** HasElementRef interface implementation
     * function used by applyCssClass and applyCssStyle decorators
     */
    elementRef(): ElementRef<any> {
        return this._elementRef;
    }

    /** Function that gives possibility to get all the link directives, with and without nav__item wrapper */
    get tabLinks(): TabLinkDirective[] {
        let tabLinks: TabLinkDirective[] = [];
        if (this.links) {
            tabLinks = tabLinks.concat(this.links.map((link) => link));
        }
        if (this.items) {
            tabLinks = tabLinks.concat(this.items.filter((item) => !!item.linkItem).map((item) => item.linkItem));
        }
        return tabLinks;
    }

    /**
     * Function to select a new tab from an index.
     * @param tabIndex Index of the tab to select.
     */
    selectTab(tabIndex: number): void {
        this.tabLinks[tabIndex].elementRef.nativeElement.click();
    }

    /** @hidden */
    private _listenOnTabSelect(): void {
        this._tabsService.tabSelected
            .pipe(
                takeUntil(this._onDestroy$),
                filter((index) => !this.tabLinks[index].disabled)
            )
            .subscribe((index) => this.selectTab(index));
    }

    /**
     * @hidden
     * Every time any of query is changed, ex. tab is removed or added
     * reference to keydown subscriptions handler is renewed
     */
    private _listenOnContentQueryListChange(): void {
        merge(this.links.changes, this.items.changes)
            .pipe(takeUntil(this._onDestroy$))
            .subscribe(() => this._refreshSubscription());
    }

    /** Whether any QueryList detects any changes */
    private _refreshSubscription(): void {
        /** Finish all of the streams, form before */
        this._onRefresh$.next();

        /** Merge refresh/destroy observables */
        const refreshObs = merge(this._onRefresh$, this._onDestroy$);

        this.tabLinks.forEach((tab: TabLinkDirective, index: number) => {
            tab.keyDown.pipe(takeUntil(refreshObs)).subscribe((event) =>
                this._tabsService.tabHeaderKeyHandler(
                    index,
                    event,
                    this.tabLinks.map((link) => link.elementRef.nativeElement)
                )
            );
        });
    }
}
