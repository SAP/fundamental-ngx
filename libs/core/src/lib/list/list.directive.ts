import { Component, Directive, ViewEncapsulation } from '@angular/core';

/**
 * The directive that represents a list.
 * It is used to display a list of items with simple information such as scopes, names, etc. 
 */
@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[fd-list]',
    host: {
        class: 'fd-list-group'
    }
})
export class ListDirective {}
