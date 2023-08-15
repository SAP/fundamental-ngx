import { PortalModule } from '@angular/cdk/portal';
import { NgForOf, NgIf, NgTemplateOutlet } from '@angular/common';
import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    inject,
    Input,
    OnDestroy,
    QueryList,
    Renderer2,
    ViewChildren
} from '@angular/core';
import { elementClick$, FocusableListDirective, RtlService } from '@fundamental-ngx/cdk/utils';
import { BarModule } from '@fundamental-ngx/core/bar';
import { PopoverBodyHeaderDirective } from '@fundamental-ngx/core/popover';
import { map, merge, startWith, Subscription } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';
import { AvatarGroupItemRendererDirective } from '../../directives/avatar-group-item-renderer.directive';
import { AvatarGroupItemDirective } from '../../directives/avatar-group-item.directive';

@Component({
    selector: 'fd-default-avatar-group-overflow-body',
    templateUrl: './default-avatar-group-overflow-body.component.html',
    imports: [
        NgForOf,
        PortalModule,
        AvatarGroupItemRendererDirective,
        FocusableListDirective,
        NgIf,
        NgTemplateOutlet,
        PopoverBodyHeaderDirective,
        BarModule
    ],
    host: {
        class: 'fd-popover__wrapper',
        '[style.display]': '"flex"',
        '[style.flex-direction]': '"column"',
        '[style.max-width.rem]': '20'
    },
    standalone: true
})
export class DefaultAvatarGroupOverflowBodyComponent implements AfterViewInit, OnDestroy {
    /** @hidden */
    @Input()
    avatars: Iterable<AvatarGroupItemRendererDirective> = [];

    /** @hidden */
    @Input()
    overflowPopoverTitle: string;

    /** @hidden */
    @ViewChildren(AvatarGroupItemRendererDirective)
    avatarGroupItemPortals: QueryList<AvatarGroupItemRendererDirective>;

    /** @hidden */
    overflowPopoverStage: 'main' | 'details' = 'main';

    /** @hidden */
    selectedItem: AvatarGroupItemDirective;

    /** @hidden */
    get isDetailStage(): boolean {
        return this.overflowPopoverStage === 'details';
    }

    /** @hidden */
    get isRtl(): boolean {
        return !!this._rtlService?.rtl.value;
    }
    /** @hidden */
    private changeDetectorRef = inject(ChangeDetectorRef);

    /** @hidden */
    private _itemClickSubscription: Subscription;

    /** @hidden */
    private _renderer = inject(Renderer2);

    /** @hidden */
    private _rtlService = inject(RtlService, { optional: true });

    /** @hidden */
    ngAfterViewInit(): void {
        this.avatarGroupItemPortals.changes
            .pipe(
                startWith(this.avatarGroupItemPortals),
                map((avatarGroupItemPortals) => avatarGroupItemPortals.toArray())
            )
            .subscribe((items: AvatarGroupItemRendererDirective[]) => {
                if (this._itemClickSubscription) {
                    this._itemClickSubscription.unsubscribe();
                }
                this._itemClickSubscription = merge(
                    ...items.map((item) =>
                        item.element$.pipe(
                            filter(Boolean),
                            switchMap((el) => elementClick$(el, this._renderer).pipe(map(() => item)))
                        )
                    )
                ).subscribe((item: AvatarGroupItemRendererDirective) => {
                    this.overflowPopoverStage = 'details';
                    this.selectedItem = item.avatarGroupItem;
                    this.changeDetectorRef.detectChanges();
                });
            });
    }

    /** @hidden */
    ngOnDestroy(): void {
        if (this._itemClickSubscription) {
            this._itemClickSubscription.unsubscribe();
        }
    }

    /** @hidden */
    openOverflowMain(): void {
        this.overflowPopoverStage = 'main';
        this.changeDetectorRef.detectChanges();
    }
}
