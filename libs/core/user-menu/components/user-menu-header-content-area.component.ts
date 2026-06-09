import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: '[fd-user-menu-header-content-area]',
    template: `<ng-content />`,
    host: {
        class: 'fd-user-menu__header-content-area'
    },
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserMenuHeaderContentAreaComponent {}
