import { Component } from '@angular/core';

@Component({
    // TODO to be discussed
    // tslint:disable-next-line:component-selector
    selector: '[fd-list-item]',
    host: {
        class: 'fd-list-group__item'
    },
    template: `
        <ng-content></ng-content>
    `
})
export class ListItemComponent {}
