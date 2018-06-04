import { Component, Input, Directive } from '@angular/core';
import { NgModule } from '@angular/core';

@Component({
    selector: 'fd-panel',
    host: {
        class: ''
    },
    templateUrl: './panel.component.html'
})
export class PanelComponent {}

@Component({
    selector: 'fd-panel-header',
    host: {
        class: ''
    },
    templateUrl: './panel-header.component.html'
})
export class PanelHeader {}

@Component({
    selector: 'fd-panel-title',
    host: {
        class: 'fd-panel__title'
    },
    templateUrl: './panel-title.component.html'
})
export class PanelTitle {}

@Component({
    selector: 'fd-panel-actions',
    host: {
        class: ''
    },
    templateUrl: './panel-actions.component.html'
})
export class PanelActions {}

@Component({
    selector: 'fd-panel-filters',
    host: {
        class: ''
    },
    templateUrl: './panel-filters.component.html'
})
export class PanelFilters {}

@Component({
    selector: 'fd-panel-body',
    host: {
        class: ''
    },
    templateUrl: './panel-body.component.html'
})
export class PanelBody {}

@Component({
    selector: 'fd-panel-footer',
    host: {
        class: ''
    },
    templateUrl: './panel-footer.component.html'
})
export class PanelFooter {}
