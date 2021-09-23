import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'fd-timeline-node-footer',
    template: '<ng-content></ng-content>',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        'class': 'fd-timeline__post-actions'
    },
    styles: [`.fd-timeline__post-actions button + button { 
       margin-left: 0.5rem;
    }`]
})
export class TimelineNodeFooterComponent {
}
