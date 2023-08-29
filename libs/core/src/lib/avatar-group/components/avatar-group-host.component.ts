import { NgIf } from '@angular/common';
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
    QueryList,
    signal,
    SimpleChanges,
    ViewEncapsulation
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { HasElementRef, ResizeObserverDirective } from '@fundamental-ngx/cdk/utils';
import { animationFrames, combineLatest, delayWhen, map, Observable, startWith, Subject } from 'rxjs';
import { AvatarGroupItemRendererDirective } from '../directives/avatar-group-item-renderer.directive';
import { AvatarGroupItemDirective } from '../directives/avatar-group-item.directive';
import { AvatarGroupHostConfig } from '../types';

@Component({
    selector: 'fd-avatar-group-host',
    host: {
        class: 'fd-avatar-group',
        '[class.fd-avatar-group--individual-type]': 'type === "individual"',
        '[class.fd-avatar-group--group-type]': 'type === "group"',
        '[class.fd-avatar-group--horizontal]': 'orientation === "horizontal"',
        '[class.fd-avatar-group--vertical]': 'orientation === "vertical"',
        '[class.fd-avatar-group--xs]': 'size === "xs"',
        '[class.fd-avatar-group--s]': 'size === "s"',
        '[class.fd-avatar-group--m]': 'size === "m"',
        '[class.fd-avatar-group--l]': 'size === "l"',
        '[class.fd-avatar-group--xl]': 'size === "xl"'
    },
    template: '<ng-content></ng-content>',
    standalone: true,
    imports: [NgIf],
    changeDetection: ChangeDetectionStrategy.OnPush,
    hostDirectives: [ResizeObserverDirective],
    encapsulation: ViewEncapsulation.None
})
export class AvatarGroupHostComponent implements AfterViewInit, OnChanges, HasElementRef, AvatarGroupHostConfig {
    /** @hidden */
    @Input()
    type: AvatarGroupHostConfig['type'];

    /** @hidden */
    @Input()
    orientation: AvatarGroupHostConfig['orientation'];

    /** @hidden */
    @Input()
    size: AvatarGroupHostConfig['size'];

    /** @hidden */
    @Input()
    resizeEmitter: Observable<ResizeObserverEntry[]> = inject(ResizeObserverDirective).resized;

    /** @hidden */
    @Input()
    items: QueryList<AvatarGroupItemDirective>;

    /** @hidden */
    @ContentChildren(AvatarGroupItemRendererDirective, { descendants: true })
    portals: QueryList<AvatarGroupItemRendererDirective>;

    /** The reference to the host element */
    elementRef = inject(ElementRef);

    /** @hidden */
    hiddenItems = signal<AvatarGroupItemRendererDirective[]>([]);

    /** @hidden */
    private readonly _destroyRef = inject(DestroyRef);

    /** @hidden */
    private _cdr = inject(ChangeDetectorRef);

    /** @hidden */
    private _onChanges$ = new Subject<SimpleChanges>();

    /** @hidden */
    ngOnChanges(changes: SimpleChanges): void {
        this._onChanges$.next(changes);
    }

    /** @hidden */
    ngAfterViewInit(): void {
        combineLatest([
            this.resizeEmitter.pipe(map((entries) => entries[0].contentRect.width)),
            this.portals.changes.pipe(
                startWith(this.portals),
                map((r) => r.toArray())
            ),
            this._onChanges$.pipe(startWith({}))
        ])
            .pipe(
                map(([containerWidth, items]) => this.calculateVisibility(containerWidth, items)),
                delayWhen(() => animationFrames()),
                takeUntilDestroyed(this._destroyRef)
            )
            .subscribe(({ hiddenItems, visibleItems }) => {
                visibleItems.forEach((item) => item.show());
                hiddenItems.forEach((item) => item.hide());
                this._cdr.detectChanges();
                this.hiddenItems.set(hiddenItems);
            });
    }

    /** @hidden */
    calculateVisibility(
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
