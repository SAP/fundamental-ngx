import { Directive, HostBinding } from '@angular/core';

@Directive({
    selector: '[fdTreeItemIcon]',
    host: {
        class: 'fd-tree__icon'
    },
    standalone: true
})
export class TreeItemIconDirective {
    /** @hidden */
    @HostBinding('attr.role')
    protected readonly _role = 'presentation';

    /** @hidden */
    @HostBinding('attr.aria-hidden')
    protected readonly _ariaHidden = true;
}

@Directive({
    selector: '[fdTreeItemText]',
    host: {
        class: 'fd-tree__text'
    },
    standalone: true
})
export class TreeItemTextDirective {}
