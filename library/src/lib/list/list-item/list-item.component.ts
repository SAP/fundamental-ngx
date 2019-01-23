import { Component } from '@angular/core';

@Component({
    selector: '[fd-list-item]',
    host: {
        class: 'fd-list-group__item'
    },
    template: `<ng-content></ng-content>`
})
export class ListItemComponent {}
