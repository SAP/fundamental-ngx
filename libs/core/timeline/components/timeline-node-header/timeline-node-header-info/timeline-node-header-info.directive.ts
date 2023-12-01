import { Directive } from '@angular/core';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: 'fd-timeline-node-header-info',
    host: {
        class: 'fd-timeline__post-header'
    },
    standalone: true
})
export class TimelineNodeHeaderInfoDirective {}
