import { Component, Input } from '@angular/core';

@Component({
    selector: 'fd-side-nav-subitem',
    templateUrl: './side-navigation-subitem.component.html'
})
export class SideNavigationSubItemComponent {
    @Input() url: string;
}
