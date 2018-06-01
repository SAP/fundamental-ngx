import { Component, Input, Directive } from '@angular/core';

@Component({
    selector: 'fd-list',
    template: `
    <ul class="fd-list-group">
      <ng-content select="fd-list-item"></ng-content>
      <ng-content select="fd-list-action"></ng-content>
      <ng-content select="fd-list-checkbox"></ng-content>
    </ul>
  `
})
export class List {}

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
    template: `
    <div class="fd-form__item fd-form__item--check">
      <label class="fd-form__label" for="checkbox-1">
        <input class="fd-form__control" type="checkbox" id="checkbox-1">
          <ng-content></ng-content>
      </label>
    </div>
  `
})
export class ListCheckbox {}

@Directive({
    selector: 'fd-list-action',
    host: {
        class: 'fd-list-group__action'
    }
})
export class ListAction {}
