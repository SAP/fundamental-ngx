import { ElementRef, Signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Nullable } from '@fundamental-ngx/cdk';

export abstract class FdbNavigationItemLink {
    abstract elementRef: ElementRef<HTMLLinkElement>;
    abstract inPopover: boolean;
    abstract isActive$: Signal<boolean | undefined>;
    abstract routerLink: Nullable<RouterLink>;
    abstract hasRouterLink$: Signal<boolean>;
    abstract focus(): void;
}
