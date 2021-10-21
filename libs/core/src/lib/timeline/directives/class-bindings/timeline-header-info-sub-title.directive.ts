import { Directive, HostBinding } from '@angular/core';

@Directive({
    selector: '[fdTimelineHeaderInfoSubTitle], [fd-timeline-header-info-sub-title]'
})
export class TimelineHeaderInfoSubTitleDirective {
    /** add/remove fd-timeline__post-subheader class*/
    @HostBinding('class.fd-timeline__post-subheader')
    fdTimelineNodeHeaderInfoSubTitleClass = true;
}
