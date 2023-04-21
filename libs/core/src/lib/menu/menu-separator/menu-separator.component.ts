import { ChangeDetectionStrategy, Component, HostBinding, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'fd-menu-separator',
    template: '',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true
})
export class MenuSeparatorComponent {
    /** @hidden */
    @HostBinding('class.fd-menu__separator')
    readonly fdMenuSeparatorClass: boolean = true;
}
