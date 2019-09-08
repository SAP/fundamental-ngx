import { Component, ViewEncapsulation } from '@angular/core';

/**
 * The directive that represents a list.
 * It is used to display a list of items with simple information such as scopes, names, etc. 
 */
@Component({
    // tslint:disable-next-line:component-selector
    selector: '[fd-list]',
    template: `<ng-content></ng-content>`,
    host: {
        class: 'fd-list-group'
    },
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./list.component.scss']
})
export class ListComponent {}
