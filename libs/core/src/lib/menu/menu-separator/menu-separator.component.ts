import { Component, HostBinding} from '@angular/core';

@Component({
  selector: 'fd-menu-separator',
  template: ''
})
export class MenuSeparatorComponent {

    /** @hidden */
    @HostBinding('class.fd-menu__separator')
    readonly fdMenuSeparatorClass: boolean = true;
}
