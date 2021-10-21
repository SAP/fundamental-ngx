import { Directive, HostBinding } from '@angular/core';

@Directive({
    selector: '[fdTimelineNodeHeaderInfoTitle], [fd-timeline-node-header-info-title]'
})
export class TimelineNodeHeaderInfoTitleDirective {
    /** fd-timeline__post-header-title*/
    @HostBinding('class.fd-timeline__post-header-title')
    fdTimelineNodeHeaderInfoTitleClass = true;
}
