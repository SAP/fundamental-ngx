import { Component, ViewEncapsulation, ChangeDetectionStrategy, Directive } from '@angular/core';
import { ToolbarItemDirective } from './toolbar-item.directive';

@Directive({
    // tslint:disable-next-line: directive-selector
    selector: '[fd-toolbar-label]',
    host: {
        class: 'fd-label fd-toolbar__overflow__label'
    }
})
export class ToolbarLabelDirective extends ToolbarItemDirective {}
