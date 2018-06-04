import { Component, Input, Directive } from '@angular/core';

@Component({
    selector: 'fd-list',
    templateUrl: './list.component.html'
})
export class ListComponent {}

@Component({
    selector: 'fd-list-item',
    host: {
        class: 'fd-list-group__item'
    },
    template: `
      <ng-content></ng-content>
  `
})
export class ListItem {}

@Component({
    selector: 'fd-list-checkbox',
    host: {
        class: 'fd-form__item fd-form__item--check'
    },
    templateUrl: './list-checkbox.component.html'
})
export class ListCheckbox {}

@Directive({
    selector: 'fd-list-action',
    host: {
        class: 'fd-list-group__action'
    }
})
export class ListAction {}
