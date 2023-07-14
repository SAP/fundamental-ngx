import { Directive, inject, Input, OnInit, ViewContainerRef } from '@angular/core';
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
    viewContainerRef = inject(ViewContainerRef);

    /** @hidden */
    get element(): HTMLElement {
        return this.domPortal.element;
    }

    /** @hidden */
    get visible(): boolean {
        return this.portalOutlet.hasAttached();
    }

    /** @hidden */
    get width(): number {
        return (
            this.element.getBoundingClientRect().width +
            parseFloat(getComputedStyle(this.element).marginLeft) +
            parseFloat(getComputedStyle(this.element).marginRight)
        );
    }

    /** @hidden */
    ngOnInit(): void {
        this.show();
    }

    /** @hidden */
    hide(): void {
        this.avatarGroupItem.fdkFocusableItem = false;
        this.portalOutlet.detach();
    }

    /** @hidden */
    show(): void {
        this.avatarGroupItem.fdkFocusableItem = true;
        this.portalOutlet.attach(this.domPortal);
    }
}
