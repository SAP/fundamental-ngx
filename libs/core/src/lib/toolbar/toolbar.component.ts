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
import { delay, tap, debounceTime, takeWhile, distinctUntilChanged, switchMap } from 'rxjs/operators';

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
        return this.overflowBody.nativeElement as HTMLElement;
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
    constructor(private _cd: ChangeDetectorRef, private _renderer: Renderer2) {}

    /** @hidden */
    ngOnInit(): void {
        fromEvent(window, 'resize')
            .pipe(
                takeWhile(() => this._alive && this.shouldOverflow),
                debounceTime(100),
                distinctUntilChanged(),
                switchMap(() => this._onResize())
            )
            .subscribe();
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

    /** @hidden */
    private _onResize(): Observable<boolean> {
        return of(true).pipe(
            takeWhile(() => this._alive),
            tap(() => this._reset()),
            delay(5),
            tap(() => this._collapseItems())
        );
    }

    // shouldOverflow items
    /** @hidden */
    private _collapseItems(): void {
        this._groupedCollection = this._getGroupedCollection();
        this._groupedCollectionPriority = this._getGroupedCollectionPriority();
        const _sortedByPriorityAndGroupItems = this._getSortedByPriorityAndGroupItems();
        const overflowItems: ToolbarItemDirective[] = [];
        const normalItems: ToolbarItemDirective[] = [];

        _sortedByPriorityAndGroupItems.reduce((_contentWidth, toolbarItem) => {
            const itemWidth = this._getElementWidthWithMargin(toolbarItem);
            const itemGroup = this._getElementGroup(toolbarItem);
            const itemPriority = this._getElementPriority(toolbarItem);
            const shouldItemBeRemovedByWidth = this._shouldToolbarItemBeRemovedByWidth(itemWidth, _contentWidth);
            const shouldAlwaysBeInOverflow = itemPriority === OverflowPriorityEnum.ALWAYS;
            const shouldNeverBeInOverflow = itemPriority === OverflowPriorityEnum.NEVER;

            if (shouldItemBeRemovedByWidth && itemGroup && !shouldNeverBeInOverflow) {
                const lowestGroup = this._getLowestGroupByPriority(itemGroup);
                let itemsToRemove = this._groupedCollection[lowestGroup];
                if (lowestGroup !== itemGroup) {
                    itemsToRemove = [...itemsToRemove, ...this._groupedCollection[itemGroup]];
                }

                // tslint:disable-next-line:no-unused-expression
                itemsToRemove && itemsToRemove.forEach(item => {
                    this._removeItemFromArray(normalItems, item);
                    const isDisappear = this._getElementPriority(item) === OverflowPriorityEnum.DISAPPEAR;
                    if (isDisappear) {
                        this._disappearElements.push(item);
                    }

                    if (overflowItems.indexOf(item) === -1 && !isDisappear) {
                        overflowItems.push(item);
                    }
                });

                delete this._groupedCollection[lowestGroup];
                delete this._groupedCollection[itemGroup];
                delete this._groupedCollectionPriority[lowestGroup];
                delete this._groupedCollectionPriority[itemGroup];

                return MAX_CONTENT_SIZE;
            }

            if ((shouldItemBeRemovedByWidth && !itemGroup && !shouldNeverBeInOverflow) || shouldAlwaysBeInOverflow) {
                const isDisappear = itemPriority === OverflowPriorityEnum.DISAPPEAR;
                if (isDisappear) {
                    this._disappearElements.push(toolbarItem);
                } else {
                    overflowItems.push(toolbarItem);
                }

                return shouldAlwaysBeInOverflow ? _contentWidth : MAX_CONTENT_SIZE;
            }

            normalItems.push(toolbarItem);

            return _contentWidth + itemWidth;
        }, 0);

        this._normalElements.push(...this.toolbarItems.filter(item => normalItems.indexOf(item) >= 0));
        this._overflowElements.push(...this.toolbarItems.filter(item => overflowItems.indexOf(item) >= 0));
        this._addToolbarItemToOverflow(this._overflowElements);
        this._disappearElements.forEach(this._removeToolbarItemFromDOM.bind(this));

        this.toolbarItems.forEach((x) =>
            this._changeItemVisibilityState(x.elementRef.nativeElement, true)
        );

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
            .concat(groups[0].map(item => {
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
    private _getLowestGroupByPriority(itemGroup: number): number {
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
            this._overflowBody.appendChild(x.elementRef.nativeElement);
        });
    }

    /** @hidden */
    private _reset(): void {
        this._normalElements.forEach(this._removeToolbarItemFromDOM.bind(this));
        this._overflowElements.forEach(this._removeToolbarItemFromDOM.bind(this));

        this.toolbarItems.map((x) => {
            this._changeItemVisibilityState(x.elementRef.nativeElement, false);
            this._renderer.insertBefore(this._toolbar, x.elementRef.nativeElement, this.overflowSpacer.nativeElement);
        });

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
}
