import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'fd-user-menu-list',
    template: `
        <nav class="fd-menu fd-menu--icons fd-user-menu__menu">
            <ul class="fd-menu__list fd-user-menu__menu-list" role="menu">
                <ng-content />
            </ul>
        </nav>
    `,
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserMenuListComponent {}
