import { Component, Input } from '@angular/core';

/**
 * The component that represents a navigation icon.
 * ```html
 *   <fd-side-nav-icon [glyph]="'home'" [size]="'l'"></fd-side-nav-icon>
 * ```
 */
@Component({
    selector: 'fd-side-nav-icon',
    templateUrl: './side-navigation-icon.component.html'
})
export class SideNavigationIconComponent {
    /** The glyph (icon) name. */
    @Input() glyph: string;

    /** The size of the icon. */
    @Input() size: string;
}
