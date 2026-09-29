import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChildren,
    DestroyRef,
    ElementRef,
    inject,
    Input,
    input,
    OnChanges,
    OnInit,
    QueryList,
    signal,
    ViewEncapsulation
} from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import {
    applyCssClass,
    CssClassBuilder,
    HasElementRef,
    Nullable,
    ResizeObserverDirective
} from '@fundamental-ngx/cdk/utils';
import { animationFrames, combineLatest, delayWhen, map, Observable, startWith } from 'rxjs';
import { AvatarGroupItemRendererDirective } from '../directives/avatar-group-item-renderer.directive';
import { AvatarGroupItemDirective } from '../directives/avatar-group-item.directive';
import { AvatarGroupHostConfig, AvatarGroupOrientation } from '../types';

@Component({
    selector: 'fd-avatar-group-host',
    template: '<ng-content></ng-content>',
    imports: [],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    styleUrl: './avatar-group-host.component.scss'
})
export class AvatarGroupHostComponent
    implements OnInit, AfterViewInit, OnChanges, HasElementRef, AvatarGroupHostConfig, CssClassBuilder
{
    /**
     * The class to apply to the host element.
     **/
    @Input()
    class: Nullable<string>;

    /**
     * The type of the avatar group.
     * Options include 'individual' and 'group'.
     **/
    @Input()
    type: AvatarGroupHostConfig['type'];

    /**
     * The size of the avatar group.
     * Options include 'xs', 's', 'm', 'l', and 'xl'.
     **/
    @Input()
    size: AvatarGroupHostConfig['size'];

    /**
     * The items to be rendered in the avatar group.
     **/
    @Input()
    items: QueryList<AvatarGroupItemDirective>;

    /**
     * @hidden
     * The portals to be rendered in the avatar group.
     **/
    @ContentChildren(AvatarGroupItemRendererDirective, { descendants: true })
    _portals: QueryList<AvatarGroupItemRendererDirective>;

    /**
     * Maximum number of avatars to show before the overflow button.
     * When set, overrides the width-based visibility calculation.
     **/
    readonly maxVisibleItems = input<number | null>(null);

    /**
     * The orientation of the avatar group.
     * Options include 'horizontal' and 'vertical'.
     **/
    readonly orientation = input<AvatarGroupOrientation>('horizontal');

    /** @hidden */
    _resizeEmitter: Observable<ResizeObserverEntry[]> = inject(ResizeObserverDirective).resizeEvents$;

    /** The reference to the host element */
    readonly elementRef = inject(ElementRef);

    /** @hidden */
    _hiddenItems = signal<AvatarGroupItemRendererDirective[]>([]);

    /** @hidden */
    private readonly _maxVisibleItems$ = toObservable(this.maxVisibleItems);

    /** @hidden */
    private readonly _destroyRef = inject(DestroyRef);

    /** @hidden */
    private _cdr = inject(ChangeDetectorRef);

    /** @hidden */
    @applyCssClass
    buildComponentCssClass(): string[] {
        return [
            this.class || '',
            'fd-avatar-group',
            this.type === 'individual' ? 'fd-avatar-group--individual-type' : '',
            this.type === 'group' ? 'fd-avatar-group--group-type' : '',
            this.orientation() ? 'fd-avatar-group--' + this.orientation() : '',
            this.size ? 'fd-avatar-group--' + this.size : ''
        ];
    }

    /** @hidden */
    ngOnInit(): void {
        this.buildComponentCssClass();
    }

    /** @hidden */
    ngOnChanges(): void {
        this.buildComponentCssClass();
    }

    /** @hidden */
    ngAfterViewInit(): void {
        combineLatest([
            this._resizeEmitter.pipe(map((entries) => entries[0].contentRect.width)),
            this._portals.changes.pipe(
                startWith(this._portals),
                map((r: QueryList<AvatarGroupItemRendererDirective>) => r.toArray())
            ),
            this._maxVisibleItems$
        ])
            .pipe(
                map(([containerWidth, items, maxVisibleItems]) =>
                    this._calculateVisibility(containerWidth, items, maxVisibleItems)
                ),
                delayWhen(() => animationFrames()),
                takeUntilDestroyed(this._destroyRef)
            )
            .subscribe(({ hiddenItems, visibleItems }) => {
                const allItems = this._portals.toArray();
                const total = allItems.length;
                allItems.forEach((item, index) => {
                    item.posInSet = index + 1;
                    item.setSize = total;
                });
                visibleItems.forEach((item) => item.show());
                hiddenItems.forEach((item) => item.hide());
                this._cdr.detectChanges();
                this._hiddenItems.set(hiddenItems);
            });
    }

    /** @hidden */
    private _calculateVisibility(
        containerWidth: number,
        items: AvatarGroupItemRendererDirective[],
        maxVisibleItems: number | null
    ): {
        hiddenItems: AvatarGroupItemRendererDirective[];
        visibleItems: AvatarGroupItemRendererDirective[];
    } {
        if (this.orientation() === 'vertical') {
            return maxVisibleItems != null
                ? this._calculateVisibilityWithMaxItems(Infinity, items, maxVisibleItems)
                : { visibleItems: items, hiddenItems: [] };
        }

        return maxVisibleItems != null
            ? this._calculateVisibilityWithMaxItems(containerWidth, items, maxVisibleItems)
            : this._calculateVisibilityByWidth(containerWidth, items);
    }

    /** @hidden */
    private _calculateVisibilityWithMaxItems(
        containerWidth: number,
        items: AvatarGroupItemRendererDirective[],
        maxVisibleItems: number
    ): {
        hiddenItems: AvatarGroupItemRendererDirective[];
        visibleItems: AvatarGroupItemRendererDirective[];
    } {
        const forcedVisible = items.filter((i) => i.forceVisibility);
        const regular = items.filter((i) => !i.forceVisibility);
        const maxRegularSlots = Math.max(0, maxVisibleItems - forcedVisible.length);

        // Respect both maxVisibleItems cap and containerWidth constraint
        let accWidth = forcedVisible.reduce((acc, item) => acc + item.width, 0);
        const visibleRegular: AvatarGroupItemRendererDirective[] = [];

        for (let i = 0; i < Math.min(regular.length, maxRegularSlots); i++) {
            const item = regular[i];
            accWidth += item.width;
            if (accWidth <= containerWidth) {
                visibleRegular.push(item);
            } else {
                break;
            }
        }

        const hiddenRegular = regular.slice(visibleRegular.length);

        // If there are hidden items and visible regular items,
        // move the last one to hidden to make room for overflow button
        if (hiddenRegular.length > 0 && visibleRegular.length > 0) {
            const movedItem = visibleRegular.pop();
            if (movedItem) {
                hiddenRegular.unshift(movedItem);
            }
        }

        return {
            visibleItems: [...forcedVisible, ...visibleRegular],
            hiddenItems: hiddenRegular
        };
    }

    /** @hidden */
    private _calculateVisibilityByWidth(
        containerWidth: number,
        items: AvatarGroupItemRendererDirective[]
    ): {
        hiddenItems: AvatarGroupItemRendererDirective[];
        visibleItems: AvatarGroupItemRendererDirective[];
    } {
        const visibleItems = items.filter((i) => i.forceVisibility);
        const hiddenItems: AvatarGroupItemRendererDirective[] = [];
        let accWidth = items.reduce((acc, item) => (item.forceVisibility ? acc + item.width : acc), 0);

        for (const item of items) {
            if (item.forceVisibility) {
                continue;
            }
            accWidth += item.width;
            if (accWidth <= containerWidth) {
                visibleItems.push(item);
            } else if (!item.forceVisibility) {
                hiddenItems.push(item);
            }
        }

        // Take last item from the visibleItems which is not forced to be visible
        // and push it to the hiddenItems to free up the space for the overflow button
        if (hiddenItems.length > 0) {
            const lastAllowedToBeHidden = visibleItems.reverse().findIndex((item) => !item.forceVisibility);
            hiddenItems.push(...visibleItems.splice(lastAllowedToBeHidden * -1, 1));
        }

        return {
            visibleItems,
            hiddenItems
        };
    }
}
