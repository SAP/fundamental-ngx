import { Directive } from '@angular/core';

@Directive({
    selector: '[fdTreeItemButton]',
    host: {
        class: 'fd-tree__button'
    },
    standalone: true
})
export class TreeItemButtonDirective {}
