import { Component, Input } from '@angular/core';

@Component({
    selector: 'fd-shellbar-collapse-control',
    templateUrl: './shellbar-collapse-control.component.html'
})
export class ShellbarCollapseControlComponent {

    @Input()
    collapsedCount: number;

}
