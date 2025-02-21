import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'fd-user-menu-list',
    template: `
        <nav class="fd-menu fd-menu--icons fd-user-menu__menu">
            <ul class="fd-menu__list fd-user-menu__menu-list" role="menu">
                <ng-content></ng-content>
            </ul>
        </nav>
    `,
    host: {
        class: 'fd-user-menu__body'
    },
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true
})
export class UserMenuListComponent {}
