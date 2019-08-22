import { Component, ContentChildren, QueryList } from '@angular/core';
import { MegaMenuItemComponent } from './mega-menu-item/mega-menu-item.component';

@Component({
    selector: 'fd-mega-menu',
    templateUrl: './mega-menu.component.html',
    styleUrls: ['./mega-menu.component.scss']
})
export class MegaMenuComponent {

    /** @hidden */
    @ContentChildren(MegaMenuItemComponent)
    subItems: QueryList<MegaMenuItemComponent>;
}
