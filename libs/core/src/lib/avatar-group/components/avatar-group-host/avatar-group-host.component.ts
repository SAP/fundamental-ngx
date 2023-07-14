import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChildren,
    ElementRef,
    inject,
    Input,
    NgZone,
    OnInit,
    QueryList,
    TemplateRef,
    ViewChild,
    ViewContainerRef
} from '@angular/core';
import { NgIf, NgTemplateOutlet } from '@angular/common';
import { combineLatest, delayWhen, map, Observable, startWith, takeUntil } from 'rxjs';
import {
    DestroyedService,
    FocusableListDirective,
    HasElementRef,
    ResizeObserverService
} from '@fundamental-ngx/cdk/utils';
import { PopoverBodyComponent, PopoverComponent, PopoverControlComponent } from '@fundamental-ngx/core/popover';
import { AvatarGroupItemDirective } from '../../directives/avatar-group-item.directive';
import { AvatarGroupItemPortalDirective } from '../../directives/avatar-group-item-portal.directive';
import { AvatarGroupOverflowButtonComponent } from '../avatar-group-overflow-button.component';
import { AvatarGroupHostConfig } from '../../types';

@Component({
    selector: 'fd-avatar-group-host',
    // eslint-disable-next-line @angular-eslint/no-host-metadata-property
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
    templateUrl: './avatar-group-host.component.html',
    standalone: true,
    imports: [
        NgIf,
        PopoverComponent,
        PopoverControlComponent,
        PopoverBodyComponent,
        NgTemplateOutlet,
        AvatarGroupOverflowButtonComponent
    ],
    providers: [DestroyedService],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AvatarGroupHostComponent implements AfterViewInit, OnInit, HasElementRef, AvatarGroupHostConfig {
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
    resizeTarget: HTMLElement;

    /** @hidden */
    @Input()
    items: QueryList<AvatarGroupItemDirective>;

    /** @hidden */
    @ContentChildren(AvatarGroupItemPortalDirective, { descendants: true })
    portals: QueryList<AvatarGroupItemPortalDirective>;

    /** @hidden */
    @ViewChild(TemplateRef)
    viewMoreTemplate: TemplateRef<void>;

    /** @hidden */
    elementRef = inject(ElementRef);

    /** @hidden */
    focusableList = inject(FocusableListDirective, { optional: true, host: true });

    /** @hidden */
    private resizeObserverService = inject(ResizeObserverService);

    /** @hidden */
    hostResize$: Observable<number>;

    /** @hidden */
    hiddenItems: AvatarGroupItemPortalDirective[] = [];

    /** @hidden */
    private _destroyed$ = inject(DestroyedService);

    /** @hidden */
    private _changeDetectorRef = inject(ChangeDetectorRef);

    /** @hidden */
    private ngZone = inject(NgZone);

    /** @hidden */
    private viewContainerRef = inject(ViewContainerRef);

    /** @hidden */
    ngOnInit(): void {
        if (this.resizeTarget) {
            this.hostResize$ = this.resizeObserverService
                .observe(this.resizeTarget)
                .pipe(map(() => this.resizeTarget.getBoundingClientRect().width));
        } else {
            this.hostResize$ = this.resizeObserverService
                .observe(this.elementRef)
                .pipe(map(() => this.elementRef.nativeElement.getBoundingClientRect().width));
        }
    }

    /** @hidden */
    ngAfterViewInit(): void {
        if (this.focusableList) {
            this.focusableList.setItems(this.items);
        }
        combineLatest([
            this.hostResize$,
            this.portals.changes.pipe(
                startWith(this.portals),
                map((r) => r.toArray())
            )
        ])
            .pipe(
                delayWhen(() => this.ngZone.onStable.asObservable()),
                takeUntil(this._destroyed$)
            )
            .subscribe(([containerWidth, items]) => this.calculateVisibility(containerWidth, items));
    }

    /** @hidden */
    calculateVisibility(containerWidth: number, items: AvatarGroupItemPortalDirective[]): void {
        const forcedVisibleItems = items.filter((i) => i.forceVisibility);
        const visibleItems: AvatarGroupItemPortalDirective[] = [];
        const visibleItemsWidth = forcedVisibleItems.reduce((acc, item) => acc + item.width, 0);
        let accWidth = 70 + visibleItemsWidth;
        for (const item of items) {
            if (forcedVisibleItems.includes(item)) {
                visibleItems.push(item);
                continue;
            }
            accWidth += item.width;
            if (accWidth <= containerWidth) {
                visibleItems.push(item);
            } else {
                break;
            }
        }
        this.hiddenItems = items.filter((item) => !visibleItems.includes(item));
        this._changeDetectorRef.detectChanges();
        items.forEach((item) => {
            const shouldShow = visibleItems.includes(item);
            if (item.visible && !shouldShow) {
                item.hide();
            } else if (!item.visible && shouldShow) {
                item.show();
            }
        });
        if (this.hiddenItems.length > 0) {
            const embeddedView = visibleItems[visibleItems.length - 1].viewContainerRef.createEmbeddedView(
                this.viewMoreTemplate
            );
            embeddedView.detectChanges();
        }
    }
}
