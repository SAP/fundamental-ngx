import { PortalModule } from '@angular/cdk/portal';
import { NgTemplateOutlet } from '@angular/common';
import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Input,
    OnDestroy,
    QueryList,
    Renderer2,
    ViewChildren,
    ViewEncapsulation,
    inject
} from '@angular/core';
import { FocusableListDirective, RtlService, elementClick$ } from '@fundamental-ngx/cdk/utils';
import { BarModule } from '@fundamental-ngx/core/bar';
import { PopoverBodyHeaderDirective } from '@fundamental-ngx/core/popover';
import { Subscription, map, merge, startWith } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';
import { AvatarGroupItemRendererDirective } from '../../directives/avatar-group-item-renderer.directive';
import { AvatarGroupItemDirective } from '../../directives/avatar-group-item.directive';

@Component({
    selector: 'fd-default-avatar-group-overflow-body',
    templateUrl: './default-avatar-group-overflow-body.component.html',
    imports: [
        PortalModule,
        AvatarGroupItemRendererDirective,
        FocusableListDirective,
        NgTemplateOutlet,
        PopoverBodyHeaderDirective,
        BarModule
    ],
    host: {
        class: 'fd-popover__wrapper',
        '[style.max-width.rem]': '20'
    },
    styleUrl: './default-avatar-group-overflow-body.component.scss',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DefaultAvatarGroupOverflowBodyComponent implements AfterViewInit, OnDestroy {
    /**
     * List of avatars to be rendered in the overflow popover.
     **/
    @Input()
    avatars: Iterable<AvatarGroupItemRendererDirective> = [];

    /**
     * Title of the overflow popover.
     * */
    @Input()
    overflowPopoverTitle: string;

    /** @ignore */
    @ViewChildren(AvatarGroupItemRendererDirective)
    _avatarGroupItemPortals: QueryList<AvatarGroupItemRendererDirective>;

    /** @ignore */
    _overflowPopoverStage: 'main' | 'details' = 'main';

    /** @ignore */
    _selectedItem: AvatarGroupItemDirective;

    /** @ignore */
    get _isDetailStage(): boolean {
        return this._overflowPopoverStage === 'details';
    }

    /** @ignore */
    get isRtl(): boolean {
        return !!this._rtlService?.rtl.value;
    }
    /** @ignore */
    private _itemClickSubscription: Subscription;

    /** @ignore */
    private readonly _changeDetectorRef = inject(ChangeDetectorRef);

    /** @ignore */
    private readonly _renderer = inject(Renderer2);

    /** @ignore */
    private readonly _rtlService = inject(RtlService, { optional: true });

    /** @ignore */
    ngAfterViewInit(): void {
        this._avatarGroupItemPortals.changes
            .pipe(
                startWith(this._avatarGroupItemPortals),
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
                    this._overflowPopoverStage = 'details';
                    this._selectedItem = item.avatarGroupItem;
                    this._changeDetectorRef.detectChanges();
                });
            });
    }

    /** @ignore */
    ngOnDestroy(): void {
        if (this._itemClickSubscription) {
            this._itemClickSubscription.unsubscribe();
        }
    }

    /** @ignore */
    _openOverflowMain(): void {
        this._overflowPopoverStage = 'main';
        this._changeDetectorRef.detectChanges();
    }
}
