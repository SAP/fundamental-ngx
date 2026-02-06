import { Direction } from '@angular/cdk/bidi';
import { NgTemplateOutlet } from '@angular/common';
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChild,
    ContentChildren,
    Input,
    QueryList,
    ViewChildren,
    ViewEncapsulation,
    computed,
    inject
} from '@angular/core';
import {
    FocusableItemDirective,
    FocusableListDirective,
    ResizeObserverDirective,
    RtlService
} from '@fundamental-ngx/cdk/utils';
import { PopoverBodyDirective, PopoverComponent, PopoverControlComponent } from '@fundamental-ngx/core/popover';
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
    providers: [
        {
            provide: AVATAR_GROUP_HOST_CONFIG,
            useExisting: AvatarGroupComponent
        }
    ],
    imports: [
        AvatarGroupHostComponent,
        PopoverComponent,
        PopoverControlComponent,
        PopoverBodyDirective,
        NgTemplateOutlet,
        FocusableItemDirective,
        FocusableListDirective,
        AvatarGroupItemRendererDirective,
        AvatarGroupOverflowButtonComponent,
        DefaultAvatarGroupOverflowBodyComponent,
        AvatarGroupInternalOverflowButtonDirective,
        ResizeObserverDirective
    ]
})
export class AvatarGroupComponent implements AvatarGroupHostConfig {
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

    /**
     * The title which is displayed when user opens the overflow popover.
     * This takes effect only when default overflow popover body is used,
     * otherwise the title should be set on the custom overflow popover body component.
     */
    @Input()
    overflowPopoverTitle: string;

    /** @hidden */
    @ViewChildren(AvatarGroupItemRendererDirective)
    _avatarRenderers: QueryList<AvatarGroupItemRendererDirective>;

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
    protected readonly contentDirection = computed<Direction>(() => (this._rtlService?.rtl() ? 'rtl' : 'ltr'));

    /** @hidden */
    private readonly _cdr = inject(ChangeDetectorRef);

    /** @hidden */
    private readonly _rtlService = inject(RtlService, { optional: true });

    /** @hidden */
    _detectChanges(): void {
        this._cdr.detectChanges();
    }
}
