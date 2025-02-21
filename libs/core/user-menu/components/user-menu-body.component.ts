import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'fd-user-menu-body',
    template: `<ng-content select="[fd-user-menu-header]"></ng-content>
        <ng-content select="[fd-user-menu-content-container]"></ng-content>`,
    host: {
        class: 'fd-user-menu__body'
    },
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true
})
export class UserMenuBodyComponent {}
