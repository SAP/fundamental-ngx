import { NgModule } from '@angular/core';

import { TimelineNodeBodyComponent } from './components/timeline-node-body/timeline-node-body.component';
import { TimelineNodeFooterComponent } from './components/timeline-node-footer/timeline-node-footer.component';
import { TimelineNodeHeaderInfoDirective } from './components/timeline-node-header/timeline-node-header-info/timeline-node-header-info.directive';
import { TimelineNodeHeaderDirective } from './components/timeline-node-header/timeline-node-header.directive';
import { TimelineNodeComponent } from './components/timeline-node/timeline-node.component';
import { TimelineHeaderInfoSubTitleDirective } from './directives/class-bindings/timeline-header-info-sub-title.directive';
import { TimelineNodeHeaderInfoTextDirective } from './directives/class-bindings/timeline-node-header-info-text.directive';
import { TimelineNodeHeaderInfoTitleDirective } from './directives/class-bindings/timeline-node-header-info-title.directive';
import { TimelineNodeDefDirective } from './directives/timeline-node-def.directive';
import { TimelineComponent } from './timeline.component';

/**
 * @deprecated
 * Use direct imports of `TimelineComponent`,
    `TimelineNodeDefDirective`,
    `TimelineNodeHeaderComponent`,
    `TimelineNodeHeaderInfoComponent`,
    `TimelineNodeBodyComponent`,
    `TimelineNodeFooterComponent`,
    `TimelineNodeComponent`,
    `TimelineNodeHeaderInfoTitleDirective`,
    `TimelineNodeHeaderInfoTextDirective`,
    `TimelineHeaderInfoSubTitleDirective`
 */
@NgModule({
    imports: [
        TimelineComponent,
        TimelineNodeDefDirective,
        TimelineNodeHeaderDirective,
        TimelineNodeHeaderInfoDirective,
        TimelineNodeBodyComponent,
        TimelineNodeFooterComponent,
        TimelineNodeComponent,
        TimelineNodeHeaderInfoTitleDirective,
        TimelineNodeHeaderInfoTextDirective,
        TimelineHeaderInfoSubTitleDirective
    ],
    exports: [
        TimelineComponent,
        TimelineNodeDefDirective,
        TimelineNodeHeaderDirective,
        TimelineNodeHeaderInfoDirective,
        TimelineNodeBodyComponent,
        TimelineNodeFooterComponent,
        TimelineNodeComponent,
        TimelineNodeHeaderInfoTitleDirective,
        TimelineNodeHeaderInfoTextDirective,
        TimelineHeaderInfoSubTitleDirective
    ]
})
export class TimelineModule {}
