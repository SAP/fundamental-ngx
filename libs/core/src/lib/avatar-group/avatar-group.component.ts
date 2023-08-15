import {
    ChangeDetectionStrategy,
    Component,
    ContentChildren,
    inject,
    Input,
    QueryList,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { AVATAR_GROUP_HOST_CONFIG } from './tokens';
import { AvatarGroupHostConfig } from './types';
import { AvatarGroupHostComponent } from './components/avatar-group-host/avatar-group-host.component';
import { AsyncPipe, NgForOf, NgIf, NgTemplateOutlet } from '@angular/common';
import { PopoverModule } from '@fundamental-ngx/core/popover';
import { AvatarGroupItemDirective } from './directives/avatar-group-item.directive';
import {
    DynamicPortalComponent,
    FocusableItemDirective,
    FocusableListDirective,
    RtlService
} from '@fundamental-ngx/cdk/utils';
import { map, Observable, of } from 'rxjs';
import { DialogModule } from '@angular/cdk/dialog';
import { DomPortal } from '@angular/cdk/portal';
import { AvatarGroupItemPortalDirective } from './directives/avatar-group-item-portal.directive';

@Component({
    selector: 'fd-avatar-group',
    templateUrl: './avatar-group.component.html',
    styleUrls: ['./avatar-group.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    providers: [
        {
            provide: AVATAR_GROUP_HOST_CONFIG,
            useExisting: AvatarGroupComponent
        }
    ],
    imports: [
        AvatarGroupHostComponent,
        NgIf,
        PopoverModule,
        NgForOf,
        NgTemplateOutlet,
        FocusableItemDirective,
        DynamicPortalComponent,
        FocusableListDirective,
        AsyncPipe,
        DialogModule,
        AvatarGroupItemPortalDirective
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
     *
     * `xs`, `s`, `m`, `l`, `xl`
     */
    @Input()
    size: AvatarGroupHostConfig['size'] = 'l';

    /** @hidden */
    @ContentChildren(AvatarGroupItemDirective)
    avatars: QueryList<AvatarGroupItemDirective>;

    /** @hidden */
    @ViewChild(FocusableListDirective)
    focusableList: FocusableListDirective;

    /** @hidden */
    contentDirection$: Observable<'rtl' | 'ltr'> = (inject(RtlService, { optional: true })?.rtl || of(false)).pipe(
        map((isRtl) => (isRtl ? 'rtl' : 'ltr'))
    );

    /** @hidden */
    protected _domPortalsCache = new WeakMap<AvatarGroupItemDirective, DomPortal>();

    /** @hidden */
    domPortal(avatarGroupItem: AvatarGroupItemDirective): DomPortal<HTMLElement> {
        const cachedValue = this._domPortalsCache.get(avatarGroupItem);
        return cachedValue || this._createDomPortal(avatarGroupItem);
    }

    /** @hidden */
    private _createDomPortal(avatarGroupItem: AvatarGroupItemDirective): DomPortal<HTMLElement> {
        const portal = new DomPortal(avatarGroupItem.elementRef.nativeElement);
        this._domPortalsCache.set(avatarGroupItem, portal);
        return portal;
    }
}
