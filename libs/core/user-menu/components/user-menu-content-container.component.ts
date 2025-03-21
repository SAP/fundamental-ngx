import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: '[fd-user-menu-content-container]',
    template: `<ng-content />`,
    host: {
        class: 'fd-user-menu__content-container'
    },
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserMenuContentContainerComponent {}
