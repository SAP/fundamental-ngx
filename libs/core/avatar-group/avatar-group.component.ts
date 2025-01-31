import { Direction } from '@angular/cdk/bidi';
import { DialogModule } from '@angular/cdk/dialog';
import { NgTemplateOutlet } from '@angular/common';
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChild,
    ContentChildren,
    Input,
    OnInit,
    QueryList,
    ViewChild,
    ViewChildren,
    ViewEncapsulation,
    computed,
    inject,
    signal
} from '@angular/core';
import {
    DynamicPortalComponent,
    FocusableItemDirective,
    FocusableListDirective,
    Nullable,
    ResizeObserverDirective,
    RtlService
} from '@fundamental-ngx/cdk/utils';
import { PopoverModule, PopoverService } from '@fundamental-ngx/core/popover';
import { Placement } from '@fundamental-ngx/core/shared';
import { AvatarGroupHostComponent } from './components/avatar-group-host.component';
import { AvatarGroupOverflowButtonComponent } from './components/avatar-group-overflow-button.component';
import { DefaultAvatarGroupOverflowBodyComponent } from './components/default-avatar-group-overflow-body/default-avatar-group-overflow-body.component';
import { AvatarGroupInternalOverflowButtonDirective } from './directives/avatar-group-internal-overflow-button.directive';
import { AvatarGroupItemRendererDirective } from './directives/avatar-group-item-renderer.directive';
import { AvatarGroupItemDirective } from './directives/avatar-group-item.directive';
import { AvatarGroupOverflowBodyDirective } from './directives/avatar-group-overflow-body.directive';
import { AvatarGroupOverflowButtonDirective } from './directives/avatar-group-overflow-button.directive';
import { AVATAR_GROUP_HOST_CONFIG } from './tokens';
import { AvatarGroupHostConfig } from './types';

@Component({
    selector: 'fd-avatar-group',
    templateUrl: './avatar-group.component.html',
    styleUrl: './avatar-group.component.scss',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    providers: [
        {
            provide: AVATAR_GROUP_HOST_CONFIG,
            useExisting: AvatarGroupComponent
        },
        PopoverService
    ],
    imports: [
        AvatarGroupHostComponent,
        PopoverModule,
        NgTemplateOutlet,
        FocusableItemDirective,
        DynamicPortalComponent,
        FocusableListDirective,
        DialogModule,
        AvatarGroupItemRendererDirective,
        AvatarGroupOverflowButtonComponent,
        DefaultAvatarGroupOverflowBodyComponent,
        AvatarGroupInternalOverflowButtonDirective,
        ResizeObserverDirective
    ]
})
export class AvatarGroupComponent implements AvatarGroupHostConfig, OnInit {
    /**
     * The AvatarGroup control has two group types:
     *
     * `group`: The avatars are displayed as partially overlapped on top of each other and the entire group has one click/tap area.
     * `individual`: The avatars are displayed side-by-side and each avatar has its own click/tap area.
     * */
    @Input()
    type: AvatarGroupHostConfig['type'] = 'individual';

    /**
     * Orientation of the AvatarGroup control.
     *
     * `horizontal`: The avatars are displayed horizontally.
     * `vertical`: The avatars are displayed vertically.
     */
    @Input()
    orientation: AvatarGroupHostConfig['orientation'] = 'horizontal';

    /**
     * The spacing between the items depends on the size of the avatars in the group.
     * The size is also used for the default overflow button.
     * `xs`, `s`, `m`, `l`, `xl`
     */
    @Input()
    size: AvatarGroupHostConfig['size'] = 'l';

    /** Popover placement */
    @Input()
    popoverPlacement: Placement | null = null;

    /**
     * The title which is displayed when user opens the overflow popover.
     * This takes effect only when default overflow popover body is used,
     * otherwise the title should be set on the custom overflow popover body component.
     */
    @Input()
    overflowPopoverTitle: string;

    /**
     * The maximum number of visible avatar items.
     **/
    @Input()
    maxVisibleItems: Nullable<number> = null;

    /** @hidden */
    @ViewChildren(AvatarGroupItemRendererDirective)
    _avatarRenderers: QueryList<AvatarGroupItemRendererDirective>;

    /** @hidden */
    @ViewChild(DefaultAvatarGroupOverflowBodyComponent)
    defaultAvatarGroupOverflowBody: DefaultAvatarGroupOverflowBodyComponent;

    /** @hidden */
    @ContentChildren(AvatarGroupItemDirective)
    _avatars: QueryList<AvatarGroupItemDirective>;

    /** @hidden */
    @ContentChild(AvatarGroupOverflowButtonDirective)
    _overflowButton: AvatarGroupOverflowButtonDirective;

    /** @hidden */
    @ContentChild(AvatarGroupOverflowBodyDirective)
    _avatarGroupPopoverBody: AvatarGroupOverflowBodyDirective;

    /** @hidden */
    opened = signal(false);

    /** @hidden */
    _contentDirection$ = computed<Direction>(() => (this._rtlService?.rtlSignal() ? 'rtl' : 'ltr'));

    /** @hidden */
    private readonly _cdr = inject(ChangeDetectorRef);

    /** @hidden */
    private readonly _rtlService = inject(RtlService, { optional: true });

    /** @hidden */
    private _popoverService = inject(PopoverService);

    /** @hidden */
    ngOnInit(): void {
        this._popoverService._forceFocus.set(true);
    }

    /** @hidden */
    handlePopoverOpen($event: boolean): void {
        this.opened.set($event);
    }

    /** @hidden */
    _detectChanges(): void {
        this._cdr.detectChanges();
    }
}
