import {
    AfterContentInit,
    AfterViewChecked,
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChild,
    ContentChildren,
    contentChildren,
    DestroyRef,
    ElementRef,
    forwardRef,
    HostBinding,
    inject,
    Inject,
    Input,
    Optional,
    QueryList,
    signal,
    SkipSelf,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { DYNAMIC_PAGE_HEADER_TOKEN, DynamicPageHeader } from '@fundamental-ngx/core/shared';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
    applyCssClass,
    CssClassBuilder,
    DynamicPortalComponent,
    Nullable,
    OVERFLOW_PRIORITY_SCORE,
    OverflowPriority,
    ResizeObserverService
} from '@fundamental-ngx/cdk/utils';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import {
    ContentDensityMode,
    ContentDensityObserver,
    contentDensityObserverProviders
} from '@fundamental-ngx/core/content-density';
import { PopoverModule } from '@fundamental-ngx/core/popover';
import { HeadingLevel } from '@fundamental-ngx/core/shared';
import { TitleComponent, TitleToken } from '@fundamental-ngx/core/title';
import { BehaviorSubject, combineLatest, map, Observable, startWith } from 'rxjs';
import { ToolbarItem } from './abstract-toolbar-item.class';
import { FD_TOOLBAR } from './tokens';
import { ToolbarSeparatorComponent } from './toolbar-separator.component';
import { ToolbarSpacerDirective } from './toolbar-spacer.directive';

const ELEMENT_MARGIN = 8;
const OVERFLOW_BTN_COZY = 36;
const OVERFLOW_BTN_COMPACT = 32;
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
    styleUrl: './toolbar.component.scss',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        contentDensityObserverProviders({
            defaultContentDensity: ContentDensityMode.COMPACT
        }),
        {
            provide: FD_TOOLBAR,
            useExisting: ToolbarComponent
        }
    ],
    standalone: true,
    imports: [
        ToolbarSpacerDirective,
        ToolbarSeparatorComponent,
        PopoverModule,
        ButtonComponent,
        DynamicPortalComponent,
        TitleComponent
    ]
})
export class ToolbarComponent implements AfterViewInit, AfterViewChecked, CssClassBuilder, AfterContentInit {
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
    set shouldOverflow(val: boolean) {
        this._shouldOverflow = val;
        this.shouldOverflow$.next(val);
    }

    get shouldOverflow(): boolean {
        return this._shouldOverflow;
    }

    /** Determines the type of toolbar
     * Available options: 'solid' | 'transparent' | 'auto' | 'info'
     * Default value: 'solid'
     */
    @Input()
    fdType: ToolbarType = 'solid';

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

    /**
     * Heading level of the toolbar title.
     */
    @Input()
    set headingLevel(level: Nullable<HeadingLevel>) {
        if (typeof level === 'number') {
            this._headingLevel = level;
        } else if (typeof level === 'string') {
            this._headingLevel = Number.parseInt(level.replace(/\D/g, ''), 10);
        }
    }

    /** Toolbar Aria-label attribute. */
    @Input()
    @HostBinding('attr.aria-label')
    ariaLabel: string;

    /** Toolbar Aria-labelledby attribute. */
    @Input()
    @HostBinding('attr.aria-labelledby')
    ariaLabelledBy: string;

    /** @hidden */
    @ViewChild('titleElement', { read: ElementRef })
    titleElement: ElementRef<HTMLHeadElement>;

    /** @hidden */
    @ContentChildren(forwardRef(() => ToolbarItem))
    toolbarItems: QueryList<ToolbarItem>;

    /** @hidden */
    @ContentChild(TitleToken)
    set titleComponent(title: TitleToken | null) {
        this._titleComponent$.next(title);
    }

    get titleComponent(): TitleToken | null {
        return this._titleComponent$.value;
    }

    /** @hidden */
    @HostBinding('attr.role')
    private readonly _role = 'toolbar';

    /** @hidden */
    overflowItems$: Observable<ToolbarItem[]>;

    /** @hidden */
    overflownItems: ToolbarItem[] = [];

    /** @hidden */
    spacerUsed = signal(false);

    /** @hidden */
    spacerDirectives = contentChildren(ToolbarSpacerDirective);

    /** @hidden */
    separatorDirectives = contentChildren(ToolbarSeparatorComponent);

    /** @hidden */
    _headingLevel = 2;

    /** HTML Element Reference. */
    readonly elementRef = inject(ElementRef);

    /** @hidden */
    private _titleComponent$: BehaviorSubject<TitleToken | null> = new BehaviorSubject<TitleToken | null>(null);

    /** @hidden */
    private _refreshOverflow$ = new BehaviorSubject<void>(undefined);

    /** @hidden */
    private get _toolbarWidth(): number {
        const _overflow_btn_size = this._contentDensityObserver.isCompact ? OVERFLOW_BTN_COMPACT : OVERFLOW_BTN_COZY;
        return (
            (this.elementRef.nativeElement as HTMLElement).clientWidth -
            (_overflow_btn_size + 4 * ELEMENT_MARGIN + 1 + this.separatorDirectives().length)
        );
    }

    /** @hidden */
    private _shouldOverflow = false;

    /** @hidden */
    private shouldOverflow$ = new BehaviorSubject<boolean>(false);

    /** @hidden */
    constructor(
        private _cd: ChangeDetectorRef,
        readonly _contentDensityObserver: ContentDensityObserver,
        private readonly _destroyRef: DestroyRef,
        private resizeObserverService: ResizeObserverService,
        @Optional() @SkipSelf() @Inject(DYNAMIC_PAGE_HEADER_TOKEN) private _dynamicPageHeader?: DynamicPageHeader
    ) {
        _contentDensityObserver.subscribe();
    }

    /** @hidden */
    @applyCssClass
    buildComponentCssClass(): string[] {
        return [
            'fd-toolbar',
            `fd-toolbar--${this.fdType}`,
            `${this.active && this.fdType === 'info' ? 'fd-toolbar--active' : ''}`,
            `${this.title || this.titleComponent ? 'fd-toolbar--title' : ''}`,
            `${this.clearBorder ? 'fd-toolbar--clear' : ''}`,
            `${this._dynamicPageHeader ? 'fd-dynamic-page__toolbar' : ''}`
        ];
    }

    /** @hidden */
    ngAfterViewInit(): void {
        this._updateSpacerUsed();

        this.overflowItems$ = combineLatest([
            this.resizeObserverService.observe(this.elementRef.nativeElement).pipe(map(() => this._toolbarWidth)),
            this.toolbarItems.changes.pipe(
                startWith(this.toolbarItems),
                map((toolbarItems) => toolbarItems.toArray())
            ),
            this._titleComponent$.pipe(
                map((titleComponent): HTMLElement | null => {
                    if (!titleComponent) {
                        return this.titleElement?.nativeElement;
                    }
                    return titleComponent.elementRef.nativeElement;
                })
            ),
            this.shouldOverflow$,
            this._refreshOverflow$
        ]).pipe(
            map(([toolbarWidth, toolbarItems, titleElement, shouldOverflow]) => {
                if (shouldOverflow) {
                    const _sortedByPriorityAndGroupItems = this._getSortedByPriorityAndGroupItems(toolbarItems);
                    const overflowItems: ToolbarItem[] = [];
                    _sortedByPriorityAndGroupItems.reduce(
                        (_contentWidth, toolbarItem) => {
                            const itemWidth = toolbarItem.width + 2;
                            const itemPriority = toolbarItem.priority;
                            const shouldItemBeRemovedByWidth = itemWidth + _contentWidth > toolbarWidth;
                            const shouldAlwaysBeInOverflow =
                                itemPriority === OverflowPriorityEnum.ALWAYS || this.forceOverflow;
                            const shouldNeverBeInOverflow = itemPriority === OverflowPriorityEnum.NEVER;
                            if ((shouldItemBeRemovedByWidth && !shouldNeverBeInOverflow) || shouldAlwaysBeInOverflow) {
                                overflowItems.push(toolbarItem);
                                return shouldAlwaysBeInOverflow ? _contentWidth : MAX_CONTENT_SIZE;
                            } else {
                                return _contentWidth + itemWidth;
                            }
                        },
                        titleElement?.clientWidth || 0
                    );
                    // Hide orphans
                    for (const toolbarItem of overflowItems) {
                        const groupedCollection = this._getGroupedCollection(toolbarItems);
                        const groupedCollectionPriorities = this._getGroupedCollectionPriority(groupedCollection);
                        const group = toolbarItem.group;
                        const itemPriority = toolbarItem.priority;
                        if (group !== 0 && itemPriority !== OverflowPriorityEnum.DISAPPEAR) {
                            const itemsFromCurrentGroup =
                                this._getElementsFromCurrentGroup(
                                    group,
                                    groupedCollection,
                                    groupedCollectionPriorities
                                ) || [];
                            itemsFromCurrentGroup.forEach((i) => {
                                if (overflowItems.indexOf(i) === -1) {
                                    overflowItems.push(i);
                                }
                            });
                        }
                    }
                    return overflowItems.sort((a, b) => this._sortPriorities(a.priority, b.priority));
                }
                return [];
            }),
            takeUntilDestroyed(this._destroyRef)
        );
        this.overflowItems$.subscribe((items) => {
            this.overflownItems = items;
            this._cd.detectChanges();
        });
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

    /** Change detection reference */
    detectChanges(): void {
        this._cd.detectChanges();
    }

    /** Method triggering collapsible toolbar  */
    updateCollapsibleItems(): void {
        this._refreshOverflow$.next();
    }

    /** hidden */
    private _updateSpacerUsed(): void {
        // do not render extra spacer if there is at least one passed by the application
        // and it is not fixed this.spacerUsed.set(this.spacer.length > 0 && this.spacer.some((spacer) => !spacer.fixed));
        this.spacerUsed.set(
            this.spacerDirectives().length > 0 && this.spacerDirectives().some((spacer) => !spacer.fixed)
        );
    }

    /** @hidden Get group number with the lowest priority.
     *  Uses for detecting a group of elements which would be hidden from the toolbar.
     *  */
    private _getLowestPriorityFromGroup(
        itemGroup: number,
        groupedCollectionPriority?: Record<number, OverflowPriority>
    ): number {
        const priority = groupedCollectionPriority;
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
    private _getElementsFromCurrentGroup(
        itemGroup: number,
        groupedCollection?: Record<number, ToolbarItem[]>,
        groupedCollectionPriority?: Record<number, OverflowPriority>
    ): ToolbarItem[] {
        const lowestPriorityFromGroup = this._getLowestPriorityFromGroup(itemGroup, groupedCollectionPriority);
        if (!groupedCollection || !groupedCollectionPriority) {
            return [];
        }
        let itemsToRemove = groupedCollection[lowestPriorityFromGroup];

        delete groupedCollection[lowestPriorityFromGroup];
        delete groupedCollectionPriority[lowestPriorityFromGroup];

        if (lowestPriorityFromGroup !== itemGroup) {
            itemsToRemove = [...itemsToRemove, ...groupedCollection[itemGroup]];
            delete groupedCollection[itemGroup];
            delete groupedCollectionPriority[itemGroup];
        }

        return itemsToRemove;
    }

    /** @hidden Get the object with grouped arrays of elements. */
    private _getGroupedCollection(toolbarItems: ToolbarItem[]): Record<number, ToolbarItem[]> {
        return toolbarItems.reduce((acc, item) => {
            const itemPrio = item.priority;
            const itemGroup = item.group;
            if (
                itemPrio === OverflowPriorityEnum.NEVER ||
                itemPrio === OverflowPriorityEnum.ALWAYS ||
                itemGroup === 0
            ) {
                return acc;
            }
            if (!acc[itemGroup]) {
                acc[itemGroup] = [];
            }
            acc[itemGroup].push(item);
            return acc;
        }, {});
    }

    /** @hidden Get the object with the highest priority for each group of elements. */
    private _getGroupedCollectionPriority(
        groupedCollection: Record<number, ToolbarItem[]>
    ): Record<number, OverflowPriority> {
        const groups = Object.keys(groupedCollection);

        return groups.reduce((acc, itemGroup) => {
            const sortedPriorities = groupedCollection![itemGroup]
                .map((i: ToolbarItem) => i.priority)
                .filter(
                    (prio: OverflowPriority) =>
                        prio !== OverflowPriorityEnum.ALWAYS && prio !== OverflowPriorityEnum.NEVER
                )
                .sort(this._sortPriorities);

            acc[itemGroup] = sortedPriorities[0];

            return acc;
        }, {});
    }

    /** @hidden Sort priorities of elements/groups. */
    private _sortPriorities(a: OverflowPriority, b: OverflowPriority): number {
        return OVERFLOW_PRIORITY_SCORE.get(b)! - OVERFLOW_PRIORITY_SCORE.get(a)!;
    }

    /** @hidden Sort by group and priority and initial position */
    private _getSortedByPriorityAndGroupItems(toolbarItems: ToolbarItem[]): ToolbarItem[] {
        const notSorted = toolbarItems.map((element, index) => ({ element, index }));

        const groups = notSorted.reduce((gr, item) => {
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
                          maxPriority: OVERFLOW_PRIORITY_SCORE.get(item.element.priority),
                          minIndex: item.index
                      }))
            )
            .sort((a, b) => b.maxPriority - a.maxPriority || a.minIndex - b.minIndex)
            .reduce((arr, i) => arr.concat(i.group), []);
    }
}
