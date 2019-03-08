import { Component, HostBinding } from '@angular/core';

@Component({
    // TODO to be discussed
    // tslint:disable-next-line:component-selector
    selector: '[fd-list-item]',
    template: `
        <ng-content></ng-content>
    `
})
export class ListItemComponent {
    @HostBinding('class.fd-list-group__item') true;
}
