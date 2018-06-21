import { Component, Input } from '@angular/core';

@Component({
    selector: 'fd-mega-menu-subitem',
    templateUrl: './mega-menu-subitem.component.html'
})
export class MegaMenuSubItemComponent {
    @Input() url: string;
}
