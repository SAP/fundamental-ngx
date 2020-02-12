import {
    AfterContentInit, ChangeDetectionStrategy,
    Component,
    ContentChildren, ElementRef,
    Input,
    OnDestroy,
    QueryList,
    ViewEncapsulation
} from '@angular/core';
import { TabLinkDirective } from '../tab-link/tab-link.directive';
import { TabItemDirective } from '../tab-item/tab-item.directive';
import { TabsService } from '../tabs.service';
import { merge, Subject } from 'rxjs';
import { TabModes, TabSizes } from '../tab-list.component';
import { applyCssClass, CssClassBuilder } from '../../utils/public_api';
import { takeUntil } from 'rxjs/operators';

@Component({
    // tslint:disable-next-line:component-selector
    selector: '[fd-tab-nav]',
    template: `
        <ng-content></ng-content>`,
    providers: [TabsService],
    styleUrls: ['./tab-nav.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabNavComponent implements AfterContentInit, OnDestroy, CssClassBuilder {

    /** @hidden */
    @ContentChildren(TabLinkDirective) links: QueryList<TabLinkDirective>;

    /** @hidden */
    @ContentChildren(TabItemDirective) items: QueryList<TabItemDirective>;

    /** An RxJS Subject that will kill the data stream upon component’s destruction (for unsubscribing)  */
    private readonly _onDestroy$: Subject<void> = new Subject<void>();

    /** An RxJS Subject that will kill the data stream upon queryList changes (for unsubscribing)  */
    private readonly _onRefresh$: Subject<void> = new Subject<void>();

    private _class: string = '';
    @Input()
    set class(userClass: string) {
        this._class = userClass;
        this.buildComponentCssClass();
    } // user's custom classes

    private _mode: TabModes;
    /**
     * Whether user wants to use tab component in certain mode. Modes available:
     * 'icon-only' | 'process' | 'filter'
     */
    @Input()
    set mode(mode: TabModes) {
        this._mode = mode;
        this.buildComponentCssClass();
    }

    private _size: TabSizes = 'm';
    /** Size of tab, it's mostly about adding spacing on tab container, available sizes 's' | 'm' | 'l' | 'xl' | 'xxl' */
    @Input()
    set size(size: TabSizes) {
        this._size = size;
        this.buildComponentCssClass();
    }

    private _compact: boolean;
    /** Whether user wants to use tab component in compact mode */
    @Input()
    set compact(compact: boolean) {
        this._compact = compact;
        this.buildComponentCssClass();
    }

    /** @hidden */
    constructor(
        private _tabsService: TabsService,
        private _elementRef: ElementRef
    ) {}

    /** Function that gives possibility to get all the link directives, with and without nav__item wrapper */
    public get tabLinks(): TabLinkDirective[] {
        let tabLinks: TabLinkDirective[] = [];
        if (this.links) {
            tabLinks = tabLinks.concat(this.links.map(link => link));
        }
        if (this.items) {
            tabLinks = tabLinks.concat(this.items.filter(item => !!item.linkItem).map(item => item.linkItem));
        }
        return tabLinks;
    }

    /** @hidden */
    public ngAfterContentInit(): void {
        this._refreshSubscription();
        this._listenOnTabSelect();
        this._listenOnContentQueryListChange();
        this.buildComponentCssClass();
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._onDestroy$.next();
        this._onDestroy$.complete();
    }

    /**
     * Function to select a new tab from an index.
     * @param tabIndex Index of the tab to select.
     */
    selectTab(tabIndex: number): void {
        this.tabLinks[tabIndex].elementRef.nativeElement.click();
    }

    @applyCssClass
    /** CssClassBuilder interface implementation
     * function must return single string
     * function is responsible for order which css classes are applied
     */
    buildComponentCssClass(): string {
        return [
            `fd-tabs`,
            this._mode ? ('fd-tabs--' + this._mode) : '',
            this._compact ? 'fd-tabs--compact' : '',
            `fd-tabs--${this._size}`,
            this._class
        ].filter(x => x !== '').join(' ');
    }

    /** HasElementRef interface implementation
     * function used by applyCssClass and applyCssStyle decorators
     */
    elementRef(): ElementRef<any> {
        return this._elementRef;
    }

    /** @hidden */
    private _listenOnTabSelect(): void {
        this._tabsService.tabSelected
            .pipe(takeUntil(this._onDestroy$))
            .subscribe(index => this.selectTab(index))
        ;
    }

    /**
     * @hidden
     * Every time any of query is changed, ex. tab is removed or added
     * reference to keydown subscriptions handler is renewed
     */
    private _listenOnContentQueryListChange(): void {
        merge(this.links.changes, this.items.changes)
            .pipe(takeUntil(this._onDestroy$))
            .subscribe(() => this._refreshSubscription())
        ;
    }

    /** Whether any QueryList detects any changes */
    private _refreshSubscription(): void {
        /** Finish all of the streams, form before */
        this._onRefresh$.next();

        /** Merge refresh/destroy observables */
        const refreshObs = merge(this._onRefresh$, this._onDestroy$);

        this.tabLinks.forEach((tab: TabLinkDirective, index: number) => {
            tab.keyDown
                .pipe(takeUntil(refreshObs))
                .subscribe(event =>
                    this._tabsService.tabHeaderKeyHandler(index, event, this.tabLinks.map(link => link.elementRef.nativeElement))
                )
        });
    }
}
