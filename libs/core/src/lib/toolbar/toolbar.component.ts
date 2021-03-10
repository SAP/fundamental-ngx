import {
    Component,
    ViewEncapsulation,
    AfterViewInit,
    AfterViewChecked,
    ChangeDetectionStrategy,
    ElementRef,
    ViewChild,
    OnInit,
    forwardRef,
    ContentChildren,
    QueryList,
    ChangeDetectorRef,
    Renderer2,
    Input,
    OnDestroy
} from '@angular/core';

import { Observable, of, fromEvent } from 'rxjs';
import { delay, debounceTime, takeWhile, distinctUntilChanged, filter } from 'rxjs/operators';

import { ToolbarItemDirective } from './public_api';
import { applyCssClass, CssClassBuilder } from '../utils/public_api';
import { OVERFLOW_PRIORITY_SCORE } from '../utils/consts';

const ELEMENT_MARGIN = 8;
const OVERFLOW_SPACE = 50 + 2 * ELEMENT_MARGIN;
const MAX_CONTENT_SIZE = 99999999;

export type ToolbarType = 'solid' | 'transparent' | 'auto' | 'info';

export type ToolbarSize = 'cozy' | 'compact';

export type OverflowPriority = 'always' | 'never' | 'low' | 'high' | 'disappear';
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
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolbarComponent implements OnInit, AfterViewInit, OnDestroy, AfterViewChecked, CssClassBuilder {
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

    /** Determines the size of toolbar
     * Available options: 'cozy' | 'compact'
     * Default value: 'compact'
     */
    @Input()
    size: ToolbarSize = 'compact';

    /** Determines if toolbar contains text which size is equal to h4
     * Default value: false
     */
    @Input()
    hasTitle = false;

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
    @ContentChildren(forwardRef(() => ToolbarItemDirective))
    toolbarItems: QueryList<ToolbarItemDirective>;

    /** @hidden */
    overflowVisibility: Observable<boolean>;

    /** @hidden */
    private get _toolbarWidth(): number {
        return (this.toolbar.nativeElement as HTMLElement).clientWidth - OVERFLOW_SPACE;
    }

    /** @hidden */
    private get _overflowBody(): HTMLElement {
        return this.overflowBody && this.overflowBody.nativeElement as HTMLElement;
    }

    /** @hidden */
    private get _toolbar(): HTMLElement {
        return this.toolbar.nativeElement as HTMLElement;
    }

    /** @hidden */
    private _overflowElements: ToolbarItemDirective[] = [];

    /** @hidden */
    private _normalElements: ToolbarItemDirective[] = [];

    /** @hidden */
    private _disappearElements: ToolbarItemDirective[] = [];

    /** @hidden */
    private _groupedCollection: { [key: number]: ToolbarItemDirective[] };

    /** @hidden */
    private _groupedCollectionPriority: { [key: number]: OverflowPriority };

    /** @hidden */
    private _alive = true;

    /** @hidden */
    private _initialised = false;

    /** @hidden */
    constructor(private _cd: ChangeDetectorRef, private _renderer: Renderer2) {}

    /** @hidden */
    ngOnInit(): void {
        fromEvent(window, 'resize')
            .pipe(
                takeWhile(() => this._alive && this.shouldOverflow),
                debounceTime(50),
                distinctUntilChanged()
            ).subscribe(_ => this._onResize());
    }

    /** @hidden */
    ngAfterViewInit(): void {
        if (this.shouldOverflow) {
            of(true)
                .pipe(
                    delay(5),
                    takeWhile(() => this._alive)
                )
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
    ngOnDestroy(): void {
        this._alive = false;
    }

    /** Change detection reference */
    detectChanges(): void {
        this._cd.detectChanges();
    }

    /** @hidden */
    elementRef(): ElementRef<any> {
        return this.toolbar;
    }

    /** @hidden */
    @applyCssClass
    buildComponentCssClass(): string[] {
        return [
            'fd-toolbar',
            `fd-toolbar--${this.fdType}`,
            `${this.active && this.fdType === 'info' ? 'fd-toolbar--active' : ''}`,
            `${this.size === 'cozy' ? 'fd-toolbar--cozy' : ''}`,
            `${this.hasTitle ? 'fd-toolbar--title' : ''}`,
            `${this.clearBorder ? 'fd-toolbar--clear' : ''}`
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

    // shouldOverflow items
    /** @hidden */
    private _collapseItems(): void {
        this._groupedCollection = this._getGroupedCollection();
        this._groupedCollectionPriority = this._getGroupedCollectionPriority();
        const _sortedByPriorityAndGroupItems = this._getSortedByPriorityAndGroupItems();

        _sortedByPriorityAndGroupItems.reduce((_contentWidth, toolbarItem) => {
            const itemWidth = this._getElementWidthWithMargin(toolbarItem);
            const itemGroup = this._getElementGroup(toolbarItem);
            const itemPriority = this._getElementPriority(toolbarItem);
            const shouldItemBeRemovedByWidth = this._shouldToolbarItemBeRemovedByWidth(itemWidth, _contentWidth);
            const shouldAlwaysBeInOverflow = ((itemPriority === OverflowPriorityEnum.ALWAYS) || this.forceOverflow);
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
        }, 0);

        this._collapseLastSpacerElement(this._overflowElements, this._normalElements);
        this._addToolbarItemToOverflow(this._overflowElements);
        this._disappearElements.forEach(this._removeToolbarItemFromDOM.bind(this));

        this._normalElements = [...this._getOrderedItemsFollowingQuery(this._normalElements)];
        this._overflowElements = [...this._getOrderedItemsFollowingQuery(this._overflowElements)];

        this.toolbarItems.forEach(item => this._changeItemVisibilityState(item.elementRef.nativeElement, true));

        this._changeOverflowVisibleState(this._overflowElements.length > 0);

        this._cd.markForCheck();
    }

    /** @hidden */
    private _shouldToolbarItemBeRemovedByWidth(itemWidth: number, contentWidth: number): boolean {
        return contentWidth + itemWidth > this._toolbarWidth;
    }

    /** @hidden */
    private _getElementWidthWithMargin(toolbarItem: ToolbarItemDirective): number {
        return toolbarItem.elementRef.nativeElement
            && toolbarItem.elementRef.nativeElement.offsetWidth + ELEMENT_MARGIN;
    }

    /** @hidden */
    private _listenForItemChanges(): void {
        this.toolbarItems.changes.pipe(
            filter(_ => this.shouldOverflow)
        )
            .subscribe(() => this._onResize());
    }

    /** @hidden */
    private _getElementPriority(toolbarItem: ToolbarItemDirective): OverflowPriority {
        const priority = toolbarItem.elementRef.nativeElement
            && toolbarItem.elementRef.nativeElement.attributes.fdOverflowPriority;

        return priority && priority.value || OverflowPriorityEnum.HIGH;
    }

    /** @hidden */
    private _getElementGroup(toolbarItem: ToolbarItemDirective): number {
        const itemGroup = toolbarItem.elementRef.nativeElement
            && toolbarItem.elementRef.nativeElement.attributes.fdOverflowGroup;

        return itemGroup && itemGroup.value || 0;
    }

    /** @hidden */
    private _hideElementsFromCurrentGroup(itemGroup: number): void {
        const lowestPriorityFromGroup = this._getLowestPriorityFromGroup(itemGroup);
        let itemsToRemove = this._groupedCollection[lowestPriorityFromGroup];

        delete this._groupedCollection[lowestPriorityFromGroup];
        delete this._groupedCollectionPriority[lowestPriorityFromGroup];

        if (lowestPriorityFromGroup !== itemGroup) {
            itemsToRemove = [...itemsToRemove, ...this._groupedCollection[itemGroup]];
            delete this._groupedCollection[itemGroup];
            delete this._groupedCollectionPriority[itemGroup];
        }

        // tslint:disable-next-line:no-unused-expression
        itemsToRemove && itemsToRemove.forEach(item => {
            this._removeItemFromArray(this._normalElements, item);
            const isDisappear = this._getElementPriority(item) === OverflowPriorityEnum.DISAPPEAR;
            if (isDisappear) {
                this._disappearElements.push(item);
            }

            if (this._overflowElements.indexOf(item) === -1 && !isDisappear) {
                this._overflowElements.push(item);
            }
        });
    }

    /** @hidden */
    private _hideElementWithoutGroup(toolbarItem: ToolbarItemDirective, itemPriority: OverflowPriority): void {
        const isDisappear = itemPriority === OverflowPriorityEnum.DISAPPEAR;
        if (isDisappear) {
            this._disappearElements.push(toolbarItem);
        } else {
            this._overflowElements.push(toolbarItem);
        }
    }

    /** @hidden Sort by group and priority and initial position */
    private _getSortedByPriorityAndGroupItems(): ToolbarItemDirective[] {
        const notSorted = this.toolbarItems.toArray().map((element, index) => ({ element: element, index: index }));

        const groups = notSorted.reduce((gr, item) => {
            let groupId = this._getElementGroup(item.element);
            const itemPrio = this._getElementPriority(item.element);
            if (itemPrio === OverflowPriorityEnum.NEVER || itemPrio === OverflowPriorityEnum.ALWAYS) {
                groupId = 0;
            }

            if (!gr[groupId]) {
                gr[groupId] = [];
            }

            gr[groupId].push(item);

            return gr;
        }, {});

        const groupIds = Object.keys(groups).map(g => parseInt(g, 10)).filter(g => g !== 0);

        return groupIds
            .map(g => {
                let minIndex = Number.MAX_SAFE_INTEGER;
                let maxPriority = 0;
                for (const item of groups[g]) {
                    minIndex = Math.min(minIndex, item.index);
                    maxPriority = Math.max(maxPriority, OVERFLOW_PRIORITY_SCORE.get(this._getElementPriority(item.element)));
                }

                return { group: groups[g].map(({ element }) => element), minIndex: minIndex, maxPriority: maxPriority };
            })
            .concat(!groups[0] ? [] : groups[0].map(item => {
                return {
                    group: [item.element],
                    maxPriority: OVERFLOW_PRIORITY_SCORE.get(this._getElementPriority(item.element)),
                    minIndex: item.index
                };
            }))
            .sort((a, b) => b.maxPriority - a.maxPriority || a.minIndex - b.minIndex)
            .reduce((arr, i) => arr.concat(i.group), []);
    }

    /** @hidden Get the object with grouped arrays of elements. */
    private _getGroupedCollection(): { [key: number]: ToolbarItemDirective[] } {
        const collection = this.toolbarItems && this.toolbarItems.reduce((acc, item) => {
            const itemPrio = this._getElementPriority(item);
            if (itemPrio === OverflowPriorityEnum.NEVER || itemPrio === OverflowPriorityEnum.ALWAYS) {
                return acc;
            }

            const itemGroup = this._getElementGroup(item);
            acc[itemGroup] && acc[itemGroup].length ? acc[itemGroup].push(item) : acc[itemGroup] = [item];

            return acc;
        }, {}) || {};

        delete collection[0];

        return collection;
    }

    /** @hidden Get the object with the highest priority for each group of elements. */
    private _getGroupedCollectionPriority(): { [key: number]: OverflowPriority } {
        const groups = Object.keys(this._groupedCollection);

        return groups.reduce((acc, itemGroup) => {
            const sortedPriorities = this._groupedCollection[itemGroup]
                .map(this._getElementPriority)
                .filter(prio => prio !== OverflowPriorityEnum.ALWAYS && prio !== OverflowPriorityEnum.NEVER)
                .sort(this._sortPriorities.bind(this));

            acc[itemGroup] = sortedPriorities[0];

            return acc;
        }, {});
    }

    /** @hidden Get group number with the lowest priority.
     *  Uses for detecting a group of elements which would be hidden from the toolbar.
     *  */
    private _getLowestPriorityFromGroup(itemGroup: number): number {
        if (!OVERFLOW_PRIORITY_SCORE.get(this._groupedCollectionPriority[itemGroup])) {
            return itemGroup;
        }

        const groups = Object.keys(this._groupedCollectionPriority);

        return <number>groups.reduce((lowestGroup, currentGroup) => {
            const lowestGroupPriority = this._groupedCollectionPriority[lowestGroup];
            const currentGroupPriority = this._groupedCollectionPriority[currentGroup];
            if (OVERFLOW_PRIORITY_SCORE.get(currentGroupPriority) < OVERFLOW_PRIORITY_SCORE.get(lowestGroupPriority)) {
                return currentGroup;
            }

            return lowestGroup;
        }, itemGroup);
    }

    /** @hidden */
    private _removeItemFromArray(toolbarItems: ToolbarItemDirective[], toolbarItem: ToolbarItemDirective): ToolbarItemDirective | null {
        const itemIndex = toolbarItems.indexOf(toolbarItem);

        return itemIndex >= 0 ? toolbarItems.splice(itemIndex, 1)[0] : null;
    }

    /** @hidden */
    private _removeToolbarItemFromDOM(toolbarItem: ToolbarItemDirective): void {
        if (toolbarItem.elementRef.nativeElement && toolbarItem.elementRef.nativeElement.parentNode) {
            // IE11 workaround element.remove() is not supported
            this._renderer.removeChild(this.elementRef().nativeElement, toolbarItem.elementRef.nativeElement);
        }
    }

    /** @hidden */
    private _addToolbarItemToOverflow(toolbarItems: ToolbarItemDirective[]): void {
        toolbarItems.forEach((x) => {
            if (this._overflowBody) {
                this._overflowBody.appendChild(x.elementRef.nativeElement)
            }
        });
    }

    /** @hidden */
    private _reset(): void {
        this._normalElements.forEach(this._removeToolbarItemFromDOM.bind(this));
        this._overflowElements.forEach(this._removeToolbarItemFromDOM.bind(this));

        if (this.overflowSpacer) {
            this.toolbarItems.map((x) => {
                this._renderer.insertBefore(this._toolbar, x.elementRef.nativeElement, this.overflowSpacer.nativeElement);
            });
        }

        this._overflowElements = [];
        this._normalElements = [];
        this._disappearElements = [];

        this._groupedCollection = null;
        this._groupedCollectionPriority = null;

        this._changeOverflowVisibleState(false);
    }

    private _changeOverflowVisibleState(visible: boolean): void {
        this.overflowVisibility = of(visible).pipe(delay(1));
    }

    private _changeItemVisibilityState(element: HTMLElement, visible: boolean): void {
        const fadeIn = 'fd-toolbar-fade-in';
        const fadeOut = 'fd-toolbar-fade-out';

        if (visible) {
            element.classList.add(fadeIn);
            element.classList.remove(fadeOut);
            return;
        }

        element.classList.add(fadeOut);
        element.classList.remove(fadeIn);
    }

    /** @hidden Sort priorities of elements/groups. */
    private _sortPriorities(a: OverflowPriority, b: OverflowPriority): number {
        return OVERFLOW_PRIORITY_SCORE.get(b) - OVERFLOW_PRIORITY_SCORE.get(a);
    }

    /** @hidden */
    private _collapseLastSpacerElement(
        overflowElements: ToolbarItemDirective[],
        normalElements: ToolbarItemDirective[]
    ): void {
        if (!normalElements || normalElements.length < 1) {
            return;
        }

        const isSpacer = (element: ToolbarItemDirective): boolean => {
            return element.elementRef.nativeElement.classList.contains('fd-toolbar__spacer');
        }

        let lastItem: ToolbarItemDirective = normalElements[normalElements.length - 1];

        while (isSpacer(lastItem) && normalElements.length > 0) {
            overflowElements.push(normalElements.pop());
            lastItem = normalElements[normalElements.length - 1]
        }
    }

    /** @hidden */
    private _getOrderedItemsFollowingQuery(toolbarItems: ToolbarItemDirective[]): ToolbarItemDirective[] {
        const queryArray = this.toolbarItems.toArray();
        const sortMethod = (a: ToolbarItemDirective, b: ToolbarItemDirective): number => {
            return (
                queryArray.findIndex(_item => _item === a) >
                queryArray.findIndex(_item => _item === b)
            ) ? 1 : -1
        }
        return toolbarItems.sort(sortMethod);
    }
}
