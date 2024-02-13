import { ElementRef, Signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HasElementRef, Nullable } from '@fundamental-ngx/cdk/utils';

export abstract class FdbNavigationItemLink implements HasElementRef {
    abstract elementRef: ElementRef<HTMLLinkElement>;
    abstract inPopover: boolean;
    abstract isActive$: Signal<boolean | undefined>;
    abstract routerLink: Nullable<RouterLink>;
    abstract hasRouterLink$: Signal<boolean>;
    abstract focus(): void;
}
