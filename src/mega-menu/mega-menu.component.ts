import { Component, HostListener, Input } from '@angular/core';

@Component({
    selector: 'fd-mega-menu',
    templateUrl: './mega-menu.component.html'
})
export class MegaMenuComponent {}

@Component({
    selector: 'fd-mega-menu-group',
    templateUrl: './mega-menu-group.component.html'
})
export class MegaMenuGroup {}

@Component({
    selector: 'fd-mega-menu-title',
    templateUrl: './mega-menu-title.component.html'
})
export class MegaMenuTitle {}

@Component({
    selector: 'fd-mega-menu-list',
    templateUrl: './mega-menu-list.component.html'
})
export class MegaMenuList {}

@Component({
    selector: 'fd-mega-menu-item',
    templateUrl: './mega-menu-item.component.html'
})
export class MegaMenuItem {}

@Component({
    selector: 'fd-mega-menu-link',
    templateUrl: './mega-menu-link.component.html'
})
export class MegaMenuLink {
    @Input() url: string;

    @Input() hasSublist: boolean;

    sublistIsOpen = false;
}

@Component({
    selector: 'fd-mega-menu-sublist',
    templateUrl: './mega-menu-sublist.component.html'
})
export class MegaMenuSubList {}

@Component({
    selector: 'fd-mega-menu-subitem',
    templateUrl: './mega-menu-subitem.component.html'
})
export class MegaMenuSubItem {
    @Input() url: string;
}
