import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IconModule } from '@fundamental-ngx/core/icon';
import { TextModule } from '@fundamental-ngx/core/text';
import { SkeletonModule } from '@fundamental-ngx/core/skeleton';
import { RepeatModule } from '@fundamental-ngx/core/utils';

import { TimelineComponent } from './timeline.component';
import { TimelineNodeDefDirective } from './directives/timeline-node-def.directive';
import { TimelineFirstListOutletDirective } from './directives/timeline-first-list-outlet.directive';
import { TimelineNodeHeaderComponent } from './components/timeline-node-header/timeline-node-header.component';
import { TimelineNodeHeaderInfoComponent } from './components/timeline-node-header/timeline-node-header-info/timeline-node-header-info.component';
import { TimelineNodeBodyComponent } from './components/timeline-node-body/timeline-node-body.component';
import { TimelineNodeFooterComponent } from './components/timeline-node-footer/timeline-node-footer.component';
import { TimelineNodeComponent } from './components/timeline-node/timeline-node.component';
import { TimelineNodeHeaderInfoTitleDirective } from './directives/class-bindings/timeline-node-header-info-title.directive';
import { TimelineNodeHeaderInfoTextDirective } from './directives/class-bindings/timeline-node-header-info-text.directive';
import { TimelineHeaderInfoSubTitleDirective } from './directives/class-bindings/timeline-header-info-sub-title.directive';
import { TimelineSecondListOutletDirective } from './directives/timeline-second-list-outlet.directive';

@NgModule({
    declarations: [
        TimelineComponent,
        TimelineNodeDefDirective,
        TimelineFirstListOutletDirective,
        TimelineNodeHeaderComponent,
        TimelineNodeHeaderInfoComponent,
        TimelineNodeBodyComponent,
        TimelineNodeFooterComponent,
        TimelineNodeComponent,
        TimelineNodeHeaderInfoTitleDirective,
        TimelineNodeHeaderInfoTextDirective,
        TimelineHeaderInfoSubTitleDirective,
        TimelineSecondListOutletDirective
    ],
    imports: [CommonModule, IconModule, TextModule, SkeletonModule, RepeatModule],
    exports: [
        TimelineComponent,
        TimelineNodeDefDirective,
        TimelineNodeHeaderComponent,
        TimelineNodeHeaderInfoComponent,
        TimelineNodeBodyComponent,
        TimelineNodeFooterComponent,
        TimelineNodeComponent,
        TimelineNodeHeaderInfoTitleDirective,
        TimelineNodeHeaderInfoTextDirective,
        TimelineHeaderInfoSubTitleDirective
    ]
})
export class TimelineModule {}
