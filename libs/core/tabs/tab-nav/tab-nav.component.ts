import { FocusKeyManager } from '@angular/cdk/a11y';
import { LEFT_ARROW, RIGHT_ARROW } from '@angular/cdk/keycodes';
import {
    AfterContentInit,
    ChangeDetectionStrategy,
    Component,
    ContentChildren,
    ElementRef,
    HostListener,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    Optional,
    QueryList,
    ViewEncapsulation
} from '@angular/core';
import { CssClassBuilder, KeyUtil, RtlService, applyCssClass } from '@fundamental-ngx/cdk/utils';
import { ContentDensityObserver, contentDensityObserverProviders } from '@fundamental-ngx/core/content-density';
import { Subject, Subscription, merge } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TabItemDirective } from '../tab-item/tab-item.directive';
import { TabLinkDirective } from '../tab-link/tab-link.directive';
import { TabModes, TabSizes } from '../tab-list.component';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: '[fd-tab-nav]',
    template: ` <ng-content></ng-content>`,
    providers: [contentDensityObserverProviders()],
    styleUrl: './tab-nav.component.scss',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true
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

    /** @hidden */
    @ContentChildren(TabLinkDirective, { descendants: true })
    links: QueryList<TabLinkDirective>;

    /** @hidden */
    @ContentChildren(TabItemDirective, { descendants: true })
    items: QueryList<TabItemDirective>;

    /** @hidden */
    private _subscriptions = new Subscription();

    /** An RxJS Subject that will kill the data stream upon component’s destruction (for unsubscribing)  */
    private readonly _onDestroy$: Subject<void> = new Subject<void>();

    /** @hidden */
    private _keyboardEventsManager: FocusKeyManager<TabLinkDirective>;

    /** @hidden */
    private _dir: 'ltr' | 'rtl' = this._rtlService?.rtl.value ? 'rtl' : 'ltr';

    /** @hidden */
    constructor(
        public readonly elementRef: ElementRef,
        private readonly _contentDensityObserver: ContentDensityObserver,
        @Optional() private readonly _rtlService: RtlService
    ) {
        this._contentDensityObserver.subscribe();
    }

    /** @hidden */
    ngAfterContentInit(): void {
        this._setupKeyManager();
        this._refreshSubscription();
        this._listenOnContentQueryListChange();
    }

    /** @hidden */
    ngOnChanges(): void {
        this.buildComponentCssClass();
    }

    /** @hidden */
    ngOnInit(): void {
        this.buildComponentCssClass();
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._subscriptions.unsubscribe();
        this._onDestroy$.next();
        this._onDestroy$.complete();
        this._keyboardEventsManager?.destroy();
    }

    /** @hidden
     * CssClassBuilder interface implementation
     * function must return single string
     * function is responsible for order which css classes are applied
     */
    @applyCssClass
    buildComponentCssClass(): string[] {
        return [`fd-tabs`, this.mode ? 'fd-tabs--' + this.mode : '', `fd-tabs--${this.size}`, this.class];
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
        this._subscriptions.unsubscribe();
        this._subscriptions = new Subscription();
        this._listenToFocusedLinks();

        this.links.changes.pipe(takeUntil(this._onDestroy$)).subscribe(() => {
            this._listenToFocusedLinks();
        });
    }

    /** @hidden */
    private _listenToFocusedLinks(): void {
        const links = this.links.toArray();
        links.forEach((link) => {
            this._subscriptions.add(
                link.focused.subscribe(() => {
                    this._keyboardEventsManager.setActiveItem(links.findIndex((item) => item === link));
                })
            );
        });
    }

    /** @hidden */
    private _setupKeyManager(): void {
        this._keyboardEventsManager?.destroy();
        this._keyboardEventsManager = new FocusKeyManager(this.links).withWrap().withHorizontalOrientation(this._dir);

        this._rtlService?.rtl.pipe(takeUntil(this._onDestroy$)).subscribe((isRtl) => {
            this._keyboardEventsManager.withHorizontalOrientation(isRtl ? 'rtl' : 'ltr');
        });
    }

    /** @hidden */
    @HostListener('keyup', ['$event'])
    private _keyUpHandler(event: KeyboardEvent): void {
        if (KeyUtil.isKeyCode(event, [LEFT_ARROW, RIGHT_ARROW])) {
            this._keyboardEventsManager.onKeydown(event);
        }
    }
}
