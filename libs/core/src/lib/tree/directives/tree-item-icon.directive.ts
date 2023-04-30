import { Directive } from '@angular/core';

@Directive({
    selector: '[fdTreeItemIcon]',
    host: {
        class: 'fd-tree__icon'
    }
})
export class TreeItemIconDirective {}

@Directive({
    selector: '[fdTreeItemText]',
    host: {
        class: 'fd-tree__text'
    }
})
export class TreeItemTextDirective {}
