import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: '[fd-user-menu]',
    templateUrl: './user-menu.component.html',
    styleUrl: './user-menu.component.scss',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true
})
export class UserMenuComponent {}
