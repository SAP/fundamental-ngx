import { Component, Input } from '@angular/core';

@Component({
    selector: 'fd-side-nav',
    templateUrl: './side-navigation.component.html'
})
export class SideNavigationComponent {
    @Input() collapsed: boolean = false;
}
