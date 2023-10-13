import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IconComponent } from '@fundamental-ngx/core/icon';

@Component({
    selector: 'fdb-navigation-menu-item, li[fdb-navigation-menu-item]',
    template: `
        <fd-icon
            class="fd-navigation-menu__icon"
            [glyph]="glyph"
            role="presentation"
            aria-hidden="true"
            *ngIf="glyph"
        ></fd-icon>
        <span class="fd-navigation-menu__text">
            {{ label }}
        </span>
    `,
    standalone: true,
    imports: [IconComponent, NgIf],
    host: {
        class: 'fd-navigation-menu__item'
    }
})
export class NavigationMenuItemComponent {
    /**
     * Name of the icon to be displayed before the text.
     */
    @Input()
    glyph: string;

    /**
     * Text to be displayed.
     */
    @Input({ required: true })
    label!: string;
}
