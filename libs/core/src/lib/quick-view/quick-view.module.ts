import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuickViewComponent } from './quick-view/quick-view.component';
import { QuickViewTitleComponent } from './quick-view-title/quick-view-title.component';
import { QuickViewSubheaderComponent } from './quick-view-subheader/quick-view-subheader.component';
import { QuickViewSubheaderTitleComponent } from './quick-view-subheader-title/quick-view-subheader-title.component';
import { QuickViewSubheaderSubtitleComponent } from './quick-view-subheader-subtitle/quick-view-subheader-subtitle.component';
import { QuickViewGroupComponent } from './quick-view-group/quick-view-group.component';
import { QuickViewGroupTitleComponent } from './quick-view-group-title/quick-view-group-title.component';
import { QuickViewGroupItemComponent } from './quick-view-group-item/quick-view-group-item.component';
import { QuickViewGroupItemLabelComponent } from './quick-view-group-item-label/quick-view-group-item-label.component';
import { QuickViewGroupItemContentComponent } from './quick-view-group-item-content/quick-view-group-item-content.component';
import { QuickViewGroupItemContentElementDirective } from './quick-view-group-item-content/quick-view-group-item-content-element.directive';
import { TitleModule } from '@fundamental-ngx/core/title';
import { BarModule } from '@fundamental-ngx/core/bar';
import { PopoverModule } from '@fundamental-ngx/core/popover';
import { FormGroupModule, FormItemModule, FormLabelModule } from '@fundamental-ngx/core/form';
import { SkeletonModule } from '@fundamental-ngx/core/skeleton';
import { RepeatModule } from '@fundamental-ngx/core/utils';

@NgModule({
    imports: [
        CommonModule,
        TitleModule,
        BarModule,
        FormGroupModule,
        FormItemModule,
        FormLabelModule,
        PopoverModule,
        SkeletonModule,
        RepeatModule
    ],
    declarations: [
        QuickViewComponent,
        QuickViewTitleComponent,
        QuickViewSubheaderComponent,
        QuickViewSubheaderTitleComponent,
        QuickViewSubheaderSubtitleComponent,
        QuickViewGroupComponent,
        QuickViewGroupTitleComponent,
        QuickViewGroupItemComponent,
        QuickViewGroupItemLabelComponent,
        QuickViewGroupItemContentComponent,
        QuickViewGroupItemContentElementDirective
    ],
    exports: [
        QuickViewComponent,
        QuickViewTitleComponent,
        QuickViewSubheaderComponent,
        QuickViewSubheaderTitleComponent,
        QuickViewSubheaderSubtitleComponent,
        QuickViewGroupComponent,
        QuickViewGroupTitleComponent,
        QuickViewGroupItemComponent,
        QuickViewGroupItemLabelComponent,
        QuickViewGroupItemContentComponent,
        QuickViewGroupItemContentElementDirective
    ]
})
export class QuickViewModule {}
