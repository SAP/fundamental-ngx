import {
    AfterContentInit,
    AfterViewChecked,
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChild,
    ContentChildren,
    ElementRef,
    forwardRef,
    Inject,
    Input,
    OnDestroy,
    OnInit,
    Optional,
    QueryList,
    Renderer2,
    SkipSelf,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { DYNAMIC_PAGE_HEADER_TOKEN, DynamicPageHeader } from '@fundamental-ngx/core/shared';

import {
    applyCssClass,
    CssClassBuilder,
    DestroyedService,
    OVERFLOW_PRIORITY_SCORE,
    OverflowPriority
} from '@fundamental-ngx/cdk/utils';
import { BehaviorSubject, fromEvent, of, startWith, Subscription } from 'rxjs';
import { debounceTime, delay, distinctUntilChanged, filter, takeUntil } from 'rxjs/operators';
import { TitleToken } from '@fundamental-ngx/core/title';
import {
    ContentDensityMode,
    ContentDensityObserver,
    contentDensityObserverProviders
} from '@fundamental-ngx/core/content-density';
import { ToolbarItem } from './abstract-toolbar-item.class';

const ELEMENT_MARGIN = 8;
const OVERFLOW_SPACE = 50 + 2 * ELEMENT_MARGIN;
const MAX_CONTENT_SIZE = 99999999;

export type ToolbarType = 'solid' | 'transparent' | 'auto' | 'info';

export const enum OverflowPriorityEnum {
    ALWAYS = 'always',
    NEVER = 'never',
    LOW = 'low',
    HIGH = 'high',
    DISAPPEAR = 'disappear'
}

@Component({
    selector: 'fd-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        contentDensityObserverProviders({
            defaultContentDensity: ContentDensityMode.COMPACT
        }),
        DestroyedService
    ]
})
export class ToolbarComponent
    implements OnInit, AfterViewInit, OnDestroy, AfterViewChecked, CssClassBuilder, AfterContentInit
{
    /**
     * The ID of the toolbar title
     * */
    @Input()
    titleId: string;

    /** Property allows user to pass additional class
     */
    @Input()
    class: string;

    /** Determines if overflow button should be visible
     * Default value: false
     */
    @Input()
    shouldOverflow = false;

    /** Determines the type of toolbar
     * Available options: 'solid' | 'transparent' | 'auto' | 'info'
     * Default value: 'solid'
     */
    @Input()
    fdType: ToolbarType = 'solid';

    /** @deprecated */
    @Input()
    hasTitle = false;

    /** The title for the toolbar. */
    @Input()
    title: string;

    /** Determines if toolbar should has active state (only when fdType == 'info')
     * Default value: false
     */
    @Input()
    active = false;

    /** Determines if toolbar should clear border bottom
     * Default value: false
     */
    @Input()
    clearBorder = false;

    /** Whether all items should be inside overflow */
    @Input()
    forceOverflow = false;

    /** Tabindex of the toolbar element, to be used when fdType="info" */
    @Input()
    tabindex = -1;

    /** @hidden */
    @ViewChild('toolbar')
    toolbar: ElementRef;

    /** @hidden */
    @ViewChild('overflowBody')
    overflowBody: ElementRef;

    /** @hidden */
    @ViewChild('overflowSpacer')
    overflowSpacer: ElementRef;

    /** @hidden */
    @ViewChild('titleElement')
    titleElement: ElementRef<HTMLHeadElement>;

    /** @hidden */
    @ContentChildren(forwardRef(() => ToolbarItem))
    toolbarItems: QueryList<ToolbarItem>;

    /** @hidden */
    @ContentChild(TitleToken)
    titleComponent: TitleToken | null = null;

    /** @hidden */
    overflowVisibility$ = new BehaviorSubject(false);

    /** @hidden */
    private _subscriptions = new Subscription();

    /** @hidden */
    private get _toolbarWidth(): number {
        return (this.toolbar.nativeElement as HTMLElement).clientWidth - OVERFLOW_SPACE;
    }

    /** @hidden */
    private get _overflowBody(): HTMLElement {
        return this.overflowBody && (this.overflowBody.nativeElement as HTMLElement);
    }

    /** @hidden */
    private get _toolbar(): HTMLElement {
        return this.toolbar.nativeElement as HTMLElement;
    }

    /** @hidden */
    private _overflowElements: ToolbarItem[] = [];

    /** @hidden */
    private _normalElements: ToolbarItem[] = [];

    /** @hidden */
    private _disappearElements: ToolbarItem[] = [];

    /** @hidden */
    private _groupedCollection: { [key: number]: ToolbarItem[] } | null;

    /** @hidden */
    private _groupedCollectionPriority: { [key: number]: OverflowPriority } | null;

    /** @hidden */
    private _initialised = false;

    /** @hidden */
    constructor(
        private _cd: ChangeDetectorRef,
        private _renderer: Renderer2,
        readonly _contentDensityObserver: ContentDensityObserver,
        private readonly _destroy$: DestroyedService,
        @Optional() @SkipSelf() @Inject(DYNAMIC_PAGE_HEADER_TOKEN) private _dynamicPageHeader?: DynamicPageHeader
    ) {
        _contentDensityObserver.subscribe();
    }

    /** @hidden */
    ngOnInit(): void {
        fromEvent(window, 'resize')
            .pipe(
                startWith(null),
                filter(() => this.shouldOverflow),
                debounceTime(50),
                distinctUntilChanged(),
                takeUntil(this._destroy$)
            )
            .subscribe(() => this._onResize());
    }

    /** @hidden */
    ngAfterViewInit(): void {
        // this.toolbarItems.changes.pipe(startWith(this.toolbarItems)).subscribe(items => console.log([...items.toArray()]))
        if (this.shouldOverflow) {
            of(true)
                .pipe(delay(5), takeUntil(this._destroy$))
                .subscribe(() => this._collapseItems());
        }
        this._initialised = true;
        this._listenForItemChanges();
        this.buildComponentCssClass();
    }

    /** @hidden */
    ngAfterViewChecked(): void {
        this.buildComponentCssClass();
    }

    /** @hidden */
    ngAfterContentInit(): void {
        if (this.titleComponent) {
            this.titleComponent.elementRef?.nativeElement.classList.add('fd-toolbar__title');
            this.buildComponentCssClass();
        }
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._subscriptions.unsubscribe();
    }

    /** Change detection reference */
    detectChanges(): void {
        this._cd.detectChanges();
    }

    /** @hidden */
    elementRef(): ElementRef {
        return this.toolbar;
    }

    /** @hidden */
    @applyCssClass
    buildComponentCssClass(): string[] {
        return [
            'fd-toolbar',
            `fd-toolbar--${this.fdType}`,
            `${this.active && this.fdType === 'info' ? 'fd-toolbar--active' : ''}`,
            `${this.hasTitle || this.title || this.titleComponent ? 'fd-toolbar--title' : ''}`,
            `${this.clearBorder ? 'fd-toolbar--clear' : ''}`,
            `${this._dynamicPageHeader ? 'fd-dynamic-page__toolbar' : ''}`
        ];
    }

    /** Method triggering collapsible toolbar  */
    updateCollapsibleItems(): void {
        if (this._initialised) {
            this._onResize();
        }
    }

    /** @hidden */
    private _onResize(): void {
        this._reset();
        if (this.shouldOverflow) {
            this._collapseItems();
        }
        this._cd.detectChanges();
    }

    /** @hidden */
    private _collapseItems(): void {
        this._groupedCollection = this._getGroupedCollection();
        this._groupedCollectionPriority = this._getGroupedCollectionPriority();
        const _sortedByPriorityAndGroupItems = this._getSortedByPriorityAndGroupItems();

        _sortedByPriorityAndGroupItems.reduce((_contentWidth, toolbarItem) => {
            const itemWidth = toolbarItem.width;
            const itemGroup = toolbarItem.group;
            const itemPriority = toolbarItem.priority;
            const shouldItemBeRemovedByWidth = this._shouldToolbarItemBeRemovedByWidth(itemWidth, _contentWidth);
            const shouldAlwaysBeInOverflow = itemPriority === OverflowPriorityEnum.ALWAYS || this.forceOverflow;
            const shouldNeverBeInOverflow = itemPriority === OverflowPriorityEnum.NEVER;
            if ((shouldItemBeRemovedByWidth && !shouldNeverBeInOverflow) || shouldAlwaysBeInOverflow) {
                if (itemGroup) {
                    this._hideElementsFromCurrentGroup(itemGroup);
                } else {
                    this._hideElementWithoutGroup(toolbarItem, itemPriority);
                }
                return shouldAlwaysBeInOverflow ? _contentWidth : MAX_CONTENT_SIZE;
            } else {
                this._normalElements.push(toolbarItem);
                return _contentWidth + itemWidth;
            }
        }, this.titleElement?.nativeElement.clientWidth || 0);

        this._collapseLastSpacerElement(this._overflowElements, this._normalElements);
        this._addToolbarItemToOverflow(this._overflowElements);
        this._disappearElements.forEach(this._removeToolbarItemFromDOM.bind(this));

        this._normalElements = [...this._getOrderedItemsFollowingQuery(this._normalElements)];
        this._overflowElements = [...this._getOrderedItemsFollowingQuery(this._overflowElements)];

        this.overflowVisibility$.next(this._overflowElements.length > 0);

        this._cd.markForCheck();
    }

    /** @hidden */
    private _shouldToolbarItemBeRemovedByWidth(itemWidth: number, contentWidth: number): boolean {
        return contentWidth + itemWidth > this._toolbarWidth;
    }

    /** @hidden */
    private _listenForItemChanges(): void {
        this.toolbarItems.changes.pipe(filter(() => this.shouldOverflow)).subscribe(() => this._onResize());
    }

    /** @hidden */
    private _hideElementsFromCurrentGroup(itemGroup: number): void {
        const lowestPriorityFromGroup = this._getLowestPriorityFromGroup(itemGroup);
        if (!this._groupedCollection || !this._groupedCollectionPriority) {
            return;
        }
        let itemsToRemove = this._groupedCollection[lowestPriorityFromGroup];

        delete this._groupedCollection[lowestPriorityFromGroup];
        delete this._groupedCollectionPriority[lowestPriorityFromGroup];

        if (lowestPriorityFromGroup !== itemGroup) {
            itemsToRemove = [...itemsToRemove, ...this._groupedCollection[itemGroup]];
            delete this._groupedCollection[itemGroup];
            delete this._groupedCollectionPriority[itemGroup];
        }

        itemsToRemove?.forEach((item) => {
            this._removeItemFromArray(this._normalElements, item);
            const isDisappear = item.priority === OverflowPriorityEnum.DISAPPEAR;
            if (isDisappear) {
                this._disappearElements.push(item);
            }

            if (this._overflowElements.indexOf(item) === -1 && !isDisappear) {
                this._overflowElements.push(item);
            }
        });
    }

    /** @hidden */
    private _hideElementWithoutGroup(toolbarItem: ToolbarItem, itemPriority: OverflowPriority): void {
        const isDisappear = itemPriority === OverflowPriorityEnum.DISAPPEAR;
        if (isDisappear) {
            this._disappearElements.push(toolbarItem);
        } else {
            this._overflowElements.push(toolbarItem);
        }
    }

    /** @hidden Sort by group and priority and initial position */
    private _getSortedByPriorityAndGroupItems(): ToolbarItem[] {
        const notSorted: Array<{ element: ToolbarItem; index: number }> = this.toolbarItems
            .toArray()
            .map((element, index) => ({ element, index }));

        const groups = notSorted.reduce((gr: Record<number, typeof notSorted>, item) => {
            let groupId = item.element.group;
            const itemPrio = item.element.priority;
            if (itemPrio === OverflowPriorityEnum.NEVER || itemPrio === OverflowPriorityEnum.ALWAYS) {
                groupId = 0;
            }

            if (!gr[groupId]) {
                gr[groupId] = [];
            }

            gr[groupId].push(item);

            return gr;
        }, {});

        const groupIds = Object.keys(groups)
            .map((g) => parseInt(g, 10))
            .filter((g) => g !== 0);

        return groupIds
            .map((g) => {
                let minIndex = Number.MAX_SAFE_INTEGER;
                let maxPriority = 0;
                for (const item of groups[g]) {
                    minIndex = Math.min(minIndex, item.index);
                    maxPriority = Math.max(
                        maxPriority,
                        OVERFLOW_PRIORITY_SCORE.get(item.element.priority) ?? -Infinity
                    );
                }

                return { group: groups[g].map(({ element }) => element), minIndex, maxPriority };
            })
            .concat(
                !groups[0]
                    ? []
                    : groups[0].map((item) => ({
                          group: [item.element],
                          maxPriority: OVERFLOW_PRIORITY_SCORE.get(item.element.priority) as number,
                          minIndex: item.index
                      }))
            )
            .sort((a, b) => b.maxPriority - a.maxPriority || a.minIndex - b.minIndex)
            .reduce((arr: ToolbarItem[], i) => arr.concat(i.group), []);
    }

    /** @hidden Get the object with grouped arrays of elements. */
    private _getGroupedCollection(): { [key: number]: ToolbarItem[] } {
        const collection =
            (this.toolbarItems &&
                this.toolbarItems.reduce((acc, item) => {
                    const itemPrio = item.priority;
                    if (itemPrio === OverflowPriorityEnum.NEVER || itemPrio === OverflowPriorityEnum.ALWAYS) {
                        return acc;
                    }

                    const itemGroup = item.group;
                    acc[itemGroup] && acc[itemGroup].length ? acc[itemGroup].push(item) : (acc[itemGroup] = [item]);

                    return acc;
                }, {})) ||
            {};

        delete collection[0];

        return collection;
    }

    /** @hidden Get the object with the highest priority for each group of elements. */
    private _getGroupedCollectionPriority(): { [key: number]: OverflowPriority } {
        if (!this._groupedCollection) {
            return {};
        }

        const groups = Object.keys(this._groupedCollection);

        return groups.reduce((acc, itemGroup) => {
            const sortedPriorities = this._groupedCollection![itemGroup].map((item: ToolbarItem) => item.priority)
                .filter((prio) => prio !== OverflowPriorityEnum.ALWAYS && prio !== OverflowPriorityEnum.NEVER)
                .sort(this._sortPriorities.bind(this));

            acc[itemGroup] = sortedPriorities[0];

            return acc;
        }, {});
    }

    /** @hidden Get group number with the lowest priority.
     *  Uses for detecting a group of elements which would be hidden from the toolbar.
     *  */
    private _getLowestPriorityFromGroup(itemGroup: number): number {
        const priority = this._groupedCollectionPriority;
        if (!priority || !OVERFLOW_PRIORITY_SCORE.get(priority[itemGroup])) {
            return itemGroup;
        }

        const groups = Object.keys(priority);

        return groups.reduce((lowestGroup, currentGroup) => {
            const lowestGroupPriority = priority[lowestGroup];
            const currentGroupPriority = priority[currentGroup];
            if (
                OVERFLOW_PRIORITY_SCORE.get(currentGroupPriority)! < OVERFLOW_PRIORITY_SCORE.get(lowestGroupPriority)!
            ) {
                return +currentGroup;
            }

            return lowestGroup;
        }, itemGroup as number);
    }

    /** @hidden */
    private _removeItemFromArray(toolbarItems: ToolbarItem[], toolbarItem: ToolbarItem): ToolbarItem | null {
        const itemIndex = toolbarItems.indexOf(toolbarItem);

        return itemIndex >= 0 ? toolbarItems.splice(itemIndex, 1)[0] : null;
    }

    /** @hidden */
    private _removeToolbarItemFromDOM(toolbarItem: ToolbarItem): void {
        if (toolbarItem.element && toolbarItem.element.parentNode) {
            // IE11 workaround element.remove() is not supported
            this._renderer.removeChild(this.elementRef().nativeElement, toolbarItem.element);
        }
    }

    /** @hidden */
    private _addToolbarItemToOverflow(toolbarItems: ToolbarItem[]): void {
        toolbarItems.forEach((x) => {
            if (this._overflowBody) {
                this._overflowBody.appendChild(x.element);
            }
        });
    }

    /** @hidden */
    private _reset(): void {
        this._normalElements.forEach(this._removeToolbarItemFromDOM.bind(this));
        this._overflowElements.forEach(this._removeToolbarItemFromDOM.bind(this));

        if (this.overflowSpacer) {
            this.toolbarItems.map((x) => {
                this._renderer.insertBefore(this._toolbar, x.element, this.overflowSpacer.nativeElement);
            });
        }

        this._overflowElements = [];
        this._normalElements = [];
        this._disappearElements = [];

        this._groupedCollection = null;
        this._groupedCollectionPriority = null;

        this.overflowVisibility$.next(false);
    }

    /** @hidden Sort priorities of elements/groups. */
    private _sortPriorities(a: OverflowPriority, b: OverflowPriority): number {
        return OVERFLOW_PRIORITY_SCORE.get(b)! - OVERFLOW_PRIORITY_SCORE.get(a)!;
    }

    /** @hidden */
    private _collapseLastSpacerElement(overflowElements: ToolbarItem[], normalElements: ToolbarItem[]): void {
        if (!normalElements || normalElements.length < 1) {
            return;
        }

        let lastItem: ToolbarItem = normalElements[normalElements.length - 1];

        while (lastItem.isSpacer && normalElements.length > 0) {
            overflowElements.push(normalElements.pop()!);
            lastItem = normalElements[normalElements.length - 1];
        }
    }

    /** @hidden */
    private _getOrderedItemsFollowingQuery(toolbarItems: ToolbarItem[]): ToolbarItem[] {
        const queryArray = this.toolbarItems.toArray();
        const sortMethod = (a: ToolbarItem, b: ToolbarItem): number =>
            queryArray.findIndex((_item) => _item === a) > queryArray.findIndex((_item) => _item === b) ? 1 : -1;
        return toolbarItems.sort(sortMethod);
    }
}
