import { Component, Directive, Input } from '@angular/core';
import { NgModule } from '@angular/core';
import { DropdownModule } from '../dropdown/dropdown.module';
import { ButtonModule } from '../button/button.module';
import { IconModule } from '../icon/icon.module';

@Component({
    selector: 'fd-action-bar',
    template: `
    <div class="fd-action-bar">
      <div class="fd-action-bar__header">
        <fd-action-bar-title>{{actionBarTitle}}</fd-action-bar-title>
      </div>
      <div class="fd-action-bar__actions">
        <ng-content></ng-content>
      </div>
    </div>
  `
})
export class ActionBarComponent {
    @Input() actionBarTitle: string;

    @Input() isNavigation: boolean;
}

@Component({
    selector: 'fd-action-bar-title',
    template: `
     <h1 class="fd-action-bar__title"><ng-content></ng-content></h1>
  `
})
export class ActionBarTitle {}
