import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ContentChildren,
    ElementRef,
    forwardRef,
    HostBinding,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    QueryList,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';

import { fromEvent, of, Subscription } from 'rxjs';
import { debounceTime, delay, distinctUntilChanged } from 'rxjs/operators';

import { ColorAccent, Size } from '../utils/public_api';
import { AvatarGroupItemDirective } from './directives/avatar-group-item.directive';

export type AvatarGroupType = 'group' | 'individual';
export type AvatarGroupOverflowButtonColor = 'neutral' | 'random' | ColorAccent;

let avatarGroupUniqueId = 0;

@Component({
    selector: 'fd-avatar-group',
    templateUrl: './avatar-group.component.html',
    styleUrls: ['./avatar-group.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.Default
})
export class AvatarGroupComponent implements OnChanges, OnInit, AfterViewInit, OnDestroy {
    /** Id of the Avatar Group. */
    @Input()
    @HostBinding('attr.id')
    id = `fd-avatar-group-${avatarGroupUniqueId++}`;

    /** The size of the Avatar Group. Options include: *xs*, *s*, *m*, *l* and *xl* (default: *s*). */
    @Input()
    size: Size = 's';

    /** The type of the Avatar Group. Options include: *group* and *individual* (default: *group*). */
    @Input()
    type: AvatarGroupType = 'group';

    /** Aria-label for Avatar Group. */
    @Input()
    ariaLabel: string = null;

    /** Counter for all avatars. */
    allItemsCount = 0;

    /** Counter for visible in main content avatars. */
    visibleItemsCount = 0;

    /** Counter for visible in overflow popover avatars. */
    overflowItemsCount = 0;

    /** @hidden Avatar Group items. */
    @ContentChildren(forwardRef(() => AvatarGroupItemDirective), { descendants: true })
    mainItems: QueryList<AvatarGroupItemDirective>;

    /** @hidden */
    @ViewChild('avatarGroupContainer')
    avatarGroupContainer: ElementRef;

    /** @hidden */
    rootClassNames: Record<string, boolean | undefined | null>;

    /** @hidden */
    get isGroupType(): boolean {
        return this.type === 'group';
    }

    /** @hidden */
    private get _avatarGroupWidth(): number {
        return (this.avatarGroupContainer?.nativeElement as HTMLElement)?.offsetWidth;
    }

    /** @hidden */
    private get _avatarGroupItemWidth(): number {
        return (this.mainItems?.first?.elementRef?.nativeElement as HTMLElement)?.offsetWidth;
    }

    /** @hidden */
    private get _avatarGroupItemWithMarginsWidth(): number {
        const elementStyles = getComputedStyle(this.mainItems?.first?.elementRef?.nativeElement);
        return this._avatarGroupItemWidth
            + parseInt(elementStyles.marginLeft, 10)
            + parseInt(elementStyles.marginRight, 10);
    }

    /** @hidden */
    private _subscription = new Subscription();

    /** @hidden */
    ngOnInit(): void {
        const sub = fromEvent(window, 'resize')
            .pipe(distinctUntilChanged())
            .subscribe(_ => this._onResize());

        this._subscription.add(sub);
    }

    /** @hidden */
    ngOnChanges(): void {
        this._assignCssClasses();
    }

    /** @hidden */
    ngAfterViewInit(): void {
        this._subscription.add(of(true).pipe(delay(5)).subscribe(() => this._collapseItems()));
        this._listenForItemChanges();
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._subscription.unsubscribe();
    }

    /** @hidden */
    private _onResize(): void {
        this._reset();
        this._collapseItems();
    }

    /** @hidden */
    private _reset(): void {
        this.allItemsCount = this.mainItems.length;
        this.visibleItemsCount = this.mainItems.length;
        this.overflowItemsCount = 0;

        this.mainItems.forEach(it => (it.elementRef.nativeElement.style.display = 'inline-block'));
    }

    /** @hidden */
    private _collapseItems(): void {
        const allItemsCounter = this.mainItems?.length || 0;
        let contentWidth = 0;
        let idx = 0;

        while (idx < allItemsCounter) {
            const newContentWidth = idx === 0 && this.isGroupType
                ? contentWidth + this._avatarGroupItemWidth
                : contentWidth + this._avatarGroupItemWithMarginsWidth;

            if (newContentWidth >= this._avatarGroupWidth) {
                // -1 because the last element in the loop will be replaced by the overflow button
                const newIdx = idx - 1;

                this.visibleItemsCount = newIdx;
                this.overflowItemsCount = allItemsCounter - newIdx;

                const mainItemsToHide = this.mainItems.toArray().slice(newIdx);
                mainItemsToHide.forEach(it => (it.elementRef.nativeElement.style.display = 'none'));

                break;
            }

            contentWidth = newContentWidth;
            idx++;
        }
    }

    /** @hidden */
    private _listenForItemChanges(): void {
        this._subscription.add(this.mainItems.changes.subscribe(() => this._onResize()));
    }

    /** @hidden */
    private _assignCssClasses(): void {
        this.rootClassNames = {
            'fd-avatar-group': true,
            [`fd-avatar-group--${this.type}-type`]: true,
            [`fd-avatar-group--${this.size}`]: true
        };
    }
}
