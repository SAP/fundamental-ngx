import { Directive, Input } from '@angular/core';

@Directive({
    selector: '[fd-navbar-group]',
    host: {
        '[class]': '"fd-global-nav__group" + (position ? " fd-global-nav__group--" + position : "") + (hasLaunchpad ? " fd-global-nav__launchpad" : "")'
    }
})
export class NavbarGroupDirective {
    @Input() position: string = '';
    @Input() hasLaunchpad: boolean = false;
}
