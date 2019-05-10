import { Component, Input } from '@angular/core';

@Component({
    selector: 'fd-side-nav-icon',
    templateUrl: './side-navigation-icon.component.html'
})
export class SideNavigationIconComponent {
    @Input() glyph: string;

    @Input() size: string;
}
