import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
@Component({
    selector: 'fd-user-menu-footer',
    template: `<ng-content></ng-content>`,
    host: {
        class: ''
    },
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [CommonModule]
})
export class UserMenuFooterComponent {}
