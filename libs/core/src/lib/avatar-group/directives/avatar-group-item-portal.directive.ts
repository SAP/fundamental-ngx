import { Directive, inject, Input, OnInit } from '@angular/core';
import { CdkPortalOutlet, DomPortal } from '@angular/cdk/portal';
import { AvatarGroupItemDirective } from './avatar-group-item.directive';

@Directive({
    selector: '[fdAvatarGroupItemPortal]',
    exportAs: 'fdAvatarGroupItemPortal',
    standalone: true
})
export class AvatarGroupItemPortalDirective implements OnInit {
    /** @hidden */
    @Input() avatarGroupItem: AvatarGroupItemDirective;

    /** @hidden */
    @Input() domPortal: DomPortal;

    /** @hidden */
    @Input()
    forceVisibility = false;

    /** @hidden */
    portalOutlet = inject(CdkPortalOutlet, { host: true });

    /** @hidden */
    get element(): HTMLElement {
        return this.domPortal.element;
    }

    /** @hidden */
    get visible(): boolean {
        return this.portalOutlet.hasAttached();
    }

    /** @hidden */
    ngOnInit(): void {
        this.show();
    }

    /** @hidden */
    hide(): void {
        this.portalOutlet.detach();
    }

    /** @hidden */
    show(): void {
        this.portalOutlet.attach(this.domPortal);
    }
}
