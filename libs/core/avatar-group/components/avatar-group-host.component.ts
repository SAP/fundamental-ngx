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
    OnChanges,
    OnInit,
    QueryList,
    signal,
    SimpleChanges,
    ViewEncapsulation
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
    applyCssClass,
    CssClassBuilder,
    HasElementRef,
    Nullable,
    ResizeObserverDirective
} from '@fundamental-ngx/cdk/utils';
import { animationFrames, combineLatest, delayWhen, map, Observable, startWith, Subject } from 'rxjs';
import { AvatarGroupItemRendererDirective } from '../directives/avatar-group-item-renderer.directive';
import { AvatarGroupItemDirective } from '../directives/avatar-group-item.directive';
import { AvatarGroupHostConfig } from '../types';

@Component({
    selector: 'fd-avatar-group-host',
    template: '<ng-content></ng-content>',
    standalone: true,
    imports: [],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
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
     * The orientation of the avatar group.
     * Options include 'horizontal' and 'vertical'.
     **/
    @Input()
    orientation: AvatarGroupHostConfig['orientation'];

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
     * @ignore
     * The portals to be rendered in the avatar group.
     **/
    @ContentChildren(AvatarGroupItemRendererDirective, { descendants: true })
    _portals: QueryList<AvatarGroupItemRendererDirective>;

    /** @ignore */
    _resizeEmitter: Observable<ResizeObserverEntry[]> = inject(ResizeObserverDirective).resized;

    /** The reference to the host element */
    elementRef = inject(ElementRef);

    /** @ignore */
    _hiddenItems = signal<AvatarGroupItemRendererDirective[]>([]);

    /** @ignore */
    private readonly _destroyRef = inject(DestroyRef);

    /** @ignore */
    private _cdr = inject(ChangeDetectorRef);

    /** @ignore */
    private _onChanges$ = new Subject<SimpleChanges>();

    /** @ignore */
    @applyCssClass
    buildComponentCssClass(): string[] {
        return [
            this.class || '',
            'fd-avatar-group',
            this.type === 'individual' ? 'fd-avatar-group--individual-type' : '',
            this.type === 'group' ? 'fd-avatar-group--group-type' : '',
            this.orientation ? 'fd-avatar-group--' + this.orientation : '',
            this.size ? 'fd-avatar-group--' + this.size : ''
        ];
    }

    /** @ignore */
    ngOnInit(): void {
        this.buildComponentCssClass();
    }

    /** @ignore */
    ngOnChanges(changes: SimpleChanges): void {
        this.buildComponentCssClass();
        this._onChanges$.next(changes);
    }

    /** @ignore */
    ngAfterViewInit(): void {
        combineLatest([
            this._resizeEmitter.pipe(map((entries) => entries[0].contentRect.width)),
            this._portals.changes.pipe(
                startWith(this._portals),
                map((r) => r.toArray())
            ),
            this._onChanges$.pipe(startWith({}))
        ])
            .pipe(
                map(([containerWidth, items]) => this._calculateVisibility(containerWidth, items)),
                delayWhen(() => animationFrames()),
                takeUntilDestroyed(this._destroyRef)
            )
            .subscribe(({ hiddenItems, visibleItems }) => {
                visibleItems.forEach((item) => item.show());
                hiddenItems.forEach((item) => item.hide());
                this._cdr.detectChanges();
                this._hiddenItems.set(hiddenItems);
            });
    }

    /** @ignore */
    private _calculateVisibility(
        containerWidth: number,
        items: AvatarGroupItemRendererDirective[]
    ): {
        hiddenItems: AvatarGroupItemRendererDirective[];
        visibleItems: AvatarGroupItemRendererDirective[];
    } {
        if (this.orientation === 'vertical') {
            return {
                visibleItems: items,
                hiddenItems: []
            };
        }
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
        /* take last item from the visibleItems which is not forced to be visible and push it to the hiddenItems
         * This is done to free up the space for the overflow button
         */
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
