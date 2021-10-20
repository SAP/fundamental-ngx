import { Directive, HostBinding } from '@angular/core';

@Directive({
    selector: '[fdTimelineNodeHeaderInfoText], [fd-timeline-node-header-info-text]'
})
export class TimelineNodeHeaderInfoTextDirective {
    /** add/remove fd-timeline__post-header-text class*/
    @HostBinding('class.fd-timeline__post-header-text')
    fdTimelineNodeHeaderInfoTextClass = true;
}
