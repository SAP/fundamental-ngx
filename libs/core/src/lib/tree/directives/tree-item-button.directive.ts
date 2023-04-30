import { Directive } from '@angular/core';

@Directive({
    selector: '[fdTreeItemButton]',
    host: {
        class: 'fd-tree__button'
    }
})
export class TreeItemButtonDirective {}
