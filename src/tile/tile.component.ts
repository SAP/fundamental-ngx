import { Component, Input } from '@angular/core';

@Component({
    selector: 'fd-tile',
    host: {
        '[class]':
            ' "fd-tile" + (disabled ? " is-disabled" : "") + (rowSpan ? " fd-has-grid-row-span-" + rowSpan : "")  + (columnSpan ? " fd-has-grid-column-span-" + columnSpan : "") + (colorAccent ? " fd-has-background-color-accent-" + colorAccent : "")',
        '[attr.role]': "(this.isButton === true ? 'button' : '')"
    },
    templateUrl: './tile.component.html'
})
export class TileComponent {
    @Input() disabled: boolean = false;

    @Input() isButton: boolean = false;

    @Input() rowSpan;

    @Input() columnSpan;

    @Input() colorAccent;
}
