import { Component, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { ToolbarItemDirective } from './toolbar-item.directive';

@Component({
    selector: 'fd-toolbar-separator',
    template: '',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'fd-toolbar__separator'
    }
})
export class ToolbarSeparatorComponent {}
