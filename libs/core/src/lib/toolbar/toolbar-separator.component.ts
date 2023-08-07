import { Component, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'fd-toolbar-separator',
    template: '',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'fd-toolbar__separator'
    },
    standalone: true
})
export class ToolbarSeparatorComponent {}
