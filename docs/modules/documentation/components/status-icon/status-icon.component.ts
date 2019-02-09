import { Component, Input } from '@angular/core';

@Component({
    selector: 'status-icon',
    templateUrl: './status-icon.component.html',
    styleUrls: ['./status-icon.component.scss']
})
export class StatusIconComponent {

    @Input() status: string = 'SAFE';
    @Input() iconSize: string = 's';

    states = {
        SAFE: {glyph: 'thumb-up', color: '#7ca10c', tooltip: 'Safe to use'},
        ACTIVE: {glyph: 'edit', color: '#2b78c5', tooltip: 'Under development'},
        UNSAFE: {glyph: 'lab', color: '#e38b16', tooltip: 'Experimental'}
    };

    constructor() {
    }
}
