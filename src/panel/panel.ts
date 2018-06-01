import { Component, Input, Directive } from '@angular/core';
import { NgModule } from '@angular/core';

@Component({
  selector: 'fd-panel',
  host: {
    class: ''
  },
  template: `
    <div class="fd-panel">
      <ng-content select="fd-panel-header"></ng-content>
      <ng-content select="fd-panel-filters"></ng-content>
      <ng-content select="fd-panel-body"></ng-content>
      <ng-content select="fd-panel-footer"></ng-content>
    </div>
  `
})
export class Panel {}

@Component({
  selector: 'fd-panel-header',
  host: {
    class: ''
  },
  template: `
    <div class="fd-panel__header">
      <ng-content select="fd-panel-title"></ng-content>
      <ng-content select="fd-panel-actions"></ng-content>
    </div>
  `
})
export class PanelHeader {}

@Component({
  selector: 'fd-panel-title',
  host: {
    class: 'fd-panel__title'
  },
  template: `
    <h1 class="fd-panel__title">
      <ng-content></ng-content>
    </h1>
  `
})
export class PanelTitle {}

@Component({
  selector: 'fd-panel-actions',
  host: {
    class: ''
  },
  template: `
    <div class="fd-panel__actions">
      <ng-content></ng-content>
    </div>
  `
})
export class PanelActions {}

@Component({
  selector: 'fd-panel-filters',
  host: {
    class: ''
  },
  template: `
    <div class="fd-panel__filters">
      <ng-content></ng-content>
    </div>
  `
})
export class PanelFilters {}

@Component({
  selector: 'fd-panel-body',
  host: {
    class: ''
  },
  template: `
    <div class="fd-panel__body">
      <ng-content></ng-content>
    </div>
  `
})
export class PanelBody {}

@Component({
  selector: 'fd-panel-footer',
  host: {
    class: ''
  },
  template: `
    <div class="fd-panel__footer">
      <ng-content></ng-content>
    </div>
  `
})
export class PanelFooter {}
