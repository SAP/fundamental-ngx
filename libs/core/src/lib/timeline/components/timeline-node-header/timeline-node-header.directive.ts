import { Directive } from '@angular/core';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: 'fd-timeline-node-header',
    host: {
        class: 'fd-timeline__post-header-container'
    },
    standalone: true
})
export class TimelineNodeHeaderDirective {}
